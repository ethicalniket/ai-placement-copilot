package com.aiplacementcopilot.interview.evaluation;

import com.aiplacementcopilot.ai.GeminiService;
import com.aiplacementcopilot.ai.dto.AiRequest;
import com.aiplacementcopilot.ai.dto.AiResponse;
import com.aiplacementcopilot.ai.parser.JsonResponseParser;
import com.aiplacementcopilot.ai.prompt.InterviewEvaluationPromptBuilder;
import com.aiplacementcopilot.interview.evaluation.dto.InterviewEvaluationRequest;
import com.aiplacementcopilot.interview.evaluation.dto.InterviewEvaluationResponse;
import com.aiplacementcopilot.resume.text.ResumeTextService;
import org.springframework.util.StringUtils;
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
                resumeTextService.getResumeText(email);

        if (!StringUtils.hasText(resumeText)) {

            throw new IllegalStateException(
                    "Resume not found."
            );

        }

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
You are a Senior Technical Interview Evaluator.

Evaluate the candidate fairly.

Never hallucinate.

Never invent resume details.

Always consider:

- Technical Accuracy
- Communication
- Problem Solving
- Confidence
- Best Practices

Return ONLY valid JSON.

Never return markdown.

Never use ```.

Follow the schema exactly.
""")

                                .userPrompt(

                                        prompt

                                )

                                .build()

                );

        if (aiResponse == null ||
                !StringUtils.hasText(aiResponse.getContent())) {

            throw new IllegalStateException(
                    "AI evaluation failed."
            );

        }

        InterviewEvaluationResponse response =
                jsonResponseParser.parse(
                        aiResponse.getContent(),
                        InterviewEvaluationResponse.class
                );

        if (response == null) {

            throw new IllegalStateException(
                    "Unable to parse AI evaluation."
            );

        }

        return response;

    }
    @Override
    public InterviewEvaluationResponse.FinalInterviewReport generateFinalReport(

            String email,

            InterviewEvaluationRequest request

    ) {

        StringBuilder reportPrompt = new StringBuilder();

        reportPrompt.append("""
Generate the FINAL interview report.

Analyze the complete interview.

Return ONLY JSON.

Schema:

{

"overallInterviewScore":90,

"technicalAverage":90,

"communicationAverage":90,

"confidenceAverage":90,

"problemSolvingAverage":90,

"grammarAverage":90,

"hiringRecommendation":"Recommended",

"overallStrengths":[
"..."
],

"overallWeaknesses":[
"..."
],

"nextSteps":[
"..."
],

"finalFeedback":"..."

}

========================

""");

        int i = 1;

        for (InterviewEvaluationRequest.QuestionAnswer qa
                : request.getInterviewHistory()) {

            reportPrompt.append("\nQuestion ")
                    .append(i++)
                    .append("\n");

            reportPrompt.append("Question : ")
                    .append(qa.getQuestion())
                    .append("\n");

            reportPrompt.append("Answer : ")
                    .append(qa.getAnswer())
                    .append("\n\n");
        }

        AiResponse reportAi = geminiService.generate(

                AiRequest.builder()

                        .systemPrompt("""
You are a Senior FAANG Interviewer.

Generate only the final interview report.

Return ONLY JSON.
""")

                        .userPrompt(reportPrompt.toString())

                        .build()

        );

        if (reportAi == null ||
                !StringUtils.hasText(reportAi.getContent())) {

            throw new IllegalStateException(
                    "Unable to generate final report."
            );

        }

        InterviewEvaluationResponse.FinalInterviewReport report =

                jsonResponseParser.parse(

                        reportAi.getContent(),

                        InterviewEvaluationResponse.FinalInterviewReport.class

                );

        if (report == null) {

            throw new IllegalStateException(
                    "Unable to parse final report."
            );

        }

        return report;

    }
}