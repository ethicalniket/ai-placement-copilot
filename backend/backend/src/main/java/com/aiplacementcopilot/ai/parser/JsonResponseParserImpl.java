package com.aiplacementcopilot.ai.parser;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JsonResponseParserImpl
        implements JsonResponseParser {

    private final ObjectMapper objectMapper;

    @Override
    public <T> T parse(

            String response,

            Class<T> responseType

    ) {

        try {

            String json = response

                    .replace("```json", "")

                    .replace("```", "")

                    .trim();

            return objectMapper.readValue(

                    json,

                    responseType

            );

        } catch (Exception e) {

            throw new RuntimeException(

                    "Failed to parse AI response.\n\nResponse:\n"

                            + response,

                    e

            );

        }

    }

}