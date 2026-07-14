package com.aiplacementcopilot.resume.builder;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResumeBuilderRequest {

    private String fullName;

    private String email;

    private String phone;

    private String address;

    private String linkedIn;

    private String github;

    private String portfolio;

    private String leetcode;

    private String codeforces;

    private String college;

    private String degree;

    private String branch;

    private String graduationYear;

    private String cgpa;

    private String skills;

    private String projects;

    private String experience;

    private String certifications;

    private String achievements;

}