"use client";

import { useState } from "react";

import { generateResume } from "@/services/resume-builder";

import {
  ResumeBuilderRequest,
  ResumeBuilderResponse,
} from "@/types/resume-builder";

import {
  Sparkles,
  User,
  GraduationCap,
  Code,
  FolderGit2,
  Award,
  Trophy,
  Briefcase,
  Link2,
} from "lucide-react";

const initialState: ResumeBuilderRequest = {

  fullName: "",

  email: "",

  phone: "",

  address: "",

  linkedIn: "",

  github: "",

  portfolio: "",

  leetcode: "",

  codeforces: "",

  college: "",

  degree: "",

  branch: "",

  graduationYear: "",

  cgpa: "",

  skills: "",

  projects: "",

  experience: "",

  certifications: "",

  achievements: "",

};

export default function ResumeBuilderPage() {

  const [form, setForm] =
    useState(initialState);

  const [loading, setLoading] =
    useState(false);

  const [resume, setResume] =
    useState<ResumeBuilderResponse | null>(null);

  function update(

    key: keyof ResumeBuilderRequest,

    value: string

  ) {

    setForm((prev) => ({

      ...prev,

      [key]: value,

    }));

  }

  async function handleGenerate() {

    try {

      setLoading(true);

      const response =
        await generateResume(form);

      setResume(response);

    } catch (e) {

      console.error(e);

      alert("Failed to generate resume.");

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="space-y-8">

      <section className="rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 p-10 text-white shadow-xl">

        <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:items-center">

          <div>

            <p className="text-indigo-100">

              AI Powered Resume Generator

            </p>

            <h1 className="mt-3 text-5xl font-bold">

              Resume Builder

            </h1>

            <p className="mt-5 max-w-3xl text-lg text-indigo-100">

              Fill your details once.

              AI will generate an ATS optimized professional resume.

            </p>

          </div>

          <Sparkles size={70} />

        </div>

      </section>

      {/* Personal Information */}

      <div className="rounded-3xl border bg-white p-8 shadow-sm">

        <div className="mb-6 flex items-center gap-3">

          <User />

          <h2 className="text-2xl font-bold">

            Personal Information

          </h2>

        </div>

        <div className="grid gap-5 md:grid-cols-2">

          <input
            placeholder="Full Name"
            className="rounded-xl border p-4"
            value={form.fullName}
            onChange={(e)=>
              update("fullName",e.target.value)
            }
          />

          <input
            placeholder="Email"
            className="rounded-xl border p-4"
            value={form.email}
            onChange={(e)=>
              update("email",e.target.value)
            }
          />

          <input
            placeholder="Phone"
            className="rounded-xl border p-4"
            value={form.phone}
            onChange={(e)=>
              update("phone",e.target.value)
            }
          />

          <input
            placeholder="Address"
            className="rounded-xl border p-4"
            value={form.address}
            onChange={(e)=>
              update("address",e.target.value)
            }
          />

        </div>

      </div>

      {/* Links */}

      <div className="rounded-3xl border bg-white p-8 shadow-sm">

        <div className="mb-6 flex items-center gap-3">

          <Link2 />

          <h2 className="text-2xl font-bold">

            Professional Links

          </h2>

        </div>


        <div className="grid gap-5 md:grid-cols-2">

          <input
            placeholder="LinkedIn"
            className="rounded-xl border p-4"
            value={form.linkedIn}
            onChange={(e)=>
              update("linkedIn",e.target.value)
            }
          />

          <input
            placeholder="Github"
            className="rounded-xl border p-4"
            value={form.github}
            onChange={(e)=>
              update("github",e.target.value)
            }
          />

          <input
            placeholder="Portfolio"
            className="rounded-xl border p-4"
            value={form.portfolio}
            onChange={(e)=>
              update("portfolio",e.target.value)
            }
          />

          <input
            placeholder="Leetcode"
            className="rounded-xl border p-4"
            value={form.leetcode}
            onChange={(e)=>
              update("leetcode",e.target.value)
            }
          />

          <input
            placeholder="Codeforces"
            className="rounded-xl border p-4 md:col-span-2"
            value={form.codeforces}
            onChange={(e)=>
              update("codeforces",e.target.value)
            }
          />

        </div>

      </div>
            {/* Education */}

            <div className="rounded-3xl border bg-white p-8 shadow-sm">

              <div className="mb-6 flex items-center gap-3">

                <GraduationCap />

                <h2 className="text-2xl font-bold">

                  Education

                </h2>

              </div>

              <div className="grid gap-5 md:grid-cols-2">

                <input
                  placeholder="College"
                  className="rounded-xl border p-4"
                  value={form.college}
                  onChange={(e)=>update("college",e.target.value)}
                />

                <input
                  placeholder="Degree"
                  className="rounded-xl border p-4"
                  value={form.degree}
                  onChange={(e)=>update("degree",e.target.value)}
                />

                <input
                  placeholder="Branch"
                  className="rounded-xl border p-4"
                  value={form.branch}
                  onChange={(e)=>update("branch",e.target.value)}
                />

                <input
                  placeholder="Graduation Year"
                  className="rounded-xl border p-4"
                  value={form.graduationYear}
                  onChange={(e)=>update("graduationYear",e.target.value)}
                />

                <input
                  placeholder="CGPA"
                  className="rounded-xl border p-4 md:col-span-2"
                  value={form.cgpa}
                  onChange={(e)=>update("cgpa",e.target.value)}
                />

              </div>

            </div>

            {/* Skills */}

            <div className="rounded-3xl border bg-white p-8 shadow-sm">

              <div className="mb-6 flex items-center gap-3">

                <Code />

                <h2 className="text-2xl font-bold">

                  Skills

                </h2>

              </div>

              <textarea
                rows={6}
                placeholder="Java, Spring Boot, React..."
                className="w-full rounded-xl border p-5"
                value={form.skills}
                onChange={(e)=>update("skills",e.target.value)}
              />

            </div>

            {/* Projects */}

            <div className="rounded-3xl border bg-white p-8 shadow-sm">

              <div className="mb-6 flex items-center gap-3">

                <FolderGit2 />

                <h2 className="text-2xl font-bold">

                  Projects

                </h2>

              </div>

              <textarea
                rows={8}
                placeholder="Write all projects..."
                className="w-full rounded-xl border p-5"
                value={form.projects}
                onChange={(e)=>update("projects",e.target.value)}
              />

            </div>

            {/* Experience */}

            <div className="rounded-3xl border bg-white p-8 shadow-sm">

              <div className="mb-6 flex items-center gap-3">

                <Briefcase />

                <h2 className="text-2xl font-bold">

                  Experience

                </h2>

              </div>

              <textarea
                rows={6}
                placeholder="Internships / Freelancing / Training"
                className="w-full rounded-xl border p-5"
                value={form.experience}
                onChange={(e)=>update("experience",e.target.value)}
              />

            </div>

            {/* Certificates */}

            <div className="rounded-3xl border bg-white p-8 shadow-sm">

              <div className="mb-6 flex items-center gap-3">

                <Award />

                <h2 className="text-2xl font-bold">

                  Certifications

                </h2>

              </div>

              <textarea
                rows={5}
                placeholder="Java, SQL..."
                className="w-full rounded-xl border p-5"
                value={form.certifications}
                onChange={(e)=>update("certifications",e.target.value)}
              />

            </div>

            {/* Achievements */}

            <div className="rounded-3xl border bg-white p-8 shadow-sm">

              <div className="mb-6 flex items-center gap-3">

                <Trophy />

                <h2 className="text-2xl font-bold">

                  Achievements

                </h2>

              </div>

              <textarea
                rows={5}
                placeholder="Hackathons, Awards..."
                className="w-full rounded-xl border p-5"
                value={form.achievements}
                onChange={(e)=>update("achievements",e.target.value)}
              />

            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 py-5 text-xl font-bold text-white shadow-xl transition hover:scale-[1.01] disabled:opacity-50"
            >

              {

                loading

                  ? "Generating Resume..."

                  : "Generate ATS Resume"

              }

            </button>

            {resume && (

              <div className="rounded-3xl border bg-white p-8 shadow-sm space-y-8">

                <h2 className="text-3xl font-bold">

                  AI Generated Resume

                </h2>

                <div>

                  <h3 className="text-xl font-semibold">

                    Professional Summary

                  </h3>

                  <p className="mt-3 leading-8">

                    {resume.professionalSummary}

                  </p>

                </div>

                <div>

                  <h3 className="text-xl font-semibold">

                    Technical Skills

                  </h3>

                  <div className="mt-4 flex flex-wrap gap-3">

                    {resume.technicalSkills.map(skill=>(

                      <span
                        key={skill}
                        className="rounded-full bg-indigo-100 px-4 py-2 text-indigo-700"
                      >

                        {skill}

                      </span>

                    ))}

                  </div>

                </div>

                <div>

                  <h3 className="text-xl font-semibold">

                    Projects

                  </h3>

                  <div className="mt-5 space-y-5">

                    {resume.projects.map(project=>(

                      <div
                        key={project.title}
                        className="rounded-2xl border p-5"
                      >

                        <h4 className="font-bold">

                          {project.title}

                        </h4>

                        <p className="mt-2 text-zinc-600">

                          {project.description}

                        </p>

                      </div>

                    ))}

                  </div>

                </div>

                <div>

                  <h3 className="text-xl font-semibold">

                    Certifications

                  </h3>

                  <ul className="mt-4 space-y-2">

                    {resume.certifications.map(item=>(

                      <li key={item}>

                        • {item}

                      </li>

                    ))}

                  </ul>

                </div>

                <div>

                  <h3 className="text-xl font-semibold">

                    Achievements

                  </h3>

                  <ul className="mt-4 space-y-2">

                    {resume.achievements.map(item=>(

                      <li key={item}>

                        • {item}

                      </li>

                    ))}

                  </ul>

                </div>

              </div>

            )}

          </div>
            );

          }