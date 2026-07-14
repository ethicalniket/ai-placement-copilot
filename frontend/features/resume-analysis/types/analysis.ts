export interface ResumeAnalysisResponse {

  atsScore: number;

  summary: string;

  strengths: string[];

  weaknesses: string[];

  missingSkills: string[];

  improvementSuggestions: string[];

}