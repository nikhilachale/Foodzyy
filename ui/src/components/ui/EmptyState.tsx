import { ReactNode } from "react";

interface EmptyStateProps {
  icon: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export default function EmptyState({ icon, title, subtitle, action }: EmptyStateProps) {
  return (
    <div className="text-center py-20 backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10">
      <span className="text-7xl mb-6 block">{icon}</span>
      <p className="text-gray-300 text-xl font-medium">{title}</p>
      {subtitle && <p className="text-gray-500 mt-2 mb-6">{subtitle}</p>}
      {action}
    </div>
  );
}
