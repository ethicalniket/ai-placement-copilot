package com.aiplacementcopilot.ai.prompt;

public interface PromptBuilder {

    String build(
            Object... data
    );

}