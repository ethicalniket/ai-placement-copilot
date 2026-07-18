"use client";

import { ReactNode, useState } from "react";

import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

/* =====================================================
   AuthInput
===================================================== */

interface AuthInputProps {
  label: string;
  placeholder: string;
  type?: string;
  icon: ReactNode;
  error?: string;
  registration: any;
}

export function AuthInput({
  label,
  placeholder,
  type = "text",
  icon,
  error,
  registration,
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="space-y-2">

      <Label className="text-sm font-medium text-zinc-700">
        {label}
      </Label>

      <div className="relative">

        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
          {icon}
        </div>

        <Input
          {...registration}
          placeholder={placeholder}
          type={
            isPassword
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          className="
            h-12
            rounded-xl
            border-zinc-300
            bg-white/70
            pl-11
            pr-11
            transition-all
            duration-300
            focus-visible:ring-2
            focus-visible:ring-blue-500
            hover:border-blue-300
          "
        />

        {isPassword && (

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-zinc-400
              hover:text-zinc-700
            "
          >

            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}

          </button>

        )}

      </div>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}

    </div>
  );
}

/* =====================================================
   AuthButton
===================================================== */

interface AuthButtonProps {
  loading: boolean;
  text: string;
  loadingText: string;
}

export function AuthButton({
  loading,
  text,
  loadingText,
}: AuthButtonProps) {
  return (
    <Button
      type="submit"
      disabled={loading}
      className="
        h-12
        w-full
        rounded-xl
        bg-gradient-to-r
        from-blue-600
        to-violet-600
        text-white
        font-semibold
        shadow-lg
        transition-all
        duration-300
        hover:scale-[1.02]
        hover:from-blue-700
        hover:to-violet-700
      "
    >
      {loading ? loadingText : text}
    </Button>
  );
}

/* =====================================================
   AuthDivider
===================================================== */

export function AuthDivider() {
  return (
    <div className="relative">

      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t border-zinc-200" />
      </div>

      <div className="relative flex justify-center">

        <span
          className="
            bg-white/80
            px-4
            text-xs
            font-medium
            uppercase
            tracking-wider
            text-zinc-500
          "
        >
          Or continue with
        </span>

      </div>

    </div>
  );
}

/* =====================================================
   SocialLoginButton
===================================================== */

interface SocialLoginButtonProps {
  text?: string;
}

export function SocialLoginButton({
  text = "Continue with Google",
}: SocialLoginButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => {
        window.location.href =
          `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google`;
      }}
      className="
        h-12
        w-full
        rounded-xl
        border-zinc-200
        bg-white/70
        font-medium
        shadow-sm
        transition-all
        duration-300
        hover:border-blue-300
        hover:bg-white
        hover:shadow-md
      "
    >

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        className="mr-3 h-5 w-5"
      >
        <path
          fill="#FFC107"
          d="M43.611 20.083H42V20H24v8h11.303C33.651 32.657 29.203 36 24 36c-6.627 0-12-5.373-12-12S17.373 12 24 12c3.059 0 5.842 1.154 7.959 3.041l5.657-5.657C34.046 6.053 29.272 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
        />
        <path
          fill="#FF3D00"
          d="M6.306 14.691l6.571 4.819C14.655 16.108 19.001 12 24 12c3.059 0 5.842 1.154 7.959 3.041l5.657-5.657C34.046 6.053 29.272 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
        />
        <path
          fill="#4CAF50"
          d="M24 44c5.17 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.148 35.091 26.672 36 24 36c-5.181 0-9.615-3.318-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
        />
        <path
          fill="#1976D2"
          d="M43.611 20.083H42V20H24v8h11.303c-1.086 3.062-3.243 5.458-6.084 6.57l6.19 5.238C38.971 36.46 44 30.738 44 24c0-1.341-.138-2.65-.389-3.917z"
        />
      </svg>

      {text}

    </Button>
  );
}

/* =====================================================
   RememberMe
===================================================== */

interface RememberMeProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function RememberMe({
  checked,
  onCheckedChange,
}: RememberMeProps) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-700">

      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="
          h-4
          w-4
          rounded
          border-zinc-300
          text-blue-600
          focus:ring-blue-500
        "
      />

      Remember me

    </label>
  );
}

/* =====================================================
   ForgotPasswordLink
===================================================== */

interface ForgotPasswordLinkProps {
  onClick: () => void;
}

export function ForgotPasswordLink({
  onClick,
}: ForgotPasswordLinkProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        text-sm
        font-medium
        text-blue-600
        transition
        hover:text-blue-700
        hover:underline
      "
    >
      Forgot Password?
    </button>
  );
}

/* =====================================================
   AuthFooter
===================================================== */

interface AuthFooterProps {
  text: string;
  linkText: string;
  onClick: () => void;
}

export function AuthFooter({
  text,
  linkText,
  onClick,
}: AuthFooterProps) {
  return (
    <div className="space-y-4">

      <div
        className="
          rounded-xl
          border
          border-blue-100
          bg-blue-50/60
          p-4
        "
      >
        <p className="text-sm text-zinc-700">

          <span className="font-semibold">
            New here?
          </span>{" "}

          Create your account and start preparing for coding interviews,
          aptitude tests and AI mock interviews.

        </p>
      </div>

      <div className="text-center text-sm text-zinc-600">

        {text}{" "}

        <button
          type="button"
          onClick={onClick}
          className="
            font-semibold
            text-blue-600
            transition
            hover:text-blue-700
            hover:underline
          "
        >
          {linkText}
        </button>

      </div>

    </div>
  );
}