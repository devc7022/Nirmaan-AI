package com.nirmaan.dashboard.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Construction site statistics")
public record SiteStatisticsDto(
    @Schema(description = "Total number of construction sites")
    Long totalSites,

    @Schema(description = "Total number of active construction sites")
    Long activeSites,

    @Schema(description = "Total number of completed construction sites")
    Long completedSites
) {}
