export interface InterviewRequest {
  jobDescription: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  interviewType: "RESUME";
  language: string;
  numberOfQuestions: number;
}

export interface InterviewResponse {
  interviewType: string;
  difficulty: string;
  estimatedDuration: number;

  technicalQuestions: string[];
  hrQuestions: string[];
  projectQuestions: string[];
  followUpQuestions: string[];
}

export interface InterviewEvaluationRequest {

  question: string;

  candidateAnswer: string;

  jobDescription: string;

  difficulty: string;

  lastQuestion?: boolean;

  interviewHistory?: {

    question: string;

    answer: string;

  }[];

}

export interface InterviewEvaluationResponse {

  overallScore: number;

  technicalScore: number;

  communicationScore: number;

  confidenceScore: number;

  problemSolvingScore: number;

  grammarScore: number;

  strengths: string[];

  improvements: string[];

  idealAnswer: string;

  feedback: string;

}