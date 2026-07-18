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
import org.springframework.util.StringUtils;
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
                resumeTextService.getResumeText(email);

        if (!StringUtils.hasText(resumeText)) {

            throw new IllegalStateException(
                    "No resume found. Please upload a resume before starting an interview."
            );

        }

        AiResponse aiResponse =

                geminiService.generate(

                        AiRequest.builder()

                                .systemPrompt("""
You are a Senior Technical Interviewer.

Always return ONLY valid JSON.

Never return markdown.

Never use ```.

Never hallucinate.

Never invent resume details.

Generate interview questions only from the candidate's resume and the supplied job description.
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

        if (aiResponse == null ||
                !StringUtils.hasText(aiResponse.getContent())) {

            throw new IllegalStateException(
                    "AI failed to generate interview questions."
            );

        }

        InterviewResponse response =
                jsonResponseParser.parse(
                        aiResponse.getContent(),
                        InterviewResponse.class
                );

        if (response == null) {

            throw new IllegalStateException(
                    "Unable to parse AI interview response."
            );

        }

        return response;

    }

}