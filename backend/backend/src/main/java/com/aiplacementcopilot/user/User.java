package com.aiplacementcopilot.user;

import com.aiplacementcopilot.common.Role;

import jakarta.persistence.*;

import lombok.*;

import java.time.LocalDateTime;

@Entity

@Table(
        name = "users"
)

@Getter

@Setter

@NoArgsConstructor

@AllArgsConstructor

@Builder

public class User {

    @Id

    @GeneratedValue(
            strategy =
                    GenerationType.UUID
    )

    private String id;

    @Column(
            nullable = false
    )

    private String fullName;

    @Column(
            nullable = false,
            unique = true
    )

    private String email;

    @Column(
            nullable = false
    )

    private String password;

    @Enumerated(
            EnumType.STRING
    )

    private Role role;

    @Column(
            nullable = false
    )

    private boolean verified;

    private String photoUrl;

    private String googleId;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
    @Column(length = 20)
    private String phone;

    private String college;

    private String degree;

    private String branch;

    private Integer semester;

    private Integer graduationYear;

    @Column(length = 2000)
    private String skills;

    private String linkedinUrl;

    private String githubUrl;

    private String leetcodeUrl;

    private String codeforcesUrl;

    @Column(length = 3000)
    private String bio;

    private String resetPasswordToken;

    private LocalDateTime resetPasswordTokenExpiry;
}