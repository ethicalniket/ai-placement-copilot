package com.aiplacementcopilot.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${app.frontend-url}")
    private String frontendUrl;

    public void sendPasswordResetEmail(String to, String token) {

        String resetLink =
                frontendUrl +
                        "/reset-password?token=" +
                        token;

        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setFrom(fromEmail);

        message.setTo(to);

        message.setSubject(
                "Reset Your Password"
        );

        message.setText(
                """
                Hello,

                We received a request to reset your password.

                Click the link below:

                %s

                This link will expire in 15 minutes.

                If you didn't request this,
                you can safely ignore this email.

                AI Placement Copilot Team
                """
                        .formatted(resetLink)
        );

        mailSender.send(message);

    }

}