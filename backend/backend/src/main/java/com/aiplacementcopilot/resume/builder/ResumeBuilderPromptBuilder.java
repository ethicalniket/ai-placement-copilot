package com.aiplacementcopilot.resume.builder;

import org.springframework.stereotype.Component;

@Component
public class ResumeBuilderPromptBuilder {

    public String build(
            ResumeBuilderRequest request
    ) {

        return """
You are an Expert ATS Resume Writer.

Generate an ATS optimized resume.

Return ONLY valid JSON.

Never use markdown.

Never use ```.

JSON Format:

{
  "professionalSummary":"",

  "technicalSkills":[
    ""
  ],

  "projects":[
    {
      "title":"",
      "description":""
    }
  ],

  "certifications":[
    ""
  ],

  "achievements":[
    ""
  ]
}

Candidate Details

Full Name:
%s

Email:
%s

Phone:
%s

Address:
%s

LinkedIn:
%s

Github:
%s

Portfolio:
%s

Leetcode:
%s

Codeforces:
%s

College:
%s

Degree:
%s

Branch:
%s

Graduation Year:
%s

CGPA:
%s

Skills:
%s

Projects:
%s

Experience:
%s

Certifications:
%s

Achievements:
%s

Rules:

1. Professional Summary should contain 4-5 lines.

2. Technical Skills should be returned as JSON array.

3. Projects should be returned as JSON array.

4. Certifications should be JSON array.

5. Achievements should be JSON array.

6. Improve grammar.

7. Rewrite projects professionally.

8. Use ATS friendly wording.

9. Never return plain text resume.

10. Return ONLY JSON.

"""
                .formatted(

                        request.getFullName(),
                        request.getEmail(),
                        request.getPhone(),
                        request.getAddress(),
                        request.getLinkedIn(),
                        request.getGithub(),
                        request.getPortfolio(),
                        request.getLeetcode(),
                        request.getCodeforces(),
                        request.getCollege(),
                        request.getDegree(),
                        request.getBranch(),
                        request.getGraduationYear(),
                        request.getCgpa(),
                        request.getSkills(),
                        request.getProjects(),
                        request.getExperience(),
                        request.getCertifications(),
                        request.getAchievements()

                );

    }

}