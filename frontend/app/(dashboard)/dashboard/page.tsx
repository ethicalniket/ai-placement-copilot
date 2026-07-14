import StatCard from "@/components/dashboard/stat-card";

import {
  ArrowRight,
  Brain,
  Briefcase,
  CheckCircle2,
  FileText,
  MessageSquare,
  Search,
  Sparkles,
  TrendingUp,
  Upload,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">

      {/* Hero */}

      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 p-10 text-white shadow-xl">

        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-center">

          <div>

            <p className="mb-3 text-indigo-100">

              Welcome Back 👋

            </p>

            <h1 className="text-5xl font-bold">

              Ready to crack your placement?

            </h1>

            <p className="mt-5 max-w-2xl text-indigo-100">

              Upload your resume, improve ATS score,
              match jobs instantly and practice AI
              interviews from one dashboard.

            </p>

            <button className="mt-8 flex items-center gap-2 rounded-2xl bg-white px-6 py-4 font-semibold text-indigo-700 transition hover:scale-105">

              Start Preparing

              <ArrowRight size={18} />

            </button>

          </div>

          <div className="grid grid-cols-2 gap-5">

            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">

              <p className="text-sm text-indigo-100">

                ATS Score

              </p>

              <h2 className="mt-2 text-4xl font-bold">

                82%

              </h2>

            </div>

            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">

              <p className="text-sm text-indigo-100">

                Job Match

              </p>

              <h2 className="mt-2 text-4xl font-bold">

                76%

              </h2>

            </div>

            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">

              <p className="text-sm text-indigo-100">

                Interviews

              </p>

              <h2 className="mt-2 text-4xl font-bold">

                15

              </h2>

            </div>

            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">

              <p className="text-sm text-indigo-100">

                Progress

              </p>

              <h2 className="mt-2 text-4xl font-bold">

                68%

              </h2>

            </div>

          </div>

        </div>

      </section>

      {/* Stats */}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Resume"
          value="Uploaded"
          subtitle="Resume Available"
          icon={<FileText size={28} />}
        />

        <StatCard
          title="ATS Score"
          value="82%"
          subtitle="Excellent"
          icon={<Brain size={28} />}
        />

        <StatCard
          title="Job Match"
          value="76%"
          subtitle="Good Match"
          icon={<Briefcase size={28} />}
        />

        <StatCard
          title="Interview"
          value="Ready"
          subtitle="15 Questions"
          icon={<MessageSquare size={28} />}
        />

      </section>

      {/* Bottom */}

      <section className="grid gap-6 xl:grid-cols-3">

        {/* Quick */}

        <div className="rounded-3xl bg-white p-8 shadow">

          <h2 className="mb-6 text-2xl font-bold">

            Quick Actions

          </h2>

          <div className="space-y-4">

            {[
              {
                icon: Upload,
                title: "Upload Resume",
              },
              {
                icon: Sparkles,
                title: "Analyze Resume",
              },
              {
                icon: Search,
                title: "Find Matching Jobs",
              },
              {
                icon: MessageSquare,
                title: "Mock Interview",
              },
            ].map((item) => {

              const Icon = item.icon;

              return (

                <button
                  key={item.title}
                  className="flex w-full items-center justify-between rounded-2xl border border-zinc-200 p-5 transition hover:border-indigo-500 hover:bg-indigo-50"
                >

                  <div className="flex items-center gap-4">

                    <div className="rounded-xl bg-indigo-100 p-3">

                      <Icon
                        size={20}
                        className="text-indigo-700"
                      />

                    </div>

                    <span className="font-medium">

                      {item.title}

                    </span>

                  </div>

                  <ArrowRight size={18} />

                </button>

              );

            })}

          </div>

        </div>

        {/* Progress */}

        <div className="rounded-3xl bg-white p-8 shadow">

          <h2 className="mb-6 text-2xl font-bold">

            Placement Progress

          </h2>

          <div className="space-y-6">

            {[
              ["Resume Uploaded", 100],
              ["ATS Optimized", 82],
              ["Job Matching", 76],
              ["Interview Ready", 68],
            ].map(([title, value]) => (

              <div key={title}>

                <div className="mb-2 flex justify-between">

                  <span>{title}</span>

                  <span>{value}%</span>

                </div>

                <div className="h-3 rounded-full bg-zinc-200">

                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600"
                    style={{
                      width: `${value}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Activity */}

        <div className="rounded-3xl bg-white p-8 shadow">

          <h2 className="mb-6 text-2xl font-bold">

            Recent Activity

          </h2>

          <div className="space-y-6">

            {[
              "Resume Uploaded",
              "ATS Score Generated",
              "Job Match Completed",
              "Interview Ready",
              "Profile Updated",
            ].map((item) => (

              <div
                key={item}
                className="flex items-center gap-4"
              >

                <div className="rounded-full bg-green-100 p-2">

                  <CheckCircle2
                    className="text-green-600"
                    size={18}
                  />

                </div>

                <div>

                  <p className="font-medium">

                    {item}

                  </p>

                  <p className="text-sm text-zinc-500">

                    Just now

                  </p>

                </div>

              </div>

            ))}

          </div>

          <div className="mt-8 rounded-2xl bg-indigo-50 p-5">

            <div className="flex items-center gap-3">

              <TrendingUp
                className="text-indigo-600"
              />

              <div>

                <p className="font-semibold">

                  Keep Going 🚀

                </p>

                <p className="text-sm text-zinc-600">

                  You're closer to placement than
                  yesterday.

                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}