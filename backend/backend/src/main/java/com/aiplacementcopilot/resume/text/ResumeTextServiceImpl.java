package com.aiplacementcopilot.resume.text;

import com.aiplacementcopilot.resume.Resume;
import com.aiplacementcopilot.resume.ResumeRepository;
import com.aiplacementcopilot.resume.download.ResumeDownloadService;
import com.aiplacementcopilot.resume.extractor.PdfTextExtractor;
import com.aiplacementcopilot.user.User;
import com.aiplacementcopilot.user.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.io.File;

@Service
@RequiredArgsConstructor
public class ResumeTextServiceImpl
        implements ResumeTextService {

    private final UserRepository userRepository;

    private final ResumeRepository resumeRepository;

    private final ResumeDownloadService resumeDownloadService;

    private final PdfTextExtractor pdfTextExtractor;

    @Override
    public String getResumeText(
            String email
    ) {

        User user = userRepository

                .findByEmail(email)

                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Resume resume = resumeRepository

                .findByUser(user)

                .orElseThrow(() ->
                        new RuntimeException("Resume not found"));

        File pdfFile =

                resumeDownloadService.download(
                        resume.getResumeUrl()
                );

        return pdfTextExtractor.extractText(
                pdfFile
        );

    }

}