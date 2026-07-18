import { api } from "@/services/api";

export async function generateInterviewReport(request:any){

    const response =
        await api.post(
            "/interview/report",
            request
        );

    return response.data;
}