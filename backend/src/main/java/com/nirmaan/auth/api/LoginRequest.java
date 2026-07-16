package com.nirmaan.auth.api;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
@Schema(description = "Credentials used to obtain an access and refresh token.")
public record LoginRequest(@NotBlank @Email @Schema(example = "aarav@example.com") String email, @NotBlank @Schema(example = "strong-password") String password) { }
