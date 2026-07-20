import { api } from "./api";

export interface CareerRoadmapRequest {
  education: string;
  targetRole: string;
  targetCompany: string;
  experienceLevel: string;
  timeline: number;
  dailyStudyHours: number;
  currentSkills: string[];
}

const careerService = {
  generateRoadmap: async (data: CareerRoadmapRequest) => {
    const response = await api.post("/career/generate", data);
    return response.data;
  },

  getHistory: async () => {
    const response = await api.get("/career/history");
    return response.data;
  },

  getRoadmap: async (id: number) => {
    const response = await api.get(`/career/${id}`);
    return response.data;
  },

  regenerateRoadmap: async (id: number) => {
    const response = await api.post(`/career/${id}/regenerate`);
    return response.data;
  },

  deleteRoadmap: async (id: number) => {
    const response = await api.delete(`/career/${id}`);
    return response.data;
  },
};

export default careerService;