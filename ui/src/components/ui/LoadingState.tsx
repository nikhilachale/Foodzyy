interface LoadingStateProps {
  icon?: string;
  message?: string;
}

export default function LoadingState({ icon = "🍕", message = "Loading..." }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl animate-pulse">{icon}</span>
        </div>
      </div>
      <p className="text-gray-400 mt-4 animate-pulse">{message}</p>
    </div>
  );
}
