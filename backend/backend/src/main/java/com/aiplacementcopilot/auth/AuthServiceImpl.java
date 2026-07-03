package com.aiplacementcopilot.auth;

import com.aiplacementcopilot.common.Role;
import com.aiplacementcopilot.security.JwtService;
import com.aiplacementcopilot.user.User;
import com.aiplacementcopilot.user.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    private final RefreshTokenRepository refreshTokenRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    @Override
    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {

            throw new RuntimeException(
                    "Email already registered."
            );

        }

        User user = User.builder()

                .fullName(request.getFullName())

                .email(request.getEmail())

                .password(
                        passwordEncoder.encode(
                                request.getPassword()
                        )
                )

                .role(Role.STUDENT)

                .verified(false)

                .createdAt(LocalDateTime.now())

                .updatedAt(LocalDateTime.now())

                .build();

        userRepository.save(user);

        String accessToken =
                jwtService.generateToken(
                        user.getEmail()
                );

        String refreshValue =
                UUID.randomUUID().toString();

        RefreshToken refreshToken =

                RefreshToken.builder()

                        .token(refreshValue)

                        .user(user)

                        .expiryDate(
                                LocalDateTime.now()
                                        .plusDays(7)
                        )

                        .revoked(false)

                        .build();

        refreshTokenRepository.save(refreshToken);

        return AuthResponse.builder()

                .accessToken(accessToken)

                .refreshToken(refreshValue)

                .fullName(user.getFullName())

                .email(user.getEmail())

                .message("Registration successful")

                .build();

    }

    @Override
    public AuthResponse login(LoginRequest request) {

        authenticationManager.authenticate(

                new UsernamePasswordAuthenticationToken(

                        request.getEmail(),

                        request.getPassword()

                )

        );

        User user = userRepository

                .findByEmail(request.getEmail())

                .orElseThrow(() ->

                        new RuntimeException(

                                "User not found."

                        )

                );

        refreshTokenRepository

                .findAllByUser(user)
                .forEach(token -> {

                    token.setRevoked(true);

                    refreshTokenRepository.save(token);

                });

        String accessToken =
                jwtService.generateToken(
                        user.getEmail()
                );

        String refreshValue =
                UUID.randomUUID().toString();

        RefreshToken refreshToken =

                RefreshToken.builder()

                        .token(refreshValue)

                        .user(user)

                        .expiryDate(

                                LocalDateTime.now()

                                        .plusDays(7)

                        )

                        .revoked(false)

                        .build();

        refreshTokenRepository.save(refreshToken);

        return AuthResponse.builder()

                .accessToken(accessToken)

                .refreshToken(refreshValue)

                .fullName(user.getFullName())

                .email(user.getEmail())

                .message("Login successful")

                .build();

    }
    @Override
    public void logout(String token) {

        RefreshToken refreshToken =

                refreshTokenRepository

                        .findByToken(token)

                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Invalid Refresh Token"
                                ));

        refreshToken.setRevoked(true);

        refreshTokenRepository.save(refreshToken);

    }
    @Override
    public AuthResponse refreshToken(String token) {

        RefreshToken refreshToken =

                refreshTokenRepository

                        .findByToken(token)

                        .orElseThrow(() ->

                                new RuntimeException(

                                        "Invalid Refresh Token."

                                )

                        );

        if (refreshToken.isRevoked()) {

            throw new RuntimeException(

                    "Refresh Token Revoked."

            );

        }

        if (refreshToken.getExpiryDate()

                .isBefore(LocalDateTime.now())) {

            throw new RuntimeException(

                    "Refresh Token Expired."

            );

        }

        String accessToken =

                jwtService.generateToken(

                        refreshToken

                                .getUser()

                                .getEmail()

                );

        return AuthResponse.builder()

                .accessToken(accessToken)

                .refreshToken(refreshToken.getToken())

                .fullName(

                        refreshToken

                                .getUser()

                                .getFullName()

                )

                .email(

                        refreshToken

                                .getUser()

                                .getEmail()

                )

                .message("Token Refreshed")

                .build();

    }

}