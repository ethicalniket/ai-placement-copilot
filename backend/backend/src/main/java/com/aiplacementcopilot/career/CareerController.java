package com.aiplacementcopilot.career;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
@RestController
@RequestMapping("/api/career")
@RequiredArgsConstructor
public class CareerController {

    private final CareerService careerService;

    @PostMapping("/generate")
    public ResponseEntity<CareerModels.CareerRoadmapResponse> generateRoadmap(
            Authentication authentication,
            @Valid @RequestBody CareerModels.CareerRoadmapRequest request
    ) {

        String email = authentication.getName();

        CareerModels.CareerRoadmapResponse response =
                careerService.generateRoadmap(email, request);

        return ResponseEntity.ok(response);
    }
    @GetMapping("/history")
    public ResponseEntity<List<CareerModels.CareerHistoryResponse>> getHistory(
            Authentication authentication
    ) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                careerService.getHistory(email)
        );
    }
    @GetMapping("/{id}")
    public ResponseEntity<CareerModels.CareerRoadmapResponse> getRoadmap(
            @PathVariable Long id,
            Authentication authentication
    ) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                careerService.getRoadmap(id, email)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRoadmap(
            @PathVariable Long id,
            Authentication authentication
    ) {

        String email = authentication.getName();

        careerService.deleteRoadmap(id, email);

        return ResponseEntity.ok("Career roadmap deleted successfully.");
    }
    @PostMapping("/{id}/regenerate")
    public ResponseEntity<CareerModels.CareerRoadmapResponse> regenerateRoadmap(
            @PathVariable Long id,
            Authentication authentication
    ) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                careerService.regenerateRoadmap(id, email)
        );
    }
}