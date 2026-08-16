package com.nirmaan.contractor.controller;

import com.nirmaan.contractor.dto.ContractorQueryRequest;
import com.nirmaan.contractor.dto.ContractorQueryResponse;
import com.nirmaan.contractor.service.ContractorQueryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@Tag(name = "Contractor Queries", description = "Contractor Requirement and Query Submission APIs")
public class ContractorQueryController {

    private final ContractorQueryService service;

    @PostMapping({"/api/contractor-queries", "/api/public/contractor-queries"})
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Submit a contractor requirement query", responses = {
            @ApiResponse(responseCode = "201", description = "Requirement submitted successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid form submission payload")
    })
    public ContractorQueryResponse submitQuery(@Valid @RequestBody ContractorQueryRequest request) {
        return service.submitContractorQuery(request);
    }

    @GetMapping("/api/private/contractor-queries")
    @Operation(summary = "Get all contractor requirement queries (Admin)")
    public List<ContractorQueryResponse> getAllQueries() {
        return service.getAllContractorQueries();
    }

    @GetMapping("/api/private/contractor-queries/{id}")
    @Operation(summary = "Get contractor query details by ID")
    public ContractorQueryResponse getQueryById(@PathVariable UUID id) {
        return service.getContractorQueryById(id);
    }
}
