import "../../global.css";
import { ClientOnly } from "./client";

export function generateStaticParams() {
  return [
    { slug: [""] },
    { slug: ["profile"] },
    { slug: ["contact"] },
    { slug: ["about"] },
    { slug: ["blog"] },
    { slug: ["assignment"] },
    { slug: ["products"] },
    { slug: ["posts"] },



  ];
}

export default function Page() {
  return <ClientOnly />;
}
