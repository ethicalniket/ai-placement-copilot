package com.aiplacementcopilot.resume.extractor;

import lombok.RequiredArgsConstructor;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
@RequiredArgsConstructor
public class PdfTextExtractorImpl
        implements PdfTextExtractor {

    @Override
    public String extractText(
            File pdfFile
    ) {

        try (

                PDDocument document =
                        Loader.loadPDF(pdfFile)

        ) {

            PDFTextStripper stripper =
                    new PDFTextStripper();

            return stripper.getText(document);

        } catch (Exception e) {

            throw new RuntimeException(

                    "Failed to extract text from PDF.",

                    e

            );

        }

    }

}