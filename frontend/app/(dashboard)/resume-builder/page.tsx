"use client";

import { useState } from "react";

import { generateResume } from "@/services/resume-builder";
import { PDFDownloadLink } from "@react-pdf/renderer";

import ResumePdf from "@/components/ResumePdf";
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
  Check,
} from "lucide-react";

const initialState: ResumeBuilderRequest = {
  fullName: "",
  email: "",
  phone: "",

  city: "",
  state: "",
  country: "",

  linkedIn: "",
  github: "",
  portfolio: "",

  leetcode: "",
  codeforces: "",

  education: [
    {
      college: "",
      degree: "",
      branch: "",
      cgpa: "",
      startYear: "",
      endYear: "",
    },
  ],

  programmingLanguages: [],
  frameworks: [],
  databases: [],
  cloud: [],
  devOps: [],
  aiTools: [],
  softSkills: [],

  projects: [
    {
      title: "",
      description: "",
      techStack: "",
      github: "",
      liveUrl: "",
    },
  ],

  experiences: [],

  certifications: [
    {
      name: "",
      issuer: "",
      year: "",
    },
  ],

  achievements: [],

  languages: [],
};

const PROGRAMMING = [
  "Java",
  "Python",
  "C",
  "C++",
  "JavaScript",
  "TypeScript",
  "Go",
  "Kotlin",
];

const FRAMEWORKS = [
  "Spring Boot",
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "Angular",
];

const DATABASES = [
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Redis",
];

const CLOUD = [
  "AWS",
  "Azure",
  "Google Cloud",
];

const DEVOPS = [
  "Docker",
  "Kubernetes",
  "Git",
  "Jenkins",
];

const AI_TOOLS = [
  "Gemini",
  "OpenAI",
  "LangChain",
  "Qdrant",
];

const LANGUAGES = [
  "English",
  "Hindi",
  "Gujarati",
  "Marathi",
  "Punjabi",
  "Bengali",
  "Tamil",
  "Telugu",
  "Malayalam",
  "Kannada",
  "Urdu",
];

export default function ResumeBuilderPage() {

  const [form, setForm] =
    useState(initialState);

  const [loading, setLoading] =
    useState(false);

  const [resume, setResume] =
    useState<ResumeBuilderResponse | null>(null);

  function update(
    key: keyof ResumeBuilderRequest,
    value: any
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

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <p className="text-indigo-100">

              AI Powered Resume Builder

            </p>

            <h1 className="mt-3 text-5xl font-bold">

              Resume Builder

            </h1>

            <p className="mt-5 max-w-2xl text-lg text-indigo-100">

              Build an ATS optimized professional resume
              using AI.

            </p>

          </div>

          <Sparkles size={70} />

        </div>

      </section>

      {/* Personal Information */}

      <div className="rounded-3xl border bg-white p-8 shadow-sm">

        <div className="mb-8 flex items-center gap-3">

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
            onChange={(e) =>
              update("fullName", e.target.value)
            }
          />

          <input
            placeholder="Email"
            className="rounded-xl border p-4"
            value={form.email}
            onChange={(e) =>
              update("email", e.target.value)
            }
          />

          <input
            placeholder="Phone"
            className="rounded-xl border p-4"
            value={form.phone}
            onChange={(e) =>
              update("phone", e.target.value)
            }
          />

          <input
            placeholder="City"
            className="rounded-xl border p-4"
            value={form.city}
            onChange={(e) =>
              update("city", e.target.value)
            }
          />

          <input
            placeholder="State"
            className="rounded-xl border p-4"
            value={form.state}
            onChange={(e) =>
              update("state", e.target.value)
            }
          />

          <input
            placeholder="Country"
            className="rounded-xl border p-4"
            value={form.country}
            onChange={(e) =>
              update("country", e.target.value)
            }
          />

        </div>

      </div>

      {/* Professional Links */}

      <div className="rounded-3xl border bg-white p-8 shadow-sm">

        <div className="mb-8 flex items-center gap-3">

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
            onChange={(e) =>
              update("linkedIn", e.target.value)
            }
          />

          <input
            placeholder="Github"
            className="rounded-xl border p-4"
            value={form.github}
            onChange={(e) =>
              update("github", e.target.value)
            }
          />

          <input
            placeholder="Portfolio"
            className="rounded-xl border p-4"
            value={form.portfolio}
            onChange={(e) =>
              update("portfolio", e.target.value)
            }
          />

          <input
            placeholder="LeetCode"
            className="rounded-xl border p-4"
            value={form.leetcode}
            onChange={(e) =>
              update("leetcode", e.target.value)
            }
          />

          <input
            placeholder="Codeforces"
            className="rounded-xl border p-4 md:col-span-2"
            value={form.codeforces}
            onChange={(e) =>
              update("codeforces", e.target.value)
            }
          />

        </div>

      </div>

     {/* Education */}

     <div className="rounded-3xl border bg-white p-8 shadow-sm">

       <div className="mb-8 flex items-center gap-3">

         <GraduationCap />

         <h2 className="text-2xl font-bold">

           Education

         </h2>

       </div>

       <div className="grid gap-5 md:grid-cols-2">

         <input
           placeholder="College / University"
           className="rounded-xl border p-4"
           value={form.education[0]?.college ?? ""}
           onChange={(e)=>{

             const education=[...form.education];

             education[0]={
               ...education[0],
               college:e.target.value
             };

             update("education",education);

           }}
         />

         <input
           placeholder="Degree"
           className="rounded-xl border p-4"
           value={form.education[0]?.degree ?? ""}
           onChange={(e)=>{

             const education=[...form.education];

             education[0]={
               ...education[0],
               degree:e.target.value
             };

             update("education",education);

           }}
         />

         <input
           placeholder="Branch"
           className="rounded-xl border p-4"
           value={form.education[0]?.branch ?? ""}
           onChange={(e)=>{

             const education=[...form.education];

             education[0]={
               ...education[0],
               branch:e.target.value
             };

             update("education",education);

           }}
         />

         <input
           placeholder="CGPA"
           className="rounded-xl border p-4"
           value={form.education[0]?.cgpa ?? ""}
           onChange={(e)=>{

             const education=[...form.education];

             education[0]={
               ...education[0],
               cgpa:e.target.value
             };

             update("education",education);

           }}
         />

         <input
           placeholder="Start Year"
           className="rounded-xl border p-4"
           value={form.education[0]?.startYear ?? ""}
           onChange={(e)=>{

             const education=[...form.education];

             education[0]={
               ...education[0],
               startYear:e.target.value
             };

             update("education",education);

           }}
         />

         <input
           placeholder="End Year"
           className="rounded-xl border p-4"
           value={form.education[0]?.endYear ?? ""}
           onChange={(e)=>{

             const education=[...form.education];

             education[0]={
               ...education[0],
               endYear:e.target.value
             };

             update("education",education);

           }}
         />

       </div>

     </div>

     {/* Technical Skills */}

     <div className="rounded-3xl border bg-white p-8 shadow-sm">

       <div className="mb-8 flex items-center gap-3">

         <Code />

         <h2 className="text-2xl font-bold">

           Technical Skills

         </h2>

       </div>

       <SkillSection
         title="Programming Languages"
         options={PROGRAMMING}
         selected={form.programmingLanguages}
         onChange={(value)=>update("programmingLanguages",value)}
       />

       <SkillSection
         title="Frameworks"
         options={FRAMEWORKS}
         selected={form.frameworks}
         onChange={(value)=>update("frameworks",value)}
       />

       <SkillSection
         title="Databases"
         options={DATABASES}
         selected={form.databases}
         onChange={(value)=>update("databases",value)}
       />

       <SkillSection
         title="Cloud"
         options={CLOUD}
         selected={form.cloud}
         onChange={(value)=>update("cloud",value)}
       />

       <SkillSection
         title="DevOps"
         options={DEVOPS}
         selected={form.devOps}
         onChange={(value)=>update("devOps",value)}
       />

       <SkillSection
         title="AI Tools"
         options={AI_TOOLS}
         selected={form.aiTools}
         onChange={(value)=>update("aiTools",value)}
       />

     </div>

     {/* Projects */}

     <div className="rounded-3xl border bg-white p-8 shadow-sm">

       <div className="mb-8 flex items-center justify-between">

         <div className="flex items-center gap-3">

           <FolderGit2 />

           <h2 className="text-2xl font-bold">

             Projects

           </h2>

         </div>

         <button
           type="button"
           onClick={() =>

             update("projects", [

               ...form.projects,

               {

                 title: "",

                 description: "",

                 techStack: "",

                 github: "",

                 liveUrl: "",

               },

             ])

           }

           className="rounded-xl bg-indigo-600 px-5 py-2 text-white"

         >

           + Add Project

         </button>

       </div>

       <div className="space-y-8">

         {

           form.projects.map((project, index) => (

             <div

               key={index}

               className="rounded-2xl border border-zinc-200 p-6"

             >

               <div className="mb-6 flex items-center justify-between">

                 <h3 className="text-lg font-semibold">

                   Project {index + 1}

                 </h3>

                 {

                   form.projects.length > 1 && (

                     <button

                       type="button"

                       className="text-red-500"

                       onClick={() =>

                         update(

                           "projects",

                           form.projects.filter(

                             (_, i) => i !== index

                           )

                         )

                       }

                     >

                       Remove

                     </button>

                   )

                 }

               </div>

               <div className="grid gap-5 md:grid-cols-2">

                 <input

                   placeholder="Project Title"

                   className="rounded-xl border p-4"

                   value={project.title}

                   onChange={(e) => {

                     const projects = [...form.projects];

                     projects[index].title =

                       e.target.value;

                     update("projects", projects);

                   }}

                 />

                 <input

                   placeholder="Tech Stack"

                   className="rounded-xl border p-4"

                   value={project.techStack}

                   onChange={(e) => {

                     const projects = [...form.projects];

                     projects[index].techStack =

                       e.target.value;

                     update("projects", projects);

                   }}

                 />

                 <input

                   placeholder="Github URL"

                   className="rounded-xl border p-4"

                   value={project.github}

                   onChange={(e) => {

                     const projects = [...form.projects];

                     projects[index].github =

                       e.target.value;

                     update("projects", projects);

                   }}

                 />

                 <input

                   placeholder="Live URL"

                   className="rounded-xl border p-4"

                   value={project.liveUrl}

                   onChange={(e) => {

                     const projects = [...form.projects];

                     projects[index].liveUrl =

                       e.target.value;

                     update("projects", projects);

                   }}

                 />

                 <textarea

                   rows={5}

                   placeholder="Project Description"

                   className="rounded-xl border p-4 md:col-span-2"

                   value={project.description}

                   onChange={(e) => {

                     const projects = [...form.projects];

                     projects[index].description =

                       e.target.value;

                     update("projects", projects);

                   }}

                 />

               </div>

             </div>

           ))

         }

       </div>

     </div>

    {/* Experience */}

    <div className="rounded-3xl border bg-white p-8 shadow-sm">

      <div className="mb-8 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <Briefcase />

          <h2 className="text-2xl font-bold">

            Experience

          </h2>

        </div>

        <button

          type="button"

          onClick={()=>

            update("experiences",[

              ...form.experiences,

              {

                company:"",

                role:"",

                duration:"",

                description:"",

              },

            ])

          }

          className="rounded-xl bg-indigo-600 px-5 py-2 text-white"

        >

          + Add Experience

        </button>

      </div>

      {

        form.experiences.map((exp,index)=>(

          <div

            key={index}

            className="mb-6 rounded-2xl border p-6"

          >

            <div className="grid gap-5 md:grid-cols-2">

              <input

                placeholder="Company"

                className="rounded-xl border p-4"

                value={exp.company}

                onChange={(e)=>{

                  const list=[...form.experiences];

                  list[index].company=e.target.value;

                  update("experiences",list);

                }}

              />

              <input

                placeholder="Role"

                className="rounded-xl border p-4"

                value={exp.role}

                onChange={(e)=>{

                  const list=[...form.experiences];

                  list[index].role=e.target.value;

                  update("experiences",list);

                }}

              />

              <input

                placeholder="Duration"

                className="rounded-xl border p-4 md:col-span-2"

                value={exp.duration}

                onChange={(e)=>{

                  const list=[...form.experiences];

                  list[index].duration=e.target.value;

                  update("experiences",list);

                }}

              />

              <textarea

                rows={4}

                placeholder="Work Description"

                className="rounded-xl border p-4 md:col-span-2"

                value={exp.description}

                onChange={(e)=>{

                  const list=[...form.experiences];

                  list[index].description=e.target.value;

                  update("experiences",list);

                }}

              />

            </div>

          </div>

        ))

      }

    </div>

    {/* Certifications */}

    <div className="rounded-3xl border bg-white p-8 shadow-sm">

      <div className="mb-8 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <Award />

          <h2 className="text-2xl font-bold">

            Certifications

          </h2>

        </div>

        <button

          type="button"

          onClick={()=>

            update("certifications",[

              ...form.certifications,

              {

                name:"",

                issuer:"",

                year:"",

              },

            ])

          }

          className="rounded-xl bg-indigo-600 px-5 py-2 text-white"

        >

          + Add

        </button>

      </div>

      {

        form.certifications.map((cert,index)=>(

          <div

            key={index}

            className="mb-5 grid gap-5 md:grid-cols-3"

          >

            <input

              placeholder="Certificate"

              className="rounded-xl border p-4"

              value={cert.name}

              onChange={(e)=>{

                const list=[...form.certifications];

                list[index].name=e.target.value;

                update("certifications",list);

              }}

            />

            <input

              placeholder="Issuer"

              className="rounded-xl border p-4"

              value={cert.issuer}

              onChange={(e)=>{

                const list=[...form.certifications];

                list[index].issuer=e.target.value;

                update("certifications",list);

              }}

            />

            <input

              placeholder="Year"

              className="rounded-xl border p-4"

              value={cert.year}

              onChange={(e)=>{

                const list=[...form.certifications];

                list[index].year=e.target.value;

                update("certifications",list);

              }}

            />

          </div>

        ))

      }

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

        rows={6}

        className="w-full rounded-xl border p-5"

        placeholder="One achievement per line"

        value={form.achievements.join("\n")}

        onChange={(e)=>

          update(

            "achievements",

            e.target.value

              .split("\n")

              .filter(Boolean)

          )

        }

      />

    </div>

    {/* Languages */}

    <div className="rounded-3xl border bg-white p-8 shadow-sm">

      <div className="mb-8 flex items-center gap-3">

        <Code />

        <h2 className="text-2xl font-bold">

          Languages

        </h2>

      </div>

      <SkillSection

        title="Languages Known"

        options={LANGUAGES}

        selected={form.languages}

        onChange={(value) => update("languages", value)}

      />

    </div>

    {/* Generate */}

    <div className="rounded-3xl border bg-white p-8 shadow-sm">

      <button

        onClick={handleGenerate}

        disabled={loading}

        className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-5 text-lg font-semibold text-white shadow-lg transition hover:scale-[1.01] disabled:opacity-50"

      >

        {

          loading

          ?

          "Generating Resume..."

          :

          "Generate ATS Resume"

        }

      </button>
{
  resume && (

    <PDFDownloadLink

      document={

        <ResumePdf

          form={form}

          resume={resume}

        />

      }

      fileName={`${form.fullName || "Resume"}-ATS.pdf`}

      className="mt-5 block"

    >

      {({ loading }) => (

        <button

          className="w-full rounded-2xl border border-indigo-600 px-8 py-4 font-semibold text-indigo-600 transition hover:bg-indigo-50"

        >

          {

            loading

            ?

            "Preparing PDF..."

            :

            "Download PDF"

          }

        </button>

      )}

    </PDFDownloadLink>

  )

}
    </div>

    {/* Preview */}

    {

    resume && (

    <div className="rounded-3xl border bg-white p-8 shadow-sm">

    <div className="mb-8 flex items-center justify-between">

    <h2 className="text-3xl font-bold">

    Generated Resume

    </h2>

    <button

    className="rounded-xl bg-indigo-600 px-5 py-3 text-white"

    onClick={()=>{

    navigator.clipboard.writeText(

    resume.generatedResume

    );

    alert("Copied");

    }}

    >

    Copy Resume

    </button>

    </div>

    <div className="rounded-2xl bg-zinc-50 p-8">

    <pre className="whitespace-pre-wrap text-[15px] leading-8">

    {resume.generatedResume}

    </pre>

    </div>

    </div>

    )

    }

    </div>

    );

    }

    interface SkillSectionProps{

    title:string;

    options:string[];

    selected:string[];

    onChange:(value:string[])=>void;

    }

    function SkillSection({

    title,

    options,

    selected,

    onChange,

    }:SkillSectionProps){

    function toggle(item:string){

    if(selected.includes(item)){

    onChange(

    selected.filter(

    (s)=>s!==item

    )

    );

    }else{

    onChange([

    ...selected,

    item,

    ]);

    }

    }

    return(

    <div className="mb-10">

    <h3 className="mb-5 text-lg font-semibold">

    {title}

    </h3>

    <div className="flex flex-wrap gap-3">

    {

    options.map((item)=>{

    const active=

    selected.includes(item);

    return(

    <button

    key={item}

    type="button"

    onClick={()=>toggle(item)}

    className={`rounded-full border px-5 py-3 transition flex items-center gap-2

    ${

    active

    ?

    "bg-indigo-600 border-indigo-600 text-white"

    :

    "hover:bg-indigo-50"

    }

    `}

    >

    {

    active &&

    <Check size={16}/>

    }

    {item}

    </button>

    );

    })

    }

    </div>

    </div>

    );

    }


