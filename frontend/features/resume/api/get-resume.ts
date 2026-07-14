import { api } from "@/services/api";

import { ResumeResponse } from "../types/resume";

export async function getResume() {
  const response =
    await api.get<ResumeResponse>(
      "/resume"
    );

  return response.data;
}