package com.aiplacementcopilot.resume.extractor;

import java.io.File;

public interface PdfTextExtractor {

    String extractText(File pdfFile);

}