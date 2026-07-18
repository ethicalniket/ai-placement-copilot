package com.aiplacementcopilot.resume.builder;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ResumeBuilderRequest {

    // ==========================
    // PERSONAL
    // ==========================

    private String fullName;
    private String email;
    private String phone;

    private String city;
    private String state;
    private String country;

    private String linkedIn;
    private String github;
    private String portfolio;

    private String leetcode;
    private String codeforces;

    // ==========================
    // EDUCATION
    // ==========================

    private List<Education> education =
            new ArrayList<>();

    // ==========================
    // SKILLS
    // ==========================

    private List<String> programmingLanguages =
            new ArrayList<>();

    private List<String> frameworks =
            new ArrayList<>();

    private List<String> databases =
            new ArrayList<>();

    private List<String> cloud =
            new ArrayList<>();

    private List<String> devOps =
            new ArrayList<>();

    private List<String> aiTools =
            new ArrayList<>();

    private List<String> softSkills =
            new ArrayList<>();

    // ==========================
    // PROJECTS
    // ==========================

    private List<Project> projects =
            new ArrayList<>();

    // ==========================
    // EXPERIENCE
    // ==========================

    private List<Experience> experiences =
            new ArrayList<>();

    // ==========================
    // CERTIFICATIONS
    // ==========================

    private List<Certification> certifications =
            new ArrayList<>();

    // ==========================
    // ACHIEVEMENTS
    // ==========================

    private List<String> achievements =
            new ArrayList<>();

    // ==========================
    // LANGUAGES
    // ==========================

    private List<String> languages =
            new ArrayList<>();

    // =====================================================
    // NESTED CLASSES
    // =====================================================

    @Data
    public static class Education {

        private String college;
        private String degree;
        private String branch;
        private String cgpa;
        private String startYear;
        private String endYear;

    }

    @Data
    public static class Project {

        private String title;
        private String description;
        private String techStack;
        private String github;
        private String liveUrl;

    }

    @Data
    public static class Experience {

        private String company;
        private String role;
        private String duration;
        private String description;

    }

    @Data
    public static class Certification {

        private String name;
        private String issuer;
        private String year;

    }

}