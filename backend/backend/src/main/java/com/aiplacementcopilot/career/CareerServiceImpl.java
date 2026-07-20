package com.aiplacementcopilot.career;

import com.aiplacementcopilot.ai.GeminiService;
import com.aiplacementcopilot.ai.dto.AiRequest;
import com.aiplacementcopilot.ai.dto.AiResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.List;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Slf4j
@Service
@RequiredArgsConstructor
public class CareerServiceImpl implements CareerService {

    private final GeminiService geminiService;
    private final CareerPromptBuilder promptBuilder;
    private final ObjectMapper objectMapper;
    private final CareerRoadmapRepository careerRoadmapRepository;

    @Override
    public CareerModels.CareerRoadmapResponse generateRoadmap(
            String email,
            CareerModels.CareerRoadmapRequest request
    ) {

        log.info("Career roadmap generation started for user: {}", email);

        try {

            String prompt = promptBuilder.buildPrompt(request);

            log.debug("Career prompt generated successfully.");

            AiRequest aiRequest = AiRequest.builder()
                    .systemPrompt("""
                            You are an expert Software Engineering Career Mentor.

                            Return ONLY valid JSON.
                            Do not return markdown.
                            Do not return explanations.
                            Follow the exact JSON schema.
                            """)
                    .userPrompt(prompt)
                    .build();

            AiResponse aiResponse = geminiService.generate(aiRequest);

            if (aiResponse == null ||
                    aiResponse.getContent() == null ||
                    aiResponse.getContent().isBlank()) {

                log.error("Gemini returned empty response.");

                throw new RuntimeException("AI returned an empty response.");
            }

            CareerModels.CareerRoadmapResponse response =
                    objectMapper.readValue(
                            aiResponse.getContent(),
                            CareerModels.CareerRoadmapResponse.class
                    );

            // Null Safety

            if (response.getStrengths() == null)
                response.setStrengths(new ArrayList<>());

            if (response.getMissingSkills() == null)
                response.setMissingSkills(new ArrayList<>());

            if (response.getRecommendations() == null)
                response.setRecommendations(new ArrayList<>());

            if (response.getRoadmap() == null)
                response.setRoadmap(new ArrayList<>());

            // Save Roadmap History

            saveRoadmap(email, request, response);

            log.info("Career roadmap saved successfully for user: {}", email);

            return response;

        } catch (Exception e) {

            log.error(
                    "Career roadmap generation failed for {} : {}",
                    email,
                    e.getMessage(),
                    e
            );

            throw new RuntimeException(
                    "Unable to generate career roadmap at the moment. Please try again later."
            );
        }
    }
    private CareerRoadmap saveRoadmap(
            String email,
            CareerModels.CareerRoadmapRequest request,
            CareerModels.CareerRoadmapResponse response
    ) throws Exception {

        CareerRoadmap roadmap = CareerRoadmap.builder()
                .userEmail(email)
                .education(request.getEducation())
                .targetRole(request.getTargetRole())
                .targetCompany(request.getTargetCompany())
                .experienceLevel(request.getExperienceLevel())
                .timeline(request.getTimeline())
                .dailyStudyHours(request.getDailyStudyHours())
                .currentSkills(
                        request.getCurrentSkills() == null
                                ? ""
                                : String.join(", ", request.getCurrentSkills())
                )
                .roadmapJson(
                        objectMapper.writeValueAsString(response)
                )
                .createdAt(LocalDateTime.now())
                .build();

        return careerRoadmapRepository.save(roadmap);
    }
    @Override
    public List<CareerModels.CareerHistoryResponse> getHistory(String email) {

        log.info("Fetching career roadmap history for {}", email);

        return careerRoadmapRepository
                .findByUserEmailOrderByCreatedAtDesc(email)
                .stream()
                .map(roadmap -> CareerModels.CareerHistoryResponse.builder()
                        .id(roadmap.getId())
                        .targetRole(roadmap.getTargetRole())
                        .targetCompany(roadmap.getTargetCompany())
                        .createdAt(roadmap.getCreatedAt())
                        .build())
                .toList();
    }
    @Override
    public CareerModels.CareerRoadmapResponse getRoadmap(
            Long id,
            String email
    ) {

        log.info("Fetching roadmap {} for user {}", id, email);

        CareerRoadmap roadmap = careerRoadmapRepository
                .findByIdAndUserEmail(id, email)
                .orElseThrow(() ->
                        new RuntimeException("Career roadmap not found.")
                );

        try {

            CareerModels.CareerRoadmapResponse response =
                    objectMapper.readValue(
                            roadmap.getRoadmapJson(),
                            CareerModels.CareerRoadmapResponse.class
                    );

            if (response.getStrengths() == null)
                response.setStrengths(new ArrayList<>());

            if (response.getMissingSkills() == null)
                response.setMissingSkills(new ArrayList<>());

            if (response.getRecommendations() == null)
                response.setRecommendations(new ArrayList<>());

            if (response.getRoadmap() == null)
                response.setRoadmap(new ArrayList<>());

            return response;

        } catch (Exception e) {

            log.error(
                    "Failed to parse roadmap JSON for roadmap {}",
                    id,
                    e
            );

            throw new RuntimeException(
                    "Unable to read saved roadmap."
            );
        }
    }

    @Override
    public void deleteRoadmap(
            Long id,
            String email
    ) {

        log.info("Deleting roadmap {} for user {}", id, email);

        CareerRoadmap roadmap = careerRoadmapRepository
                .findByIdAndUserEmail(id, email)
                .orElseThrow(() ->
                        new RuntimeException("Career roadmap not found.")
                );

        careerRoadmapRepository.delete(roadmap);

        log.info("Roadmap {} deleted successfully.", id);
    }
    @Override
    public CareerModels.CareerRoadmapResponse regenerateRoadmap(
            Long id,
            String email
    ) {

        log.info("Regenerating roadmap {} for user {}", id, email);

        CareerRoadmap existingRoadmap = careerRoadmapRepository
                .findByIdAndUserEmail(id, email)
                .orElseThrow(() ->
                        new RuntimeException("Career roadmap not found.")
                );

        CareerModels.CareerRoadmapRequest request =
                new CareerModels.CareerRoadmapRequest();

        request.setEducation(existingRoadmap.getEducation());
        request.setTargetRole(existingRoadmap.getTargetRole());
        request.setTargetCompany(existingRoadmap.getTargetCompany());
        request.setExperienceLevel(existingRoadmap.getExperienceLevel());
        request.setTimeline(existingRoadmap.getTimeline());
        request.setDailyStudyHours(existingRoadmap.getDailyStudyHours());

        if (existingRoadmap.getCurrentSkills() == null
                || existingRoadmap.getCurrentSkills().isBlank()) {

            request.setCurrentSkills(new ArrayList<>());

        } else {

            request.setCurrentSkills(
                    List.of(existingRoadmap.getCurrentSkills().split("\\s*,\\s*"))
            );
        }

        try {

            String prompt = promptBuilder.buildPrompt(request);

            AiRequest aiRequest = AiRequest.builder()
                    .systemPrompt("""
                        You are an expert Software Engineering Career Mentor.

                        Return ONLY valid JSON.

                        Do not return markdown.

                        Do not return explanations.

                        Follow the exact JSON schema.
                        """)
                    .userPrompt(prompt)
                    .build();

            AiResponse aiResponse = geminiService.generate(aiRequest);

            if (aiResponse == null
                    || aiResponse.getContent() == null
                    || aiResponse.getContent().isBlank()) {

                throw new RuntimeException("AI returned an empty response.");
            }

            CareerModels.CareerRoadmapResponse response =
                    objectMapper.readValue(
                            aiResponse.getContent(),
                            CareerModels.CareerRoadmapResponse.class
                    );

            if (response.getStrengths() == null)
                response.setStrengths(new ArrayList<>());

            if (response.getMissingSkills() == null)
                response.setMissingSkills(new ArrayList<>());

            if (response.getRecommendations() == null)
                response.setRecommendations(new ArrayList<>());

            if (response.getRoadmap() == null)
                response.setRoadmap(new ArrayList<>());

            saveRoadmap(email, request, response);

            log.info("Roadmap regenerated successfully for {}", email);

            return response;

        } catch (Exception e) {

            log.error(
                    "Failed to regenerate roadmap for {}",
                    email,
                    e
            );

            throw new RuntimeException(
                    "Unable to regenerate roadmap."
            );
        }
    }
}