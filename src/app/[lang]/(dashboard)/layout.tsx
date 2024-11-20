"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Spinner from "../../components/Spinner/Spinner";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, router]);

  if (loading) {
    return <Spinner></Spinner>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
