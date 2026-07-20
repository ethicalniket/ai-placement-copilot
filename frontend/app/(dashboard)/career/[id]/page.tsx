"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import careerService from "@/services/careerService";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  CalendarDays,
  BookOpen,
  FolderKanban,
} from "lucide-react";
export default function CareerRoadmapPage() {
  const { id } = useParams();
  const router = useRouter();

  const [roadmap, setRoadmap] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadRoadmap = async () => {
    try {
      const data = await careerService.getRoadmap(Number(id));
      setRoadmap(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) loadRoadmap();
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl space-y-6 p-6 animate-pulse">

        <div className="h-52 rounded-3xl bg-muted"></div>

        <div className="grid gap-6 md:grid-cols-3">

          <div className="h-44 rounded-3xl bg-muted"></div>

          <div className="h-44 rounded-3xl bg-muted"></div>

          <div className="h-44 rounded-3xl bg-muted"></div>

        </div>

        <div className="h-96 rounded-3xl bg-muted"></div>

      </div>
    );
  }

 if (!roadmap) {
   return (
     <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center p-6 text-center">

       <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">

         📄

       </div>

       <h2 className="text-3xl font-bold">

         Roadmap Not Found

       </h2>

       <p className="mt-3 text-muted-foreground">

         This roadmap doesn't exist or may have been deleted.

       </p>

       <Button
         className="mt-8 rounded-xl"
         onClick={() => router.push("/career/history")}
       >
         Back to History
       </Button>

     </div>
   );
 }

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 p-8 text-white shadow-xl">

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          <div>

            <p className="text-sm uppercase tracking-widest text-indigo-200">
              AI Generated Career Plan
            </p>

            <h1 className="mt-2 text-4xl font-bold">
              Career Roadmap
            </h1>

            <p className="mt-3 text-indigo-100">
              Personalized learning roadmap based on your career goal.
            </p>

          </div>



        </div>

      </div>

     <Card className="rounded-3xl border-0 shadow-lg">

       <CardHeader>

         <CardTitle className="flex items-center gap-3 text-2xl">

           <CheckCircle2 className="h-7 w-7 text-green-600" />

           Your Strengths

         </CardTitle>

       </CardHeader>

       <CardContent>

         <div className="flex flex-wrap gap-3">

           {roadmap.strengths?.map(
             (item: string, index: number) => (

               <div
                 key={index}
                 className="rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700 transition hover:scale-105 dark:border-green-800 dark:bg-green-900/30 dark:text-green-300"
               >
                 ✅ {item}
               </div>

             )
           )}

         </div>

       </CardContent>

     </Card>

     <Card className="rounded-3xl border-0 shadow-lg">

       <CardHeader>

         <CardTitle className="flex items-center gap-3 text-2xl">

           <AlertTriangle className="h-7 w-7 text-red-600" />

           Missing Skills

         </CardTitle>

       </CardHeader>

       <CardContent>

         <div className="flex flex-wrap gap-3">

           {roadmap.missingSkills?.map(
             (item: string, index: number) => (

               <div
                 key={index}
                 className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition hover:scale-105 dark:border-red-800 dark:bg-red-900/30 dark:text-red-300"
               >
                 ⚠ {item}
               </div>

             )
           )}

         </div>

       </CardContent>

     </Card>

      <Card className="rounded-3xl border-0 shadow-lg">

        <CardHeader>

          <CardTitle className="flex items-center gap-3 text-2xl">

            <Lightbulb className="h-7 w-7 text-amber-500" />

            AI Recommendations

          </CardTitle>

        </CardHeader>

        <CardContent>

          <div className="grid gap-4 md:grid-cols-2">

            {roadmap.recommendations?.map(
              (item: string, index: number) => (

                <div
                  key={index}
                  className="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-blue-800 dark:from-blue-950/30 dark:to-indigo-950/30"
                >

                  <div className="flex items-start gap-3">

                    <Lightbulb className="mt-1 h-5 w-5 text-blue-600" />

                    <p className="text-sm leading-6">

                      {item}

                    </p>

                  </div>

                </div>

              )
            )}

          </div>

        </CardContent>

      </Card>

      <Card className="rounded-3xl border-0 shadow-xl">

        <CardHeader>

          <CardTitle className="flex items-center gap-3 text-2xl">

            <CalendarDays className="h-7 w-7 text-indigo-600" />

            AI Learning Roadmap

          </CardTitle>

        </CardHeader>

        <CardContent>

          <div className="space-y-8">

            {roadmap.roadmap?.map((month: any, index: number) => (

              <div
                key={index}
                className="relative rounded-3xl border bg-background p-6 shadow-sm transition-all hover:shadow-lg"
              >

                {/* Timeline Line */}

                {index !== roadmap.roadmap.length - 1 && (
                  <div className="absolute left-8 top-20 h-full w-[2px] bg-indigo-200"></div>
                )}

                <div className="flex gap-5">

                  {/* Month Circle */}

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-lg font-bold text-white shadow-lg">

                    {index + 1}

                  </div>

                  <div className="flex-1">

                    <h2 className="text-2xl font-bold">

                      {month.month}

                    </h2>

                    {/* Goal */}

                    <div className="mt-5 rounded-xl bg-indigo-50 p-4 dark:bg-indigo-950/30">

                      <div className="flex items-center gap-2 font-semibold">

                        🎯 Goal

                      </div>

                      <p className="mt-2 text-muted-foreground">

                        {month.goal}

                      </p>

                    </div>

                    {/* Topics */}

                    <div className="mt-5">

                      <div className="mb-3 flex items-center gap-2 font-semibold">

                        <BookOpen className="h-5 w-5 text-indigo-600" />

                        Topics

                      </div>

                      <div className="flex flex-wrap gap-2">

                        {month.topics?.map((topic: string, i: number) => (

                          <span
                            key={i}
                            className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300"
                          >
                            {topic}
                          </span>

                        ))}

                      </div>

                    </div>

                    {/* Project */}

                    <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-950/20">

                      <div className="flex items-center gap-2 font-semibold text-emerald-700 dark:text-emerald-300">

                        <FolderKanban className="h-5 w-5" />

                        Project

                      </div>

                      <p className="mt-2">

                        {month.project}

                      </p>

                    </div>

                    {/* Resources */}

                    <div className="mt-5">

                      <div className="mb-3 font-semibold">

                        📚 Recommended Resources

                      </div>

                      <div className="grid gap-3 md:grid-cols-2">

                        {month.resources?.map(
                          (resource: string, i: number) => (

                            <div
                              key={i}
                              className="rounded-xl border bg-card p-3 transition hover:border-indigo-400 hover:shadow"
                            >
                              🔗 {resource}
                            </div>

                          )
                        )}

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </CardContent>

      </Card>
<div className="sticky bottom-6 mt-6 flex justify-end gap-4">

  <Button
    variant="outline"
    className="rounded-xl"
    onClick={() => router.push("/career/history")}
  >
    <ArrowLeft className="mr-2 h-4 w-4" />
    Back
  </Button>

  <Button
    className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600"
    onClick={async () => {
      try {
        await careerService.regenerateRoadmap(Number(id));
        loadRoadmap();
      } catch (err) {
        console.error(err);
      }
    }}
  >
    Regenerate AI Roadmap
  </Button>

</div>
    </div>
  );
}