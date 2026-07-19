package com.nirmaan.attendance.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import java.time.LocalDate;
import java.util.UUID;

@Schema(description = "Request schema for creating or updating an attendance record")
public record AttendanceRequestDto(
    @NotNull(message = "Worker ID is required")
    @Schema(example = "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d", description = "ID of the worker")
    UUID workerId,

    @NotNull(message = "Site ID is required")
    @Schema(example = "f8c3d5b2-a4e6-7b8c-9d0e-1f2a3b4c5d6e", description = "ID of the construction site")
    UUID siteId,

    @NotNull(message = "Attendance date is required")
    @Schema(example = "2026-07-18", description = "Date of the attendance")
    LocalDate attendanceDate,

    @NotNull(message = "Hours worked is required")
    @Min(value = 0, message = "Hours worked must be between 0 and 24")
    @Max(value = 24, message = "Hours worked must be between 0 and 24")
    @Schema(example = "8.0", description = "Number of hours worked by the worker")
    Double hoursWorked,

    @NotNull(message = "Present status is required")
    @Schema(example = "true", description = "Whether the worker was present")
    Boolean present,

    @Size(max = 500, message = "Remarks maximum length is 500 characters")
    @Schema(example = "Completed foundation reinforcement tasks", description = "Additional remarks")
    String remarks
) {}
