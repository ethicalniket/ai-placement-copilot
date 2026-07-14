package com.aiplacementcopilot.resume.analysis;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResumeAnalysisAiResponse {

    private Integer atsScore;

    private String summary;

    private Object strengths;

    private Object weaknesses;

    private Object missingSkills;

    private Object improvementSuggestions;

}