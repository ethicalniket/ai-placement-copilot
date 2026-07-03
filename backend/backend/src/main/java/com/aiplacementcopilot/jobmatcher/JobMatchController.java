package com.aiplacementcopilot.jobmatcher;

import com.aiplacementcopilot.jobmatcher.dto.JobMatchRequest;
import com.aiplacementcopilot.jobmatcher.dto.JobMatchResponse;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/job-match")
@RequiredArgsConstructor
public class JobMatchController {

    private final JobMatchService jobMatchService;

    @PostMapping
    public ResponseEntity<JobMatchResponse> match(

            Authentication authentication,

            @Valid
            @RequestBody
            JobMatchRequest request

    ) {

        JobMatchResponse response =

                jobMatchService.matchJob(

                        authentication.getName(),

                        request

                );

        return ResponseEntity.ok(response);

    }

}