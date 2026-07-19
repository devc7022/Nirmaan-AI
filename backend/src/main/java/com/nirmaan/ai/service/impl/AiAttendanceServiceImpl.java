package com.nirmaan.ai.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nirmaan.ai.dto.AiAttendanceParsedDto;
import com.nirmaan.ai.dto.AiAttendanceRequest;
import com.nirmaan.ai.service.AiAttendanceService;
import com.nirmaan.attendance.dto.AttendanceRequestDto;
import com.nirmaan.attendance.dto.AttendanceResponseDto;
import com.nirmaan.attendance.service.AttendanceService;
import com.nirmaan.site.domain.ConstructionSite;
import com.nirmaan.worker.domain.Worker;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AiAttendanceServiceImpl implements AiAttendanceService {

    private final AttendanceService attendanceService;
    private final EntityManager entityManager;
    private final ObjectMapper objectMapper;

    @Value("${app.ai.api-key:}")
    private String apiKey;

    @Value("${app.ai.base-url:https://generativelanguage.googleapis.com/v1beta/openai}")
    private String baseUrl;

    @Value("${app.ai.model:gemini-1.5-flash}")
    private String model;

    private RestClient restClient;

    @PostConstruct
    public void init() {
        if (apiKey == null || apiKey.trim().isEmpty()) {
            log.warn("AI API key (app.ai.api-key) is not configured. Natural language attendance processing will fail until a key is supplied.");
        }
        this.restClient = RestClient.builder()
                .baseUrl(baseUrl)
                .defaultHeader("Authorization", "Bearer " + apiKey)
                .defaultHeader("Content-Type", "application/json")
                .build();
    }

    @Override
    public AttendanceResponseDto processNaturalLanguageAttendance(AiAttendanceRequest request) {
        if (apiKey == null || apiKey.trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "AI service API Key is not configured. Please set the AI_API_KEY environment variable.");
        }

        // 1. Ask the AI Model to parse the text
        AiAttendanceParsedDto parsedDto = callAiModelToParse(request.text());

        // 2. Resolve Worker
        Worker worker = resolveWorker(parsedDto.workerName());

        // 3. Resolve Site
        ConstructionSite site = resolveSite(parsedDto.siteName());

        // 4. Map to AttendanceRequestDto with default fallback values
        LocalDate attendanceDate = parsedDto.attendanceDate() != null ? parsedDto.attendanceDate() : LocalDate.now();
        Double hoursWorked = parsedDto.hoursWorked() != null ? parsedDto.hoursWorked() : 0.0;
        Boolean present = parsedDto.present() != null ? parsedDto.present() : (hoursWorked > 0.0);
        String remarks = parsedDto.remarks() != null && !parsedDto.remarks().trim().isEmpty() 
                ? parsedDto.remarks() 
                : "Created via AI natural language processing: \"" + request.text() + "\"";

        AttendanceRequestDto attendanceRequest = new AttendanceRequestDto(
                worker.getId(),
                site.getId(),
                attendanceDate,
                hoursWorked,
                present,
                remarks
        );

        // 5. Call existing service to store record (triggering all business validation/rules)
        return attendanceService.createAttendance(attendanceRequest);
    }

    private AiAttendanceParsedDto callAiModelToParse(String text) {
        String systemMessage = "You are an assistant that extracts structured attendance information from natural language. " +
                "Output your response as a valid JSON object ONLY. Do not include markdown code block formatting (like ```json). " +
                "The JSON object must contain exactly these fields:\n" +
                "- 'workerName' (string, name of the worker)\n" +
                "- 'siteName' (string, name of the construction site)\n" +
                "- 'hoursWorked' (number, hours worked by the worker)\n" +
                "- 'date' (string in YYYY-MM-DD format, defaulting to today's date if not specified)\n" +
                "- 'present' (boolean, true if hours > 0 or marked present)\n" +
                "- 'remarks' (string, additional context/description)\n\n" +
                "Today's date is: " + LocalDate.now() + ". Use this relative base to resolve dates like 'today', 'yesterday', or 'last Friday'.";

        Map<String, Object> requestBody = Map.of(
                "model", model,
                "messages", List.of(
                        Map.of("role", "system", "content", systemMessage),
                        Map.of("role", "user", "content", text)
                ),
                "response_format", Map.of("type", "json_object")
        );

        try {
            Map<String, Object> response = restClient.post()
                    .uri("/chat/completions")
                    .body(requestBody)
                    .retrieve()
                    .body(new ParameterizedTypeReference<Map<String, Object>>() {});

            if (response == null || !response.containsKey("choices")) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Invalid response schema returned from AI model");
            }

            List<?> choices = (List<?>) response.get("choices");
            if (choices == null || choices.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "No choices found in AI model completions response");
            }

            Map<?, ?> choice = (Map<?, ?>) choices.get(0);
            Map<?, ?> message = (Map<?, ?>) choice.get("message");
            if (message == null || !message.containsKey("content")) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "No message content found in AI model completion choice");
            }

            String content = (String) message.get("content");
            if (content == null || content.trim().isEmpty()) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "AI model returned empty completions content");
            }

            return objectMapper.readValue(content, AiAttendanceParsedDto.class);
        } catch (Exception e) {
            log.error("Failed to call AI completions API or parse json content", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Failed to process natural language statement using AI Model: " + e.getMessage(), e);
        }
    }

    private Worker resolveWorker(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Worker name could not be extracted from the natural language text.");
        }

        // Try exact match
        List<Worker> workers = entityManager.createQuery(
                "SELECT w FROM Worker w WHERE LOWER(w.name) = LOWER(:name)", Worker.class)
                .setParameter("name", name.trim())
                .getResultList();

        // Fallback to partial match
        if (workers.isEmpty()) {
            workers = entityManager.createQuery(
                    "SELECT w FROM Worker w WHERE LOWER(w.name) LIKE LOWER(:name)", Worker.class)
                    .setParameter("name", "%" + name.trim() + "%")
                    .getResultList();
        }

        if (workers.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No worker found matching the name: '" + name + "'");
        }

        if (workers.size() > 1) {
            String matchingNames = workers.stream().map(Worker::getName).collect(Collectors.joining(", "));
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Multiple workers found matching the name '" + name + "': [" + matchingNames + "]. Please provide a more specific name.");
        }

        return workers.get(0);
    }

    private ConstructionSite resolveSite(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Construction site name could not be extracted from the natural language text.");
        }

        // Try exact match
        List<ConstructionSite> sites = entityManager.createQuery(
                "SELECT s FROM ConstructionSite s WHERE LOWER(s.name) = LOWER(:name)", ConstructionSite.class)
                .setParameter("name", name.trim())
                .getResultList();

        // Fallback to partial match
        if (sites.isEmpty()) {
            sites = entityManager.createQuery(
                    "SELECT s FROM ConstructionSite s WHERE LOWER(s.name) LIKE LOWER(:name)", ConstructionSite.class)
                    .setParameter("name", "%" + name.trim() + "%")
                    .getResultList();
        }

        if (sites.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No construction site found matching the name: '" + name + "'");
        }

        if (sites.size() > 1) {
            String matchingNames = sites.stream().map(ConstructionSite::getName).collect(Collectors.joining(", "));
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Multiple construction sites found matching the name '" + name + "': [" + matchingNames + "]. Please provide a more specific site name.");
        }

        return sites.get(0);
    }
}
