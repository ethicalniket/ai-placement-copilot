"use client";

import ResumeUploadCard from "@/features/resume/components/resume-upload-card";
import ResumeDetailsCard from "@/features/resume/components/resume-details-card";
import AnalysisCard from "@/features/resume-analysis/components/analysis-card";
import { useAnalysis } from "@/features/resume-analysis/hooks/use-analysis";

export default function ResumePage() {

  const analysisState = useAnalysis();

  return (

    <div className="space-y-8">

      <h1 className="text-4xl font-bold">

        Resume

      </h1>

      <div className="grid gap-6 lg:grid-cols-2">

        <ResumeUploadCard />

        <ResumeDetailsCard

          startAnalysis={analysisState.startAnalysis}

          loading={analysisState.loading}

        />

      </div>

      <AnalysisCard

        analysis={analysisState.analysis}

        loading={analysisState.loading}

      />

    </div>

  );

}