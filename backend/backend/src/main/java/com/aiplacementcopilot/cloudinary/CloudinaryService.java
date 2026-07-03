package com.aiplacementcopilot.cloudinary;

import org.springframework.web.multipart.MultipartFile;

public interface CloudinaryService {

    CloudinaryUploadResult uploadResume(
            MultipartFile file
    );

    void deleteResume(
            String publicId
    );

}