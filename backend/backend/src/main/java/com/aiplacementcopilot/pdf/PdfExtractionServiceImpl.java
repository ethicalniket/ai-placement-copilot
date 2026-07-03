package com.aiplacementcopilot.pdf;

import lombok.RequiredArgsConstructor;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;

import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;

@Service
@RequiredArgsConstructor
public class PdfExtractionServiceImpl
        implements PdfExtractionService {

    @Override
    public String extractText(File pdfFile) {

        try (PDDocument document =
                     Loader.loadPDF(pdfFile)) {

            PDFTextStripper stripper =
                    new PDFTextStripper();

            return stripper.getText(document);

        } catch (IOException e) {

            throw new RuntimeException(

                    "Unable to extract PDF text.",

                    e

            );

        }

    }

}