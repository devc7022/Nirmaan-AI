package com.nirmaan.ai.controller;

import com.nirmaan.ai.dto.AiAttendanceRequest;
import com.nirmaan.ai.service.AiAttendanceService;
import com.nirmaan.attendance.dto.AttendanceResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/private/attendance/ai")
@RequiredArgsConstructor
@Tag(name = "AI Attendance", description = "AI-powered attendance processing operations")
@SecurityRequirement(name = "bearerAuth")
public class AiAttendanceController {

    private final AiAttendanceService aiAttendanceService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERVISOR', 'CONTRACTOR')")
    @Operation(
            summary = "Process natural-language attendance text statement",
            description = "Extracts structured attendance details from natural language, resolves worker and site, validates constraints, and stores the record.",
            responses = {
                    @ApiResponse(responseCode = "201", description = "Attendance record processed and created successfully"),
                    @ApiResponse(responseCode = "400", description = "Invalid text input, unresolved worker/site, or multiple matches found"),
                    @ApiResponse(responseCode = "409", description = "Conflict: Attendance record already exists for the resolved worker, site, and date"),
                    @ApiResponse(responseCode = "500", description = "AI completions service communication or parsing failure")
            }
    )
    public AttendanceResponseDto processAiAttendance(@Valid @RequestBody AiAttendanceRequest request) {
        return aiAttendanceService.processNaturalLanguageAttendance(request);
    }
}
