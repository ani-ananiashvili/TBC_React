"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import "../../global.css";
import { ClientOnly } from "./client";

interface PageProps {
  params: {
    slug?: string[];
  };
}

export default function Page({ params }: PageProps) {
  const router = useRouter();

  useEffect(() => {
    if (!params?.slug || params.slug.length === 0) {
      router.replace("/home");
    } else if (params.slug[0] === "login") {
      router.replace("/login");
    } else if (params.slug[0] === "logout") {
      router.replace("/");
    } else {
      console.error("Page not found:", params.slug.join("/"));
      alert("Page not found...");
      router.replace("/home");
    }
  }, [params, router]);

  return <ClientOnly />;
}
