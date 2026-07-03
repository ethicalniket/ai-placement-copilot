package com.aiplacementcopilot.resume;

import com.aiplacementcopilot.user.User;

import jakarta.persistence.*;

import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "resumes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Resume {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @OneToOne
    @JoinColumn(
            name = "user_id",
            nullable = false,
            unique = true
    )
    private User user;

    @Column(nullable = false)
    private String originalFileName;

    private String cloudinaryPublicId;

    @Column(nullable = false)
    private String resumeUrl;

    private Long fileSize;

    private String contentType;

    @Column(nullable = false)
    private String uploadStatus;

    private LocalDateTime uploadedAt;

    private LocalDateTime updatedAt;

}