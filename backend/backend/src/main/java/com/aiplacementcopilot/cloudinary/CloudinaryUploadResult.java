package com.aiplacementcopilot.cloudinary;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CloudinaryUploadResult {

    private String publicId;

    private String secureUrl;

}