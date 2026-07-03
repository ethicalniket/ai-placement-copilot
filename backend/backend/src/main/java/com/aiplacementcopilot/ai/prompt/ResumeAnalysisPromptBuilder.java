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
You are an ATS Resume Analyzer.

Return ONLY valid JSON.

Schema:

{
  "atsScore":0,
  "summary":"",
  "strengths":"",
  "weaknesses":"",
  "missingSkills":"",
  "improvementSuggestions":""
}

Resume:

"""
                + resumeText;

    }

}