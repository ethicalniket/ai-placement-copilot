package com.aiplacementcopilot.resume.analysis;

import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class ResumeAnalysisMapper {

    public ResumeAnalysisResponse map(
            ResumeAnalysisAiResponse raw
    ) {

        return ResumeAnalysisResponse.builder()

                .atsScore(raw.getAtsScore())

                .summary(raw.getSummary())

                .strengths(normalize(raw.getStrengths()))

                .weaknesses(normalize(raw.getWeaknesses()))

                .missingSkills(normalize(raw.getMissingSkills()))

                .improvementSuggestions(
                        normalize(raw.getImprovementSuggestions())
                )

                .build();

    }

    private List<String> normalize(Object value) {

        if (value == null) {

            return List.of();

        }

        if (value instanceof List<?> list) {

            return list.stream()

                    .map(String::valueOf)

                    .map(String::trim)

                    .filter(s -> !s.isBlank())

                    .toList();

        }

        String text = value.toString();

        return Arrays.stream(

                        text.split(",|\\n|;")

                )

                .map(String::trim)

                .filter(s -> !s.isBlank())

                .toList();

    }

}