package com.nirmaan.dashboard.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.math.BigDecimal;

@Schema(description = "Labour cost and working hours statistics")
public record LabourStatisticsDto(
    @Schema(description = "Total labour cost incurred today")
    BigDecimal todayLabourCost,

    @Schema(description = "Total labour cost incurred in the last 7 days")
    BigDecimal weeklyLabourCost,

    @Schema(description = "Total labour cost incurred in the current month")
    BigDecimal monthlyLabourCost,

    @Schema(description = "Average hours worked per worker today")
    Double averageHoursWorkedToday
) {}
