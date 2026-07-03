package com.aiplacementcopilot.ai;

import com.aiplacementcopilot.ai.dto.AiRequest;
import com.aiplacementcopilot.ai.dto.AiResponse;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {

    private final GeminiService geminiService;

    @PostMapping("/test")
    public ResponseEntity<AiResponse> test(

            @Valid

            @RequestBody

            AiRequest request

    ) {

        AiResponse response = geminiService.generate(request);

        return ResponseEntity.ok(response);

    }

}