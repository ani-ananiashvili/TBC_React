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
    <div className="p-20 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-contain blur-[6px]"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/mid-century-modern-living-room-interior-design-with-monstera-tree_53876-129804.jpg?semt=ais_hybrid')",
        }}
      ></div>

      <main className="relative z-10">
        <AuthHeader />
        {children}
      </main>
    </div>
  );
}
