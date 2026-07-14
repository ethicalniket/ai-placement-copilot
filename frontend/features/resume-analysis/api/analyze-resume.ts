import { api } from "@/services/api";

import { ResumeAnalysisResponse } from "../types/analysis";

export async function analyzeResume() {

  const response =
    await api.get<ResumeAnalysisResponse>(
      "/resume/analyze"
    );

  return response.data;

}