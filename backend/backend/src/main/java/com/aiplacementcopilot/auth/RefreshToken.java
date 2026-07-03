package com.aiplacementcopilot.auth;

import com.aiplacementcopilot.user.User;

import jakarta.persistence.*;

import lombok.*;

import java.time.LocalDateTime;

@Entity

@Table(
        name =
                "refresh_tokens"
)

@Getter

@Setter

@NoArgsConstructor

@AllArgsConstructor

@Builder

public class RefreshToken {

    @Id

    @GeneratedValue(
            strategy =
                    GenerationType.UUID
    )

    private String id;

    @Column(
            nullable = false,
            unique = true
    )

    private String token;

    @ManyToOne

    @JoinColumn(
            name = "user_id"
    )

    private User user;

    private LocalDateTime expiryDate;

    private boolean revoked;

}