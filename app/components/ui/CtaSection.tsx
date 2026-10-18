import { ReactNode } from 'react';
import BentoItem from '../BentoItem';

interface CtaButton {
  text: string;
  href: string;
  variant: 'primary' | 'secondary';
  label?: string;
}

interface CtaSectionProps {
  headingId: string;
  title: ReactNode;
  description: string | ReactNode;
  buttons: CtaButton[];
}

export default function CtaSection({ headingId, title, description, buttons }: CtaSectionProps) {
  return (
    <section aria-labelledby={headingId}>
      <div className="bento-grid grid grid-cols-1 gap-0 sm:grid-cols-2">
        <BentoItem showBottomBorder className="bg-transparent p-6 sm:p-10 lg:p-14 min-h-[280px] flex flex-col justify-center sm:col-span-2">
          <h2 id={headingId} className="text-4xl font-bold mb-5 font-sans">{title}</h2>
          <p className="text-slate-300 text-lg mb-6 font-mono">{description}</p>
          <div className="flex gap-4 flex-wrap items-center">
            {buttons.map((button) => (
              <a
                key={button.href}
                href={button.href}
                className={
                  button.variant === 'primary'
                    ? 'bg-gradient-to-r from-orange-500 to-orange-400 text-black px-10 py-4 rounded-lg font-bold hover:from-orange-400 hover:to-amber-400 shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300 font-mono text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-black'
                    : 'border border-slate-600 px-10 py-4 rounded-lg font-semibold hover:bg-gradient-to-r hover:from-white/5 hover:to-white/[0.02] hover:border-slate-500 transition-all duration-300 font-mono text-base focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-black'
                }
                aria-label={button.label}
              >
                {button.text}
              </a>
            ))}
          </div>
        </BentoItem>
      </div>
    </section>
  );
}
