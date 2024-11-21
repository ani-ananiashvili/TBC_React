"use client";
import { useRouter } from "next/navigation";
import useAuth from "../../../hooks/useAuth";
import "./login.css";

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    router.push("/home");
  }

  return (
    <div className="login-container">
      <div className="background-image"></div>
      <div className="login-content">
        <h1 className="welcome-message">Welcome to the Furniture Store!</h1>
        <p className="store-description">
          Discover stylish and comfortable furniture for every room in your
          home. From modern to classic, we have something for every taste.
        </p>
        <p className="store-benefits">
          Enjoy exclusive deals, free delivery, and quality craftsmanship that
          lasts.
        </p>
        <button className="login-button" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}

