package com.aiplacementcopilot.career;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

public class CareerModels {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CareerRoadmapRequest {

        @NotBlank(message = "Education is required")
        private String education;

        @NotBlank(message = "Target role is required")
        private String targetRole;

        @NotBlank(message = "Target company is required")
        private String targetCompany;

        @NotBlank(message = "Experience level is required")
        private String experienceLevel;

        @Min(value = 1, message = "Timeline must be at least 1 month")
        @Max(value = 24, message = "Timeline cannot exceed 24 months")
        private Integer timeline;

        @Min(value = 1, message = "Daily study hours must be at least 1")
        @Max(value = 12, message = "Daily study hours cannot exceed 12")
        private Integer dailyStudyHours;

        @NotEmpty(message = "Current skills cannot be empty")
        private List<String> currentSkills;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CareerRoadmapResponse {

        private List<String> strengths;

        private List<String> missingSkills;

        private List<String> recommendations;

        private List<MonthRoadmap> roadmap;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MonthRoadmap {

        private Integer month;

        private String title;

        private List<String> tasks;

        private List<String> resources;

        private String outcome;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CareerHistoryResponse {

        private Long id;

        private String targetRole;

        private String targetCompany;

        private LocalDateTime createdAt;

    }
}