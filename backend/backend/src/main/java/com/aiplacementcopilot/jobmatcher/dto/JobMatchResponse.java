package com.aiplacementcopilot.jobmatcher.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobMatchResponse {

    private Integer matchPercentage;

    private String matchedSkills;

    private String missingSkills;

    private String strengths;

    private String recommendations;

}