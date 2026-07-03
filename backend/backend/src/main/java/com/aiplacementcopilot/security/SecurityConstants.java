package com.aiplacementcopilot.security;

public final class SecurityConstants {

    private SecurityConstants() {
    }

    public static final String[] PUBLIC_URLS = {

            "/api/auth/**",

            "/v3/api-docs/**",

            "/swagger-ui/**",

            "/swagger-ui.html"

    };

}