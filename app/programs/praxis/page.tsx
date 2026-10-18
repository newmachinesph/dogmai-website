'use client';

import { useRef, Suspense } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Header, Footer } from '../../components/shared';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import { LanguageSwitcher } from './i18n/LanguageSwitcher';
import { programs, programSlugs } from './data/programs';

// ============================================================================
// PRAXIS PAGE - AI-First Intensive Programs (i18n: EN/ZH)
// ============================================================================

const programColors: Record<string, { gradient: string; text: string; glow: string; border: string; badge: string; bg: string }> = {
  'ai-agent-builder': { gradient: 'from-violet-500 to-purple-500', text: 'text-violet-400', glow: 'bg-violet-500/10', border: 'border-violet-500/30', badge: 'bg-violet-500/10 text-violet-300', bg: 'bg-violet-500' },
  'ai-assisted-coding': { gradient: 'from-cyan-500 to-blue-500', text: 'text-cyan-400', glow: 'bg-cyan-500/10', border: 'border-cyan-500/30', badge: 'bg-cyan-500/10 text-cyan-300', bg: 'bg-cyan-500' },
  'ai-media-studio': { gradient: 'from-amber-500 to-orange-500', text: 'text-amber-400', glow: 'bg-amber-500/10', border: 'border-amber-500/30', badge: 'bg-amber-500/10 text-amber-300', bg: 'bg-amber-500' },
};

function HeroSection() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-[#060503]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060503] via-[#0a0705] to-[#060503]" />
        <motion.div
          className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-pink-500/10 blur-[150px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-rose-500/5 blur-[100px]"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="absolute top-24 right-4 sm:right-8 z-20">
        <LanguageSwitcher />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-pink-300 to-rose-400">
            {t.hero.title}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-xl sm:text-2xl text-[#c9b89b] font-light italic"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-[#a8987a] leading-relaxed"
        >
          {t.hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#services"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl font-semibold text-white hover:shadow-2xl hover:shadow-pink-500/30 transition-all duration-500"
          >
            {t.hero.ctaStart}
          </a>
          <a
            href="#programs"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-[#f4efe6] border border-[#3a3530] hover:border-pink-500/50 hover:bg-pink-500/5 transition-all duration-300 text-center"
          >
            {t.hero.ctaView}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

function StatsSection() {
  const { t } = useLanguage();
  const stats = [
    { value: '3', label: t.stats.programs },
    { value: '8-12', label: t.stats.weeks },
    { value: '15-20', label: t.stats.hoursWeek },
    { value: '100%', label: t.stats.shipWeekly },
  ];

  return (
    <section className="relative py-16 sm:py-20 border-y border-[#1a1815] bg-[#060503]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">
                {stat.value}
              </div>
              <div className="mt-2 text-xs sm:text-sm font-mono text-[#6f6160] uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const { t, language } = useLanguage();

  return (
    <section id="services" className="relative py-20 sm:py-32 bg-[#060503]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-xs font-mono uppercase tracking-[0.3em] text-pink-400/70 mb-4">
            {t.services.label}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f4efe6]">
            {t.services.title}
          </h2>
          <p className="mt-6 text-base lg:text-lg text-[#a8987a]">
            {t.services.description}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {t.services.items.map((service, index) => {
            const slug = service.slug;
            const colors = programColors[slug];
            const program = programs[slug as keyof typeof programs];

            return (
              <Link key={service.title} href={`/programs/praxis/${slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group relative h-full p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0d0a08] to-[#060503] border border-[#1a1815] hover:${colors.border} transition-all duration-500`}
                >
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colors.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full ${colors.badge} text-xs font-mono`}>
                        {program?.duration[language] ?? ''}
                      </span>
                      <span className="text-xs font-mono text-[#6f6160]">
                        {program?.weeklyHours} hrs/wk
                      </span>
                    </div>

                    <h3 className={`text-xl sm:text-2xl font-bold text-[#f4efe6] group-hover:${colors.text.replace('text-', 'text-')} transition-colors duration-300`}>
                      {service.title}
                    </h3>
                    <p className="mt-4 text-sm text-[#a8987a]">{service.description}</p>

                    <ul className="mt-6 space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-[#6f6160]">
                          <div className={`w-1.5 h-1.5 rounded-full ${colors.bg} opacity-50`} />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className={`mt-6 flex items-center gap-2 text-sm font-semibold ${colors.text} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                      <span>{language === 'en' ? 'Explore Program' : '了解课程'}</span>
                      <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProgramsSection() {
  const { t, language } = useLanguage();

  return (
    <section id="programs" className="relative py-20 sm:py-32 bg-gradient-to-b from-[#060503] to-[#0a0805]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-xs font-mono uppercase tracking-[0.3em] text-pink-400/70 mb-4">
            {t.programs.label}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f4efe6]">{t.programs.title}</h2>
          <p className="mt-6 text-base lg:text-lg text-[#a8987a]">
            {t.programs.description}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {t.programs.items.map((program, index) => {
            const slug = program.slug;
            const colors = programColors[slug];
            const data = programs[slug as keyof typeof programs];

            return (
              <Link key={program.name} href={`/programs/praxis/${slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group relative h-full p-6 sm:p-8 rounded-xl bg-gradient-to-br from-[#0d0a08] to-[#060503] border border-[#1a1815] hover:${colors.border} transition-all duration-500`}
                >
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${colors.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="relative">
                    <div className="flex items-center gap-3 mb-5">
                      <span className={`px-3 py-1 rounded-full ${colors.badge} text-xs font-mono`}>
                        {program.duration}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-[#1a1815] text-xs font-mono text-[#6f6160]">
                        {program.hours}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-[#f4efe6] group-hover:text-pink-300 transition-colors">
                      {program.name}
                    </h3>
                    <p className="mt-3 text-sm text-[#a8987a]">{program.focus}</p>

                    {data && (
                      <p className="mt-4 text-xs text-[#6f6160] leading-relaxed">
                        {data.target[language]}
                      </p>
                    )}

                    <div className={`mt-6 flex items-center gap-2 text-sm font-semibold ${colors.text}`}>
                      <span>{language === 'en' ? 'View Full Curriculum' : '查看完整课程'}</span>
                      <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const { t } = useLanguage();

  return (
    <section className="relative py-20 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d0906] via-pink-950/20 to-[#060503]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-pink-500/5 blur-[150px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500/30 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f4efe6]">
            {t.cta.title}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">
              {t.cta.highlight}
            </span>
            ?
          </h2>
          <p className="mt-8 text-base sm:text-lg text-[#a8987a] max-w-2xl mx-auto">
            {t.cta.description}
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl font-bold text-lg text-white hover:shadow-2xl hover:shadow-pink-500/30 transition-all duration-500"
            >
              {t.cta.ctaJoin}
            </Link>
            <Link
              href="mailto:hello@dogm.ai"
              className="w-full sm:w-auto px-10 py-5 rounded-xl font-semibold text-lg text-[#f4efe6] border border-[#3a3530] hover:border-pink-500/50 hover:bg-pink-500/5 transition-all duration-300 text-center"
            >
              hello@dogm.ai
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PraxisContent() {
  return (
    <>
      <Header />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <ProgramsSection />
      <CTASection />
      <Footer />
    </>
  );
}

export default function PraxisPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#060503]" />}>
      <LanguageProvider>
        <main className="min-h-screen bg-[#060503] text-[#f4efe6] antialiased">
          <PraxisContent />
        </main>
      </LanguageProvider>
    </Suspense>
  );
}
