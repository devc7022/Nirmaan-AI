package com.nirmaan.site.dto;

import java.util.UUID;

public record ConstructionSiteWorkerDto(
    UUID id,
    String name,
    String phone
) {}
