package com.aiplacementcopilot.jobmatcher.dto;

import jakarta.validation.constraints.NotBlank;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobMatchRequest {

    @NotBlank
    private String jobDescription;

}