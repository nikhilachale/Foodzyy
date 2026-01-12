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
      const response = await api.post("", {
        query: `mutation Login($phone: String!) {\n  login(phone: $phone)\n}`,
        variables: { phone: cleanPhone },
      });
      const token = response.data.data?.login;
      if (token) {
        localStorage.setItem("token", token);
        // Fetch user profile to check if name/country is missing
        const meRes = await api.post("/", {
          query: `query { me { id name country } }`,
        });
        const user = meRes.data.data?.me;
        if (!user?.name || !user?.country) {
          onNewUser();
        } else {
          onExistingUser();
        }
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err: any) {
      setError(err.response?.data?.errors?.[0]?.message || "Login failed. Please try again.");
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
