import LoadingSpinner from "./LoadingSpinner";

interface GradientButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
  className?: string;
}

export default function GradientButton({
  onClick,
  disabled = false,
  loading = false,
  loadingText = "Loading...",
  children,
  className = "",
}: GradientButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`group relative w-full overflow-hidden  bg-linear-to-r from-orange-500 via-pink-500 to-purple-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-orange-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none ${className}`}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading ? (
          <>
            <LoadingSpinner size="md" />
            {loadingText}
          </>
        ) : (
          children
        )}
      </span>
      <div className="absolute inset-0  bg-linear-to-r from-orange-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
}
