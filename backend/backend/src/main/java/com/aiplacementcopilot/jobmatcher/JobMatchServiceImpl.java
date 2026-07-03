package com.aiplacementcopilot.jobmatcher;
import com.aiplacementcopilot.ai.GeminiService;
import com.aiplacementcopilot.ai.dto.AiRequest;
import com.aiplacementcopilot.ai.dto.AiResponse;
import com.aiplacementcopilot.resume.text.ResumeTextService;
import com.aiplacementcopilot.ai.prompt.JobMatchPromptBuilder;
import com.aiplacementcopilot.jobmatcher.dto.JobMatchRequest;
import com.aiplacementcopilot.jobmatcher.dto.JobMatchResponse;
import com.aiplacementcopilot.ai.parser.JsonResponseParser;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JobMatchServiceImpl
        implements JobMatchService {

    private final JobMatchPromptBuilder jobMatchPromptBuilder;
    private final ResumeTextService resumeTextService;
    private final GeminiService geminiService;
    private final JsonResponseParser jsonResponseParser;

    @Override
    public JobMatchResponse matchJob(

            String email,

            JobMatchRequest request

    ) {

        String resumeText =
                resumeTextService.getResumeText(email);
        AiResponse aiResponse =

                geminiService.generate(

                        AiRequest.builder()

                                .systemPrompt("""
                                        You are an ATS Job Matching AI.

                                        Return ONLY valid JSON.

                                        Never use markdown.

                                        Never use ```.

                                        """)

                                .userPrompt(
                                        jobMatchPromptBuilder.build(
                                                resumeText,
                                                request.getJobDescription()
                                        )
                                )

                                .build()

                );

        return jsonResponseParser.parse(
                aiResponse.getContent(),
                JobMatchResponse.class
        );
    }


}