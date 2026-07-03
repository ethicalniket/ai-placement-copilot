package com.aiplacementcopilot.interview.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
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
public class InterviewRequest {

    @NotBlank
    private String jobDescription;

    @Builder.Default
    private String difficulty = "MEDIUM";

    @Min(5)
    @Max(30)
    @Builder.Default
    private Integer numberOfQuestions = 15;

}