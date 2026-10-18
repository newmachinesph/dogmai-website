'use client';

interface SectionHeaderProps {
  label: string;
  className?: string;
}

export default function SectionHeader({ label, className = '' }: SectionHeaderProps) {
  return (
    <div className={`flex items-center gap-4 mb-6 ${className}`}>
      <div className="h-[2px] w-12 bg-gradient-to-r from-orange-500 to-transparent"></div>
      <p className="text-xs font-mono uppercase tracking-[0.35em] text-orange-500">
        {label}
      </p>
      <div className="h-[2px] flex-1 bg-gradient-to-r from-orange-500/20 to-transparent"></div>
    </div>
  );
}
