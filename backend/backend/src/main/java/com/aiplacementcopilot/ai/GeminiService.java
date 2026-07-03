package com.aiplacementcopilot.ai;

import com.aiplacementcopilot.ai.dto.AiRequest;
import com.aiplacementcopilot.ai.dto.AiResponse;

public interface GeminiService {

    AiResponse generate(

            AiRequest request

    );

}