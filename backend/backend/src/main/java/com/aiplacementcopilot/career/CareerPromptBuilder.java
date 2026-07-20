package com.aiplacementcopilot.career;

import org.springframework.stereotype.Component;

@Component
public class CareerPromptBuilder {

    public String buildPrompt(CareerModels.CareerRoadmapRequest request) {

        return """
You are an Expert Software Engineering Career Mentor, Senior Technical Interviewer and Hiring Manager.

Your responsibility is to generate a highly personalized, realistic and industry-standard career roadmap.

Candidate Profile

Education: %s
Target Role: %s
Target Company: %s
Experience Level: %s
Timeline (Months): %d
Daily Study Hours: %d
Current Skills: %s

Instructions

1. Analyze the candidate profile carefully.

2. Identify strengths.

3. Identify missing technical skills.

4. Suggest practical recommendations.

5. Create a month-by-month roadmap.

6. Every month's tasks should be achievable.

7. Recommend industry-standard learning resources.

8. Focus on practical learning instead of theory.

9. Prefer real projects over tutorials.

10. Include interview preparation wherever applicable.

11. Suggest DSA only if required for the target company.

12. Do not recommend unnecessary technologies.

13. Tailor the roadmap specifically for the target role.

14. If the target company is Microsoft, Google, Amazon, Adobe, Atlassian etc., include company-specific interview preparation.

15. Return ONLY valid JSON.

JSON Schema

{
  "strengths": [
    "..."
  ],
  "missingSkills": [
    "..."
  ],
  "recommendations": [
    "..."
  ],
  "roadmap": [
    {
      "month": 1,
      "title": "...",
      "tasks": [
        "...",
        "..."
      ],
      "resources": [
        "...",
        "..."
      ],
      "outcome": "..."
    }
  ]
}

Rules

- Do NOT return Markdown.
- Do NOT return explanation.
- Do NOT use ```json.
- Do NOT add extra text.
- Do NOT change JSON keys.
- Always return valid JSON.
- Every month must contain at least:
  - 4 Tasks
  - 2 Resources
  - 1 Outcome

Return ONLY JSON.
"""
                .formatted(
                        request.getEducation(),
                        request.getTargetRole(),
                        request.getTargetCompany(),
                        request.getExperienceLevel(),
                        request.getTimeline(),
                        request.getDailyStudyHours(),
                        request.getCurrentSkills() == null
                                ? ""
                                : String.join(", ", request.getCurrentSkills())
                );
    }
}