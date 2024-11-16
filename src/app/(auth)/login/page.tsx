"use client";
import { useRouter } from "next/navigation";
import useAuth from "../../hooks/useAuth";
import './Login.css';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    router.push("/home"); 
  }

  return (
    <div className="login-container">
      <h1 className="welcome-message">WELCOME TO MY PROJECT!</h1>
      <button className="login-button" onClick={login}>Login</button>
    </div>
  );
}
