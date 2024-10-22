// AdminLogin.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { AuthForm } from "@/components/AuthForm";
import real_estate from "../assets/real_estate.jpg";
export default function AdminLogin() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (values: { email: string; password: string }) => {
    setIsLoading(true);
    setError("");
    try {
      await login(values.email, values.password);
      navigate("/admin-dashboard");
    } catch (error) {
      setError("Failed to log in. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="container flex flex-col items-center justify-center min-h-dvh"
      style={{
        backgroundImage: `url(${real_estate})`,
        backgroundSize: "cover", // optional
        backgroundPosition: "center", // optional
      }}
    >
      <AuthForm
        title="Admin Login"
        onSubmit={handleSubmit}
        error={error}
        isLoading={isLoading}
        linkText="Don't have an account? Sign Up"
        linkTo="/admin-signup"
      />
    </div>
  );
}
