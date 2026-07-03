package com.aiplacementcopilot.interview.evaluation;

import com.aiplacementcopilot.ai.GeminiService;
import com.aiplacementcopilot.ai.dto.AiRequest;
import com.aiplacementcopilot.ai.dto.AiResponse;
import com.aiplacementcopilot.ai.parser.JsonResponseParser;
import com.aiplacementcopilot.ai.prompt.InterviewEvaluationPromptBuilder;
import com.aiplacementcopilot.interview.evaluation.dto.InterviewEvaluationRequest;
import com.aiplacementcopilot.interview.evaluation.dto.InterviewEvaluationResponse;
import com.aiplacementcopilot.resume.text.ResumeTextService;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InterviewEvaluationServiceImpl
        implements InterviewEvaluationService {

    private final ResumeTextService resumeTextService;

    private final GeminiService geminiService;

    private final JsonResponseParser jsonResponseParser;

    private final InterviewEvaluationPromptBuilder interviewEvaluationPromptBuilder;

    @Override
    public InterviewEvaluationResponse evaluate(

            String email,

            InterviewEvaluationRequest request

    ) {

        String resumeText =

                resumeTextService.getResumeText(

                        email

                );

        String prompt =

                interviewEvaluationPromptBuilder.build(

                        resumeText,

                        request.getJobDescription(),

                        request.getQuestion(),

                        request.getCandidateAnswer(),

                        request.getDifficulty()

                );

        AiResponse aiResponse =

                geminiService.generate(

                        AiRequest.builder()

                                .systemPrompt("""

You are an expert AI Interview Evaluator.

Return ONLY valid JSON.

Never use markdown.

Never use ```.

Follow the required JSON schema exactly.

""")

                                .userPrompt(

                                        prompt

                                )

                                .build()

                );

        return jsonResponseParser.parse(

                aiResponse.getContent(),

                InterviewEvaluationResponse.class

        );

    }

}