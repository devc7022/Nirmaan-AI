package com.nirmaan.dashboard.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Worker counts and statistics")
public record WorkerStatisticsDto(
    @Schema(description = "Total number of workers in the system")
    Long totalWorkers,

    @Schema(description = "Total number of active workers")
    Long activeWorkers,

    @Schema(description = "Total number of inactive workers")
    Long inactiveWorkers
) {}
