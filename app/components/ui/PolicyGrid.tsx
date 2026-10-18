import BentoItem from '../BentoItem';
import SectionHeader from './SectionHeader';

interface PolicySection {
  title: string;
  description: string;
  footer?: string;
  link?: {
    href: string;
    text: string;
    label: string;
  };
}

interface PolicyGridProps {
  label: string;
  headingId: string;
  sections: PolicySection[];
}

export default function PolicyGrid({ label, headingId, sections }: PolicyGridProps) {
  return (
    <section aria-labelledby={headingId}>
      <div className="bento-grid grid grid-cols-1 gap-0 sm:grid-cols-2">
        <BentoItem showBottomBorder className="bg-transparent p-6 sm:p-8 lg:p-12 min-h-[240px] flex flex-col justify-between sm:col-span-2">
          <SectionHeader label={label} />
        </BentoItem>

        {sections.map((section, index) => {
          const isOdd = index % 2 !== 0;
          const isFirst = index === 0;
          const HeadingTag = isFirst ? 'h2' : 'h3';

          return (
            <BentoItem
              key={section.title}
              showBottomBorder
              showRightBorder={isOdd}
              className={`bg-transparent ${isOdd ? 'p-12' : 'p-6 sm:p-8 lg:p-12'} min-h-[240px] flex flex-col justify-between group hover:bg-gradient-to-br hover:from-orange-500/[0.03] hover:to-transparent transition-all duration-500`}
            >
              <div>
                <HeadingTag
                  id={isFirst ? headingId : undefined}
                  className="text-2xl font-bold font-sans group-hover:text-orange-100 transition-colors duration-300"
                >
                  {section.title}
                </HeadingTag>
                <p className="mt-3 text-slate-400 font-mono text-sm max-w-md leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                  {section.description}
                </p>
              </div>
              {section.footer && (
                <p className="text-slate-500 font-mono text-xs">{section.footer}</p>
              )}
              {section.link && (
                <a
                  href={section.link.href}
                  className="text-slate-300 font-mono text-sm hover:text-orange-400 transition focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black rounded"
                  aria-label={section.link.label}
                >
                  {section.link.text}
                </a>
              )}
            </BentoItem>
          );
        })}
      </div>
    </section>
  );
}
