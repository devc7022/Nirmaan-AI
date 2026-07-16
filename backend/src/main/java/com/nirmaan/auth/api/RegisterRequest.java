package com.nirmaan.auth.api;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
@Schema(description = "Public registration request. New users receive the CONTRACTOR role.")
public record RegisterRequest(@NotBlank @Size(max = 100) @Schema(example = "Aarav Sharma") String fullName,
                              @NotBlank @Email @Size(max = 320) @Schema(example = "aarav@example.com") String email,
                              @NotBlank @Size(min = 12, max = 72) @Schema(example = "strong-password") String password) { }
