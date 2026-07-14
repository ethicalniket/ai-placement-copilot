package com.aiplacementcopilot.resume.builder;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/resume-builder")
@RequiredArgsConstructor
public class ResumeBuilderController {

    private final ResumeBuilderService resumeBuilderService;

    @PostMapping("/generate")
    public ResponseEntity<ResumeBuilderResponse> generateResume(

            @Valid
            @RequestBody
            ResumeBuilderRequest request

    ) {

        ResumeBuilderResponse response =

                resumeBuilderService.generateResume(request);

        return ResponseEntity.ok(response);

    }

}