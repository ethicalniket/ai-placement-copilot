package com.aiplacementcopilot.resume.analysis;

import com.aiplacementcopilot.ai.GeminiService;
import com.aiplacementcopilot.ai.dto.AiRequest;
import com.aiplacementcopilot.ai.dto.AiResponse;
import com.aiplacementcopilot.resume.text.ResumeTextService;
import com.aiplacementcopilot.ai.prompt.ResumeAnalysisPromptBuilder;
import lombok.RequiredArgsConstructor;
import com.aiplacementcopilot.ai.parser.JsonResponseParser;
import org.springframework.stereotype.Service;
import com.aiplacementcopilot.resume.analysis.ResumeAnalysisMapper;
import com.aiplacementcopilot.resume.analysis.ResumeAnalysisAiResponse;
@Service
@RequiredArgsConstructor
public class ResumeAnalysisServiceImpl
        implements ResumeAnalysisService {

    private final ResumeTextService resumeTextService;
    private final GeminiService geminiService;
    private final ResumeAnalysisPromptBuilder resumeAnalysisPromptBuilder;
    private final ResumeAnalysisMapper resumeAnalysisMapper;
    private final JsonResponseParser jsonResponseParser;
    @Override
    public ResumeAnalysisResponse analyzeResume(
            String email
    ) {

        String resumeText =
                resumeTextService.getResumeText(email);
        AiResponse aiResponse =

                geminiService.generate(

                        AiRequest.builder()

                                .systemPrompt("""
You are an ATS Resume Analyzer.

Return ONLY valid JSON.

Never use markdown.

Never use ```.

""")

                                .userPrompt(
                                        resumeAnalysisPromptBuilder.build(
                                                resumeText
                                        )
                                )

                                .build()

                );

        ResumeAnalysisAiResponse raw =

                jsonResponseParser.parse(

                        aiResponse.getContent(),

                        ResumeAnalysisAiResponse.class

                );

        return resumeAnalysisMapper.map(raw);
    }

}