"use client";

import {
  Brain,
  CheckCircle2,
  Sparkles,
  Target,
  TriangleAlert,
} from "lucide-react";

import { ResumeAnalysisResponse } from "../types/analysis";

interface Props {
  analysis: ResumeAnalysisResponse | null;
  loading: boolean;
}

export default function AnalysisCard({
  analysis,
  loading,
}: Props) {
  if (loading) {
    return (
      <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">

        <h2 className="text-3xl font-bold">

          AI Resume Analysis

        </h2>

        <p className="mt-2 text-zinc-500">

          AI is analyzing your resume...

        </p>

      </div>
    );
  }

  if (!analysis) {
    return (
      <div
        id="analysis-section"
        className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm"
      >
        <h2 className="text-3xl font-bold">

          AI Resume Analysis

        </h2>

        <p className="mt-2 text-zinc-500">

          Improve your ATS score with AI.

        </p>

        <div className="mt-10 rounded-3xl border border-dashed border-zinc-300 py-20 text-center">

          <Brain
            size={70}
            className="mx-auto text-zinc-300"
          />

          <h3 className="mt-6 text-2xl font-bold">

            No Analysis Yet

          </h3>

          <p className="mt-3 text-zinc-500">

            Click <b>Analyze Resume</b> above.

          </p>

        </div>
      </div>
    );
  }

  return (
    <div
      id="analysis-section"
      className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm"
    >

      <h2 className="text-3xl font-bold">

        AI Resume Analysis

      </h2>

      <p className="mt-2 text-zinc-500">

        Improve your ATS score with AI.

      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">

        <div className="flex flex-col items-center justify-center rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 p-10 text-white">

          <Target size={48} />

          <p className="mt-4">ATS SCORE</p>

          <h1 className="mt-3 text-7xl font-bold">

            {analysis.atsScore}

          </h1>

        </div>

        <div className="rounded-3xl bg-zinc-50 p-8 lg:col-span-2">

          <div className="flex items-center gap-3">

            <Brain className="text-indigo-600" />

            <h3 className="text-2xl font-bold">

              Summary

            </h3>

          </div>

          <p className="mt-5 leading-8">

            {analysis.summary}

          </p>

        </div>

      </div>

      <div className="mt-8 rounded-3xl border border-green-200 bg-green-50 p-8">

        <div className="mb-5 flex items-center gap-3">

          <CheckCircle2 className="text-green-600" />

          <h3 className="text-2xl font-bold">

            Strengths

          </h3>

        </div>

        <div className="grid gap-4 md:grid-cols-2">

          {analysis.strengths.map((item) => (

            <div
              key={item}
              className="rounded-2xl bg-white p-5 shadow-sm"
            >

              ✅ {item}

            </div>

          ))}

        </div>

      </div>

      <div className="mt-8 rounded-3xl border border-red-200 bg-red-50 p-8">

        <div className="mb-5 flex items-center gap-3">

          <TriangleAlert className="text-red-600" />

          <h3 className="text-2xl font-bold">

            Weaknesses

          </h3>

        </div>

        <div className="grid gap-4 md:grid-cols-2">

          {analysis.weaknesses.map((item) => (

            <div
              key={item}
              className="rounded-2xl bg-white p-5 shadow-sm"
            >

              ❌ {item}

            </div>

          ))}

        </div>

      </div>

      <div className="mt-8 rounded-3xl border border-zinc-200 bg-white p-8">

        <h3 className="mb-5 text-2xl font-bold">

          Missing Skills

        </h3>

        <div className="flex flex-wrap gap-3">

          {analysis.missingSkills.map((skill) => (

            <span
              key={skill}
              className="rounded-full bg-indigo-100 px-5 py-3 text-indigo-700"
            >

              {skill}

            </span>

          ))}

        </div>

      </div>

      <div className="mt-8 rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 p-8 text-white">

        <div className="mb-5 flex items-center gap-3">

          <Sparkles />

          <h3 className="text-2xl font-bold">

            AI Suggestions

          </h3>

        </div>

        <div className="space-y-4">

          {analysis.improvementSuggestions.map((item) => (

            <div
              key={item}
              className="rounded-2xl bg-white/10 p-5"
            >

              💡 {item}

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}