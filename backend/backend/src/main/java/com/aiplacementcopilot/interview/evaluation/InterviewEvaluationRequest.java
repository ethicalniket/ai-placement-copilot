package com.aiplacementcopilot.interview.evaluation.dto;

import jakarta.validation.constraints.NotBlank;

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
public class InterviewEvaluationRequest {

    @NotBlank
    private String question;

    @NotBlank
    private String candidateAnswer;

    @NotBlank
    private String jobDescription;

    @Builder.Default
    private String difficulty = "MEDIUM";

}