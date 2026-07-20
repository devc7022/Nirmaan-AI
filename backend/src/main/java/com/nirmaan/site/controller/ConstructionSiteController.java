package com.nirmaan.site.controller;

import com.nirmaan.site.dto.ConstructionSiteRequest;
import com.nirmaan.site.dto.ConstructionSiteResponse;
import com.nirmaan.site.domain.ConstructionSiteStatus;
import com.nirmaan.site.service.ConstructionSiteService;
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
@RequestMapping("/api/private/construction-sites")
@RequiredArgsConstructor
@Tag(name = "Construction Sites", description = "Construction site management operations")
@SecurityRequirement(name = "bearerAuth")
public class ConstructionSiteController {

    private final ConstructionSiteService siteService;

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get paginated list of construction sites with filters", responses = {
            @ApiResponse(responseCode = "200", description = "List retrieved successfully"),
            @ApiResponse(responseCode = "401", description = "Unauthorized") })
    public Page<ConstructionSiteResponse> getSites(
            @RequestParam(required = false) @Parameter(description = "Filter by site name (partial, case-insensitive)") String name,
            @RequestParam(required = false) @Parameter(description = "Filter by status") ConstructionSiteStatus status,
            @PageableDefault(size = 20) @ParameterObject Pageable pageable) {
        return siteService.getSites(name, status, pageable);
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get construction site details by ID", responses = {
            @ApiResponse(responseCode = "200", description = "Site details found"),
            @ApiResponse(responseCode = "404", description = "Construction site not found") })
    public ConstructionSiteResponse getSiteById(@PathVariable UUID id) {
        return siteService.getSiteById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERVISOR', 'CONTRACTOR')")
    @Operation(summary = "Create a new construction site", responses = {
            @ApiResponse(responseCode = "201", description = "Construction site created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request input"),
            @ApiResponse(responseCode = "404", description = "Worker not found by ID") })
    public ConstructionSiteResponse createSite(@Valid @RequestBody ConstructionSiteRequest request) {
        return siteService.createSite(request);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERVISOR', 'CONTRACTOR')")
    @Operation(summary = "Update an existing construction site", responses = {
            @ApiResponse(responseCode = "200", description = "Construction site updated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request input"),
            @ApiResponse(responseCode = "404", description = "Construction site or worker not found"),
            @ApiResponse(responseCode = "409", description = "Construction site conflict") })
    public ConstructionSiteResponse updateSite(@PathVariable UUID id, @Valid @RequestBody ConstructionSiteRequest request) {
        return siteService.updateSite(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERVISOR', 'CONTRACTOR')")
    @Operation(summary = "Delete a construction site", responses = {
            @ApiResponse(responseCode = "204", description = "Construction site deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Construction site not found") })
    public void deleteSite(@PathVariable UUID id) {
        siteService.deleteSite(id);
    }
}
