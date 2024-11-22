"use client";

import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";
import useAuth from "../../hooks/useAuth";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && user) {
      router.push("/home");
    }
  }, [isAuthenticated, user, router]);

  if (isAuthenticated === undefined) {
    return null; 
  }

  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
