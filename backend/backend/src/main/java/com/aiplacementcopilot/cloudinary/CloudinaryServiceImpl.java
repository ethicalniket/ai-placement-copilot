package com.aiplacementcopilot.cloudinary;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryServiceImpl implements CloudinaryService {

    private final Cloudinary cloudinary;

    @Override
    public CloudinaryUploadResult uploadResume(
            MultipartFile file
    ) {

        try {

            @SuppressWarnings("unchecked")
            Map<String, Object> result =

                    cloudinary.uploader().upload(

                            file.getBytes(),

                            ObjectUtils.asMap(

                                    "folder",
                                    "ai-placement-copilot/resumes",

                                    "resource_type",
                                    "raw",

                                    "use_filename",
                                    true,

                                    "unique_filename",
                                    true

                            )

                    );

            String publicId =

                    (String) result.get("public_id");

            String secureUrl =

                    (String) result.get("secure_url");

            return new CloudinaryUploadResult(

                    publicId,

                    secureUrl

            );

        } catch (IOException e) {

            throw new RuntimeException(

                    "Failed to upload resume to Cloudinary.",

                    e

            );

        }

    }

    @Override
    public void deleteResume(
            String publicId
    ) {

        if (publicId == null || publicId.isBlank()) {
            return;
        }

        try {

            cloudinary.uploader().destroy(

                    publicId,

                    ObjectUtils.asMap(

                            "resource_type",
                            "raw"

                    )

            );

        } catch (IOException e) {

            throw new RuntimeException(

                    "Failed to delete resume from Cloudinary.",

                    e

            );

        }

    }

}