package com.nirmaan.common.security;

import com.nirmaan.common.config.JwtProperties;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import jakarta.annotation.PostConstruct;
import java.util.UUID;

@Service @RequiredArgsConstructor
public class JwtTokenService {
    private final JwtProperties properties;
    @PostConstruct
    public void validateSecret() {
        key();
    }
    public String createAccessToken(UUID userId, String email, List<String> roles) {
        Instant now = Instant.now();
        return Jwts.builder().issuer(properties.getIssuer()).subject(email).claim("userId", userId.toString()).claim("roles", roles)
                .issuedAt(Date.from(now)).expiration(Date.from(now.plus(properties.getAccessTokenExpiration()))).signWith(key()).compact();
    }
    public Claims parseAccessToken(String token) { return Jwts.parser().verifyWith(key()).requireIssuer(properties.getIssuer()).build().parseSignedClaims(token).getPayload(); }
    public List<String> roles(Claims claims) { Object value = claims.get("roles"); return value instanceof List<?> list ? list.stream().map(Object::toString).toList() : List.of(); }
    private SecretKey key() {
        byte[] secretBytes;
        try {
            secretBytes = Base64.getDecoder().decode(properties.getSecret());
        } catch (IllegalArgumentException ignored) {
            secretBytes = properties.getSecret().getBytes(StandardCharsets.UTF_8);
        }
        if (secretBytes.length < 32) {
            throw new IllegalStateException("JWT_SECRET must be Base64-encoded to at least 32 bytes, or be a raw secret of at least 32 characters");
        }
        return Keys.hmacShaKeyFor(secretBytes);
    }
}
