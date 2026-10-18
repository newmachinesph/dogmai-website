'use client';

import { useRef, Suspense } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Header, Footer } from '../../../components/shared';
import { LanguageProvider, useLanguage } from '../i18n/LanguageContext';
import { LanguageSwitcher } from '../i18n/LanguageSwitcher';
import { getProgram, type ProgramData } from '../data/programs';

// ============================================================================
// PROGRAM DETAIL PAGE - Individual program pages (i18n: EN/ZH)
// ============================================================================

function HeroSection({ program }: { program: ProgramData }) {
  const { t, language } = useLanguage();
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
          className={`absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full ${program.color.glow} blur-[150px]`}
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          className={`absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full ${program.color.glow} blur-[100px] opacity-30`}
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
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link
            href="/programs/praxis"
            className="inline-flex items-center gap-2 text-sm font-mono text-[#6f6160] hover:text-pink-400 transition-colors"
          >
            <span>&larr;</span>
            <span>{t.programDetail.backToPrograms}</span>
          </Link>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
        >
          <span className={`text-transparent bg-clip-text bg-gradient-to-r ${program.color.gradient}`}>
            {program.name[language]}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-[#a8987a] leading-relaxed"
        >
          {program.tagline[language]}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          <div className={`px-4 py-2 rounded-lg ${program.color.badge} font-mono text-sm`}>
            {program.duration[language]}
          </div>
          <div className="px-4 py-2 rounded-lg bg-[#1a1815] font-mono text-sm text-[#a8987a]">
            ~{program.totalHours} {language === 'en' ? 'hours' : '小时'}
          </div>
          <div className="px-4 py-2 rounded-lg bg-[#1a1815] font-mono text-sm text-[#a8987a]">
            {program.weeklyHours} {t.stats.hoursWeek}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://www.facebook.com/DoGMAIAcademy/"
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full sm:w-auto px-8 py-4 bg-gradient-to-r ${program.color.gradient} rounded-xl font-semibold text-white hover:shadow-2xl transition-all duration-500`}
          >
            {t.programDetail.enrollCta}
          </a>
          <a
            href="#curriculum"
            className={`w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-[#f4efe6] border border-[#3a3530] hover:${program.color.border} transition-all duration-300 text-center`}
          >
            {t.programDetail.viewCurriculum}
          </a>
          <a
            href="#faq"
            className={`w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-[#f4efe6] border border-[#3a3530] hover:${program.color.border} transition-all duration-300 text-center`}
          >
            FAQ
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

function OverviewSection({ program }: { program: ProgramData }) {
  const { t, language } = useLanguage();

  const formatCards = [
    { label: t.programDetail.duration, value: program.duration[language] },
    { label: t.programDetail.totalHours, value: `~${program.totalHours} ${language === 'en' ? 'hours' : '小时'}` },
    { label: t.programDetail.commitment, value: `${program.weeklyHours} ${t.stats.hoursWeek}` },
    { label: t.programDetail.liveSessions, value: program.format.liveSessions[language] },
    { label: t.programDetail.projectWork, value: program.format.projectWork[language] },
    { label: t.programDetail.community, value: program.format.community[language] },
  ];

  return (
    <section className="relative py-20 sm:py-28 bg-[#060503]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className={`inline-block text-xs font-mono uppercase tracking-[0.3em] ${program.color.text} opacity-70 mb-4`}>
            {t.programDetail.format}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f4efe6]">
            {t.programDetail.overview}
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {formatCards.map((card, index) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`p-5 sm:p-6 rounded-xl bg-gradient-to-br from-[#0d0a08] to-[#060503] border border-[#1a1815]`}
            >
              <div className="text-xs font-mono uppercase tracking-wider text-[#6f6160] mb-2">
                {card.label}
              </div>
              <div className="text-sm sm:text-base text-[#f4efe6]">
                {card.value}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Weekly Deliverable Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`mt-6 p-5 sm:p-6 rounded-xl border ${program.color.border} ${program.color.glow}`}
        >
          <div className="text-xs font-mono uppercase tracking-wider text-[#6f6160] mb-2">
            {t.programDetail.weeklyDeliverable}
          </div>
          <div className={`text-base sm:text-lg font-semibold ${program.color.text}`}>
            {program.format.deliverable[language]}
          </div>
        </motion.div>

        {/* Target Audience */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 p-5 sm:p-6 rounded-xl bg-gradient-to-br from-[#0d0a08] to-[#060503] border border-[#1a1815]"
        >
          <div className="text-xs font-mono uppercase tracking-wider text-[#6f6160] mb-2">
            {t.programDetail.targetAudience}
          </div>
          <div className="text-sm sm:text-base text-[#a8987a] leading-relaxed">
            {program.target[language]}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CurriculumSection({ program }: { program: ProgramData }) {
  const { t, language } = useLanguage();

  let currentPhase = '';

  return (
    <section id="curriculum" className="relative py-20 sm:py-28 bg-gradient-to-b from-[#060503] to-[#0a0805]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a1815] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className={`inline-block text-xs font-mono uppercase tracking-[0.3em] ${program.color.text} opacity-70 mb-4`}>
            {t.programDetail.curriculum}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f4efe6]">
            {program.weeks} {language === 'en' ? 'Weeks. Ship Every Week.' : '周。每周交付。'}
          </h2>
        </motion.div>

        <div className="space-y-4">
          {program.curriculum.map((week, index) => {
            const showPhase = week.phase && week.phase[language] !== currentPhase;
            if (week.phase) currentPhase = week.phase[language];

            return (
              <div key={week.week}>
                {/* Phase Divider */}
                {showPhase && week.phase && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className={`mb-4 ${index > 0 ? 'mt-10' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-px flex-1 bg-gradient-to-r from-transparent ${program.color.border.replace('border-', 'via-')}`} />
                      <span className={`text-xs font-mono uppercase tracking-[0.3em] ${program.color.text}`}>
                        {week.phase[language]}
                      </span>
                      <div className={`h-px flex-1 bg-gradient-to-l from-transparent ${program.color.border.replace('border-', 'via-')}`} />
                    </div>
                  </motion.div>
                )}

                {/* Week Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                  className="group p-5 sm:p-6 rounded-xl bg-gradient-to-br from-[#0d0a08] to-[#060503] border border-[#1a1815] hover:border-[#2a2520] transition-colors duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
                    {/* Week Number */}
                    <div className="flex-shrink-0">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${program.color.gradient} font-bold text-white text-sm`}>
                        {week.week}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-[#f4efe6]">
                        {week.title[language]}
                      </h3>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {week.topics[language].map((topic, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-full bg-[#1a1815] text-xs font-mono text-[#a8987a]"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Deliverable */}
                    <div className="flex-shrink-0 lg:max-w-xs lg:text-right">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[#6f6160] mb-1">
                        {t.programDetail.deliverable}
                      </div>
                      <div className={`text-sm ${program.color.text}`}>
                        {week.deliverable[language]}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ToolsSection({ program }: { program: ProgramData }) {
  const { t } = useLanguage();

  return (
    <section className="relative py-20 sm:py-28 bg-[#060503]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a1815] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className={`inline-block text-xs font-mono uppercase tracking-[0.3em] ${program.color.text} opacity-70 mb-4`}>
            {t.programDetail.tools}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f4efe6]">
            {t.programDetail.tools}
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {program.tools.map((tool, index) => (
            <motion.div
              key={tool}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              className={`px-5 py-3 rounded-xl bg-gradient-to-br from-[#0d0a08] to-[#060503] border border-[#1a1815] text-sm font-mono text-[#a8987a]`}
            >
              {tool}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OutcomesSection({ program }: { program: ProgramData }) {
  const { t, language } = useLanguage();

  return (
    <section className="relative py-20 sm:py-28 bg-gradient-to-b from-[#060503] to-[#0a0805]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a1815] to-transparent" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className={`inline-block text-xs font-mono uppercase tracking-[0.3em] ${program.color.text} opacity-70 mb-4`}>
            {t.programDetail.outcomes}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f4efe6]">
            {t.programDetail.outcomes}
          </h2>
        </motion.div>

        <div className="space-y-4">
          {program.outcomes[language].map((outcome, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-[#0d0a08] to-[#060503] border border-[#1a1815]"
            >
              <div className={`flex-shrink-0 mt-0.5 w-6 h-6 rounded-full bg-gradient-to-br ${program.color.gradient} flex items-center justify-center`}>
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm sm:text-base text-[#f4efe6]">{outcome}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EnrollCTASection({ program }: { program: ProgramData }) {
  const { t, language } = useLanguage();

  return (
    <section className="relative py-20 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d0906] via-[#060503] to-[#060503]" />
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full ${program.color.glow} blur-[150px] pointer-events-none opacity-50`} />
      <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${program.color.border.replace('border-', 'via-')} to-transparent`} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f4efe6]">
            {language === 'en' ? 'Ready to start' : '准备开始'}{' '}
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${program.color.gradient}`}>
              {program.name[language]}
            </span>
            ?
          </h2>
          <p className="mt-8 text-base sm:text-lg text-[#a8987a] max-w-2xl mx-auto">
            {program.description[language]}
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://www.facebook.com/DoGMAIAcademy/"
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full sm:w-auto px-10 py-5 bg-gradient-to-r ${program.color.gradient} rounded-xl font-bold text-lg text-white hover:shadow-2xl transition-all duration-500`}
            >
              {t.programDetail.enrollCta}
            </a>
            <Link
              href="mailto:hello@dogm.ai"
              className="w-full sm:w-auto px-10 py-5 rounded-xl font-semibold text-lg text-[#f4efe6] border border-[#3a3530] hover:border-[#5a5550] transition-all duration-300 text-center"
            >
              hello@dogm.ai
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const programFaqs: Record<string, { question: string; answer: string }[]> = {
  'ai-media-studio': [
    {
      question: 'When does the bootcamp start?',
      answer: 'Our AI Content & Media Studio Bootcamp is starting on March 2, 2026.',
    },
    {
      question: 'How much does the program cost?',
      answer: 'Regular Price: \u20B119,000. We currently have an Early Bird promotion with a 30% discount!',
    },
    {
      question: "How long is the program and what's the time commitment?",
      answer: "The bootcamp runs for 8 weeks (~140 total hours). You'll need to commit 15-20 hours per week, which includes 4-6 hours of live sessions, 6-8 hours of guided project work, and 2-3 hours of community and peer review.",
    },
    {
      question: 'Do I need coding or technical experience to join?',
      answer: "No prior programming experience is needed! You'll learn basic scripting as you go, alongside AI tools and coding assistants. This program is designed for marketers, freelancers, and content creators ready to level up with code.",
    },
    {
      question: 'What will I be able to do after graduating?',
      answer: "You'll graduate with a client-ready portfolio (including a real client project), an automated content pipeline producing daily output, and a one-person creative studio ready to take paying clients \u2014 with earning potential of \u20B130-80K/month.",
    },
  ],
  'ai-agent-builder': [
    {
      question: 'When does the bootcamp start?',
      answer: 'Our AI Agent Builder Bootcamp is starting on March 2, 2026.',
    },
    {
      question: 'How much does the program cost?',
      answer: 'Regular Price: \u20B119,000. We currently have an Early Bird promotion with a 30% discount!',
    },
    {
      question: "How long is the program and what's the time commitment?",
      answer: "The bootcamp runs for 10 weeks (~170 total hours). You'll need to commit 15-20 hours per week, which includes 4-6 hours of live sessions, 6-8 hours of guided project work, and 2-3 hours of community and peer review.",
    },
    {
      question: 'Do I need coding or technical experience to join?',
      answer: "Some technical comfort is helpful, but no advanced programming experience is required. Python basics pre-work is provided. This program is designed for developers, technical professionals, and ambitious non-coders who want to automate business processes with AI agents.",
    },
    {
      question: 'What will I be able to do after graduating?',
      answer: "You'll graduate with 6+ deployed AI agents in your portfolio, a production-ready multi-agent capstone system, and the ability to automate entire business departments \u2014 with freelance/consulting potential of \u20B150-150K+ per project.",
    },
  ],
  'ai-assisted-coding': [
    {
      question: 'When does the bootcamp start?',
      answer: 'Our AI-Assisted Coding Bootcamp is starting on March 2, 2026.',
    },
    {
      question: 'How much does the program cost?',
      answer: 'Regular Price: \u20B119,000. We currently have an Early Bird promotion with a 30% discount!',
    },
    {
      question: "How long is the program and what's the time commitment?",
      answer: "The bootcamp runs for 12 weeks (~200 total hours). You'll need to commit 15-20 hours per week, which includes 4-6 hours of live sessions, 6-8 hours of guided project work, and 2-3 hours of community and peer review.",
    },
    {
      question: 'Do I need coding or technical experience to join?',
      answer: "No prior programming experience is needed! This program is designed for aspiring builders, intrapreneurs, startup founders, and anyone who wants to ship products without learning to code the traditional way. AI writes the code \u2014 you guide it.",
    },
    {
      question: 'What will I be able to do after graduating?',
      answer: "You'll graduate with 7+ shipped and deployed applications, 1 polished product with real users, full-stack product building skills with AI tools, and a launchable product \u2014 plus the skills to keep building and shipping.",
    },
  ],
};

function FAQSection({ program }: { program: ProgramData }) {
  const faqs = programFaqs[program.slug] || [];
  if (faqs.length === 0) return null;

  return (
    <section id="faq" className="relative py-20 sm:py-28 bg-[#060503]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a1815] to-transparent" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className={`inline-block text-xs font-mono uppercase tracking-[0.3em] ${program.color.text} opacity-70 mb-4`}>
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f4efe6]">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="p-5 sm:p-6 rounded-xl bg-gradient-to-br from-[#0d0a08] to-[#060503] border border-[#1a1815]"
            >
              <h3 className={`text-base sm:text-lg font-semibold ${program.color.text}`}>
                {faq.question}
              </h3>
              <p className="mt-3 text-sm sm:text-base text-[#a8987a] leading-relaxed">
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgramDetailPage({ slug }: { slug: string }) {
  const program = getProgram(slug)!;

  return (
    <>
      <Header />
      <HeroSection program={program} />
      <OverviewSection program={program} />
      <CurriculumSection program={program} />
      <ToolsSection program={program} />
      <OutcomesSection program={program} />
      <EnrollCTASection program={program} />
      <FAQSection program={program} />
      <Footer />
    </>
  );
}

export default function ProgramDetailContent({ slug }: { slug: string }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#060503]" />}>
      <LanguageProvider>
        <main className="min-h-screen bg-[#060503] text-[#f4efe6] antialiased">
          <ProgramDetailPage slug={slug} />
        </main>
      </LanguageProvider>
    </Suspense>
  );
}
