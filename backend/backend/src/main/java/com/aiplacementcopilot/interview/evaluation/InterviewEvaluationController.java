package com.aiplacementcopilot.interview.evaluation;

import com.aiplacementcopilot.interview.evaluation.dto.InterviewEvaluationRequest;
import com.aiplacementcopilot.interview.evaluation.dto.InterviewEvaluationResponse;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/interview")
@RequiredArgsConstructor
public class InterviewEvaluationController {

    private final InterviewEvaluationService interviewEvaluationService;

    @PostMapping("/evaluate")
    public ResponseEntity<InterviewEvaluationResponse> evaluate(

            Authentication authentication,

            @Valid
            @RequestBody
            InterviewEvaluationRequest request

    ) {

        InterviewEvaluationResponse response =

                interviewEvaluationService.evaluate(

                        authentication.getName(),

                        request

                );

        return ResponseEntity.ok(

                response

        );

    }

}