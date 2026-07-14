export interface ResumeBuilderRequest {
  fullName: string;
  email: string;
  phone: string;
  address: string;

  linkedIn: string;
  github: string;
  portfolio: string;
  leetcode: string;
  codeforces: string;

  college: string;
  degree: string;
  branch: string;
  graduationYear: string;
  cgpa: string;

  skills: string;

  projects: string;

  experience: string;

  certifications: string;

  achievements: string;
}

export interface ResumeProject {
  title: string;
  description: string;
}

export interface ResumeBuilderResponse {
  professionalSummary: string;

  technicalSkills: string[];

  projects: ResumeProject[];

  certifications: string[];

  achievements: string[];
}