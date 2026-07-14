"use client";

import Link from "next/link";

import {
  CheckCircle2,
  Eye,
  FileText,
  HardDrive,
  ShieldCheck,
} from "lucide-react";

import { useResume } from "../hooks/use-resume";

interface Props {
  startAnalysis: () => void;
  loading: boolean;
}

export default function ResumeDetailsCard({
  startAnalysis,
  loading: analysisLoading,
}: Props) {

  const {
    resume,
    loading,
  } = useResume();

  if (loading) {
    return (
      <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">

        <div className="animate-pulse space-y-5">

          <div className="h-8 w-48 rounded bg-zinc-200" />

          <div className="h-24 rounded bg-zinc-100" />

          <div className="h-12 rounded bg-zinc-200" />

        </div>

      </div>
    );
  }

  if (!resume) {
    return (
      <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-white p-10 shadow-sm">

        <FileText
          size={70}
          className="text-zinc-300"
        />

        <h2 className="mt-6 text-2xl font-bold">
          No Resume Uploaded
        </h2>

        <p className="mt-3 text-center text-zinc-500">
          Upload your resume to unlock Resume
          Analysis, Job Matching and AI Interview.
        </p>

      </div>
    );
  }

  return (

    <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">

      <div className="flex items-center gap-4">

        <div className="rounded-2xl bg-green-100 p-4">

          <CheckCircle2
            size={30}
            className="text-green-600"
          />

        </div>

        <div>

          <h2 className="text-2xl font-bold">
            Resume Uploaded
          </h2>

          <p className="text-zinc-500">
            Your latest resume is ready.
          </p>

        </div>

      </div>

      <div className="mt-8 space-y-5">

        <div className="flex items-center justify-between rounded-2xl bg-zinc-50 p-5">

          <div className="flex items-center gap-3">

            <FileText className="text-indigo-600" />

            <span className="font-medium">
              File Name
            </span>

          </div>

          <span className="max-w-[220px] truncate font-semibold">

            {resume.originalFileName}

          </span>

        </div>

        <div className="flex items-center justify-between rounded-2xl bg-zinc-50 p-5">

          <div className="flex items-center gap-3">

            <HardDrive className="text-indigo-600" />

            <span className="font-medium">
              File Size
            </span>

          </div>

          <span className="font-semibold">

            {(resume.fileSize / 1024).toFixed(1)} KB

          </span>

        </div>

        <div className="flex items-center justify-between rounded-2xl bg-zinc-50 p-5">

          <div className="flex items-center gap-3">

            <ShieldCheck className="text-indigo-600" />

            <span className="font-medium">
              Status
            </span>

          </div>

          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">

            {resume.uploadStatus}

          </span>

        </div>

      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">

        <Link
          href="/resume/view"
          className="flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-4 font-semibold text-white transition hover:bg-indigo-700"
        >

          <Eye size={18} />

          View Resume

        </Link>

        <button
          onClick={startAnalysis}
          disabled={analysisLoading}
          className="rounded-2xl border border-indigo-600 px-6 py-4 font-semibold text-indigo-600 transition hover:bg-indigo-50 disabled:opacity-50"
        >

          {analysisLoading
            ? "Analyzing..."
            : "Analyze Resume"}

        </button>

      </div>

    </div>

  );

}