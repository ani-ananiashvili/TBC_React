import { forgotPasswordAction } from "../actions";
import { FormMessage, Message } from "../../../components/Auth/form-message";
import { SubmitButton } from "../../../components/Auth/submit-button";
import { Input } from "../../../components/Auth/input";
import Link from "next/link";

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;

  return (
    <form
      className="mb-24 mt-36 flex flex-col min-w-64 max-w-xs mx-auto border border-[#4a628a] rounded-lg p-4"
      style={{
        background: "linear-gradient(145deg, #f5f7fa, #e4ebf5)",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div>
        <h2 className="text-2xl font-medium">Reset Password</h2>
        <p className="text-sm text-secondary-foreground">
          Already have an account?{" "}
          <Link className="text-primary underline" href="/sign-in">
            Sign in
          </Link>
        </p>
      </div>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-6">
        <Input
          name="email"
          placeholder="you@example.com"
          required
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <SubmitButton
          className="bg-[#4a628a] hover:bg-[#3e4f6a] text-white rounded p-2 mt-4"
          formAction={forgotPasswordAction}
        >
          Reset Password
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
