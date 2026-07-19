package com.nirmaan.dashboard.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;

@Schema(description = "Recent attendance record detail")
public record RecentAttendanceDto(
    @Schema(description = "Name of the worker")
    String workerName,

    @Schema(description = "Name of the construction site")
    String siteName,

    @Schema(description = "Date of the attendance record")
    LocalDate date,

    @Schema(description = "Hours worked on this date")
    Double hoursWorked,

    @Schema(description = "Whether the worker was present")
    Boolean present
) {}
