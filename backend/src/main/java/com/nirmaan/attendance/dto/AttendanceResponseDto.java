package com.nirmaan.attendance.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

@Schema(description = "Response schema representing details of an attendance record")
public record AttendanceResponseDto(
    UUID id,
    UUID workerId,
    String workerName,
    UUID siteId,
    String siteName,
    LocalDate attendanceDate,
    Double hoursWorked,
    Boolean present,
    String remarks,
    Instant createdAt,
    Instant updatedAt
) {}
