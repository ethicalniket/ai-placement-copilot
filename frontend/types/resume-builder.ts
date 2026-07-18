export interface Education {

  college: string;

  degree: string;

  branch: string;

  cgpa: string;

  startYear: string;

  endYear: string;

}

export interface ResumeProject {

  title: string;

  description: string;

  techStack: string;

  github: string;

  liveUrl: string;

}

export interface Experience {

  company: string;

  role: string;

  duration: string;

  description: string;

}

export interface Certification {

  name: string;

  issuer: string;

  year: string;

}

export interface ResumeBuilderRequest {

  fullName: string;

  email: string;

  phone: string;

  city: string;

  state: string;

  country: string;

  linkedIn: string;

  github: string;

  portfolio: string;

  leetcode: string;

  codeforces: string;

  education: Education[];

  programmingLanguages: string[];

  frameworks: string[];

  databases: string[];

  cloud: string[];

  devOps: string[];

  aiTools: string[];

  softSkills: string[];

  projects: ResumeProject[];

  experiences: Experience[];

  certifications: Certification[];

  achievements: string[];

  languages: string[];

}
export interface ResumeBuilderResponse {

  professionalSummary: string;

  generatedResume: string;

  technicalSkills: string[];

  projects: ResumeProject[];

  certifications: string[];

  achievements: string[];

}