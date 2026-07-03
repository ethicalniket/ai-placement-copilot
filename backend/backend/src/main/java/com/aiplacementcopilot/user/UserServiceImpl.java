package com.aiplacementcopilot.user;

import com.aiplacementcopilot.user.dto.ProfileResponse;
import com.aiplacementcopilot.user.dto.UpdateProfileRequest;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository repository;

    @Override
    public UserResponse getCurrentUser(String email) {

        User user = repository.findByEmail(email)

                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return UserResponse.builder()

                .id(user.getId())

                .fullName(user.getFullName())

                .email(user.getEmail())

                .role(user.getRole())

                .verified(user.isVerified())

                .photoUrl(user.getPhotoUrl())

                .build();

    }

    @Override
    public ProfileResponse getProfile(String email) {

        User user = repository.findByEmail(email)

                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return ProfileResponse.builder()

                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .college(user.getCollege())
                .degree(user.getDegree())
                .branch(user.getBranch())
                .semester(user.getSemester())
                .graduationYear(user.getGraduationYear())
                .skills(user.getSkills())
                .linkedinUrl(user.getLinkedinUrl())
                .githubUrl(user.getGithubUrl())
                .leetcodeUrl(user.getLeetcodeUrl())
                .codeforcesUrl(user.getCodeforcesUrl())
                .bio(user.getBio())
                .photoUrl(user.getPhotoUrl())
                .role(user.getRole())
                .verified(user.isVerified())

                .build();

    }

    @Override
    public ProfileResponse updateProfile(
            String email,
            UpdateProfileRequest request
    ) {

        User user = repository.findByEmail(email)

                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        user.setFullName(request.getFullName());
        user.setPhone(request.getPhone());
        user.setCollege(request.getCollege());
        user.setDegree(request.getDegree());
        user.setBranch(request.getBranch());
        user.setSemester(request.getSemester());
        user.setGraduationYear(request.getGraduationYear());
        user.setSkills(request.getSkills());
        user.setLinkedinUrl(request.getLinkedinUrl());
        user.setGithubUrl(request.getGithubUrl());
        user.setLeetcodeUrl(request.getLeetcodeUrl());
        user.setCodeforcesUrl(request.getCodeforcesUrl());
        user.setBio(request.getBio());

        repository.save(user);

        return getProfile(email);

    }

}