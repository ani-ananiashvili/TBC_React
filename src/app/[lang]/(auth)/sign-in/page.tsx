import { signInAction } from "../actions";
import { FormMessage, Message } from "../../../components/Auth/form-message";
import { SubmitButton } from "../../../components/Auth/submit-button";
import Link from "next/link";

export default async function SignIn(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;

  return (
    <form
      className="mt-24 mb-4 flex flex-col min-w-64 max-w-xs mx-auto border border-[#4a628a] rounded-lg p-4"
      style={{
        background: "linear-gradient(145deg, #f5f7fa, #e4ebf5)",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1 className="text-2xl font-medium">Sign in</h1>
      <p className="text-sm text-foreground">
        Don't have an account?{" "}
        <Link className="text-foreground font-medium underline" href="/sign-up">
          Sign up
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-6">
        <label htmlFor="email">Email</label>
        <input
          data-cy="sign-in-email"
          name="email"
          placeholder="you@example.com"
          required
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          data-cy="sign-in-password"
          type="password"
          name="password"
          placeholder="Your password"
          required
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <SubmitButton
          className="bg-[#4a628a] hover:bg-[#3e4f6a] text-white rounded p-2 mt-4"
          pendingText="Signing In..."
          formAction={signInAction}
        >
          Sign in
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
