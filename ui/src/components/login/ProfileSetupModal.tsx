import { useState } from "react";
import api from "../../api/axios";
import FormInput from "../ui/FormInput";
import GradientButton from "../ui/GradientButton";

interface ProfileSetupModalProps {
  onSuccess: () => void;
}

export default function ProfileSetupModal({ onSuccess }: ProfileSetupModalProps) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSave = async () => {
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await api.put("/auth/profile", { name: name.trim() });
      localStorage.setItem("token", res.data.access_token);
      setSuccess("Welcome to Foodzyy!");
      setTimeout(() => {
        onSuccess();
      }, 1000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save profile. Please try again.");
      console.error("Profile update failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-900 border border-white/20 rounded-3xl shadow-2xl w-full max-w-md p-8 animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl shadow-lg mb-4">
            <span className="text-3xl">🎉</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Welcome to Foodzyy!</h2>
          <p className="text-gray-400 mt-2">Complete your profile to get started</p>
        </div>

        {/* Form */}
        <div className="space-y-5">
          {/* Name Input */}
          <FormInput
            label="Your Name"
            placeholder="Enter your full name"
            value={name}
            onChange={setName}
          />

          {/* Error/Success Messages */}
          {error && <p className="text-red-400 text-sm animate-pulse">{error}</p>}
          {success && <p className="text-green-400 text-sm animate-pulse">{success}</p>}

          {/* Submit Button */}
          <GradientButton
            onClick={handleSave}
            loading={loading}
            loadingText="Getting Started..."
            disabled={!name.trim()}
            className="mt-4"
          >
            Get Started →
          </GradientButton>
        </div>
      </div>
    </div>
  );
}
