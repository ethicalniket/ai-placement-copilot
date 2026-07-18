"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Mail, Lock } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import {
  loginSchema,
  LoginSchema,
} from "../schemas/login-schema";

import { login } from "../api/login";

import {
  AuthInput,
  AuthButton,
  AuthDivider,
  SocialLoginButton,
  RememberMe,
  ForgotPasswordLink,
  AuthFooter,
} from "./AuthForm";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginForm() {

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [rememberMe, setRememberMe] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(
    data: LoginSchema
  ) {

    try {

      setLoading(true);

      const response =
        await login(data);

      localStorage.setItem(
        "accessToken",
        response.accessToken
      );

      localStorage.setItem(
        "refreshToken",
        response.refreshToken
      );

      if (rememberMe) {

        localStorage.setItem(
          "rememberMe",
          "true"
        );

      }

      toast.success(
        "Welcome back!"
      );

      router.replace("/dashboard");

    } catch (error: any) {

      toast.error(

        error?.response?.data?.message ??

        "Invalid email or password."

      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <Card
      className="
        rounded-[28px]
        border
        border-white/60
        bg-white/75
        backdrop-blur-2xl
        shadow-[0_30px_80px_rgba(15,23,42,.15)]
      "
    >

      <CardHeader className="space-y-3">

        <CardTitle
          className="
            text-4xl
            font-bold
            tracking-tight
          "
        >

          Welcome Back 👋

        </CardTitle>

        <CardDescription
          className="text-base"
        >

          Continue your placement journey.

        </CardDescription>

      </CardHeader>

      <CardContent>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >

          <AuthInput
            label="Email"
            placeholder="Enter your email"
            type="email"
            icon={<Mail size={18} />}
            registration={register("email")}
            error={errors.email?.message}
          />

          <AuthInput
            label="Password"
            placeholder="Enter your password"
            type="password"
            icon={<Lock size={18} />}
            registration={register("password")}
            error={errors.password?.message}
          />

          <div className="flex items-center justify-between">

            <RememberMe
              checked={rememberMe}
              onCheckedChange={setRememberMe}
            />

            <ForgotPasswordLink
              onClick={() =>
                router.push("/forgot-password")
              }
            />

          </div>

          <AuthButton
            loading={loading}
            text="Continue"
            loadingText="Signing In..."
          />

          <AuthDivider />

          <SocialLoginButton />

          <AuthFooter
            text="Don't have an account?"
            linkText="Create Account"
            onClick={() =>
              router.push("/register")
            }
          />

        </form>

      </CardContent>

    </Card>

  );
  }