package com.project.back_end.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;

import java.security.Key;
import java.util.HashMap;
import java.util.Map;

// Note: named "Service" to match the shared/general-purpose service class
// that other controllers (admin, doctor, patient) will also rely on for
// common cross-cutting checks like token validation.
@org.springframework.stereotype.Service
public class Service {

    @Value("${jwt.secret}")
    private String secretKey;

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    /**
     * Generates a signed JWT for a given identifier (username/email) and role.
     * Used by the login REST endpoints once they're built.
     */
    public String generateToken(String identifier, String role) {
        long expirationMs = 1000L * 60 * 60 * 24; // 24 hours
        return Jwts.builder()
                .setSubject(identifier)
                .claim("role", role)
                .setIssuedAt(new java.util.Date())
                .setExpiration(new java.util.Date(System.currentTimeMillis() + expirationMs))
                .signWith(getSigningKey(), io.jsonwebtoken.SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Validates a JWT token against an expected role.
     * Returns an EMPTY map if the token is valid.
     * Returns a map containing an "error" key with a message if invalid.
     */
    public Map<String, String> validateToken(String token, String expectedRole) {
        Map<String, String> result = new HashMap<>();
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            String role = claims.get("role", String.class);

            if (role == null || !role.equalsIgnoreCase(expectedRole)) {
                result.put("error", "Token role does not match required role: " + expectedRole);
            }
            // If role matches, result stays empty -> token is valid
        } catch (Exception e) {
            result.put("error", "Invalid or expired token.");
        }
        return result;
    }
}
