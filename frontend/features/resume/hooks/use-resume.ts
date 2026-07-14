import { useEffect, useState } from "react";

import { getResume } from "../api/get-resume";

import { ResumeResponse } from "../types/resume";

export function useResume() {
  const [resume, setResume] =
    useState<ResumeResponse | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadResume();
  }, []);

  async function loadResume() {
    try {
      const data = await getResume();

      setResume(data);
    } catch {
      setResume(null);
    } finally {
      setLoading(false);
    }
  }

  return {
    resume,
    loading,
    refresh: loadResume,
  };
}