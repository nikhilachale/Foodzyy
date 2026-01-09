import { useState } from "react";
import api from "../../api/axios";
import FormInput from "../ui/FormInput";
import GradientButton from "../ui/GradientButton";

interface PhoneLoginFormProps {
  onNewUser: () => void;
  onExistingUser: () => void;
}

export default function PhoneLoginForm({ onNewUser, onExistingUser }: PhoneLoginFormProps) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const getCleanPhone = () => phone.replace(/\D/g, "");

  const isValidPhone = () => getCleanPhone().length >= 10;

  const handleLogin = async () => {
    const cleanPhone = getCleanPhone();
    if (cleanPhone.length < 10) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/login", { phone: cleanPhone });
      localStorage.setItem("token", res.data.access_token);

      if (res.data.isNewUser) {
        onNewUser();
      } else {
        onExistingUser();
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
      console.error("Login failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && isValidPhone()) {
      handleLogin();
    }
  };

  return (
    <div className="space-y-6">
      <FormInput
        label="Phone Number"
        type="tel"
        placeholder="Enter your phone number"
        value={phone}
        onChange={(value) => setPhone(formatPhone(value))}
        onKeyDown={handleKeyDown}
        icon="📱"
        maxLength={12}
        error={error}
      />

      <GradientButton
        onClick={handleLogin}
        loading={loading}
        loadingText="Signing in..."
        disabled={!isValidPhone()}
      >
        Sign In
        <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
      </GradientButton>

      {/* Info text */}
      <div className="mt-8 pt-6 border-t border-white/10">
        <p className="text-gray-400 text-sm text-center">
          Enter your phone number to login or create a new account
        </p>
        <p className="text-gray-500 text-xs text-center mt-2">
          New users will be automatically registered
        </p>
      </div>
    </div>
  );
}
