'use client';

import BentoItem from '../BentoItem';

interface ContactCardProps {
  title: string;
  description: string;
  statusText: string;
  statusColor?: 'emerald' | 'orange' | 'blue';
  actionText: string;
  actionHref: string;
  accentColor?: 'orange' | 'emerald' | 'blue';
  showRightBorder?: boolean;
  external?: boolean;
}

const statusColorClasses = {
  emerald: 'text-emerald-400',
  orange: 'text-orange-400',
  blue: 'text-blue-400',
};

const hoverClasses = {
  orange: 'hover:bg-gradient-to-br hover:from-orange-500/[0.03] hover:to-transparent',
  emerald: 'hover:bg-gradient-to-br hover:from-emerald-500/[0.03] hover:to-transparent',
  blue: 'hover:bg-gradient-to-br hover:from-blue-500/[0.03] hover:to-transparent',
};

const titleHoverClasses = {
  orange: 'group-hover:text-orange-200',
  emerald: 'group-hover:text-emerald-200',
  blue: 'group-hover:text-blue-200',
};

const buttonClasses = {
  orange: 'border-orange-500/30 bg-orange-500/10 hover:bg-orange-500/20 hover:border-orange-400/50 text-orange-300',
  emerald: 'border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 hover:border-emerald-400/50 text-emerald-300',
  blue: 'border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 hover:border-blue-400/50 text-blue-300',
};

export default function ContactCard({
  title,
  description,
  statusText,
  statusColor = 'emerald',
  actionText,
  actionHref,
  accentColor = 'orange',
  showRightBorder = false,
  external = false,
}: ContactCardProps) {
  return (
    <BentoItem
      showRightBorder={showRightBorder}
      className={`bg-transparent p-6 sm:p-8 lg:p-10 min-h-[280px] flex flex-col justify-between group ${hoverClasses[accentColor]} transition-all duration-500`}
    >
      <div>
        <h4
          className={`text-xl font-bold font-sans mb-3 ${titleHoverClasses[accentColor]} transition-colors duration-300`}
        >
          {title}
        </h4>
        <p className="text-slate-400 font-mono text-sm leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
          {description}
        </p>
      </div>
      <div>
        <p className={`${statusColorClasses[statusColor]} text-xs font-mono mb-4`}>
          {statusText}
        </p>
        <a
          href={actionHref}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className={`border ${buttonClasses[accentColor]} px-4 py-2 rounded-lg font-semibold transition-all duration-300 font-mono text-sm inline-block`}
        >
          {actionText}
        </a>
      </div>
    </BentoItem>
  );
}
