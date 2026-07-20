"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import careerService, {
  CareerRoadmapRequest,
} from "@/services/careerService";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Sparkles,
  GraduationCap,
  Target,
  Building2,
  Brain,
  Clock3,
  History,
  ArrowRight,
} from "lucide-react";

export default function CareerPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [recentRoadmaps, setRecentRoadmaps] = useState<any[]>([]);

  const [skillsInput, setSkillsInput] = useState("");

  const [formData, setFormData] = useState<CareerRoadmapRequest>({
    education: "",
    targetRole: "",
    targetCompany: "",
    experienceLevel: "Fresher",
    timeline: 6,
    dailyStudyHours: 2,
    currentSkills: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "timeline" || name === "dailyStudyHours"
          ? Number(value)
          : value,
    }));
  };

  const loadRecentRoadmaps = async () => {
    try {
      const data = await careerService.getHistory();
      setRecentRoadmaps(data.slice(0, 3));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadRecentRoadmaps();
  }, []);

  const handleGenerate = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...formData,
        currentSkills: skillsInput
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s !== ""),
      };

      await careerService.generateRoadmap(payload);

      await loadRecentRoadmaps();

      router.push("/career/history");
    } catch (err) {
      console.error(err);
      alert("Failed to generate roadmap");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6">

      <div className="relative overflow-hidden rounded-3xl border border-indigo-200/40 bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 shadow-2xl">

        {/* Background Blur */}

        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>

        <div className="absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>

        <div className="relative z-10 p-8 md:p-12">

          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

            {/* LEFT */}

            <div className="max-w-3xl">

              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-5 py-2 text-sm font-medium backdrop-blur">

                <Sparkles className="h-4 w-4" />

                AI Powered Career Planner

              </div>

              <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white md:text-6xl">

                Build Your

                <span className="block text-yellow-300">

                  Dream Career

                </span>

              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-indigo-100">

                Generate an AI-powered roadmap based on your education,
                experience, skills and dream company.

                Learn exactly what to study, what to build and what to
                practice to become placement ready.

              </p>

              <div className="mt-8 flex flex-wrap gap-3">

                <div className="rounded-full bg-white/15 px-4 py-2 backdrop-blur">

                  Java

                </div>

                <div className="rounded-full bg-white/15 px-4 py-2 backdrop-blur">

                  Spring Boot

                </div>

                <div className="rounded-full bg-white/15 px-4 py-2 backdrop-blur">

                  React

                </div>

                <div className="rounded-full bg-white/15 px-4 py-2 backdrop-blur">

                  DSA

                </div>

                <div className="rounded-full bg-white/15 px-4 py-2 backdrop-blur">

                  System Design

                </div>

              </div>

            </div>

            {/* RIGHT */}

            <div className="grid w-full max-w-md grid-cols-2 gap-5">

              <Card className="rounded-3xl border-0 bg-white/20 text-white backdrop-blur-xl">

                <CardContent className="p-6">

                  <Brain className="mb-3 h-8 w-8" />

                  <h2 className="text-3xl font-bold">

                    AI

                  </h2>

                  <p className="mt-2 text-sm text-indigo-100">

                    Smart Guidance

                  </p>

                </CardContent>

              </Card>

              <Card className="rounded-3xl border-0 bg-white/20 text-white backdrop-blur-xl">

                <CardContent className="p-6">

                  <Clock3 className="mb-3 h-8 w-8" />

                  <h2 className="text-3xl font-bold">

                    24×7

                  </h2>

                  <p className="mt-2 text-sm text-indigo-100">

                    Career Support

                  </p>

                </CardContent>

              </Card>

              <Card className="rounded-3xl border-0 bg-white/20 text-white backdrop-blur-xl">

                <CardContent className="p-6">

                  <Target className="mb-3 h-8 w-8" />

                  <h2 className="text-3xl font-bold">

                    100%

                  </h2>

                  <p className="mt-2 text-sm text-indigo-100">

                    Personalized

                  </p>

                </CardContent>

              </Card>

              <Card className="rounded-3xl border-0 bg-white/20 text-white backdrop-blur-xl">

                <CardContent className="p-6">

                  <GraduationCap className="mb-3 h-8 w-8" />

                  <h2 className="text-3xl font-bold">

                    Job

                  </h2>

                  <p className="mt-2 text-sm text-indigo-100">

                    Placement Ready

                  </p>

                </CardContent>

              </Card>

            </div>

          </div>

          <div className="mt-10 flex flex-wrap gap-4">

            <Button
              size="lg"
              className="rounded-xl bg-white px-8 text-indigo-700 hover:bg-gray-100"
            >
              Generate Roadmap
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push("/career/history")}
              className="rounded-xl border-white bg-transparent px-8 text-white hover:bg-white hover:text-indigo-700"
            >
              <History className="mr-2 h-5 w-5" />

              View History

            </Button>

          </div>

        </div>

      </div>

       <form onSubmit={handleGenerate} className="space-y-8">

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

          {/* Career Information */}

          <Card className="rounded-3xl border-0 shadow-xl">

            <CardHeader>

              <CardTitle className="flex items-center gap-3 text-2xl">

                <GraduationCap className="h-7 w-7 text-indigo-600" />

                Career Information

              </CardTitle>

            </CardHeader>

            <CardContent className="space-y-6">

              <div>

                <Label className="mb-2 block font-medium">

                  Education

                </Label>

                <Input
                  name="education"
                  placeholder="B.Tech Computer Science"
                  value={formData.education}
                  onChange={handleChange}
                  className="h-12 rounded-xl"
                />

              </div>

              <div>

                <Label className="mb-2 block font-medium">

                  Target Role

                </Label>

                <Input
                  name="targetRole"
                  placeholder="Java Backend Developer"
                  value={formData.targetRole}
                  onChange={handleChange}
                  className="h-12 rounded-xl"
                />

              </div>

              <div>

                <Label className="mb-2 block font-medium">

                  Dream Company

                </Label>

                <Input
                  name="targetCompany"
                  placeholder="Google / Microsoft / Amazon"
                  value={formData.targetCompany}
                  onChange={handleChange}
                  className="h-12 rounded-xl"
                />

              </div>

              <div>

                <Label className="mb-2 block font-medium">

                  Experience Level

                </Label>

                <select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  className="h-12 w-full rounded-xl border bg-background px-4"
                >

                  <option>Fresher</option>

                  <option>Beginner</option>

                  <option>Intermediate</option>

                  <option>Experienced</option>

                </select>

              </div>

            </CardContent>

          </Card>

          {/* Learning Plan */}

          <Card className="rounded-3xl border-0 shadow-xl">

            <CardHeader>

              <CardTitle className="flex items-center gap-3 text-2xl">

                <Clock3 className="h-7 w-7 text-violet-600" />

                Learning Plan

              </CardTitle>

            </CardHeader>

            <CardContent className="space-y-6">

              <div>

                <Label className="mb-2 block font-medium">

                  Timeline (Months)

                </Label>

                <Input
                  type="number"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="h-12 rounded-xl"
                />

              </div>

              <div>

                <Label className="mb-2 block font-medium">

                  Daily Study Hours

                </Label>

                <Input
                  type="number"
                  name="dailyStudyHours"
                  value={formData.dailyStudyHours}
                  onChange={handleChange}
                  className="h-12 rounded-xl"
                />

              </div>

              <div className="rounded-2xl bg-gradient-to-r from-indigo-50 to-violet-50 p-6">

                <h3 className="font-semibold text-indigo-700">

                  💡 AI Suggestion

                </h3>

                <p className="mt-2 text-sm text-gray-600">

                  Studying consistently for 2–3 hours every day is usually
                  more effective than long sessions once or twice a week.

                </p>

              </div>

            </CardContent>

          </Card>

        </div>

        {/* ====================================================== */}
        {/* CURRENT SKILLS */}
        {/* ====================================================== */}

        <Card className="rounded-3xl border-0 shadow-xl">

          <CardHeader>

            <CardTitle className="flex items-center gap-3 text-2xl">

              <Brain className="h-7 w-7 text-purple-600" />

              Current Skills

            </CardTitle>

          </CardHeader>

          <CardContent>

            <Label className="mb-2 block font-medium">
              Enter skills separated by commas
            </Label>

            <textarea
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              placeholder="Java, Spring Boot, SQL, React, Git, Docker"
              className="min-h-[170px] w-full rounded-2xl border bg-background p-4 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300"
            />

            <p className="mt-3 text-sm text-muted-foreground">
              Example:
              Java, Spring Boot, REST API, PostgreSQL, React
            </p>

          </CardContent>

        </Card>

        {/* ====================================================== */}
        {/* GENERATE BUTTON */}
        {/* ====================================================== */}

        <div className="flex justify-center">

          <Button
            type="submit"
            disabled={loading}
            size="lg"
            className="h-14 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 px-12 text-lg font-semibold shadow-xl transition hover:scale-[1.02]"
          >

            {loading ? (

              <>
                Generating Roadmap...
              </>

            ) : (

              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Generate AI Career Roadmap
              </>

            )}

          </Button>

        </div>

        </form>

        {/* ====================================================== */}
        {/* RECENT ROADMAPS */}
        {/* ====================================================== */}

        <Card className="rounded-3xl border-0 shadow-xl">

          <CardHeader className="flex flex-row items-center justify-between">

            <CardTitle className="text-2xl">

              Recent Roadmaps

            </CardTitle>

            <Button
              variant="outline"
              onClick={() => router.push("/career/history")}
            >
              View All
            </Button>

          </CardHeader>

          <CardContent>

            {recentRoadmaps.length === 0 ? (

              <div className="rounded-2xl border border-dashed py-16 text-center">

                <History className="mx-auto mb-4 h-12 w-12 text-gray-400" />

                <h3 className="text-lg font-semibold">

                  No Roadmaps Found

                </h3>

                <p className="mt-2 text-muted-foreground">

                  Generate your first AI roadmap.

                </p>

              </div>

            ) : (

              <div className="space-y-5">

                {recentRoadmaps.map((roadmap: any) => (

                  <div
                    key={roadmap.id}
                    className="group flex flex-col gap-5 rounded-3xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl md:flex-row md:items-center md:justify-between dark:bg-zinc-900"
                  >

                    <div>

                      <h2 className="text-xl font-bold">

                        {roadmap.targetRole}

                      </h2>

                      <p className="mt-1 text-muted-foreground">

                        {roadmap.targetCompany}

                      </p>

                    </div>

                    <Button
                      onClick={() =>
                        router.push(`/career/${roadmap.id}`)
                      }
                    >

                      View Roadmap

                      <ArrowRight className="ml-2 h-4 w-4" />

                    </Button>

                  </div>

                ))}

              </div>

            )}

          </CardContent>

        </Card>
    </div>
  );
}