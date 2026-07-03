package com.aiplacementcopilot.ai.prompt;

import org.springframework.stereotype.Component;

@Component
public class InterviewPromptBuilder {

    public String build(

            String resume,

            String jobDescription,

            String difficulty,

            Integer numberOfQuestions

    ) {

        return """
You are an expert Technical Interviewer.

Generate interview questions based on the candidate's resume and the job description.

Difficulty:
%s

Generate exactly %d questions in total.

Return ONLY a valid JSON object.

IMPORTANT RULES:
- Do NOT use markdown.
- Do NOT use ```json.
- Do NOT return numbered text.
- Every field MUST be a JSON array of strings.
- Do NOT return any explanation.

Expected JSON format:

{
  "technicalQuestions": [
    "Question",
    "Question"
  ],
  "hrQuestions": [
    "Question",
    "Question"
  ],
  "projectQuestions": [
    "Question",
    "Question"
  ],
  "followUpQuestions": [
    "Question",
    "Question"
  ]
}

Resume:

%s

Job Description:

%s
"""
                .formatted(

                        difficulty,

                        numberOfQuestions,

                        resume,

                        jobDescription

                );

    }

}