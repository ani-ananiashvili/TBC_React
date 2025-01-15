import { signInAction } from "../actions";
import { FormMessage } from "../components/form-message";
import { SubmitButton } from "../components/submit-button";

interface SignInFormProps {
  searchParams?: Record<string, string | undefined>;
}

export default function SignInForm({ searchParams }: SignInFormProps) {
  const message = searchParams ? searchParams.message : undefined;

  return (
    <form className="flex flex-col min-w-64 max-w-xs mx-auto border border-[#4a628a] rounded-lg p-6 h-full">
      <h1 className="text-2xl font-medium">Sign in</h1>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <label htmlFor="email">Email</label>
        <input
          className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:border-blue-500"
          name="email"
          placeholder="you@example.com"
          required
          data-cy="sign-in-email"
        />
        <label htmlFor="password">Password</label>
        <input
          className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:border-blue-500"
          type="password"
          name="password"
          placeholder="Your password"
          required
          data-cy="sign-in-password"
        />
        <SubmitButton
          className="bg-[#4a628a] hover:bg-[#3e4f6a] text-white rounded p-2 mt-4"
          formAction={signInAction}
          pendingText="Signing in..."
        >
          Sign in
        </SubmitButton>
        <FormMessage message={message} />
      </div>
    </form>
  );
}
