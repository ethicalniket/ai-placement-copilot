"use client";

import { useMemo, useState } from "react";

import {
  Brain,
  Briefcase,
  Loader2,
  Send,
  Trophy,
  CheckCircle2,
} from "lucide-react";

import {
  generateInterviewQuestions,
  evaluateInterviewAnswer,
  generateFinalInterviewReport,
} from "./api";

import {
  InterviewRequest,
  InterviewResponse,
  InterviewEvaluationResponse,
} from "./types";

import { Button } from "@/components/ui/button";

const initialRequest: InterviewRequest = {

  jobDescription: "",

  difficulty: "MEDIUM",

  interviewType: "RESUME",

  language: "English",

  numberOfQuestions: 10,

};

export default function Interview() {

  const [request, setRequest] =
    useState(initialRequest);

  const [loading, setLoading] =
    useState(false);

  const [questions, setQuestions] =
    useState<InterviewResponse | null>(null);

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answers, setAnswers] =
    useState<Record<number, string>>({});

  const [evaluations, setEvaluations] =
    useState<
      Record<number, InterviewEvaluationResponse>
    >({});

const [finalReport, setFinalReport] = useState<any>(null);

const [loadingReport, setLoadingReport] = useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const allQuestions = useMemo(() => {

    if (!questions)
      return [];

    return [

      ...questions.technicalQuestions,

      ...questions.projectQuestions,

      ...questions.hrQuestions,

      ...questions.followUpQuestions,

    ];

  }, [questions]);

  async function handleGenerate() {

    try {

      setLoading(true);

      const response =
        await generateInterviewQuestions(
          request
        );

      setQuestions(response);

     setCurrentQuestion(0);

     setAnswers({});

     setEvaluations({});

    } catch (e) {

      console.error(e);

      alert(
        "Failed to generate interview."
      );

    } finally {

      setLoading(false);

    }

  }

  async function handleSubmit() {

    if (!allQuestions.length)
      return;

    try {

      setSubmitting(true);

      const response =
        await evaluateInterviewAnswer({

          question:
            allQuestions[currentQuestion],

          candidateAnswer:
            answers[currentQuestion] ?? "",

          jobDescription:
            request.jobDescription,

          difficulty:
            request.difficulty,

          questionNumber:
            currentQuestion + 1,

          totalQuestions:
            allQuestions.length,



        });

     setEvaluations((prev) => ({
       ...prev,
       [currentQuestion]: response,
     }));

    } catch (e) {

      console.error(e);

      alert(
        "Evaluation failed."
      );

    } finally {

      setSubmitting(false);

    }

  }

  const handleFinishInterview = async () => {

    setLoadingReport(true);

    try {

      const report =
        await generateFinalInterviewReport({

          question: "",

          candidateAnswer: "",

          jobDescription: request.jobDescription,

          difficulty: request.difficulty,

          lastQuestion: true,

          interviewHistory:
            allQuestions.map((question, index) => ({

              question,

              answer: answers[index] ?? "",

            })),

        });

      setFinalReport(report);

    } catch (e) {

      console.error(e);

      alert("Failed to generate final report.");

    } finally {

      setLoadingReport(false);

    }

  };
  return (

    <div className="space-y-8">

      <div className="rounded-3xl border bg-white p-8 shadow-sm">

        <div className="mb-8 flex items-center gap-4">

          <div className="rounded-2xl bg-indigo-100 p-4">

            <Brain
              size={32}
              className="text-indigo-600"
            />

          </div>

          <div>

            <h1 className="text-3xl font-bold">

              AI Resume Interview

            </h1>

            <p className="text-zinc-500">

              Generate interview questions based on your uploaded resume and target job description.

            </p>

          </div>

        </div>

        <div className="space-y-6">

          <div>

            <label className="mb-2 block font-medium">

              Job Description

            </label>

            <textarea
              disabled={
                !!evaluations[currentQuestion]
              }

              rows={8}

              value={request.jobDescription}

              onChange={(e) =>

                setRequest({

                  ...request,

                  jobDescription: e.target.value,

                })

              }

              placeholder="Paste complete Job Description here..."

              className="w-full rounded-2xl border p-4 outline-none focus:border-indigo-500"

            />

          </div>

          <div className="grid gap-6 md:grid-cols-3">

            <div>

              <label className="mb-2 block font-medium">

                Difficulty

              </label>

              <select

                value={request.difficulty}

                onChange={(e) =>

                  setRequest({

                    ...request,

                    difficulty: e.target.value as
                      "EASY" |
                      "MEDIUM" |
                      "HARD",

                  })

                }

                className="w-full rounded-xl border p-3"

              >

                <option value="EASY">

                  Easy

                </option>

                <option value="MEDIUM">

                  Medium

                </option>

                <option value="HARD">

                  Hard

                </option>

              </select>

            </div>

            <div>

              <label className="mb-2 block font-medium">

                Questions

              </label>

              <input

                type="number"

                min={1}

                max={30}

                value={request.numberOfQuestions}

                onChange={(e) =>

                  setRequest({

                    ...request,

                    numberOfQuestions: Number(
                      e.target.value
                    ),

                  })

                }

                className="w-full rounded-xl border p-3"

              />

            </div>

            <div>

              <label className="mb-2 block font-medium">

                Language

              </label>

              <select

                value={request.language}

                onChange={(e) =>

                  setRequest({

                    ...request,

                    language: e.target.value,

                  })

                }

                className="w-full rounded-xl border p-3"

              >

                <option>

                  English

                </option>

                <option>

                  Hindi

                </option>

              </select>

            </div>

          </div>

          <Button

            onClick={handleGenerate}

            disabled={loading}

            className="h-12 rounded-xl px-8"

          >

            {

              loading ? (

                <>

                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />

                  Generating...

                </>

              ) : (

                <>

                  <Briefcase className="mr-2 h-4 w-4" />

                  Generate Interview

                </>

              )

            }

          </Button>

        </div>

      </div>

      {

        questions && allQuestions.length > 0 && (

          <div className="rounded-3xl border bg-white p-8 shadow-sm">

            <div className="mb-8 flex items-center justify-between">

              <div>

                <h2 className="text-2xl font-bold">

                  Interview

                </h2>

                <p className="text-zinc-500">

                  Question

                  {" "}

                  {currentQuestion + 1}

                  {" / "}

                  {allQuestions.length}

                </p>

              </div>

              <div className="rounded-xl bg-indigo-100 px-4 py-2 font-semibold text-indigo-700">

                {request.difficulty}

              </div>

            </div>

            <div className="rounded-2xl bg-zinc-50 p-6">

              <p className="text-lg font-medium leading-8">

                {

                  allQuestions[currentQuestion]

                }

              </p>

            </div>

            <div className="mt-8">

              <label className="mb-2 block font-medium">

                Your Answer

              </label>

              <textarea

                rows={10}

                value={
                  answers[currentQuestion] ?? ""
                }

                onChange={(e) =>
                  setAnswers((prev) => ({
                    ...prev,
                    [currentQuestion]:
                      e.target.value,
                  }))
                }

                placeholder="Write your answer here..."

                className="w-full rounded-2xl border p-4 outline-none focus:border-indigo-500"

              />

            </div>

            <div className="mt-8 flex gap-4">

              <Button

                variant="outline"

                disabled={

                  currentQuestion === 0

                }

                onClick={() => {

                  setCurrentQuestion(
                    (prev) => prev - 1
                  );

                }}

              >

                Previous

              </Button>

              <Button

                onClick={handleSubmit}

                disabled={

                  submitting ||

                  !(
                    answers[currentQuestion] ?? ""
                  ).trim()

                }

              >

                {

                  submitting

                  ? (

                    <>

                      <Loader2 className="mr-2 h-4 w-4 animate-spin"/>

                      Evaluating...

                    </>

                  )

                  : (

                    <>

                      <Send className="mr-2 h-4 w-4"/>

                      Submit Answer

                    </>

                  )

                }

              </Button>
{currentQuestion < allQuestions.length - 1 ? (
  <Button
    disabled={!evaluations[currentQuestion]}
    onClick={() => {
      setCurrentQuestion((prev) => prev + 1);
    }}
  >
    Next
  </Button>
) : (
  <Button
    disabled={!evaluations[currentQuestion] || loadingReport}
    onClick={handleFinishInterview}
  >
    {loadingReport ? "Generating Report..." : "Finish Interview"}
  </Button>
)}

            </div>

          </div>

        )

      }



       {!finalReport && evaluations[currentQuestion] && (

          <div className="rounded-3xl border bg-white p-8 shadow-sm">

            <div className="mb-8 flex items-center gap-4">

              <div className="rounded-2xl bg-green-100 p-4">

                <Trophy

                  className="text-green-600"

                  size={30}

                />

              </div>

              <div>

                <h2 className="text-2xl font-bold">

                  AI Interview Evaluation

                </h2>

                <p className="text-zinc-500">

                  Your answer has been evaluated by AI.

                </p>

              </div>

            </div>

            <div className="grid gap-5 md:grid-cols-4">

              <div className="rounded-2xl bg-indigo-50 p-5 text-center">

                <p className="text-sm text-zinc-500">

                  Overall

                </p>

                <h2 className="mt-2 text-3xl font-bold">

                  {evaluations[currentQuestion].overallScore}

                </h2>

              </div>

              <div className="rounded-2xl bg-blue-50 p-5 text-center">

                <p className="text-sm text-zinc-500">

                  Technical

                </p>

                <h2 className="mt-2 text-3xl font-bold">

                  {evaluations[currentQuestion].technicalScore}

                </h2>

              </div>

              <div className="rounded-2xl bg-purple-50 p-5 text-center">

                <p className="text-sm text-zinc-500">

                  Communication

                </p>

                <h2 className="mt-2 text-3xl font-bold">

                  {evaluations[currentQuestion].communicationScore}

                </h2>

              </div>

              <div className="rounded-2xl bg-orange-50 p-5 text-center">

                <p className="text-sm text-zinc-500">

                  Confidence

                </p>

                <h2 className="mt-2 text-3xl font-bold">

                  {evaluations[currentQuestion].confidenceScore}

                </h2>

              </div>

            </div>

            <div className="mt-8 grid gap-8 md:grid-cols-2">

              <div>

                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">

                  <CheckCircle2

                    className="text-green-600"

                    size={20}

                  />

                  Strengths

                </h3>

                <ul className="space-y-2">

                  {

                    evaluations[currentQuestion].strengths?.map(

                      (item, index) => (

                        <li

                          key={index}

                          className="rounded-xl bg-green-50 p-3"

                        >

                          • {item}

                        </li>

                      )

                    )

                  }

                </ul>

              </div>

              <div>

                <h3 className="mb-4 text-lg font-bold text-red-600">

                  Improvements

                </h3>

                <ul className="space-y-2">

                  {

                    evaluations[currentQuestion].improvements?.map(

                      (item, index) => (

                        <li

                          key={index}

                          className="rounded-xl bg-red-50 p-3"

                        >

                          • {item}

                        </li>

                      )

                    )

                  }

                </ul>

              </div>

            </div>

            <div className="mt-8 rounded-2xl bg-zinc-50 p-6">

              <h3 className="mb-3 text-lg font-bold">

                Ideal Answer

              </h3>

              <p className="whitespace-pre-wrap leading-8">

                {evaluations[currentQuestion].idealAnswer}

              </p>

            </div>

            {

              evaluations[currentQuestion].feedback && (

                <div className="mt-8 rounded-2xl border border-indigo-200 bg-indigo-50 p-6">

                  <h3 className="mb-3 text-lg font-bold">

                    AI Feedback

                  </h3>

                  <p className="whitespace-pre-wrap leading-8">

                    {evaluations[currentQuestion].feedback}

                  </p>

                </div>

              )

            }

                    </div>

                  )

                }

                {finalReport && (

                  <div className="mt-8 rounded-3xl border bg-white p-8 shadow-sm">

                    <h2 className="text-3xl font-bold mb-6">
                      Final Interview Report
                    </h2>

                    <div className="grid grid-cols-2 gap-4">

                      <div>Overall Score: {finalReport.overallInterviewScore}</div>

                      <div>Technical: {finalReport.technicalAverage}</div>

                      <div>Communication: {finalReport.communicationAverage}</div>

                      <div>Confidence: {finalReport.confidenceAverage}</div>

                      <div>Problem Solving: {finalReport.problemSolvingAverage}</div>

                      <div>Grammar: {finalReport.grammarAverage}</div>

                    </div>

                    <div className="mt-6">

                      <h3 className="font-bold">
                        Hiring Recommendation
                      </h3>

                      <p>
                        {finalReport.hiringRecommendation}
                      </p>

                    </div>

                    <div className="mt-6">

                      <h3 className="font-bold">
                        Final Feedback
                      </h3>

                      <p>
                        {finalReport.finalFeedback}
                      </p>

                    </div>

                  </div>

                )}

              </div>

            );

          }