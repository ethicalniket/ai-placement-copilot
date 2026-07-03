package com.aiplacementcopilot.auth;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public AuthResponse register(

            @Valid

            @RequestBody

            RegisterRequest request

    ) {

        return authService.register(request);

    }

    @PostMapping("/login")
    public AuthResponse login(

            @Valid

            @RequestBody

            LoginRequest request

    ) {

        return authService.login(request);

    }
    @PostMapping("/refresh")
    public AuthResponse refresh(

            @RequestParam String token

    ) {

        return authService.refreshToken(token);

    }
    @PostMapping("/logout")
    public void logout(

            @RequestParam String token

    ) {

        authService.logout(token);

    }

}