package com.aiplacementcopilot.interview.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InterviewRequest {

    @NotBlank(message = "Job description is required.")
    private String jobDescription;

    @Builder.Default
    private String difficulty = "MEDIUM";

    @Builder.Default
    private String interviewType = "RESUME";

    @Builder.Default
    private String language = "English";

    @Builder.Default
    private Integer numberOfQuestions = 15;

    @Min(1)
    @Max(30)
    public Integer getNumberOfQuestions() {
        return numberOfQuestions;
    }

}