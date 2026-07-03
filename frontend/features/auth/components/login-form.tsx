"use client";

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

export default function LoginForm() {
  return (
    <Card className="w-full max-w-md">

      <CardHeader>

        <CardTitle className="text-3xl">
          Login
        </CardTitle>

        <CardDescription>
          Welcome back to
          AI Placement Copilot
        </CardDescription>

      </CardHeader>

      <CardContent>

        <form className="space-y-5">

          <div className="space-y-2">

            <Label>
              Email
            </Label>

            <Input
              type="email"
              placeholder="Enter email"
            />

          </div>

          <div className="space-y-2">

            <Label>
              Password
            </Label>

            <Input
              type="password"
              placeholder="Enter password"
            />

          </div>

          <Button
            className="w-full"
          >
            Login
          </Button>

          <Button
            variant="outline"
            className="w-full"
          >
            Continue with Google
          </Button>

        </form>

      </CardContent>

    </Card>
  );
}