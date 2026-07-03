package com.aiplacementcopilot.interview;

import com.aiplacementcopilot.ai.GeminiService;
import com.aiplacementcopilot.ai.dto.AiRequest;
import com.aiplacementcopilot.ai.dto.AiResponse;
import com.aiplacementcopilot.ai.parser.JsonResponseParser;
import com.aiplacementcopilot.ai.prompt.InterviewPromptBuilder;
import com.aiplacementcopilot.interview.dto.InterviewRequest;
import com.aiplacementcopilot.interview.dto.InterviewResponse;
import com.aiplacementcopilot.resume.text.ResumeTextService;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InterviewServiceImpl
        implements InterviewService {

    private final ResumeTextService resumeTextService;

    private final GeminiService geminiService;

    private final JsonResponseParser jsonResponseParser;

    private final InterviewPromptBuilder interviewPromptBuilder;

    @Override
    public InterviewResponse generateQuestions(

            String email,

            InterviewRequest request

    ) {

        String resumeText =

                resumeTextService.getResumeText(

                        email

                );

        AiResponse aiResponse =

                geminiService.generate(

                        AiRequest.builder()

                                .systemPrompt("""
You are an expert AI Technical Interviewer.

Return ONLY valid JSON.

Never use markdown.

Never use ```.

""")

                                .userPrompt(

                                        interviewPromptBuilder.build(

                                                resumeText,

                                                request.getJobDescription(),

                                                request.getDifficulty(),

                                                request.getNumberOfQuestions()

                                        )

                                )

                                .build()

                );

        return jsonResponseParser.parse(

                aiResponse.getContent(),

                InterviewResponse.class

        );

    }

}