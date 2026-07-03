package com.aiplacementcopilot.interview.dto;

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
public class InterviewResponse {

    private List<String> technicalQuestions;

    private List<String> hrQuestions;

    private List<String> projectQuestions;

    private List<String> followUpQuestions;

}