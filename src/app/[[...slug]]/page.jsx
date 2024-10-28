"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import "../../global.css";
import { ClientOnly } from "./client";

export default function Page({ params }) {
  const router = useRouter();

  useEffect(() => {
    if (params?.slug === "login") {
      router.push("/login");
    }
  }, [params, router]);

  return <ClientOnly />;
}
