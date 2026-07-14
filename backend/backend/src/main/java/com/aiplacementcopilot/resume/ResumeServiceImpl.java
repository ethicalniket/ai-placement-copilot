package com.aiplacementcopilot.resume;

import com.aiplacementcopilot.cloudinary.CloudinaryService;
import com.aiplacementcopilot.cloudinary.CloudinaryUploadResult;
import com.aiplacementcopilot.resume.dto.ResumeResponse;
import com.aiplacementcopilot.user.User;
import com.aiplacementcopilot.user.UserRepository;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.net.URL;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ResumeServiceImpl implements ResumeService {

    private static final long MAX_FILE_SIZE =
            5 * 1024 * 1024;

    private final ResumeRepository resumeRepository;

    private final UserRepository userRepository;

    private final CloudinaryService cloudinaryService;

    @Override
    public ResumeResponse getResume(String email) {

        User user = userRepository

                .findByEmail(email)

                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Resume resume = resumeRepository

                .findByUser(user)

                .orElseThrow(() ->
                        new RuntimeException("Resume not found"));

        return mapToResponse(resume);

    }

    @Override
    public ResumeResponse uploadResume(

            String email,

            MultipartFile file

    ) {

        validateFile(file);

        User user = userRepository

                .findByEmail(email)

                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        resumeRepository

                .findByUser(user)

                .ifPresent(existing -> {

                    if (existing.getCloudinaryPublicId() != null
                            && !existing.getCloudinaryPublicId().isBlank()) {

                        cloudinaryService.deleteResume(

                                existing.getCloudinaryPublicId()

                        );

                    }

                    resumeRepository.delete(existing);

                });

        CloudinaryUploadResult uploadResult =

                cloudinaryService.uploadResume(file);

        Resume resume = Resume.builder()

                .user(user)

                .originalFileName(file.getOriginalFilename())

                .cloudinaryPublicId(
                        uploadResult.getPublicId()
                )

                .resumeUrl(
                        uploadResult.getSecureUrl()
                )

                .fileSize(file.getSize())

                .contentType(file.getContentType())

                .uploadStatus("UPLOADED")

                .uploadedAt(LocalDateTime.now())

                .updatedAt(LocalDateTime.now())

                .build();

        resumeRepository.save(resume);

        return mapToResponse(resume);

    }

    private void validateFile(
            MultipartFile file
    ) {

        if (file == null || file.isEmpty()) {

            throw new RuntimeException(
                    "Please select a PDF."
            );

        }

        if (file.getSize() > MAX_FILE_SIZE) {

            throw new RuntimeException(
                    "Maximum file size is 5 MB."
            );

        }

        if (!"application/pdf".equals(file.getContentType())) {

            throw new RuntimeException(
                    "Only PDF files are allowed."
            );

        }

    }

    @Override
    public ResponseEntity<Resource> viewResume(
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

        try {

            Resource resource = new UrlResource(
                    new URL(resume.getResumeUrl())
            );

            return ResponseEntity.ok()

                    .contentType(MediaType.APPLICATION_PDF)

                    .header(
                            HttpHeaders.CONTENT_DISPOSITION,
                            "inline; filename=\""
                                    + resume.getOriginalFileName()
                                    + "\""
                    )

                    .body(resource);

        } catch (Exception e) {

            throw new RuntimeException(
                    "Unable to load resume.",
                    e
            );

        }

    }

    private ResumeResponse mapToResponse(
            Resume resume
    ) {

        return ResumeResponse.builder()

                .id(resume.getId())

                .originalFileName(
                        resume.getOriginalFileName()
                )

                .resumeUrl(
                        resume.getResumeUrl()
                )

                .fileSize(
                        resume.getFileSize()
                )

                .contentType(
                        resume.getContentType()
                )

                .uploadStatus(
                        resume.getUploadStatus()
                )

                .build();

    }

}