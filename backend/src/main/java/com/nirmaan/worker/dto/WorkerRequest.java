package com.nirmaan.worker.dto;

import com.nirmaan.worker.domain.WorkerStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.util.Set;
import java.util.UUID;

@Schema(description = "Request schema for creating or updating a worker")
public record WorkerRequest(
        @NotBlank @Size(max = 100) @Schema(example = "Aarav Sharma", description = "Full name of the worker") String name,

        @Email @Size(max = 320) @Schema(example = "aarav.worker@example.com", description = "Email address (must be unique if provided)") String email,

        @NotBlank @Size(max = 20) @Schema(example = "+919876543210", description = "Phone number of the worker") String phone,

        @NotNull @Schema(example = "ACTIVE", description = "Status of the worker") WorkerStatus status,

        @NotNull @Positive @Schema(example = "250.00", description = "Hourly rate of the worker in INR") BigDecimal hourlyRate,

        @NotEmpty @Schema(example = "[\"Plumbing\", \"Masonry\"]", description = "Set of skills possessed by the worker") Set<@NotBlank @Size(max = 50) String> skills,

        @Schema(example = "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d", description = "ID of the assigned construction site") UUID siteId) {
}
