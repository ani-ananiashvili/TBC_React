import "./global.css";
import { useRouter } from "next/navigation";
import useAuth from "./app/hooks/useAuth";

export default function App() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (isAuthenticated) {
    router.push("/home");
  } else {
    router.push("/login");
  }

  return null;
}
