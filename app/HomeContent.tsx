'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Header, Footer } from './components/shared';

// ============================================================================
// DOGM PREMIUM HOMEPAGE - 2026 Edition
// Design: Cinematic, Premium Corporate Training Platform
// ============================================================================

// ----------------------------------------------------------------------------
// SECTION 1: HERO - Cinematic Full-Screen
// ----------------------------------------------------------------------------

function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-[#060503]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060503] via-[#0a0705] to-[#060503]" />
        {/* Animated orbs */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-orange-500/8 blur-[150px]"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-amber-500/5 blur-[120px]"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(249, 115, 22, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(249, 115, 22, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      {/* Hero content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center pt-20"
      >
        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight leading-[0.9]">
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#f4efe6] via-[#f4efe6] to-[#f4efe6]/40">
              Developers
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-300 to-amber-400">
              of Great Minds
            </span>
          </h1>
        </motion.div>

        {/* Acronym reveal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-wrap justify-center gap-x-3 sm:gap-x-6 gap-y-2 text-xs sm:text-sm font-mono"
        >
          {[
            { letter: 'D', word: 'Discipline' },
            { letter: 'O', word: 'Outcome' },
            { letter: 'G', word: 'Growth' },
            { letter: 'M', word: 'Mastery' },
            { letter: 'A', word: 'Acceleration' },
            { letter: 'I', word: 'Intelligence' },
          ].map((item, i) => (
            <motion.span
              key={item.letter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="flex items-center gap-1.5 group"
            >
              <span className="text-orange-400 font-bold text-base sm:text-lg">{item.letter}</span>
              <span className="text-[#6f6160] group-hover:text-orange-300 transition-colors duration-300">
                {item.word}
              </span>
              {i < 5 && <span className="text-[#3a3530] ml-2 sm:ml-4 hidden sm:inline">|</span>}
            </motion.span>
          ))}
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8 sm:mt-12 max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-[#a8987a] leading-relaxed"
        >
          Empowering individuals and organizations to unlock their highest potential through
          world-class training and development programs.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/elevare"
            className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-400 rounded-xl font-semibold text-[#0d0906] overflow-hidden hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-500"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Explore Elevare Programs
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Link>
          <Link
            href="/about"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-[#f4efe6] border border-[#3a3530] hover:border-orange-500/50 hover:bg-orange-500/5 transition-all duration-300 text-center"
          >
            Learn More
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="hidden sm:block text-xs font-mono text-[#6f6160] uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-12 bg-gradient-to-b from-orange-500/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}

// ----------------------------------------------------------------------------
// SECTION 2: Focus Areas Strip
// ----------------------------------------------------------------------------

function FocusAreasSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const commitments = [
    { icon: '✓', label: '100% Customized' },
    { icon: '✓', label: 'Industry-Focused' },
    { icon: '✓', label: 'Results-Driven' },
    { icon: '✓', label: 'Expert Facilitators' },
  ];

  return (
    <section ref={ref} className="relative py-12 sm:py-16 border-y border-[#1a1815] bg-[#060503]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {commitments.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center justify-center gap-3 p-4 rounded-xl bg-[#0a0805]/50 border border-[#1a1815]"
            >
              <span className="text-orange-400 font-bold">{item.icon}</span>
              <span className="text-sm font-medium text-[#c9b89b]">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------------
// SECTION 3: DOGM Values
// ----------------------------------------------------------------------------

function ValuesSection() {
  const values = [
    {
      letter: 'D',
      title: 'Discipline',
      description: 'The foundation of excellence. Consistent effort, deliberate practice, and unwavering commitment to growth.',
    },
    {
      letter: 'O',
      title: 'Outcome',
      description: 'Results-driven methodology. Every action aligned with measurable, meaningful achievements.',
    },
    {
      letter: 'G',
      title: 'Growth',
      description: 'Continuous evolution. Embracing challenges as opportunities to expand capabilities and wisdom.',
    },
    {
      letter: 'M',
      title: 'Mastery',
      description: 'The pursuit of excellence. Deep expertise developed through focused dedication and practice.',
    },
    {
      letter: 'A',
      title: 'Acceleration',
      description: 'Strategic velocity. Achieving more in less time through intelligent systems and methods.',
    },
    {
      letter: 'I',
      title: 'Intelligence',
      description: 'Applied wisdom. Leveraging knowledge, technology, and insight to solve complex challenges.',
    },
  ];

  return (
    <section className="relative py-20 sm:py-32 bg-[#060503] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16 sm:mb-20"
        >
          <span className="inline-block text-xs font-mono uppercase tracking-[0.3em] text-orange-400/70 mb-4">
            Our Foundation
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#f4efe6] leading-[1.1]">
            What <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">DOGM</span> Stands For
          </h2>
          <p className="mt-6 text-base lg:text-lg text-[#a8987a] max-w-xl">
            Six principles that guide everything we do. Each letter represents a cornerstone of our approach to developing great minds.
          </p>
        </motion.div>

        {/* Values grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.letter}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0d0a08] to-[#060503] border border-[#1a1815] hover:border-orange-500/30 transition-all duration-500"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <span className="text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-orange-500/40 to-orange-500/10 group-hover:from-orange-500/60 group-hover:to-orange-500/20 transition-all duration-500">
                  {value.letter}
                </span>
                <h3 className="mt-4 text-xl sm:text-2xl font-bold text-[#f4efe6] group-hover:text-orange-300 transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-[#a8987a] leading-relaxed group-hover:text-[#c9b89b] transition-colors duration-300">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------------
// SECTION 4: Elevare - Training Arm Showcase
// ----------------------------------------------------------------------------

function ElevareSection() {
  const features = [
    'Corporate Training & Leadership',
    'Lean Six Sigma Certifications',
    'AI & Digital Transformation',
    'Executive Development Programs',
    'Team Building & Workshops',
    'Wealth Management Training',
  ];

  return (
    <section className="relative py-20 sm:py-32 bg-gradient-to-br from-[#0a0805] via-[#060503] to-[#0d0906] overflow-hidden">
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-orange-500/5 blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[0.95]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-300 to-amber-400">
                Elevare
              </span>
            </h2>

            <p className="mt-6 text-lg lg:text-xl xl:text-2xl text-[#c9b89b] font-light italic">
              &ldquo;To lift, to elevate&rdquo; — Latin
            </p>

            <p className="mt-8 text-sm lg:text-base text-[#a8987a] leading-relaxed max-w-lg">
              Elevare is DOGM&apos;s dedicated training division, delivering transformative learning experiences that combine cutting-edge methodologies with practical, real-world application.
            </p>

            <ul className="mt-8 space-y-3">
              {features.map((feature, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  <span className="text-sm lg:text-base text-[#c9b89b]">{feature}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-10">
              <Link
                href="/elevare"
                className="group inline-flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r from-orange-500 to-orange-400 rounded-lg font-semibold text-[#0d0906] hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
              >
                Discover Programs
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </motion.div>

          {/* Visual card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 lg:-top-6 lg:-left-6 w-full h-full rounded-2xl bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/10" />

              <div className="relative bg-gradient-to-br from-[#1a1815] to-[#0d0a08] rounded-2xl p-6 sm:p-8 lg:p-12 border border-[#2a2520]">
                <div className="space-y-8">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 sm:gap-6 pb-8 border-b border-[#2a2520]">
                    {[
                      { value: '7+', label: 'Service Areas' },
                      { value: '50+', label: 'Programs' },
                      { value: '6', label: 'Formats' },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center">
                        <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                          {stat.value}
                        </div>
                        <div className="mt-1 text-[10px] sm:text-xs font-mono text-[#6f6160] uppercase tracking-wider">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Categories */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      'Corporate Training',
                      'Process Optimization',
                      'Future-Ready Skills',
                      'Executive Programs',
                      'Team Building',
                      'Bootcamps',
                    ].map((category, i) => (
                      <div
                        key={i}
                        className="px-3 py-2 rounded-lg bg-[#0d0906] border border-[#2a2520] text-xs sm:text-sm text-[#a8987a] text-center"
                      >
                        {category}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------------
// SECTION 5: Program Ecosystem Preview
// ----------------------------------------------------------------------------

function ProgramEcosystemSection() {
  const programs = [
    {
      name: 'Elevare',
      latin: 'To elevate',
      description: 'Corporate Training & Organizational Development',
      color: 'from-orange-500 to-amber-500',
      href: '/elevare',
      active: true,
    },
    {
      name: 'Ascenda',
      latin: 'To climb',
      description: 'Career Acceleration & Professional Growth',
      color: 'from-blue-500 to-cyan-500',
      href: '/programs/ascenda',
      active: true,
    },
    {
      name: 'Initium',
      latin: 'Beginning',
      description: 'Entrepreneurship & Startup Development',
      color: 'from-emerald-500 to-teal-500',
      href: '/programs/initium',
      active: true,
    },
    {
      name: 'Praxis',
      latin: 'Practice',
      description: 'Hands-on Bootcamps & Intensive Training',
      color: 'from-purple-500 to-pink-500',
      href: '/programs/praxis',
      active: true,
    },
  ];

  return (
    <section className="relative py-20 sm:py-32 bg-[#060503] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2a2520] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-xs font-mono uppercase tracking-[0.3em] text-orange-400/70 mb-4">
            The DOGM Ecosystem
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f4efe6]">
            One Vision, Multiple Pathways
          </h2>
          <p className="mt-6 text-base lg:text-lg text-[#a8987a]">
            Each program arm is designed for specific audiences and goals, all unified under the DOGM mission.
          </p>
        </motion.div>

        {/* Programs grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {programs.map((program, index) => (
            <motion.div
              key={program.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={program.href}
                className={`group block relative p-6 sm:p-8 rounded-2xl border transition-all duration-500 ${
                  program.active
                    ? 'bg-gradient-to-br from-[#0d0a08] to-[#060503] border-orange-500/30 hover:border-orange-500/50'
                    : 'bg-[#0a0805] border-[#1a1815] hover:border-[#2a2520] opacity-60 hover:opacity-80'
                }`}
              >
                {program.active && (
                  <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-orange-500/20 text-[10px] font-mono text-orange-400 uppercase">
                    Active
                  </div>
                )}
                {!program.active && (
                  <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-[#1a1815] text-[10px] font-mono text-[#6f6160] uppercase">
                    Coming Soon
                  </div>
                )}

                <h3 className={`text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${program.color}`}>
                  {program.name}
                </h3>
                <p className="mt-1 text-sm italic text-[#6f6160]">&ldquo;{program.latin}&rdquo;</p>
                <p className="mt-4 text-sm sm:text-base text-[#a8987a]">{program.description}</p>

                {program.active && (
                  <div className="mt-6 flex items-center gap-2 text-sm font-mono text-orange-400/70 group-hover:text-orange-400">
                    <span>Explore</span>
                    <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 text-sm font-mono text-[#a8987a] hover:text-orange-400 transition-colors"
          >
            View all programs
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------------
// SECTION 6: Services Overview
// ----------------------------------------------------------------------------

function ServicesSection() {
  const services = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Corporate Training',
      description: 'Leadership, team building, process optimization, and workforce management programs.',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Intensive Bootcamps',
      description: 'Accelerated programs in leadership, Lean Six Sigma, digital transformation, and more.',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Executive Programs',
      description: 'C-Suite development, strategic thinking, and global leadership readiness.',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Consulting Services',
      description: 'Needs assessment, culture surveys, process audits, and ROI measurement.',
    },
  ];

  return (
    <section className="relative py-20 sm:py-32 bg-[#060503] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2a2520] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block text-xs font-mono uppercase tracking-[0.3em] text-orange-400/70 mb-4">
            What We Offer
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f4efe6]">Services</h2>
          <p className="mt-6 text-base lg:text-lg text-[#a8987a]">
            Comprehensive training and development solutions tailored to your needs.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative p-6 sm:p-8 lg:p-10 rounded-2xl bg-gradient-to-br from-[#0d0a08] to-[#060503] border border-[#1a1815] hover:border-orange-500/30 transition-all duration-500 ${
                index % 2 === 1 ? 'sm:translate-y-8' : ''
              }`}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                <div className="inline-flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-orange-500/10 text-orange-400 group-hover:bg-orange-500/20 group-hover:text-orange-300 transition-all duration-300">
                  {service.icon}
                </div>

                <h3 className="mt-6 text-lg lg:text-xl xl:text-2xl font-bold text-[#f4efe6] group-hover:text-orange-300 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm lg:text-base text-[#a8987a] leading-relaxed group-hover:text-[#c9b89b] transition-colors duration-300">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 lg:mt-16 text-center"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-mono text-[#a8987a] hover:text-orange-400 transition-colors"
          >
            View all services
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------------
// SECTION 7: CTA
// ----------------------------------------------------------------------------

function CTASection() {
  return (
    <section className="relative py-20 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d0906] via-orange-950/20 to-[#060503]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-orange-500/5 blur-[150px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#f4efe6] leading-[1.1]">
            Ready to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-300 to-amber-400">
              Transform
            </span>
            ?
          </h2>

          <p className="mt-8 text-base sm:text-lg lg:text-xl text-[#a8987a] max-w-2xl mx-auto leading-relaxed">
            Join hundreds of individuals and organizations who have accelerated their growth through DOGM&apos;s training programs.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group relative w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-orange-500 to-orange-400 rounded-xl font-bold text-base sm:text-lg text-[#0d0906] overflow-hidden hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-500"
            >
              <span className="relative z-10">Start Your Journey</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
            <Link
              href="mailto:hello@dogm.ai"
              className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-semibold text-base sm:text-lg text-[#f4efe6] border border-[#3a3530] hover:border-orange-500/50 hover:bg-orange-500/5 transition-all duration-300 text-center"
            >
              hello@dogm.ai
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm text-[#6f6160]">
            {['No commitment required', 'Free consultation', 'Flexible programs'].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------------
// MAIN CONTENT COMPONENT
// ----------------------------------------------------------------------------

export default function HomeContent() {
  return (
    <main className="min-h-screen bg-[#060503] text-[#f4efe6] antialiased">
      <Header />
      <HeroSection />
      <FocusAreasSection />
      <ValuesSection />
      <ElevareSection />
      <ProgramEcosystemSection />
      <ServicesSection />
      <CTASection />
      <Footer />
    </main>
  );
}
