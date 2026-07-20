package com.nirmaan.site.dto;

import com.nirmaan.site.domain.ConstructionSiteStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import java.util.Set;
import java.util.UUID;

@Schema(description = "Request schema for creating or updating a construction site")
public record ConstructionSiteRequest(
    @NotBlank
    @Size(max = 100)
    @Schema(example = "Green Valley Apartments", description = "Name of the construction site")
    String name,

    @NotBlank
    @Size(max = 255)
    @Schema(example = "Sector 62, Noida, UP", description = "Site address")
    String address,

    @NotBlank
    @Size(max = 100)
    @Schema(example = "DLF Builders", description = "Name of the client")
    String clientName,

    @NotNull
    @Schema(example = "ACTIVE", description = "Current status of the site")
    ConstructionSiteStatus status,

    @Schema(description = "Set of worker IDs to assign to this site")
    Set<UUID> workerIds
) {}
