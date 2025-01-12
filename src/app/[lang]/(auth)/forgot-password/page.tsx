import { forgotPasswordAction } from "../../../actions";
import { FormMessage } from "../../../components/form-message";
import { SubmitButton } from "../../../components/submit-button";

interface ForgotPasswordFormProps {
  searchParams: Record<string, string | undefined>;
}

export default function ForgotPasswordForm({ searchParams }: ForgotPasswordFormProps) {
  return (
    <form className="flex flex-col min-w-64 max-w-xs mx-auto border border-[#4a628a] rounded-lg p-6 h-full m-20">
      <h1 className="text-2xl font-medium">Reset Password</h1>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <label htmlFor="email">Email</label>
        <input
          className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:border-blue-500"
          name="email"
          placeholder="you@example.com"
          required
          data-cy="forgot-password-email"
        />
        <SubmitButton
          className="bg-[#4a628a] hover:bg-[#3e4f6a] text-white rounded p-2 mt-4"
          formAction={forgotPasswordAction}
          pendingText="Resetting Password..."
        >
          Reset Password
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
