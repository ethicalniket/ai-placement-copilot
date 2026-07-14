package com.aiplacementcopilot.resume.builder;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResumeBuilderResponse {

    private String professionalSummary;

    private List<String> technicalSkills;

    private List<Project> projects;

    private List<String> certifications;

    private List<String> achievements;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Project {

        private String title;

        private String description;

    }

}