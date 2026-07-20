package com.nirmaan.site.dto;

import com.nirmaan.site.domain.ConstructionSiteStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Schema(description = "Response schema representing details of a construction site")
public record ConstructionSiteResponse(
    UUID id,
    String name,
    String address,
    String clientName,
    ConstructionSiteStatus status,
    List<ConstructionSiteWorkerDto> workers,
    Instant createdAt,
    Instant updatedAt,
    String createdBy,
    String updatedBy
) {}
