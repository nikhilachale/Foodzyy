import { useState } from "react";
import {
  AnimatedBackground,
  LogoHeader,
  PhoneLoginForm,
  ProfileSetupModal,
} from "../components/login";

export default function Login() {
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleNewUser = () => {
    setShowProfileModal(true);
  };

  const handleExistingUser = () => {
    window.location.href = "/restaurants";
  };

  const handleProfileComplete = () => {
    window.location.href = "/restaurants";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <AnimatedBackground />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Glass Card */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 md:p-10">
          {/* Logo */}
          <LogoHeader />

          {/* Login Form */}
          <PhoneLoginForm
            onNewUser={handleNewUser}
            onExistingUser={handleExistingUser}
          />
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          © 2026 Foodzyy. Made with ❤️ for foodies
        </p>
      </div>

      {/* Profile Setup Modal */}
      {showProfileModal && (
        <ProfileSetupModal onSuccess={handleProfileComplete} />
      )}
    </div>
  );
}