package com.aiplacementcopilot.ai.prompt;

import org.springframework.stereotype.Component;

@Component
public class InterviewEvaluationPromptBuilder {

    public String build(

            String resume,

            String jobDescription,

            String question,

            String candidateAnswer,

            String difficulty

    ) {

        return """
You are an experienced Senior Technical Interviewer.

Evaluate the candidate's answer using:

1. Resume
2. Job Description
3. Interview Question
4. Candidate Answer

Difficulty:

%s

Return ONLY valid JSON.

Never use markdown.

Never use code blocks.

Every strengths and improvements field MUST be a JSON array.

Expected JSON:

{
  "overallScore":0,
  "technicalScore":0,
  "communicationScore":0,
  "confidenceScore":0,
  "strengths":[
      "..."
  ],
  "improvements":[
      "..."
  ],
  "idealAnswer":"..."
}

Resume:

%s

Job Description:

%s

Interview Question:

%s

Candidate Answer:

%s
"""
                .formatted(

                        difficulty,

                        resume,

                        jobDescription,

                        question,

                        candidateAnswer

                );

    }

}