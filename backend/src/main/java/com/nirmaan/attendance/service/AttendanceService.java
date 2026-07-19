package com.nirmaan.attendance.service;

import com.nirmaan.attendance.dto.AttendanceRequestDto;
import com.nirmaan.attendance.dto.AttendanceResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.time.LocalDate;
import java.util.UUID;

public interface AttendanceService {

    AttendanceResponseDto createAttendance(AttendanceRequestDto request);

    AttendanceResponseDto updateAttendance(UUID id, AttendanceRequestDto request);

    void deleteAttendance(UUID id);

    AttendanceResponseDto getAttendanceById(UUID id);

    Page<AttendanceResponseDto> getAttendanceList(UUID workerId, UUID siteId, LocalDate attendanceDate, Boolean present, Pageable pageable);
}
