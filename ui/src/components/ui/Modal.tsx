import type { ReactNode } from "react";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen = true, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-linear-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-hidden border border-white/10 animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

interface ModalHeaderProps {
  title: string;
  subtitle?: string;
  countryFlag?: string;
  gradient: "india" | "usa";
  onClose: () => void;
}

export function ModalHeader({ title, subtitle, countryFlag, gradient, onClose }: ModalHeaderProps) {
  const gradientClass = gradient === "india" 
    ? "bg-linear-to-r from-orange-500 to-amber-500" 
    : "bg-linear-to-r from-blue-500 to-purple-500";

  return (
    <div className={`p-6 relative overflow-hidden ${gradientClass}`}>
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-white">{title}</h3>
          {subtitle && (
            <p className="text-white/80 mt-1 flex items-center gap-2">
              {countryFlag && <span>{countryFlag}</span>}
              {subtitle}
            </p>
          )}
        </div>
        <button 
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white text-xl font-bold transition-all duration-300"
        >
          ×
        </button>
      </div>
    </div>
  );
}

interface SimpleModalHeaderProps {
  children: ReactNode;
  onClose: () => void;
}

export function SimpleModalHeader({ children, onClose }: SimpleModalHeaderProps) {
  return (
    <div className="p-6 relative overflow-hidden bg-linear-to-r from-orange-500 to-pink-500">
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative z-10 flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white">{children}</h3>
        <button 
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white text-xl font-bold transition-all duration-300"
        >
          ×
        </button>
      </div>
    </div>
  );
}

interface ModalBodyProps {
  children: ReactNode;
  className?: string;
}

export function ModalBody({ children, className = "max-h-[50vh]" }: ModalBodyProps) {
  return (
    <div className={`p-6 overflow-y-auto ${className}`}>
      {children}
    </div>
  );
}

interface ModalFooterProps {
  children: ReactNode;
}

export function ModalFooter({ children }: ModalFooterProps) {
  return (
    <div className="p-4 border-t border-white/10 bg-slate-900/50 flex gap-3 justify-end">
      {children}
    </div>
  );
}
