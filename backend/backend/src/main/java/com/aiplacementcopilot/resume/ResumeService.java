package com.aiplacementcopilot.resume;

import com.aiplacementcopilot.resume.dto.ResumeResponse;

import org.springframework.web.multipart.MultipartFile;

public interface ResumeService {

    ResumeResponse getResume(String email);

    ResumeResponse uploadResume(

            String email,

            MultipartFile file

    );

}