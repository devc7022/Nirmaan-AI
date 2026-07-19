package com.nirmaan.ai.service;

import com.nirmaan.attendance.dto.AttendanceResponseDto;
import com.nirmaan.ai.dto.AiAttendanceRequest;

/**
 * Service interface for processing natural-language attendance records.
 */
public interface AiAttendanceService {

    /**
     * Processes a natural language attendance statement, extracts details using LLM,
     * resolves entities, and stores the attendance record.
     *
     * @param request the request containing the natural language statement.
     * @return the created AttendanceResponseDto.
     */
    AttendanceResponseDto processNaturalLanguageAttendance(AiAttendanceRequest request);
}
