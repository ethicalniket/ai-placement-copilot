"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  User,
  Mail,
  Lock,
} from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import {
  registerSchema,
  RegisterSchema,
} from "../schemas/register-schema";

import { register } from "../api/register";

import {
  AuthInput,
  AuthButton,
  AuthDivider,
  SocialLoginButton,
  AuthFooter,
} from "./AuthForm";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RegisterForm() {

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(
    data: RegisterSchema
  ) {

    try {

      setLoading(true);

      await registerUser(data);

      toast.success(
        "Account created successfully!"
      );

      router.push("/login");

    } catch (error: any) {

      toast.error(

        error?.response?.data?.message ??

        "Registration failed."

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

          Create Account 🚀

        </CardTitle>

        <CardDescription
          className="text-base"
        >

          Start your placement journey today.

        </CardDescription>

      </CardHeader>

      <CardContent>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >

          <AuthInput
            label="Full Name"
            placeholder="Enter your full name"
            icon={<User size={18} />}
            registration={register("name")}
            error={errors.name?.message}
          />

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
            placeholder="Create a password"
            type="password"
            icon={<Lock size={18} />}
            registration={register("password")}
            error={errors.password?.message}
          />

          <AuthInput
            label="Confirm Password"
            placeholder="Confirm password"
            type="password"
            icon={<Lock size={18} />}
            registration={register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />

          <AuthButton
            loading={loading}
            text="Create Account"
            loadingText="Creating Account..."
          />

          <AuthDivider />

          <SocialLoginButton
            text="Sign up with Google"
          />

          <AuthFooter
            text="Already have an account?"
            linkText="Sign In"
            onClick={() =>
              router.push("/login")
            }
          />

        </form>

      </CardContent>

    </Card>

  );

}