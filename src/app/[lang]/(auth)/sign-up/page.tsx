import { signUpAction } from "../actions";
import { FormMessage, Message } from "../../../components/Auth/form-message";
import { SubmitButton } from "../../../components/Auth/submit-button";
import Link from "next/link";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }
  return (
    <form className=" m-12 flex flex-col min-w-64 max-w-xs mx-auto border border-[#4a628a] rounded-lg p-6 h-full">
      <h1 className="text-2xl font-medium">Sign up</h1>
      <p className="text-sm text text-foreground">
        Already have an account?{" "}
        <Link className="text-primary font-medium underline" href="/sign-in">
          Sign in
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <label htmlFor="email">Email</label>
        <input
          data-cy="sign-up-email"
          name="email"
          placeholder="you@example.com"
          required
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label htmlFor="password">Password</label>
        <input
          data-cy="sign-up-password"
          type="password"
          name="password"
          placeholder="Your password"
          minLength={6}
          required
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <SubmitButton
          className="bg-[#4a628a] hover:bg-[#3e4f6a] text-white rounded p-2 mt-4"
          formAction={signUpAction}
          pendingText="Signing up..."
        >
          Sign up
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
