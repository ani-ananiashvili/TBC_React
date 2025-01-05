"use client";

import { signInAction } from "../actions";
import { FormMessage } from "../components/form-message";
import { SubmitButton } from "../components/submit-button";
import Link from "next/link";
import useAuth from "../hooks/useAuth";

interface SignInFormProps {
  searchParams: Record<string, string | undefined>;
}

export default function SignInForm({ searchParams }: SignInFormProps) {
  const { loginWithGitHub } = useAuth();

  return (
    <form className="flex flex-col min-w-64 max-w-xs mx-auto border border-[#4a628a] rounded-lg p-6 h-full">
      <h1 className="text-2xl font-medium">Sign in</h1>
      <p className="text-sm text-foreground">
        Don't have an account?{" "}
        <Link className="text-foreground font-medium underline" href="/sign-up">
          Sign up
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <label htmlFor="email">Email</label>
        <input
          className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:border-blue-500"
          name="email"
          placeholder="you@example.com"
          required
        />
        <div className="flex justify-between items-center">
          <label htmlFor="password">Password</label>
          <Link
            className="text-xs text-foreground underline"
            href="/forgot-password"
          >
            Forgot Password?
          </Link>
        </div>
        <input
          className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:border-blue-500"
          type="password"
          name="password"
          placeholder="Your password"
          required
        />
        <SubmitButton
          className="bg-[#4a628a] hover:bg-[#3e4f6a] text-white rounded p-2 mt-4"
          pendingText="Signing In..."
          formAction={signInAction}
        >
          Sign in
        </SubmitButton>
        <FormMessage message={searchParams} />

        <button
          type="button"
          onClick={loginWithGitHub}
          className="flex items-center justify-center bg-[#4a628a] hover:bg-[#3e4f6a] text-white p-3 mt-4 rounded-full w-full transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.537 2.29 6.538 5.47 7.594.4.074.55-.174.55-.39 0-.189-.007-.693-.01-1.346-2.224.438-2.68-1.072-2.68-1.072-.362-.92-.886-1.166-.886-1.166-.724-.492-.055-.482-.055-.482.8-.055 1.23.902 1.23.902.713 1.217 1.872.868 2.326.67.072-.517.28-.87.507-1.073-1.776-.227-3.634-.89-3.634-3.96 0-.873.313-1.584.827-2.141-.085-.226-.359-.907.079-1.897 0 0 .678-.215 2.221.883C6.672 4.145 7.345 4 8 4c.655 0 1.328.145 2.078.435 1.543-1.098 2.221-.883 2.221-.883.438.99.165 1.671.08 1.897.514.557.827 1.268.827 2.141 0 3.078-1.86 3.733-3.636 3.96.228.204.429.607.429 1.217 0 .6-.005.847-.007 1.042 0 .218.148.468.55.39C13.71 14.538 16 11.537 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
          Sign in with GitHub
        </button>
      </div>
    </form>
  );
}
