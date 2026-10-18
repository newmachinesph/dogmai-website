import { ReactNode } from 'react';
import BentoItem from '../BentoItem';
import SectionHeader from './SectionHeader';
import StatGrid from './StatGrid';

interface StatItem {
  value: string;
  label: string;
  color?: 'orange' | 'emerald' | 'white';
}

interface PageHeroProps {
  id: string;
  label: string;
  title: ReactNode;
  description: ReactNode;
  subdescription?: string;
  stats?: StatItem[];
  statsColumns?: 2 | 3 | 4;
  statsSize?: 'sm' | 'md' | 'lg';
  sidePanel?: ReactNode;
}

export default function PageHero({
  id,
  label,
  title,
  description,
  subdescription,
  stats,
  statsColumns = 4,
  statsSize = 'sm',
  sidePanel,
}: PageHeroProps) {
  return (
    <section aria-labelledby={id}>
      <div className="bento-grid grid grid-cols-1 gap-0 lg:grid-cols-4">
        <BentoItem className="bg-transparent p-6 sm:p-10 lg:p-14 min-h-[360px] flex flex-col justify-between lg:col-span-3">
          <div>
            <SectionHeader label={label} />
            <h1
              id={id}
              className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] font-sans tracking-tight"
            >
              {title}
            </h1>
            <p className="mt-6 text-lg text-slate-300 font-mono max-w-3xl leading-relaxed">
              {description}
            </p>
            {subdescription && (
              <p className="mt-4 text-slate-400 font-mono text-sm max-w-3xl">
                {subdescription}
              </p>
            )}
          </div>
          {stats && (
            <StatGrid stats={stats} columns={statsColumns} size={statsSize} />
          )}
        </BentoItem>

        {sidePanel && (
          <BentoItem
            showRightBorder
            className="bg-transparent p-6 sm:p-8 lg:p-10 min-h-[180px] flex flex-col justify-between lg:col-span-1"
          >
            {sidePanel}
          </BentoItem>
        )}
      </div>
    </section>
  );
}
