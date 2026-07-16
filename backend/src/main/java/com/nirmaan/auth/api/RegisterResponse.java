package com.nirmaan.auth.api;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Response returned upon successful user registration")
public record RegisterResponse(@Schema(example = "User created successfully") String message) { }
