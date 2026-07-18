import { api } from "@/services/api";

import { ForgotPasswordSchema } from "../schemas/forgot-password-schema";

export async function forgotPassword(
  data: ForgotPasswordSchema
) {
  const response = await api.post(
    "/auth/forgot-password",
    data
  );

  return response.data;
}