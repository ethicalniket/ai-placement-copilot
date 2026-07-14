package com.aiplacementcopilot.resume.analysis;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResumeAnalysisResponse {

    private Integer atsScore;

    private String summary;

    private List<String> strengths;

    private List<String> weaknesses;

    private List<String> missingSkills;

    private List<String> improvementSuggestions;

}