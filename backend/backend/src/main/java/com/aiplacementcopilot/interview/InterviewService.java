package com.aiplacementcopilot.interview;

import com.aiplacementcopilot.interview.dto.InterviewRequest;
import com.aiplacementcopilot.interview.dto.InterviewResponse;

public interface InterviewService {

    InterviewResponse generateQuestions(

            String email,

            InterviewRequest request

    );

}