package com.aiplacementcopilot.jobmatcher.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobMatchResponse {

    private Integer matchPercentage;

    private List<String> matchedSkills;

    private List<String> missingSkills;

    private List<String> strengths;

    private List<String> recommendations;

}