"use client";

import { useState } from "react";
import { api } from "@/services/api";
import {
  Briefcase,
  Sparkles,
  Search,
  Trash2,
  Clipboard,
  Target,
} from "lucide-react";

interface JobMatchResponse {
  matchPercentage: number;
  matchedSkills: string;
  missingSkills: string;
  strengths: string;
  recommendations: string;
}

export default function JobMatcherPage() {

  const [jobDescription, setJobDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const [result, setResult] =
    useState<JobMatchResponse | null>(null);


function loadSampleJob() {

  setJobDescription(`Software Engineer

Responsibilities:

• Build scalable backend services using Java and Spring Boot.

• Develop REST APIs.

• Work with React.js frontend.

• Design PostgreSQL databases.

• Collaborate using Git.

Requirements:

• Java

• Spring Boot

• React

• PostgreSQL

• REST API

• Git

• Docker

• AWS

• JWT Authentication

• Microservices`);

}
async function analyze() {
    if (!jobDescription.trim()) {
      alert("Please paste Job Description.");
      return;
    }

    try {

      setLoading(true);

      const response =
        await api.post<JobMatchResponse>(
          "/job-match",
          {
            jobDescription,
          }
        );

      setResult(response.data);

    } catch (e) {

      console.error(e);

      alert("Failed to analyze.");

    } finally {

      setLoading(false);

    }

  }

  function splitItems(text: string) {

    return text
      .split(/,|\n|•|-|\d+\./)
      .map((s) => s.trim())
      .filter(Boolean);

  }

  return (

    <div className="space-y-8">

      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 p-10 text-white shadow-xl">

      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

      <div>

      <p className="text-indigo-100">

      AI Powered Matching

      </p>

      <h1 className="mt-3 text-5xl font-bold">

      Job Matcher

      </h1>

      <p className="mt-5 max-w-2xl text-lg text-indigo-100">

      Paste any Job Description and instantly compare it with your uploaded resume.

      Get ATS match score, missing skills and AI recommendations.

      </p>

      </div>

      <div className="rounded-3xl bg-white/10 p-8 backdrop-blur">

      <Target size={55} />

      <h2 className="mt-5 text-4xl font-bold">

      AI Match

      </h2>

      <p className="mt-3 text-indigo-100">

      Resume vs Job Description

      </p>

      </div>

      </div>

      </section>
      <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">

      <div className="flex items-center justify-between">

      <div>

      <h2 className="text-2xl font-bold">

      Job Description

      </h2>

      <p className="mt-2 text-zinc-500">

      Paste the complete Job Description.

      </p>

      </div>

      <div className="rounded-xl bg-indigo-100 p-3">

      <Search
      className="text-indigo-600"
      />

      </div>

      </div>

      <textarea

      rows={14}

      value={jobDescription}

      onChange={(e)=>setJobDescription(e.target.value)}

      placeholder="Paste Job Description here..."

      className="mt-8 w-full rounded-2xl border border-zinc-200 bg-zinc-50 p-6 text-[15px] outline-none transition focus:border-indigo-500"

      />

      <div className="mt-3 flex justify-end">

      <span className="text-sm text-zinc-500">

      {jobDescription.length} Characters

      </span>

      </div>

      <div className="mt-8 flex flex-wrap gap-4">

      <button

      onClick={loadSampleJob}

      className="flex items-center gap-2 rounded-2xl border border-zinc-300 px-6 py-3 transition hover:bg-zinc-100"

      >

      <Clipboard size={18}/>

      Sample JD

      </button>

      <button

      onClick={()=>setJobDescription("")}

      className="flex items-center gap-2 rounded-2xl border border-red-300 px-6 py-3 text-red-600 transition hover:bg-red-50"

      >

      <Trash2 size={18}/>

      Clear

      </button>

      <button

      onClick={analyze}

      disabled={loading}

      className="ml-auto rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-3 font-semibold text-white shadow-lg transition hover:scale-105 disabled:opacity-50"

      >

      {

      loading

      ?

      "Analyzing..."

      :

      "Analyze Match"

      }

      </button>

      </div>

      </div>

      {result && (

        <>
          {/* Match Score */}

          <div className="grid gap-6 lg:grid-cols-3">

            <div className="rounded-3xl bg-gradient-to-r from-emerald-500 to-green-600 p-10 text-center text-white shadow-xl">

              <p className="text-lg opacity-90">

                Resume Match

              </p>

              <h1 className="mt-5 text-8xl font-bold">

                {result.matchPercentage}%

              </h1>

              <div className="mt-8 h-4 rounded-full bg-white/20">

                <div
                  className="h-4 rounded-full bg-white"
                  style={{
                    width: `${result.matchPercentage}%`,
                  }}
                />

              </div>

              <p className="mt-5">

                Overall Compatibility

              </p>

            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm lg:col-span-2">

              <h2 className="text-3xl font-bold">

                AI Verdict

              </h2>

              <p className="mt-5 text-lg leading-8 text-zinc-600">

                Your resume has a

                <span className="font-bold text-emerald-600">

                  {" "}
                  {result.matchPercentage}%{" "}

                </span>

                compatibility with this Job Description.

                Improve the missing skills below to maximize your chances.

              </p>

            </div>

          </div>

          {/* Skills */}

          <div className="grid gap-6 lg:grid-cols-2">

            <div className="rounded-3xl border border-green-200 bg-green-50 p-8">

              <h2 className="mb-6 text-2xl font-bold text-green-700">

                ✅ Matched Skills

              </h2>

              <div className="flex flex-wrap gap-3">

                {splitItems(result.matchedSkills).map((skill) => (

                  <span
                    key={skill}
                    className="rounded-full bg-green-600 px-5 py-3 font-medium text-white shadow"
                  >

                    {skill}

                  </span>

                ))}

              </div>

            </div>

            <div className="rounded-3xl border border-red-200 bg-red-50 p-8">

              <h2 className="mb-6 text-2xl font-bold text-red-700">

                ❌ Missing Skills

              </h2>

              <div className="flex flex-wrap gap-3">

                {splitItems(result.missingSkills).map((skill) => (

                  <span
                    key={skill}
                    className="rounded-full bg-red-600 px-5 py-3 font-medium text-white shadow"
                  >

                    {skill}

                  </span>

                ))}

              </div>

            </div>

          </div>

          {/* Strength */}

          <div className="rounded-3xl bg-white p-8 shadow-sm">

            <h2 className="mb-8 text-3xl font-bold">

              💪 Resume Strengths

            </h2>

            <div className="grid gap-5 md:grid-cols-2">

              {splitItems(result.strengths).map((item) => (

                <div
                  key={item}
                  className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 transition hover:border-green-500 hover:shadow-md"
                >

                  ✔ {item}

                </div>

              ))}

            </div>

          </div>

          {/* Recommendations */}

          <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 p-8 text-white shadow-xl">

            <div className="mb-8 flex items-center gap-3">

              <Sparkles size={28} />

              <h2 className="text-3xl font-bold">

                AI Recommendations

              </h2>

            </div>

            <div className="space-y-5">

              {splitItems(result.recommendations).map((item) => (

                <div
                  key={item}
                  className="rounded-2xl bg-white/10 p-5 backdrop-blur"
                >

                  💡 {item}

                </div>

              ))}

            </div>

          </div>

        </>

      )}

    </div>

  );

}