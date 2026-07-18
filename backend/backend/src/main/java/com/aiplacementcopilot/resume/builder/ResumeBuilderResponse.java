package com.aiplacementcopilot.resume.builder;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResumeBuilderResponse {

    // ================= SUMMARY =================

    private String professionalSummary;

    // AI generated complete resume text
    private String generatedResume;

    // ================= SKILLS =================

    private List<String> technicalSkills;

    // ================= PROJECTS =================

    private List<Project> projects;

    // ================= CERTIFICATIONS =================

    private List<String> certifications;

    // ================= ACHIEVEMENTS =================

    private List<String> achievements;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Project {

        private String title;

        private String description;

        private String techStack;

    }

}