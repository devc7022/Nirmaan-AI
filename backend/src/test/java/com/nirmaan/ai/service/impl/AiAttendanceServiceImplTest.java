package com.nirmaan.ai.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nirmaan.ai.dto.AiAttendanceParsedDto;
import com.nirmaan.ai.dto.AiAttendanceRequest;
import com.nirmaan.attendance.dto.AttendanceRequestDto;
import com.nirmaan.attendance.dto.AttendanceResponseDto;
import com.nirmaan.attendance.service.AttendanceService;
import com.nirmaan.site.domain.ConstructionSite;
import com.nirmaan.worker.domain.Worker;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.client.RestClient;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AiAttendanceServiceImplTest {

    @Mock
    private AttendanceService attendanceService;

    @Mock
    private EntityManager entityManager;

    @Mock
    private ObjectMapper objectMapper;

    @Mock
    private RestClient restClient;

    @Mock
    private TypedQuery<Worker> workerQuery;

    @Mock
    private TypedQuery<Worker> partialWorkerQuery;

    @Mock
    private TypedQuery<ConstructionSite> siteQuery;

    @InjectMocks
    private AiAttendanceServiceImpl aiAttendanceService;

    private UUID workerId;
    private UUID siteId;
    private Worker worker;
    private ConstructionSite site;

    @BeforeEach
    void setUp() {
        workerId = UUID.randomUUID();
        siteId = UUID.randomUUID();

        worker = new Worker();
        worker.setId(workerId);
        worker.setName("Ramesh Kumar");

        site = new ConstructionSite();
        site.setId(siteId);
        site.setName("Site A");

        // Set configuration fields via reflection to bypass post-construct builder initialization in tests
        ReflectionTestUtils.setField(aiAttendanceService, "apiKey", "test-api-key");
        ReflectionTestUtils.setField(aiAttendanceService, "model", "gemini-1.5-flash");
        ReflectionTestUtils.setField(aiAttendanceService, "restClient", restClient);
    }

    @Test
    void processNaturalLanguageAttendance_ShouldSucceed_WhenEntitiesAreResolved() throws Exception {
        AiAttendanceRequest request = new AiAttendanceRequest("Ramesh worked 8 hours today at Site A");
        AiAttendanceParsedDto parsedDto = new AiAttendanceParsedDto(
                "Ramesh", "Site A", LocalDate.now(), 8.0, true, "Worked 8 hours"
        );

        // 1. Mock RestClient response
        RestClient.RequestBodyUriSpec requestBodyUriSpec = mock(RestClient.RequestBodyUriSpec.class, org.mockito.Answers.RETURNS_SELF);
        RestClient.ResponseSpec responseSpec = mock(RestClient.ResponseSpec.class);

        lenient().when(restClient.post()).thenReturn(requestBodyUriSpec);
        lenient().when(requestBodyUriSpec.retrieve()).thenReturn(responseSpec);

        Map<String, Object> mockResponse = Map.of(
                "choices", List.of(
                        Map.of("message", Map.of("content", "{\"workerName\":\"Ramesh\",\"siteName\":\"Site A\"}"))
                )
        );
        when(responseSpec.body(any(ParameterizedTypeReference.class))).thenReturn(mockResponse);

        // 2. Mock ObjectMapper deserialization
        when(objectMapper.readValue(anyString(), eq(AiAttendanceParsedDto.class))).thenReturn(parsedDto);

        // 3. Mock Worker search exact matches
        when(entityManager.createQuery("SELECT w FROM Worker w WHERE LOWER(w.name) = LOWER(:name)", Worker.class))
                .thenReturn(workerQuery);
        when(workerQuery.setParameter("name", "Ramesh")).thenReturn(workerQuery);
        when(workerQuery.getResultList()).thenReturn(List.of(worker));

        // 4. Mock ConstructionSite search exact matches
        when(entityManager.createQuery("SELECT s FROM ConstructionSite s WHERE LOWER(s.name) = LOWER(:name)", ConstructionSite.class))
                .thenReturn(siteQuery);
        when(siteQuery.setParameter("name", "Site A")).thenReturn(siteQuery);
        when(siteQuery.getResultList()).thenReturn(List.of(site));

        // 5. Mock AttendanceService creation
        AttendanceResponseDto expectedResponse = new AttendanceResponseDto(
                UUID.randomUUID(), workerId, "Ramesh Kumar", siteId, "Site A",
                LocalDate.now(), 8.0, true, "Worked 8 hours", null, null
        );
        when(attendanceService.createAttendance(any(AttendanceRequestDto.class))).thenReturn(expectedResponse);

        // Run
        AttendanceResponseDto response = aiAttendanceService.processNaturalLanguageAttendance(request);

        // Assertions
        assertNotNull(response);
        assertEquals("Ramesh Kumar", response.workerName());
        assertEquals("Site A", response.siteName());
        assertEquals(8.0, response.hoursWorked());
        verify(attendanceService).createAttendance(argThat(dto ->
                dto.workerId().equals(workerId) &&
                dto.siteId().equals(siteId) &&
                dto.hoursWorked().equals(8.0) &&
                dto.present().equals(true) &&
                dto.remarks().equals("Worked 8 hours")
        ));
    }

    @Test
    void processNaturalLanguageAttendance_ShouldThrowBadRequest_WhenWorkerNotFound() throws Exception {
        AiAttendanceRequest request = new AiAttendanceRequest("Unknown worked 8 hours at Site A");
        AiAttendanceParsedDto parsedDto = new AiAttendanceParsedDto(
                "Unknown", "Site A", LocalDate.now(), 8.0, true, "Worked 8 hours"
        );

        // Mock RestClient & ObjectMapper
        RestClient.RequestBodyUriSpec requestBodyUriSpec = mock(RestClient.RequestBodyUriSpec.class, org.mockito.Answers.RETURNS_SELF);
        RestClient.ResponseSpec responseSpec = mock(RestClient.ResponseSpec.class);
        lenient().when(restClient.post()).thenReturn(requestBodyUriSpec);
        lenient().when(requestBodyUriSpec.retrieve()).thenReturn(responseSpec);
        Map<String, Object> mockResponse = Map.of("choices", List.of(Map.of("message", Map.of("content", "{}"))));
        when(responseSpec.body(any(ParameterizedTypeReference.class))).thenReturn(mockResponse);
        when(objectMapper.readValue(anyString(), eq(AiAttendanceParsedDto.class))).thenReturn(parsedDto);

        // Mock exact search returns empty list
        when(entityManager.createQuery("SELECT w FROM Worker w WHERE LOWER(w.name) = LOWER(:name)", Worker.class))
                .thenReturn(workerQuery);
        when(workerQuery.setParameter("name", "Unknown")).thenReturn(workerQuery);
        when(workerQuery.getResultList()).thenReturn(Collections.emptyList());

        // Mock partial search returns empty list
        when(entityManager.createQuery("SELECT w FROM Worker w WHERE LOWER(w.name) LIKE LOWER(:name)", Worker.class))
                .thenReturn(partialWorkerQuery);
        when(partialWorkerQuery.setParameter("name", "%Unknown%")).thenReturn(partialWorkerQuery);
        when(partialWorkerQuery.getResultList()).thenReturn(Collections.emptyList());

        // Assert
        ResponseStatusException ex = assertThrows(ResponseStatusException.class, () ->
                aiAttendanceService.processNaturalLanguageAttendance(request));
        assertEquals(HttpStatus.BAD_REQUEST, ex.getStatusCode());
        assertTrue(ex.getReason().contains("No worker found matching the name: 'Unknown'"));
    }

    @Test
    void processNaturalLanguageAttendance_ShouldThrowBadRequest_WhenMultipleWorkersMatch() throws Exception {
        AiAttendanceRequest request = new AiAttendanceRequest("Kumar worked 8 hours at Site A");
        AiAttendanceParsedDto parsedDto = new AiAttendanceParsedDto(
                "Kumar", "Site A", LocalDate.now(), 8.0, true, "Worked 8 hours"
        );

        // Mock RestClient & ObjectMapper
        RestClient.RequestBodyUriSpec requestBodyUriSpec = mock(RestClient.RequestBodyUriSpec.class, org.mockito.Answers.RETURNS_SELF);
        RestClient.ResponseSpec responseSpec = mock(RestClient.ResponseSpec.class);
        lenient().when(restClient.post()).thenReturn(requestBodyUriSpec);
        lenient().when(requestBodyUriSpec.retrieve()).thenReturn(responseSpec);
        Map<String, Object> mockResponse = Map.of("choices", List.of(Map.of("message", Map.of("content", "{}"))));
        when(responseSpec.body(any(ParameterizedTypeReference.class))).thenReturn(mockResponse);
        when(objectMapper.readValue(anyString(), eq(AiAttendanceParsedDto.class))).thenReturn(parsedDto);

        // Mock exact search returns empty list
        when(entityManager.createQuery("SELECT w FROM Worker w WHERE LOWER(w.name) = LOWER(:name)", Worker.class))
                .thenReturn(workerQuery);
        when(workerQuery.setParameter("name", "Kumar")).thenReturn(workerQuery);
        when(workerQuery.getResultList()).thenReturn(Collections.emptyList());

        // Mock partial search returns 2 workers
        Worker worker1 = new Worker();
        worker1.setName("Ramesh Kumar");
        Worker worker2 = new Worker();
        worker2.setName("Suresh Kumar");

        when(entityManager.createQuery("SELECT w FROM Worker w WHERE LOWER(w.name) LIKE LOWER(:name)", Worker.class))
                .thenReturn(partialWorkerQuery);
        when(partialWorkerQuery.setParameter("name", "%Kumar%")).thenReturn(partialWorkerQuery);
        when(partialWorkerQuery.getResultList()).thenReturn(List.of(worker1, worker2));

        // Assert
        ResponseStatusException ex = assertThrows(ResponseStatusException.class, () ->
                aiAttendanceService.processNaturalLanguageAttendance(request));
        assertEquals(HttpStatus.BAD_REQUEST, ex.getStatusCode());
        assertTrue(ex.getReason().contains("Multiple workers found matching the name 'Kumar'"));
    }

    @Test
    void processNaturalLanguageAttendance_ShouldThrowInternalError_WhenApiKeyMissing() {
        ReflectionTestUtils.setField(aiAttendanceService, "apiKey", "");

        AiAttendanceRequest request = new AiAttendanceRequest("Ramesh worked 8 hours");
        ResponseStatusException ex = assertThrows(ResponseStatusException.class, () ->
                aiAttendanceService.processNaturalLanguageAttendance(request));
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, ex.getStatusCode());
        assertTrue(ex.getReason().contains("AI service API Key is not configured"));
    }
}
