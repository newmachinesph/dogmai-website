import BentoItem from '../BentoItem';
import SectionHeader from './SectionHeader';

interface FaqItem {
  question: string;
  answer: string[];
}

interface FaqGridProps {
  label: string;
  title: string;
  subtitle?: string;
  headingId: string;
  faqs: FaqItem[];
}

export default function FaqGrid({ label, title, subtitle, headingId, faqs }: FaqGridProps) {
  return (
    <section aria-labelledby={headingId} id="faq">
      <div className="bento-grid grid grid-cols-1 gap-0 sm:grid-cols-2">
        <BentoItem className="bg-transparent p-6 sm:p-8 lg:p-12 min-h-[220px] flex flex-col justify-center sm:col-span-2">
          <SectionHeader label={label} />
          <h2 id={headingId} className="text-3xl font-bold font-sans mb-2">{title}</h2>
          {subtitle && <p className="text-slate-400 font-mono text-sm">{subtitle}</p>}
        </BentoItem>

        {faqs.map((faq, index) => (
          <BentoItem
            key={faq.question}
            showBottomBorder
            showRightBorder={index % 2 !== 0 || (faqs.length % 2 !== 0 && index === faqs.length - 1)}
            className="bg-transparent p-6 sm:p-8 lg:p-10 min-h-[280px] flex flex-col justify-between group hover:bg-gradient-to-br hover:from-white/[0.02] hover:to-transparent transition-all duration-500"
          >
            <div>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 flex items-center justify-center mb-6 group-hover:from-orange-500/30 group-hover:border-orange-400/50 group-hover:shadow-lg group-hover:shadow-orange-500/10 transition-all duration-300">
                <span className="text-orange-400 font-bold font-mono text-base">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="text-xl font-bold font-sans mb-4 group-hover:text-orange-200 transition-colors duration-300">{faq.question}</h3>
              <div className="space-y-3 text-slate-400 font-mono text-sm group-hover:text-slate-300 transition-colors duration-300">
                {faq.answer.map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
            </div>
          </BentoItem>
        ))}
      </div>
    </section>
  );
}
