package com.aiplacementcopilot.resume.download;

import java.io.File;

public interface ResumeDownloadService {

    File download(String resumeUrl);

}