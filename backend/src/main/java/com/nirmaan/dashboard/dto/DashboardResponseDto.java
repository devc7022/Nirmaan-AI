package com.nirmaan.dashboard.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import java.util.Map;

@Schema(description = "Consolidated dashboard statistics response")
public record DashboardResponseDto(
    @Schema(description = "Worker count statistics")
    WorkerStatisticsDto workerStatistics,

    @Schema(description = "Today's attendance statistics")
    AttendanceStatisticsDto attendanceStatistics,

    @Schema(description = "Construction site statistics")
    SiteStatisticsDto siteStatistics,

    @Schema(description = "Labour cost and work duration statistics")
    LabourStatisticsDto labourStatistics,

    @Schema(description = "Latest 10 attendance records")
    List<RecentAttendanceDto> recentAttendance,

    @Schema(description = "Top 5 construction sites ranked by today's present worker count")
    List<TopSiteDto> topSites,

    @Schema(description = "Distribution of workers grouped by skills")
    Map<String, Long> skillDistribution
) {}
