package com.aiplacementcopilot.resume;

import com.aiplacementcopilot.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ResumeRepository
        extends JpaRepository<Resume, String> {

    Optional<Resume> findByUser(User user);

}