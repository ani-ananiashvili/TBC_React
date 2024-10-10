import "../../App.css";
import { ClientOnly } from "./client";

export function generateStaticParams() {
  return [
    { slug: [""] },
    { slug: ["profile"] },
    { slug: ["contact"] },
    { slug: ["about"] },
    { slug: ["blog"] },
    { slug: ["assignment"] },

  ];
}

export default function Page() {
  return <ClientOnly />;
}
