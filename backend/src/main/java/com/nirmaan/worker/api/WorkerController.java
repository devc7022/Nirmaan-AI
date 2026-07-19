package com.nirmaan.worker.api;

import com.nirmaan.worker.api.dto.WorkerRequest;
import com.nirmaan.worker.api.dto.WorkerResponse;
import com.nirmaan.worker.domain.WorkerStatus;
import com.nirmaan.worker.service.WorkerService;
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
import java.util.UUID;

@RestController
@RequestMapping("/api/private/workers")
@RequiredArgsConstructor
@Tag(name = "Workers", description = "Worker management operations")
@SecurityRequirement(name = "bearerAuth")
public class WorkerController {

    private final WorkerService workerService;

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get paginated list of workers with filters", responses = {
            @ApiResponse(responseCode = "200", description = "List retrieved successfully"),
            @ApiResponse(responseCode = "401", description = "Unauthorized") })
    public Page<WorkerResponse> getWorkers(
            @RequestParam(required = false) @Parameter(description = "Filter by worker name (partial, case-insensitive)") String name,
            @RequestParam(required = false) @Parameter(description = "Filter by skill name (partial, case-insensitive)") String skill,
            @RequestParam(required = false) @Parameter(description = "Filter by status") WorkerStatus status,
            @PageableDefault(size = 20) @ParameterObject Pageable pageable) {
        return workerService.getWorkers(name, skill, status, pageable);
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get worker details by ID", responses = {
            @ApiResponse(responseCode = "200", description = "Worker details found"),
            @ApiResponse(responseCode = "404", description = "Worker not found") })
    public WorkerResponse getWorkerById(@PathVariable UUID id) {
        return workerService.getWorkerById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERVISOR', 'CONTRACTOR')")
    @Operation(summary = "Create a new worker", responses = {
            @ApiResponse(responseCode = "201", description = "Worker created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request input"),
            @ApiResponse(responseCode = "409", description = "Email already registered for another worker") })
    public WorkerResponse createWorker(@Valid @RequestBody WorkerRequest request) {
        return workerService.createWorker(request);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERVISOR', 'CONTRACTOR')")
    @Operation(summary = "Update an existing worker", responses = {
            @ApiResponse(responseCode = "200", description = "Worker updated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request input"),
            @ApiResponse(responseCode = "404", description = "Worker not found"),
            @ApiResponse(responseCode = "409", description = "Email already registered for another worker") })
    public WorkerResponse updateWorker(@PathVariable UUID id, @Valid @RequestBody WorkerRequest request) {
        return workerService.updateWorker(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERVISOR', 'CONTRACTOR')")
    @Operation(summary = "Delete a worker", responses = {
            @ApiResponse(responseCode = "204", description = "Worker deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Worker not found") })
    public void deleteWorker(@PathVariable UUID id) {
        workerService.deleteWorker(id);
    }
}
