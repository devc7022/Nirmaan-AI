package com.nirmaan.worker.api.dto;

import com.nirmaan.worker.domain.WorkerStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Set;
import java.util.UUID;

@Schema(description = "Response schema representing details of a worker")
public record WorkerResponse(
    UUID id,
    String name,
    String email,
    String phone,
    WorkerStatus status,
    BigDecimal hourlyRate,
    Set<String> skills,
    UUID siteId,
    String siteName,
    Instant createdAt,
    Instant updatedAt,
    String createdBy,
    String updatedBy
) {}
