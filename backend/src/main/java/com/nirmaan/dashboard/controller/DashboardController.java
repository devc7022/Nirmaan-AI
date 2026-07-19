package com.nirmaan.dashboard.controller;

import com.nirmaan.dashboard.dto.DashboardResponseDto;
import com.nirmaan.dashboard.service.DashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/dashboard")
@RequiredArgsConstructor
@Tag(name = "Dashboard", description = "Operations related to retrieving dashboard statistics")
@SecurityRequirement(name = "bearerAuth")
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERVISOR', 'CONTRACTOR')")
    @Operation(
            summary = "Get consolidated dashboard statistics",
            description = "Returns aggregate stats for workers, attendance, construction sites, and labour costs in a single call.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Dashboard statistics retrieved successfully"),
                    @ApiResponse(responseCode = "401", description = "Unauthorized access"),
                    @ApiResponse(responseCode = "403", description = "Forbidden access for non-privileged roles")
            }
    )
    public DashboardResponseDto getDashboard() {
        return dashboardService.getDashboard();
    }
}
