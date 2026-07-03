package com.aiplacementcopilot.user.dto;

import com.aiplacementcopilot.common.Role;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProfileResponse {

    private String id;

    private String fullName;

    private String email;

    private String phone;

    private String college;

    private String degree;

    private String branch;

    private Integer semester;

    private Integer graduationYear;

    private String skills;

    private String linkedinUrl;

    private String githubUrl;

    private String leetcodeUrl;

    private String codeforcesUrl;

    private String bio;

    private String photoUrl;

    private Role role;

    private boolean verified;

}