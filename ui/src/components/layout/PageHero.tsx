import type { ReactNode } from "react";

interface PageHeroProps {
  title: string;
  highlightedText: string;
  subtitle: string;
  rightContent?: ReactNode;
}

export default function PageHero({ title, highlightedText, subtitle, rightContent }: PageHeroProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
      <div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
          {title} <span className="bg-linear-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">{highlightedText}</span>
        </h2>
        <p className="text-gray-400 text-lg">{subtitle}</p>
      </div>
      {rightContent}
    </div>
  );
}
