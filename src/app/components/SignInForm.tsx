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
    <form className="flex flex-col min-w-64 max-w-64 mx-auto">
      <h1 className="text-2xl font-medium">Sign in</h1>
      <p className="text-sm text-foreground">
        Don't have an account?{" "}
        <Link className="text-foreground font-medium underline" href="/sign-up">
          Sign up
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <label htmlFor="email">Email</label>
        <input name="email" placeholder="you@example.com" required />
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
          type="password"
          name="password"
          placeholder="Your password"
          required
        />
        <SubmitButton pendingText="Signing In..." formAction={signInAction}>
          Sign in
        </SubmitButton>
        <FormMessage message={searchParams} />

        <button
          type="button"
          onClick={loginWithGitHub}
          className="bg-black text-white p-2 mt-4 rounded"
        >
          Sign in with GitHub
        </button>
      </div>
    </form>
  );
}
