import { api } from "@/services/api";

import { RegisterSchema } from "../schemas/register-schema";

export async function register(
  data: RegisterSchema
) {
  const response = await api.post(
    "/auth/register",
    {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    }
  );

  return response.data;
}