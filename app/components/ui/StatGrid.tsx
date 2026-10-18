'use client';

interface StatItem {
  value: string;
  label: string;
  color?: 'orange' | 'emerald' | 'white';
}

interface StatGridProps {
  stats: StatItem[];
  columns?: 2 | 3 | 4;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const colorClasses = {
  orange: {
    value: 'text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-300',
    glow: 'group-hover:drop-shadow-[0_0_15px_rgba(251,146,60,0.4)]',
    label: 'group-hover:text-orange-300/70',
  },
  emerald: {
    value: 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-300',
    glow: 'group-hover:drop-shadow-[0_0_15px_rgba(52,211,153,0.4)]',
    label: 'group-hover:text-emerald-300/70',
  },
  white: {
    value: 'text-white',
    glow: 'group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300',
    label: 'group-hover:text-slate-300',
  },
};

const sizeClasses = {
  sm: 'text-2xl',
  md: 'text-3xl',
  lg: 'text-4xl',
};

export default function StatGrid({
  stats,
  columns = 4,
  size = 'md',
  className = '',
}: StatGridProps) {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  };

  return (
    <div
      className={`mt-10 grid ${gridCols[columns]} gap-4 sm:gap-6 text-sm font-mono text-slate-400 ${className}`}
    >
      {stats.map((stat, index) => {
        const colors = colorClasses[stat.color || 'white'];
        return (
          <div key={index} className="group">
            <div
              className={`${sizeClasses[size]} font-bold font-sans ${colors.value} ${colors.glow} transition-all duration-300`}
            >
              {stat.value}
            </div>
            <div className={`mt-1 ${colors.label} transition-colors duration-300`}>
              {stat.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
