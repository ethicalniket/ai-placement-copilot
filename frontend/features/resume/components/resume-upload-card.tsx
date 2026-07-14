"use client";

import { useRef, useState } from "react";

import { UploadCloud, FileText, Sparkles } from "lucide-react";

import { uploadResume } from "../api/upload-resume";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function ResumeUploadCard() {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const [uploading, setUploading] =
    useState(false);

  async function handleUpload(
    file: File
  ) {
    try {
      setUploading(true);

      await uploadResume(file);

      alert("Resume uploaded successfully.");

      window.location.reload();

    } catch (error: any) {

      alert(
        error?.response?.data?.message ??
          "Upload failed."
      );

    } finally {

      setUploading(false);

    }
  }

  return (

    <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">

      <div className="flex items-center gap-4">

        <div className="rounded-2xl bg-indigo-100 p-4">

          <UploadCloud
            className="text-indigo-600"
            size={30}
          />

        </div>

        <div>

          <h2 className="text-2xl font-bold">

            Upload Resume

          </h2>

          <p className="text-zinc-500">

            Upload your latest resume in PDF format.

          </p>

        </div>

      </div>

      <input

        ref={inputRef}

        type="file"

        accept=".pdf"

        hidden

        onChange={(e) => {

          if (e.target.files?.length) {

            handleUpload(
              e.target.files[0]
            );

          }

        }}

      />

      <button

        onClick={() =>
          inputRef.current?.click()
        }

        disabled={uploading}

        className="mt-8 flex h-60 w-full flex-col items-center justify-center rounded-3xl border-2 border-dashed border-indigo-300 bg-indigo-50 transition hover:border-indigo-500 hover:bg-indigo-100"

      >

        <FileText
          size={60}
          className="text-indigo-600"
        />

        <h3 className="mt-6 text-xl font-semibold">

          {

            uploading

              ? "Uploading Resume..."

              : "Choose Resume"

          }

        </h3>

        <p className="mt-2 text-sm text-zinc-500">

          Click here to browse your PDF

        </p>

        <div className="mt-8 rounded-xl bg-indigo-600 px-6 py-3 text-white shadow-lg">

          {

            uploading

              ? "Please Wait..."

              : "Upload PDF"

          }

        </div>

      </button>
<div className="mt-8 grid gap-4 md:grid-cols-2">

  <Button
    disabled={uploading}
    onClick={() =>
      inputRef.current?.click()
    }
    className="h-12"
  >
    {uploading
      ? "Uploading..."
      : "Upload Resume"}
  </Button>

  <Link
    href="/resume-builder"
    className="flex h-12 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 font-semibold text-white shadow-lg transition hover:scale-[1.02]"
  >
    Generate ATS Resume
  </Link>

</div>
      <div className="mt-8 rounded-2xl bg-zinc-50 p-5">

        <div className="flex items-center gap-3">

          <Sparkles
            className="text-indigo-600"
            size={20}
          />

          <div>

            <p className="font-semibold">

              AI Ready

            </p>

            <p className="text-sm text-zinc-500">

              Your uploaded resume can be used
              for ATS Analysis, Job Matching,
              and AI Interview.

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}