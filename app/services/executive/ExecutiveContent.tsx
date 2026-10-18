'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Header, Footer } from '../../components/shared';

// ============================================================================
// EXECUTIVE PROGRAMS PAGE
// ============================================================================

const programs = [
  {
    title: 'C-Suite Leadership Development',
    description: 'Comprehensive programs designed specifically for CEOs, COOs, CFOs, and other C-level executives.',
    features: [
      'Strategic Vision & Execution',
      'Board Relations & Governance',
      'Crisis Leadership',
      'Organizational Transformation',
      'Executive Decision Making',
    ],
  },
  {
    title: 'Transformational Leadership',
    description: 'Develop the mindset and skills to lead organizational change and inspire lasting transformation.',
    features: [
      'Change Management Mastery',
      'Visionary Leadership',
      'Culture Transformation',
      'Leading Through Uncertainty',
      'Inspiring High Performance',
    ],
  },
  {
    title: 'Strategic Thinking & Planning',
    description: 'Master the art of strategic thinking and translate vision into actionable business strategies.',
    features: [
      'Strategic Analysis Frameworks',
      'Competitive Positioning',
      'Long-term Planning',
      'Resource Allocation',
      'Scenario Planning',
    ],
  },
  {
    title: 'Executive Presence & Communication',
    description: 'Command attention and influence stakeholders with powerful executive presence.',
    features: [
      'Executive Storytelling',
      'High-Stakes Presentations',
      'Media Training',
      'Stakeholder Management',
      'Personal Brand Building',
    ],
  },
];

const formats = [
  { name: '1-on-1 Coaching', description: 'Private sessions tailored to individual needs' },
  { name: 'Small Group Intensives', description: 'Peer learning with fellow executives' },
  { name: 'Retreat Programs', description: 'Immersive off-site experiences' },
  { name: 'Virtual Sessions', description: 'Flexible remote coaching and workshops' },
];

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-[#060503]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060503] via-[#0a0705] to-[#060503]" />
        <motion.div
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-orange-500/8 blur-[120px]"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block text-xs font-mono uppercase tracking-[0.3em] text-orange-400/70 mb-6"
        >
          Executive Programs
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
        >
          <span className="text-[#f4efe6]">Leadership at the </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
            Highest Level
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-[#a8987a] leading-relaxed"
        >
          World-class development programs for C-Suite leaders, senior management,
          and high-potential executives ready to make a greater impact.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-400 rounded-xl font-semibold text-[#0d0906] hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-500"
          >
            Schedule Consultation
          </Link>
          <a
            href="#programs"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-[#f4efe6] border border-[#3a3530] hover:border-orange-500/50 hover:bg-orange-500/5 transition-all duration-300 text-center"
          >
            View Programs
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

function ProgramsSection() {
  return (
    <section id="programs" className="relative py-20 sm:py-32 bg-[#060503]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-xs font-mono uppercase tracking-[0.3em] text-orange-400/70 mb-4">
            Our Programs
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f4efe6]">
            Executive Development Suite
          </h2>
          <p className="mt-6 text-base lg:text-lg text-[#a8987a]">
            Comprehensive programs designed for senior leaders and executives.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0d0a08] to-[#060503] border border-[#1a1815] hover:border-orange-500/30 transition-all duration-500"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                <h3 className="text-xl sm:text-2xl font-bold text-[#f4efe6] group-hover:text-orange-300 transition-colors duration-300">
                  {program.title}
                </h3>
                <p className="mt-4 text-sm text-[#a8987a]">{program.description}</p>

                <ul className="mt-6 space-y-2">
                  {program.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-[#6f6160]">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500/50" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FormatsSection() {
  return (
    <section className="relative py-20 sm:py-32 bg-gradient-to-b from-[#060503] to-[#0a0805]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-xs font-mono uppercase tracking-[0.3em] text-orange-400/70 mb-4">
            Delivery Options
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f4efe6]">Flexible Formats</h2>
          <p className="mt-6 text-base lg:text-lg text-[#a8987a]">
            Programs designed to fit your schedule and preferences.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {formats.map((format, index) => (
            <motion.div
              key={format.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-xl bg-gradient-to-br from-[#0d0a08] to-[#060503] border border-[#1a1815] text-center"
            >
              <h3 className="text-lg font-bold text-[#f4efe6]">{format.name}</h3>
              <p className="mt-2 text-sm text-[#6f6160]">{format.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative py-20 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d0906] via-orange-950/20 to-[#060503]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f4efe6]">
            Ready to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
              Lead Better
            </span>
            ?
          </h2>
          <p className="mt-8 text-base sm:text-lg text-[#a8987a] max-w-2xl mx-auto">
            Schedule a confidential consultation to discuss your leadership development needs.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-400 rounded-xl font-bold text-lg text-[#0d0906] hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-500"
            >
              Get Started
            </Link>
            <Link
              href="/elevare"
              className="w-full sm:w-auto px-10 py-5 rounded-xl font-semibold text-lg text-[#f4efe6] border border-[#3a3530] hover:border-orange-500/50 hover:bg-orange-500/5 transition-all duration-300 text-center"
            >
              Explore All Programs
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function ExecutiveContent() {
  return (
    <main className="min-h-screen bg-[#060503] text-[#f4efe6] antialiased">
      <Header />
      <HeroSection />
      <ProgramsSection />
      <FormatsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
