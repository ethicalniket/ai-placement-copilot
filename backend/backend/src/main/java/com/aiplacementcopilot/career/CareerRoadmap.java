package com.aiplacementcopilot.career;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "career_roadmaps")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CareerRoadmap {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String userEmail;

    @Column(nullable = false)
    private String education;

    @Column(nullable = false)
    private String targetRole;

    @Column(nullable = false)
    private String targetCompany;

    @Column(nullable = false)
    private String experienceLevel;

    @Column(nullable = false)
    private Integer timeline;

    @Column(nullable = false)
    private Integer dailyStudyHours;

    @Column(columnDefinition = "TEXT")
    private String currentSkills;

    @Column(columnDefinition = "TEXT")
    private String roadmapJson;

    @Column(nullable = false)
    private LocalDateTime createdAt;

}