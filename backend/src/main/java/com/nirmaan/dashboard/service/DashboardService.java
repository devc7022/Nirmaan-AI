package com.nirmaan.dashboard.service;

import com.nirmaan.dashboard.dto.DashboardResponseDto;

/**
 * Service interface for aggregating and retrieving Dashboard statistics.
 */
public interface DashboardService {
    
    /**
     * Aggregates statistics for the dashboard.
     *
     * @return a DashboardResponseDto containing workers, site, attendance, and labour cost statistics.
     */
    DashboardResponseDto getDashboard();
}
