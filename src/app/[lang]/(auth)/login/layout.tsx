"use client";

import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";
import useAuth from "../../../hooks/useAuth";
import Spinner from "../../../components/Spinner/Spinner";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && user) {
      router.push("/home");
    }
  }, [isAuthenticated, user, router]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
