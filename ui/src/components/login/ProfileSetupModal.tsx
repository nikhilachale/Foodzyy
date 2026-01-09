import { useState } from "react";
import api from "../../api/axios";
import FormInput from "../ui/FormInput";
import GradientButton from "../ui/GradientButton";
import SelectButton from "../ui/SelectButton";

export interface ProfileFormData {
  name: string;
  country: "INDIA" | "AMERICA";
  role: "ADMIN" | "MANAGER" | "MEMBER";
}

interface ProfileSetupModalProps {
  onSuccess: () => void;
}

const COUNTRIES = [
  { value: "INDIA" as const, label: "India", icon: "🇮🇳" },
  { value: "AMERICA" as const, label: "America", icon: "🇺🇸" },
];

const ROLES = [
  { value: "MEMBER" as const, label: "MEMBER", icon: "👤" },
  { value: "MANAGER" as const, label: "MANAGER", icon: "👔" },
  { value: "ADMIN" as const, label: "ADMIN", icon: "👑" },
];

export default function ProfileSetupModal({ onSuccess }: ProfileSetupModalProps) {
  const [profileData, setProfileData] = useState<ProfileFormData>({
    name: "",
    country: "INDIA",
    role: "MEMBER",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSave = async () => {
    if (!profileData.name.trim()) {
      setError("Please enter your name");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await api.put("/auth/profile", profileData);
      localStorage.setItem("token", res.data.access_token);
      setSuccess("Profile saved successfully!");
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

  const updateField = <K extends keyof ProfileFormData>(field: K, value: ProfileFormData[K]) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
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
            value={profileData.name}
            onChange={(value) => updateField("name", value)}
          />

          {/* Country Select */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Country
            </label>
            <div className="grid grid-cols-2 gap-3">
              {COUNTRIES.map((country) => (
                <SelectButton
                  key={country.value}
                  selected={profileData.country === country.value}
                  onClick={() => updateField("country", country.value)}
                >
                  {country.icon} {country.label}
                </SelectButton>
              ))}
            </div>
          </div>

          {/* Role Select */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Role
            </label>
            <div className="grid grid-cols-3 gap-2">
              {ROLES.map((role) => (
                <SelectButton
                  key={role.value}
                  selected={profileData.role === role.value}
                  onClick={() => updateField("role", role.value)}
                  className="text-sm font-medium px-3 py-2.5"
                >
                  {role.icon} {role.label}
                </SelectButton>
              ))}
            </div>
          </div>

          {/* Error/Success Messages */}
          {error && <p className="text-red-400 text-sm animate-pulse">{error}</p>}
          {success && <p className="text-green-400 text-sm animate-pulse">{success}</p>}

          {/* Submit Button */}
          <GradientButton
            onClick={handleSave}
            loading={loading}
            loadingText="Saving..."
            disabled={!profileData.name.trim()}
            className="mt-4"
          >
            Complete Setup →
          </GradientButton>
        </div>
      </div>
    </div>
  );
}
