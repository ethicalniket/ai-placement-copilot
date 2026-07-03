package com.aiplacementcopilot.interview.evaluation;

import com.aiplacementcopilot.interview.evaluation.dto.InterviewEvaluationRequest;
import com.aiplacementcopilot.interview.evaluation.dto.InterviewEvaluationResponse;

public interface InterviewEvaluationService {

    InterviewEvaluationResponse evaluate(

            String email,

            InterviewEvaluationRequest request

    );

}