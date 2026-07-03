package com.aiplacementcopilot.dev;

import com.aiplacementcopilot.auth.RefreshTokenRepository;
import com.aiplacementcopilot.user.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.context.annotation.Profile;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/dev")
@RequiredArgsConstructor
@Profile("dev")
public class DevController {

    private final UserRepository userRepository;

    private final RefreshTokenRepository refreshTokenRepository;

    @PostMapping("/reset")
    public ResponseEntity<?> resetDatabase() {

        refreshTokenRepository.deleteAll();

        userRepository.deleteAll();

        return ResponseEntity.ok(

                Map.of(

                        "message",

                        "Development database reset successfully."

                )

        );

    }

}