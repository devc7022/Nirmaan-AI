package com.nirmaan.dashboard.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Today's attendance statistics")
public record AttendanceStatisticsDto(
    @Schema(description = "Number of workers present today")
    Long presentToday,

    @Schema(description = "Number of workers absent today")
    Long absentToday,

    @Schema(description = "Attendance percentage for today")
    Double attendancePercentage
) {}
