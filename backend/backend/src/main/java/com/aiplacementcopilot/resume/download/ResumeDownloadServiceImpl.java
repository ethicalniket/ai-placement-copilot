package com.aiplacementcopilot.resume.download;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.URL;

@Service
@RequiredArgsConstructor
public class ResumeDownloadServiceImpl
        implements ResumeDownloadService {

    @Override
    public File download(
            String resumeUrl
    ) {

        try {

            URL url = new URL(resumeUrl);

            InputStream inputStream = url.openStream();

            File tempFile = File.createTempFile(
                    "resume-",
                    ".pdf"
            );

            tempFile.deleteOnExit();

            try (FileOutputStream outputStream =
                         new FileOutputStream(tempFile)) {

                inputStream.transferTo(outputStream);

            }

            inputStream.close();

            return tempFile;

        } catch (Exception e) {

            throw new RuntimeException(

                    "Failed to download resume.",

                    e

            );

        }

    }

}