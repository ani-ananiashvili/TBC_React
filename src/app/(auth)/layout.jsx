"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";

export default function AuthLayout({ children }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/home"); 
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) return null; 

  return <>{children}</>;
}
