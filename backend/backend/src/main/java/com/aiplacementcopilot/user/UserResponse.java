package com.aiplacementcopilot.user;

import com.aiplacementcopilot.common.Role;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserResponse {

    private String id;

    private String fullName;

    private String email;

    private Role role;

    private boolean verified;

    private String photoUrl;

}