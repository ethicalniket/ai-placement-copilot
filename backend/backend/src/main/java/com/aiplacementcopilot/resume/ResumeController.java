package com.aiplacementcopilot.resume;

import com.aiplacementcopilot.resume.dto.ResumeResponse;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/resume")
@RequiredArgsConstructor
public class ResumeController {

    private final ResumeService resumeService;

    @GetMapping
    public ResumeResponse getResume(
            Authentication authentication
    ) {

        return resumeService.getResume(
                authentication.getName()
        );

    }

    @PostMapping("/upload")
    public ResumeResponse uploadResume(

            Authentication authentication,

            @RequestParam("file")
            MultipartFile file

    ) {

        return resumeService.uploadResume(

                authentication.getName(),

                file

        );

    }

}