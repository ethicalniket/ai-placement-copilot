import { useState } from "react";

import { analyzeResume } from "../api/analyze-resume";

import { ResumeAnalysisResponse } from "../types/analysis";

export function useAnalysis() {

  const [analysis, setAnalysis] =
    useState<ResumeAnalysisResponse | null>(null);

  const [loading, setLoading] =
    useState(false);

  async function startAnalysis() {

    try {

      setLoading(true);

      const response =
        await analyzeResume();

      setAnalysis(response);

    } finally {

      setLoading(false);

    }

  }

  return {

    analysis,

    loading,

    startAnalysis,

  };

}