"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../../hooks/useAuth";
import Spinner from "../../components/Spinner/Spinner";

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
    <div className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center blur-[6px]"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/premium-photo/contemporary-living-room-with-green-accents_1123896-137824.jpg')",
        }}
      ></div>

      <main className="relative z-10">{children}</main>
    </div>
  );
}
