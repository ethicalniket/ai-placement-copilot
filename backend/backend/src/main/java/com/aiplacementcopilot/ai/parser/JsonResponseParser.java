package com.aiplacementcopilot.ai.parser;

public interface JsonResponseParser {

    <T> T parse(
            String response,
            Class<T> responseType
    );

}