package com.aiplacementcopilot.jobmatcher;

import com.aiplacementcopilot.jobmatcher.dto.JobMatchRequest;
import com.aiplacementcopilot.jobmatcher.dto.JobMatchResponse;

public interface JobMatchService {

    JobMatchResponse matchJob(

            String email,

            JobMatchRequest request

    );

}