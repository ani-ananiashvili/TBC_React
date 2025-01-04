import SignInForm from "../../../components/SignInForm";
import SignUpForm from "../../../components/SignUpForm";

interface Props {
  searchParams: Record<string, string | undefined>; 
}

export default async function Login({ searchParams }: Props) {
  return (
    <div className="flex gap-8 justify-center mt-16 flex-col md:flex-row">
      <div className="flex-1">
        <SignInForm searchParams={searchParams} />
      </div>
      <div className="flex-1">
        <SignUpForm searchParams={searchParams} />
      </div>
    </div>
  );
}
