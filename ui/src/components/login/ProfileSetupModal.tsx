import { useState } from "react";
import api from "../../api/axios";
import FormInput from "../ui/FormInput";
import GradientButton from "../ui/GradientButton";

interface ProfileSetupModalProps {
  onSuccess: () => void;
}

export default function ProfileSetupModal({ onSuccess }: ProfileSetupModalProps) {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSave = async () => {
    if (!name.trim() || !country) {
      setError("Please enter your name and select a country");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await api.post("/", {
        query: `mutation UpdateUser($name: String!, $country: Country!) {\n  updateUser(name: $name, country: $country) { id name country }\n}`,
        variables: { name, country },
      });
      setSuccess("Welcome to Foodzyy!");
      setTimeout(() => {
        onSuccess();
      }, 1000);
    } catch (err: any) {
      setError("Failed to save profile. Please try again.");
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
          <div className="inline-flex items-center justify-center w-16 h-16  bg-linear-to-br from-green-400 to-emerald-500 rounded-2xl shadow-lg mb-4">
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
          <div>
            <label className="block text-gray-300 mb-1">Country</label>
            <select
              className="w-full rounded-lg p-2 bg-slate-800 text-white border border-white/10"
              value={country}
              onChange={e => setCountry(e.target.value)}
            >
              <option value="">Select Country</option>
              <option value="INDIA">India</option>
              <option value="AMERICA">America</option>
            </select>
          </div>
          {/* Error/Success Messages */}
          {error && <p className="text-red-400 text-sm animate-pulse">{error}</p>}
          {success && <p className="text-green-400 text-sm animate-pulse">{success}</p>}
          {/* Submit Button */}
          <GradientButton
            onClick={handleSave}
            loading={loading}
            loadingText="Getting Started..."
            disabled={!name.trim() || !country}
            className="mt-4"
          >
            Get Started →
          </GradientButton>
        </div>
      </div>
    </div>
  );
}
