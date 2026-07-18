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

    // ==========================
    // OVERALL
    // ==========================

    private Integer overallScore;

    private Integer technicalScore;

    private Integer communicationScore;

    private Integer confidenceScore;

    // ==========================
    // NEW SCORES
    // ==========================

    private Integer problemSolvingScore;

    private Integer grammarScore;

    // ==========================
    // FEEDBACK
    // ==========================

    private List<String> strengths;

    private List<String> improvements;

    private List<String> mistakes;

    // ==========================
    // ANSWERS
    // ==========================

    private String idealAnswer;

    private String feedback;

    // ==========================
    // INTERVIEW
    // ==========================

    private String recommendation;

    private String overallFeedback;

    // ==========================
// FINAL INTERVIEW REPORT
// ==========================

    @Builder.Default
    private Boolean interviewCompleted = false;

    private FinalInterviewReport finalReport;

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class FinalInterviewReport {

        private Integer overallInterviewScore;

        private Integer technicalAverage;

        private Integer communicationAverage;

        private Integer confidenceAverage;

        private Integer problemSolvingAverage;

        private Integer grammarAverage;

        private String hiringRecommendation;

        private List<String> overallStrengths;

        private List<String> overallWeaknesses;

        private List<String> nextSteps;

        private String finalFeedback;

    }
}