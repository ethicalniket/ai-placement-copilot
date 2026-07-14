package com.aiplacementcopilot.resume.builder;

import com.aiplacementcopilot.ai.GeminiService;
import com.aiplacementcopilot.ai.dto.AiRequest;
import com.aiplacementcopilot.ai.dto.AiResponse;
import com.aiplacementcopilot.ai.parser.JsonResponseParser;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ResumeBuilderService {

    private final GeminiService geminiService;

    private final ResumeBuilderPromptBuilder promptBuilder;

    private final JsonResponseParser jsonResponseParser;

    public ResumeBuilderResponse generateResume(
            ResumeBuilderRequest request
    ) {

        AiResponse aiResponse =

                geminiService.generate(

                        AiRequest.builder()

                                .systemPrompt("""
                                        You are an Expert ATS Resume Builder.

                                        Return ONLY valid JSON.

                                        Never use markdown.

                                        Never use ```.

                                        """)

                                .userPrompt(
                                        promptBuilder.build(request)
                                )

                                .build()

                );

        return jsonResponseParser.parse(

                aiResponse.getContent(),

                ResumeBuilderResponse.class

        );

    }

}