package com.aiplacementcopilot.resume;

import com.aiplacementcopilot.resume.dto.ResumeResponse;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface ResumeService {

    ResumeResponse getResume(String email);
    ResponseEntity<Resource> viewResume(
            String email
    );
    ResumeResponse uploadResume(

            String email,

            MultipartFile file

    );

}