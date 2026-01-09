import { ReactNode } from "react";

interface PageContentProps {
  children: ReactNode;
  className?: string;
}

export default function PageContent({ children, className = "" }: PageContentProps) {
  return (
    <main className={`max-w-7xl mx-auto px-4 py-8 ${className}`}>
      {children}
    </main>
  );
}
