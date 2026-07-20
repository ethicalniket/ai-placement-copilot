"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import careerService from "@/services/careerService";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  Briefcase,
  Building2,
  Calendar,
  Sparkles,
  Plus,
  ArrowRight,
  Trash2,
  RefreshCw,
  Eye,
} from "lucide-react";

interface HistoryItem {
  id: number;
  targetRole: string;
  targetCompany: string;
  createdAt: string;
}

export default function CareerHistoryPage() {

  const router = useRouter();

  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadHistory = async () => {
    try {
      const data = await careerService.getHistory();
      setHistory(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this roadmap?")) return;

    try {
      await careerService.deleteRoadmap(id);
      loadHistory();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRegenerate = async (id: number) => {
    try {
      await careerService.regenerateRoadmap(id);
      loadHistory();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl space-y-6 p-6 animate-pulse">

        <div className="h-56 rounded-3xl bg-muted"></div>

        {[1,2,3].map((i)=>(
          <div
            key={i}
            className="h-52 rounded-3xl bg-muted"
          />
        ))}

      </div>
    );
  }

  if (!loading && history.length === 0) {
    return (

      <div className="mx-auto max-w-5xl space-y-8">

        <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 p-8 text-white shadow-xl">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div>

              <p className="text-sm uppercase tracking-[0.3em] text-indigo-200">

                AI Career Planner

              </p>

              <h1 className="mt-3 text-4xl font-bold">

                Career History

              </h1>

              <p className="mt-4 max-w-xl text-indigo-100">

                View all your AI generated career roadmaps,
                regenerate them anytime and continue your learning journey.

              </p>

            </div>

            <Button
              size="lg"
              className="rounded-xl bg-white text-indigo-700 hover:bg-indigo-50"
              onClick={() => router.push("/career")}
            >
              <Plus className="mr-2 h-5 w-5" />
              Generate New
            </Button>

          </div>

        </div>

        <Card className="rounded-3xl border-dashed py-16">

          <CardContent className="flex flex-col items-center text-center">

            <Sparkles className="h-16 w-16 text-indigo-600" />

            <h2 className="mt-6 text-3xl font-bold">

              No Career Roadmaps Yet

            </h2>

            <p className="mt-3 max-w-lg text-muted-foreground">

              Generate your first AI powered roadmap and
              track every roadmap from this page.

            </p>

            <Button
              className="mt-8 rounded-xl"
              onClick={() => router.push("/career")}
            >
              <Plus className="mr-2 h-4 w-4" />
              Generate First Roadmap
            </Button>

          </CardContent>

        </Card>

      </div>

    );
  }

  return (

   <div className="mx-auto max-w-6xl space-y-10">

      <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 p-8 text-white shadow-xl">

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          <div>

            <p className="text-sm uppercase tracking-[0.3em] text-indigo-200">

              AI Career Planner

            </p>

            <h1 className="mt-3 text-4xl font-bold">

              Career Roadmap History

            </h1>

            <p className="mt-4 max-w-2xl text-indigo-100">

              Browse every roadmap you've generated,
              regenerate old plans and continue your career preparation.

            </p>

          </div>

          <Button
            size="lg"
            className="rounded-xl bg-white text-indigo-700 hover:bg-indigo-50"
            onClick={() => router.push("/career")}
          >
            <Plus className="mr-2 h-5 w-5" />
            Generate New
          </Button>

        </div>

      </div>

<div className="grid gap-6 md:grid-cols-3">

  <Card className="rounded-3xl shadow-lg">
    <CardContent className="p-6">
      <p className="text-sm text-muted-foreground">
        Total Roadmaps
      </p>

      <h2 className="mt-2 text-4xl font-bold">
        {history.length}
      </h2>
    </CardContent>
  </Card>

  <Card className="rounded-3xl shadow-lg">
    <CardContent className="p-6">
      <p className="text-sm text-muted-foreground">
        Latest Target
      </p>

      <h2 className="mt-2 text-xl font-bold">
        {history[0]?.targetRole ?? "-"}
      </h2>
    </CardContent>
  </Card>

  <Card className="rounded-3xl shadow-lg">
    <CardContent className="p-6">
      <p className="text-sm text-muted-foreground">
        Companies
      </p>

      <h2 className="mt-2 text-xl font-bold">
        {new Set(history.map(h => h.targetCompany)).size}
      </h2>
    </CardContent>
  </Card>

</div>

      <div className="space-y-6">
      {history.map((item) => (

        <Card
          key={item.id}
          className="overflow-hidden rounded-3xl border shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-2xl"
        >

          <CardContent className="p-0">

            <div className="border-b bg-gradient-to-r from-slate-50 to-indigo-50 p-6 dark:from-slate-900 dark:to-slate-800">

              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                <div className="space-y-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg">

                      <Briefcase className="h-7 w-7" />

                    </div>

                    <div>

                      <h2 className="text-2xl font-bold">

                        {item.targetRole}

                      </h2>

                      <p className="text-sm text-muted-foreground">

                        AI Generated Career Roadmap

                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">

                        Roadmap #{item.id}

                      </p>

                    </div>

                  </div>

                  <div className="flex flex-wrap gap-3">

                    <div className="flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">

                      <Building2 className="h-4 w-4" />

                      {item.targetCompany}

                    </div>

                    <div className="flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">

                      <Calendar className="h-4 w-4" />

                      {new Date(item.createdAt).toLocaleString()}

                    </div>

                  </div>

                </div>

                <div className="rounded-full bg-indigo-100 px-5 py-2 text-sm font-semibold text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">

                  AI Generated

                </div>

              </div>

            </div>

            <div className="p-6">

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <Button
                  className="rounded-xl"
                  onClick={() => router.push(`/career/${item.id}`)}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View Roadmap
                </Button>

                <Button
                  variant="secondary"
                  className="rounded-xl"
                  onClick={() => handleRegenerate(item.id)}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Regenerate
                </Button>

                <Button
                  variant="destructive"
                  className="rounded-xl"
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>

                <Button
                  variant="outline"
                  className="rounded-xl"
                  onClick={() => router.push(`/career/${item.id}`)}
                >
                  Resume Learning

                  <ArrowRight className="ml-2 h-4 w-4" />

                </Button>

              </div>

            </div>

          </CardContent>

        </Card>

      ))}
            </div>

          </div>

        );
      }