package com.aiplacementcopilot.user;

import com.aiplacementcopilot.user.dto.ProfileResponse;
import com.aiplacementcopilot.user.dto.UpdateProfileRequest;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public UserResponse me(Authentication authentication) {

        return userService.getCurrentUser(
                authentication.getName()
        );

    }

    @GetMapping("/profile")
    public ProfileResponse profile(
            Authentication authentication
    ) {

        return userService.getProfile(
                authentication.getName()
        );

    }

    @PutMapping("/profile")
    public ProfileResponse updateProfile(

            Authentication authentication,

            @Valid
            @RequestBody
            UpdateProfileRequest request

    ) {

        return userService.updateProfile(

                authentication.getName(),

                request

        );

    }

}