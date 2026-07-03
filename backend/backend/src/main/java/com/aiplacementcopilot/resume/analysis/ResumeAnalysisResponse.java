package com.aiplacementcopilot.resume.analysis;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResumeAnalysisResponse {

    private Integer atsScore;

    private String summary;

    private String strengths;

    private String weaknesses;

    private String missingSkills;

    private String improvementSuggestions;

}