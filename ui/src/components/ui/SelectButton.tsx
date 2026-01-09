interface SelectButtonProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function SelectButton({
  selected,
  onClick,
  children,
  className = "",
}: SelectButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-3 rounded-xl border transition-all duration-300 flex items-center justify-center gap-2 ${
        selected
          ? "bg-orange-500/20 border-orange-400 text-orange-400"
          : "bg-white/5 border-white/10 text-gray-400 hover:border-white/30"
      } ${className}`}
    >
      {children}
    </button>
  );
}
