package com.aiplacementcopilot.resume.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ResumeUploadResponse {

    private String message;

    private String resumeUrl;

}