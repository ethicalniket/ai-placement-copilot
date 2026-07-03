package com.aiplacementcopilot.resume.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ResumeResponse {

    private String id;

    private String originalFileName;

    private String resumeUrl;

    private Long fileSize;

    private String contentType;

    private String uploadStatus;

}