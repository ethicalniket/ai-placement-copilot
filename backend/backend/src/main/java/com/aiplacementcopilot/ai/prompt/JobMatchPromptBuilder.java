package com.aiplacementcopilot.ai.prompt;

import org.springframework.stereotype.Component;

@Component
public class JobMatchPromptBuilder
        implements PromptBuilder {

    @Override
    public String build(
            Object... data
    ) {

        String resume = (String) data[0];

        String jobDescription = (String) data[1];

        return """
Compare the resume with the job description.

Return ONLY valid JSON.

Schema:

{
  "matchPercentage":0,
  "matchedSkills":"",
  "missingSkills":"",
  "strengths":"",
  "recommendations":""
}

Resume:

"""
                + resume +

                """

Job Description:

"""

                + jobDescription;

    }

}