package com.aiplacementcopilot.career;
import java.util.List;
public interface CareerService {

    CareerModels.CareerRoadmapResponse generateRoadmap(
            String email,
            CareerModels.CareerRoadmapRequest request
    );

    List<CareerModels.CareerHistoryResponse> getHistory(
            String email
    );
    CareerModels.CareerRoadmapResponse getRoadmap(
            Long id,
            String email
    );

    void deleteRoadmap(
            Long id,
            String email
    );

    CareerModels.CareerRoadmapResponse regenerateRoadmap(
            Long id,
            String email
    );

}