package com.nirmaan.auth.service;

import com.nirmaan.auth.api.*;
import com.nirmaan.auth.domain.RefreshToken;
import com.nirmaan.auth.domain.Role;
import com.nirmaan.auth.domain.User;
import com.nirmaan.auth.repository.RefreshTokenRepository;
import com.nirmaan.auth.repository.UserRepository;
import com.nirmaan.common.config.JwtProperties;
import com.nirmaan.common.security.JwtTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.util.HexFormat;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {
    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenService jwtTokenService;
    private final JwtProperties jwtProperties;

    public RegisterResponse register(RegisterRequest request) {
        String email = request.email().trim().toLowerCase();
        if (userRepository.existsByEmailIgnoreCase(email))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email is already registered");
        User user = new User();
        user.setFullName(request.fullName().trim());
        user.setEmail(email);
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.getRoles().add(Role.CONTRACTOR);
        userRepository.save(user);
        return new RegisterResponse("User created successfully");
    }

    public TokenResponse login(LoginRequest request) {
        User user = userRepository.findByEmailIgnoreCase(request.email().trim()).orElseThrow(this::invalidCredentials);
        if (!user.isEnabled() || !passwordEncoder.matches(request.password(), user.getPasswordHash()))
            throw invalidCredentials();
        return issueTokens(user);
    }

    public TokenResponse refresh(RefreshTokenRequest request) {
        RefreshToken refreshToken = refreshTokenRepository.findByTokenHashAndRevokedFalse(hash(request.refreshToken()))
                .filter(token -> token.getExpiresAt().isAfter(Instant.now()))
                .orElseThrow(
                        () -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid or expired refresh token"));
        refreshToken.setRevoked(true);
        return issueTokens(refreshToken.getUser());
    }

    private TokenResponse issueTokens(User user) {
        Instant accessExpiry = Instant.now().plus(jwtProperties.getAccessTokenExpiration());
        Set<String> roles = user.getRoles().stream().map(Enum::name)
                .collect(java.util.stream.Collectors.toUnmodifiableSet());
        String rawRefreshToken = UUID.randomUUID() + "." + UUID.randomUUID();
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUser(user);
        refreshToken.setTokenHash(hash(rawRefreshToken));
        refreshToken.setExpiresAt(Instant.now().plus(jwtProperties.getRefreshTokenExpiration()));
        refreshTokenRepository.save(refreshToken);
        return new TokenResponse(
                jwtTokenService.createAccessToken(user.getId(), user.getEmail(), roles.stream().sorted().toList()),
                rawRefreshToken, "Bearer", accessExpiry, roles);
    }

    private ResponseStatusException invalidCredentials() {
        return new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
    }

    private String hash(String value) {
        try {
            return HexFormat.of()
                    .formatHex(MessageDigest.getInstance("SHA-256").digest(value.getBytes(StandardCharsets.UTF_8)));
        } catch (NoSuchAlgorithmException ex) {
            throw new IllegalStateException(ex);
        }
    }
}
