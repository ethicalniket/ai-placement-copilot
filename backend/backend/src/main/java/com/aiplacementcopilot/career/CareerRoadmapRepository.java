package com.aiplacementcopilot.career;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface CareerRoadmapRepository
        extends JpaRepository<CareerRoadmap, Long> {

    List<CareerRoadmap> findByUserEmailOrderByCreatedAtDesc(
            String userEmail
    );
    Optional<CareerRoadmap> findByIdAndUserEmail(
            Long id,
            String userEmail
    );

}