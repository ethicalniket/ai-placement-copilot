package com.aiplacementcopilot.interview;

import com.aiplacementcopilot.interview.dto.InterviewRequest;
import com.aiplacementcopilot.interview.dto.InterviewResponse;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/interview")
@RequiredArgsConstructor
public class InterviewController {

    private final InterviewService interviewService;

    @PostMapping("/questions")
    public ResponseEntity<InterviewResponse> generateQuestions(

            Authentication authentication,

            @Valid
            @RequestBody
            InterviewRequest request

    ) {

        InterviewResponse response =

                interviewService.generateQuestions(

                        authentication.getName(),

                        request

                );

        return ResponseEntity.ok(response);

    }

}