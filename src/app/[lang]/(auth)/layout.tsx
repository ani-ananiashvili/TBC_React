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

  return <>{children}</>; 
}
