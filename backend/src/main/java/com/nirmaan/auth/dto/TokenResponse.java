package com.nirmaan.auth.dto;

import java.time.Instant;
import java.util.Set;

public record TokenResponse(
    String accessToken, 
    String refreshToken, 
    String tokenType, 
    Instant accessTokenExpiresAt, 
    Set<String> roles
) {}
