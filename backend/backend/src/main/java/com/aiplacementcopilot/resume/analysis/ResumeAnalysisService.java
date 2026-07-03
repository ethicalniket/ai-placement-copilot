package com.aiplacementcopilot.resume.analysis;

public interface ResumeAnalysisService {

    ResumeAnalysisResponse analyzeResume(
            String email
    );

}