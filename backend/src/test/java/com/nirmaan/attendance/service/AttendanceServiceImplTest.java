package com.nirmaan.attendance.service;

import com.nirmaan.attendance.dto.AttendanceRequestDto;
import com.nirmaan.attendance.dto.AttendanceResponseDto;
import com.nirmaan.attendance.entity.Attendance;
import com.nirmaan.attendance.mapper.AttendanceMapper;
import com.nirmaan.attendance.repository.AttendanceRepository;
import com.nirmaan.attendance.service.impl.AttendanceServiceImpl;
import com.nirmaan.site.domain.ConstructionSite;
import com.nirmaan.site.repository.ConstructionSiteRepository;
import com.nirmaan.worker.domain.Worker;
import com.nirmaan.worker.repository.WorkerRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;
import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AttendanceServiceImplTest {

    @Mock
    private AttendanceRepository attendanceRepository;
    @Mock
    private WorkerRepository workerRepository;
    @Mock
    private ConstructionSiteRepository siteRepository;
    @Mock
    private AttendanceMapper attendanceMapper;

    @InjectMocks
    private AttendanceServiceImpl attendanceService;

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
        worker.setName("Aarav Sharma");

        site = new ConstructionSite();
        site.setId(siteId);
        site.setName("Site Alpha");
    }

    @Test
    void createAttendance_ShouldApplyBusinessRules_WhenPresentIsFalse() {
        AttendanceRequestDto request = new AttendanceRequestDto(workerId, siteId, LocalDate.now(), 0.0, false, "Remarks");

        when(workerRepository.findById(workerId)).thenReturn(Optional.of(worker));
        when(siteRepository.findById(siteId)).thenReturn(Optional.of(site));
        when(attendanceRepository.existsByWorkerIdAndSiteIdAndAttendanceDate(any(), any(), any())).thenReturn(false);

        Attendance attendanceEntity = new Attendance();
        when(attendanceMapper.toEntity(any())).thenReturn(attendanceEntity);

        Attendance savedEntity = new Attendance();
        savedEntity.setWorker(worker);
        savedEntity.setSite(site);
        savedEntity.setPresent(false);
        savedEntity.setHoursWorked(0.0);
        when(attendanceRepository.save(any())).thenReturn(savedEntity);

        AttendanceResponseDto expectedResponse = new AttendanceResponseDto(
                UUID.randomUUID(), workerId, "Aarav Sharma", siteId, "Site Alpha",
                LocalDate.now(), 0.0, false, "Remarks", null, null
        );
        when(attendanceMapper.toResponse(any())).thenReturn(expectedResponse);

        AttendanceResponseDto response = attendanceService.createAttendance(request);

        assertNotNull(response);
        assertEquals(0.0, response.hoursWorked());
        assertFalse(response.present());
        verify(attendanceRepository).save(attendanceEntity);
        assertEquals(0.0, attendanceEntity.getHoursWorked());
        assertFalse(attendanceEntity.getPresent());
    }

    @Test
    void createAttendance_ShouldApplyBusinessRules_WhenHoursWorkedIsPositive() {
        AttendanceRequestDto request = new AttendanceRequestDto(workerId, siteId, LocalDate.now(), 5.0, false, "Remarks");

        when(workerRepository.findById(workerId)).thenReturn(Optional.of(worker));
        when(siteRepository.findById(siteId)).thenReturn(Optional.of(site));
        when(attendanceRepository.existsByWorkerIdAndSiteIdAndAttendanceDate(any(), any(), any())).thenReturn(false);

        Attendance attendanceEntity = new Attendance();
        when(attendanceMapper.toEntity(any())).thenReturn(attendanceEntity);

        Attendance savedEntity = new Attendance();
        savedEntity.setWorker(worker);
        savedEntity.setSite(site);
        savedEntity.setPresent(true);
        savedEntity.setHoursWorked(5.0);
        when(attendanceRepository.save(any())).thenReturn(savedEntity);

        AttendanceResponseDto expectedResponse = new AttendanceResponseDto(
                UUID.randomUUID(), workerId, "Aarav Sharma", siteId, "Site Alpha",
                LocalDate.now(), 5.0, true, "Remarks", null, null
        );
        when(attendanceMapper.toResponse(any())).thenReturn(expectedResponse);

        AttendanceResponseDto response = attendanceService.createAttendance(request);

        assertNotNull(response);
        assertTrue(response.present());
        assertEquals(5.0, response.hoursWorked());
        verify(attendanceRepository).save(attendanceEntity);
        assertTrue(attendanceEntity.getPresent());
        assertEquals(5.0, attendanceEntity.getHoursWorked());
    }

    @Test
    void createAttendance_ShouldThrowConflict_WhenDuplicateExists() {
        AttendanceRequestDto request = new AttendanceRequestDto(workerId, siteId, LocalDate.now(), 8.0, true, "Remarks");

        when(workerRepository.findById(workerId)).thenReturn(Optional.of(worker));
        when(siteRepository.findById(siteId)).thenReturn(Optional.of(site));
        when(attendanceRepository.existsByWorkerIdAndSiteIdAndAttendanceDate(workerId, siteId, request.attendanceDate())).thenReturn(true);

        assertThrows(ResponseStatusException.class, () -> attendanceService.createAttendance(request));
        verify(attendanceRepository, never()).save(any());
    }
}
