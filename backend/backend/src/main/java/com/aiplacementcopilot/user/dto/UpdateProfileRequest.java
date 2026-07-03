package com.aiplacementcopilot.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateProfileRequest {

    private String fullName;

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

}