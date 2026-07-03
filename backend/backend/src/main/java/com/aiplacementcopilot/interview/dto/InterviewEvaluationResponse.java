package com.aiplacementcopilot.interview.evaluation.dto;

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
public class InterviewEvaluationResponse {

    private Integer overallScore;

    private Integer technicalScore;

    private Integer communicationScore;

    private Integer confidenceScore;

    private List<String> strengths;

    private List<String> improvements;

    private String idealAnswer;

}