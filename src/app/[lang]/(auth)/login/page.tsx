import SignInForm from "../../../components/SignInForm";
import SignUpForm from "../../../components/SignUpForm";
import { Message } from "../../../components/form-message";

interface Props {
  searchParams?: Message;
}

export default function Login({ searchParams }: Props) {
  return (
    <div className="flex gap-4 justify-center mt-16 mb-16 flex-col md:flex-row">
      <div className="flex-1 max-w-sm">
        <SignInForm searchParams={searchParams} />
      </div>
      <div className="flex-1 max-w-sm">
        <SignUpForm searchParams={searchParams} />
      </div>
    </div>
  );
}
