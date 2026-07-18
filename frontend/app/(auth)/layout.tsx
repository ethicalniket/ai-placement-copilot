import {
  BriefcaseBusiness,
  BrainCircuit,
  Code2,
  Sparkles,
} from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* ================= LEFT SECTION ================= */}

        <div className="relative hidden overflow-hidden bg-black lg:flex">

          <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-black to-zinc-900" />

          <div className="absolute -left-28 -top-28 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />

          <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-violet-600/20 blur-3xl" />

          <div className="relative z-10 flex h-full flex-col justify-between p-16 text-white">

            <div>

              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/70 px-4 py-2 text-sm backdrop-blur">

                <Sparkles className="h-4 w-4 text-yellow-400" />

                AI Powered Platform

              </div>

              <h1 className="mt-10 text-6xl font-extrabold leading-tight">

                AI Placement

                <br />

                Copilot

              </h1>

              <p className="mt-8 max-w-lg text-lg leading-9 text-zinc-300">

                Crack placements faster using AI-powered career coaching,
                coding practice, mock interviews, resume analysis and
                personalized preparation.

              </p>

            </div>

            <div className="space-y-8">

              <div className="flex items-start gap-4">

                <BrainCircuit className="mt-1 h-8 w-8 text-blue-400" />

                <div>

                  <h3 className="font-semibold text-lg">
                    AI Career Coach
                  </h3>

                  <p className="text-zinc-400">
                    Personalized learning path and career guidance.
                  </p>

                </div>

              </div>

              <div className="flex items-start gap-4">

                <Code2 className="mt-1 h-8 w-8 text-emerald-400" />

                <div>

                  <h3 className="font-semibold text-lg">
                    Coding Arena
                  </h3>

                  <p className="text-zinc-400">
                    Practice DSA, contests and company questions.
                  </p>

                </div>

              </div>

              <div className="flex items-start gap-4">

                <BriefcaseBusiness className="mt-1 h-8 w-8 text-orange-400" />

                <div>

                  <h3 className="font-semibold text-lg">
                    Placement Preparation
                  </h3>

                  <p className="text-zinc-400">
                    Resume builder, aptitude, interview and AI feedback.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ================= RIGHT SECTION ================= */}

        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-violet-100 px-6 py-10">

          {/* Background Blobs */}

          <div className="absolute -top-32 right-10 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="absolute bottom-0 left-0 h-[420px] w-[420px] rounded-full bg-violet-500/20 blur-3xl" />

          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

          {/* Grid Pattern */}

          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:42px_42px]" />

          {/* Noise Overlay */}

          <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]" />

          {/* Form */}

          <div className="relative z-10 w-full max-w-md">

            {children}

          </div>

        </div>

      </div>
    </div>
  );
}