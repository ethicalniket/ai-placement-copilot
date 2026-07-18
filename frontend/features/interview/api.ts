import { api } from "@/services/api";

import {
  InterviewRequest,
  InterviewResponse,
  InterviewEvaluationRequest,
  InterviewEvaluationResponse,
} from "./types";

export async function generateInterviewQuestions(
  request: InterviewRequest
) {
  const response =
    await api.post<InterviewResponse>(
      "/interview/questions",
      request
    );

  return response.data;
}

export async function evaluateInterviewAnswer(
  request: InterviewEvaluationRequest
) {
  const response =
    await api.post<InterviewEvaluationResponse>(
      "/interview/evaluate",
      request
    );

  return response.data;
}
export async function generateFinalInterviewReport(
  request: InterviewEvaluationRequest
) {

  const response =
    await api.post(
      "/interview/final-report",
      request
    );

  return response.data;

}