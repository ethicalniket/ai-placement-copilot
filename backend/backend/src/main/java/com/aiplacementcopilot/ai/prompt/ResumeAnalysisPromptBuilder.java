package com.aiplacementcopilot.ai.prompt;

import org.springframework.stereotype.Component;

@Component
public class ResumeAnalysisPromptBuilder
        implements PromptBuilder {

    @Override
    public String build(
            Object... data
    ) {

        String resumeText = (String) data[0];

        return """
You are an expert ATS Resume Analyzer.

Return ONLY valid JSON.

Do NOT use markdown.

Do NOT wrap the response inside ```.

Schema:

{
  "atsScore": 85,

  "summary": "Short professional summary",

  "strengths": [
    "Strength 1",
    "Strength 2",
    "Strength 3"
  ],

  "weaknesses": [
    "Weakness 1",
    "Weakness 2",
    "Weakness 3"
  ],

  "missingSkills": [
    "Skill 1",
    "Skill 2",
    "Skill 3"
  ],

  "improvementSuggestions": [
    "Suggestion 1",
    "Suggestion 2",
    "Suggestion 3"
  ]
}

Rules:

- atsScore must be an integer (0-100).

- summary must contain 2-3 sentences.

- strengths MUST be a JSON array.

- weaknesses MUST be a JSON array.

- missingSkills MUST be a JSON array.

- improvementSuggestions MUST be a JSON array.

- Every array item must be a separate string.

- Never return strengths, weaknesses, missingSkills or improvementSuggestions as plain text.

Return ONLY valid JSON.

Resume:

%s
""".formatted(resumeText);

    }

}