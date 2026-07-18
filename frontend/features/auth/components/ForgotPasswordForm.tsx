"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  forgotPasswordSchema,
  ForgotPasswordSchema,
} from "../schemas/forgot-password-schema";

import { forgotPassword } from "../api/forgot-password";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

export default function ForgotPasswordForm() {

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const {

    register,

    handleSubmit,

    formState: { errors },

  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit(
    data: ForgotPasswordSchema
  ) {

    try {

      setLoading(true);

      setMessage("");

      const response =
        await forgotPassword(data);

      setMessage(response);

    } catch (error: any) {

      setMessage(

        error?.response?.data?.message ??

          "Something went wrong."

      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <Card className="w-full max-w-md">

      <CardHeader>

        <CardTitle>
          Forgot Password
        </CardTitle>

        <CardDescription>

          Enter your registered email.

        </CardDescription>

      </CardHeader>

      <CardContent>

        <form

          onSubmit={handleSubmit(onSubmit)}

          className="space-y-5"

        >

          <div className="space-y-2">

            <Label>Email</Label>

            <Input

              type="email"

              placeholder="Enter your email"

              {...register("email")}

            />

            {errors.email && (

              <p className="text-sm text-red-500">

                {errors.email.message}

              </p>

            )}

          </div>

          <Button

            type="submit"

            className="w-full"

            disabled={loading}

          >

            {loading

              ? "Sending..."

              : "Send Reset Link"}

          </Button>

          {message && (

            <p className="text-center text-sm">

              {message}

            </p>

          )}

        </form>

      </CardContent>

    </Card>

  );

}