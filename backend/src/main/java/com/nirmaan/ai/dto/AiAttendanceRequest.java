package com.nirmaan.ai.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

@Schema(description = "Request schema for natural-language attendance processing")
public record AiAttendanceRequest(
    @NotBlank(message = "Natural language text description is required")
    @Schema(example = "Ramesh worked 8 hours today at Site A", description = "The natural language attendance statement")
    String text
) {}
