package com.nirmaan.dashboard.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Top active construction site statistics")
public record TopSiteDto(
    @Schema(description = "Name of the construction site")
    String siteName,

    @Schema(description = "Count of workers present today")
    Long presentWorkerCount
) {}
