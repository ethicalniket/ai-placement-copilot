import { api } from "./api";

import {
  ResumeBuilderRequest,
  ResumeBuilderResponse,
} from "@/types/resume-builder";

export async function generateResume(
  request: ResumeBuilderRequest
) {
  const response =
    await api.post<ResumeBuilderResponse>(
      "/resume-builder/generate",
      request
    );

  return response.data;
}