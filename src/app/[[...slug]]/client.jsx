import dynamic from "next/dynamic";
import "../../global.css";

const MainComponent = dynamic(() => import("../layout"), { ssr: false });

export function ClientOnly() {
  return <MainComponent />;
}
