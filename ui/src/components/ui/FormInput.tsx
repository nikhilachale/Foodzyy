interface FormInputProps {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  icon?: string;
  maxLength?: number;
  error?: string;
  success?: string;
}

export default function FormInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  onKeyDown,
  icon,
  maxLength,
  error,
  success,
}: FormInputProps) {
  return (
    <div className="group">
      <label className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-orange-400 transition-colors">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-400 transition-colors">
            {icon}
          </span>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          maxLength={maxLength}
          className={`w-full ${icon ? "pl-12" : "px-4"} pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 focus:bg-white/10 outline-none transition-all duration-300`}
        />
      </div>
      {error && (
        <p className="text-red-400 text-sm mt-2 animate-pulse">{error}</p>
      )}
      {success && (
        <p className="text-green-400 text-sm mt-2 animate-pulse">{success}</p>
      )}
    </div>
  );
}
