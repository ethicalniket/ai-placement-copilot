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
You are a Senior Technical Interviewer with 15+ years of experience interviewing candidates for top product companies.

Your task is to generate a high-quality mock interview based ONLY on the candidate's resume and the given job description.

========================
INTERVIEW CONFIGURATION
========================

Difficulty: %s

Total Questions: %d

========================
RULES
========================

1. Use ONLY the information present in the resume.

2. Never invent projects, skills, experience or technologies.

3. Prioritize questions from:
   - Resume Projects
   - Technical Skills
   - Experience
   - Job Description

4. Questions must be practical and interview-oriented.

5. Avoid duplicate or very similar questions.

6. Avoid generic questions unless necessary.

7. Questions must become harder as the interview progresses.

8. Follow-up questions must depend on project-related questions.

9. HR questions should evaluate communication, teamwork and problem solving.

10. Return ONLY valid JSON.

11. Never return markdown.

12. Never use ```.

13. Every field must be an array of strings.

========================
QUESTION DISTRIBUTION
========================

Technical Questions:
60%%

Project Questions:
20%%

HR Questions:
10%%

Follow-up Questions:
10%%

========================
DIFFICULTY GUIDELINES
========================

EASY
- Fundamentals
- Definitions
- Basic coding concepts

MEDIUM
- Real project implementation
- API design
- Database
- Debugging
- Best practices

HARD
- System Design
- Scalability
- Security
- Performance
- Edge Cases
- Architecture Decisions

========================
EXPECTED JSON
========================

{
  "technicalQuestions": [],
  "hrQuestions": [],
  "projectQuestions": [],
  "followUpQuestions": []
}

========================
CANDIDATE RESUME
========================

%s

========================
JOB DESCRIPTION
========================

%s

Return ONLY valid JSON.
"""
                .formatted(

                        difficulty,

                        numberOfQuestions,

                        resume,

                        jobDescription

                );
    }

}