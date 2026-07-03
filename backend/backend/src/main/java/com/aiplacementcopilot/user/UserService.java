package com.aiplacementcopilot.user;

import com.aiplacementcopilot.user.dto.ProfileResponse;
import com.aiplacementcopilot.user.dto.UpdateProfileRequest;

public interface UserService {

    UserResponse getCurrentUser(String email);

    ProfileResponse getProfile(String email);

    ProfileResponse updateProfile(
            String email,
            UpdateProfileRequest request
    );

}