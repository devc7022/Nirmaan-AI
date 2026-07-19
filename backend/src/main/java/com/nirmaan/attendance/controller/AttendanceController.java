package com.nirmaan.attendance.controller;

import com.nirmaan.attendance.dto.AttendanceRequestDto;
import com.nirmaan.attendance.dto.AttendanceResponseDto;
import com.nirmaan.attendance.service.AttendanceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/attendance")
@RequiredArgsConstructor
@Tag(name = "Attendance", description = "Attendance management operations")
@SecurityRequirement(name = "bearerAuth")
public class AttendanceController {

    private final AttendanceService attendanceService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERVISOR', 'CONTRACTOR')")
    @Operation(summary = "Create a new attendance record", responses = {
            @ApiResponse(responseCode = "201", description = "Attendance created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request input"),
            @ApiResponse(responseCode = "404", description = "Worker or Construction Site not found"),
            @ApiResponse(responseCode = "409", description = "Duplicate attendance record found") })
    public AttendanceResponseDto createAttendance(@Valid @RequestBody AttendanceRequestDto request) {
        return attendanceService.createAttendance(request);
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get attendance record by ID", responses = {
            @ApiResponse(responseCode = "200", description = "Attendance record found"),
            @ApiResponse(responseCode = "404", description = "Attendance record not found") })
    public AttendanceResponseDto getAttendanceById(@PathVariable UUID id) {
        return attendanceService.getAttendanceById(id);
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get paginated attendance list with optional filters", responses = {
            @ApiResponse(responseCode = "200", description = "List retrieved successfully"),
            @ApiResponse(responseCode = "401", description = "Unauthorized") })
    public Page<AttendanceResponseDto> getAttendanceList(
            @RequestParam(required = false) @Parameter(description = "Filter by worker ID") UUID workerId,
            @RequestParam(required = false) @Parameter(description = "Filter by construction site ID") UUID siteId,
            @RequestParam(required = false) @Parameter(description = "Filter by attendance date") LocalDate attendanceDate,
            @RequestParam(required = false) @Parameter(description = "Filter by presence status") Boolean present,
            @PageableDefault(size = 20) @ParameterObject Pageable pageable) {
        return attendanceService.getAttendanceList(workerId, siteId, attendanceDate, present, pageable);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERVISOR', 'CONTRACTOR')")
    @Operation(summary = "Update an existing attendance record", responses = {
            @ApiResponse(responseCode = "200", description = "Attendance updated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request input"),
            @ApiResponse(responseCode = "404", description = "Attendance record or Construction Site not found"),
            @ApiResponse(responseCode = "409", description = "Duplicate attendance record on updating site") })
    public AttendanceResponseDto updateAttendance(@PathVariable UUID id, @Valid @RequestBody AttendanceRequestDto request) {
        return attendanceService.updateAttendance(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERVISOR', 'CONTRACTOR')")
    @Operation(summary = "Soft delete an attendance record", responses = {
            @ApiResponse(responseCode = "204", description = "Attendance deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Attendance record not found") })
    public void deleteAttendance(@PathVariable UUID id) {
        attendanceService.deleteAttendance(id);
    }
}
