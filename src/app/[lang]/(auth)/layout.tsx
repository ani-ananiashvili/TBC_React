"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../../hooks/useAuth";
import Spinner from "../../components/Spinner/Spinner";
import AuthHeader from "../../components/Header/AuthHeader";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/home");
    }
  }, [isAuthenticated, router]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="relative flex flex-col">
      <div
        className="absolute inset-0 bg-cover blur-[5px]"
        style={{
          backgroundImage: "url('/assets/cover-image.jpg')",
        }}
      ></div>

      <main className="relative z-10 flex-grow flex justify-center items-center">
        <div className="w-full max-w-md px-6 py-8 bg-opacity-80 rounded-lg">
          <AuthHeader />
          {children}
        </div>
      </main>
    </div>
  );
}
