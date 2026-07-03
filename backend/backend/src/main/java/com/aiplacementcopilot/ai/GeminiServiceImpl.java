package com.aiplacementcopilot.ai;

import com.aiplacementcopilot.ai.config.GeminiProperties;
import com.aiplacementcopilot.ai.dto.AiRequest;
import com.aiplacementcopilot.ai.dto.AiResponse;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@RequiredArgsConstructor
public class GeminiServiceImpl implements GeminiService {

    private final WebClient geminiWebClient;

    private final GeminiProperties geminiProperties;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public AiResponse generate(
            AiRequest request
    ) {

        String requestBody = buildRequestBody(request);

        String response = callGeminiApi(requestBody);

        String content = extractResponseText(response);

        return AiResponse.builder()

                .content(content)

                .build();

    }

    private String buildRequestBody(
            AiRequest request
    ) {

        try {

            String systemPrompt = request.getSystemPrompt() == null
                    ? ""
                    : request.getSystemPrompt();

            String userPrompt = request.getUserPrompt() == null
                    ? ""
                    : request.getUserPrompt();

            String prompt = systemPrompt + "\n\n" + userPrompt;

            ObjectNode root = objectMapper.createObjectNode();

            ArrayNode contents = root.putArray("contents");

            ObjectNode content = contents.addObject();

            ArrayNode parts = content.putArray("parts");

            ObjectNode part = parts.addObject();

            part.put("text", prompt);

            return objectMapper.writeValueAsString(root);

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to build Gemini request body.",
                    e
            );

        }

    }
    private String callGeminiApi(
            String requestBody
    ) {

        try {

            return geminiWebClient

                    .post()

                    .uri(uriBuilder ->

                            uriBuilder

                                    .path("/v1beta/models/{model}:generateContent")

                                    .build(geminiProperties.getModel())

                    )

                    .header(
                            "x-goog-api-key",
                            geminiProperties.getApiKey()
                    )

                    .contentType(MediaType.APPLICATION_JSON)

                    .bodyValue(requestBody)

                    .retrieve()

                    .bodyToMono(String.class)

                    .block();

        } catch (org.springframework.web.reactive.function.client.WebClientResponseException e) {

            throw new RuntimeException(

                    "Gemini Error\n\nStatus: "

                            + e.getStatusCode()

                            + "\n\nResponse:\n"

                            + e.getResponseBodyAsString(),

                    e

            );

        } catch (Exception e) {

            throw new RuntimeException(

                    "Failed to call Gemini API.",

                    e

            );

        }

    }
    private String extractResponseText(
            String response
    ) {

        try {

            JsonNode root = objectMapper.readTree(response);

            JsonNode candidates = root.path("candidates");

            if (!candidates.isArray() || candidates.isEmpty()) {

                throw new RuntimeException(
                        "No response received from Gemini."
                );

            }

            JsonNode textNode = candidates

                    .get(0)

                    .path("content")

                    .path("parts")

                    .get(0)

                    .path("text");

            if (textNode.isMissingNode() || textNode.isNull()) {

                throw new RuntimeException(
                        "Gemini response does not contain generated text."
                );

            }

            return textNode.asText();

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to parse Gemini response.",
                    e
            );

        }
    }}