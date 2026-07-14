package com.aiplacementcopilot.resume.analysis;

import com.aiplacementcopilot.resume.Resume;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ResumeAnalysisRepository
        extends JpaRepository<ResumeAnalysis, String> {

    Optional<ResumeAnalysis> findByResume(
            Resume resume
    );

}