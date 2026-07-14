import { api } from "@/services/api";
import {
  LoginRequest,
  LoginResponse,
} from "../types/login";

export async function login(
  request: LoginRequest
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>(
    "/auth/login",
    request
  );

  return response.data;
}