package com.aiplacementcopilot.auth;

public interface AuthService {
    void logout(String refreshToken);
    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

    AuthResponse refreshToken(String refreshToken);

}