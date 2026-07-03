package com.aiplacementcopilot.resume.analysis;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/resume")
@RequiredArgsConstructor
public class ResumeAnalysisController {

    private final ResumeAnalysisService resumeAnalysisService;

    @GetMapping("/analyze")
    public ResponseEntity<ResumeAnalysisResponse> analyze(
            Authentication authentication
    ) {

        ResumeAnalysisResponse response =
                resumeAnalysisService.analyzeResume(
                        authentication.getName()
                );

        return ResponseEntity.ok(response);

    }

}