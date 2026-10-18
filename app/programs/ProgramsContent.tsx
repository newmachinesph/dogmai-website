'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Header, Footer } from '../components/shared';

// ============================================================================
// PROGRAMS PAGE - DOGM Ecosystem Overview
// All program arms with Latin-inspired naming
// ============================================================================

const programs = [
  {
    name: 'Elevare',
    latin: 'To lift, to elevate',
    status: 'active',
    target: 'Corporations & Teams',
    focus: 'Corporate Training & Organizational Development',
    description: 'Our flagship training division delivering transformative learning experiences for organizations. From leadership development to Lean Six Sigma certifications.',
    color: 'from-orange-500 to-amber-500',
    bgGlow: 'bg-orange-500/10',
    href: '/elevare',
    features: [
      'Corporate Training',
      'Process Optimization',
      'Executive Programs',
      'Team Building',
      'Bootcamps',
    ],
  },
  {
    name: 'Ascenda',
    latin: 'To climb, to rise',
    status: 'active',
    target: 'Individuals & Job Seekers',
    focus: 'Career Acceleration & Professional Growth',
    description: 'Personal career development programs for professionals looking to advance. Resume building, interview mastery, personal branding, and career coaching.',
    color: 'from-blue-500 to-cyan-500',
    bgGlow: 'bg-blue-500/10',
    href: '/programs/ascenda',
    features: [
      'Career Coaching',
      'Personal Branding',
      'Interview Mastery',
      'LinkedIn Optimization',
      'Freelancing Skills',
    ],
  },
  {
    name: 'Luminos',
    latin: 'Full of light, brilliant',
    status: 'coming',
    target: 'Students & Youth',
    focus: 'Youth & Student Development',
    description: 'Preparing the next generation with leadership camps, college-to-corporate transition programs, and essential life skills for young professionals.',
    color: 'from-yellow-500 to-orange-400',
    bgGlow: 'bg-yellow-500/10',
    href: '/programs/luminos',
    features: [
      'Leadership Camps',
      'Student Programs',
      'Financial Literacy',
      'Public Speaking',
      'Career Readiness',
    ],
  },
  {
    name: 'Initium',
    latin: 'Beginning, origin',
    status: 'active',
    target: 'Entrepreneurs & SMEs',
    focus: 'Entrepreneurship & Startup Development',
    description: 'From idea to execution—startup bootcamps, business model development, pitching skills, and growth strategies for aspiring entrepreneurs.',
    color: 'from-emerald-500 to-teal-500',
    bgGlow: 'bg-emerald-500/10',
    href: '/programs/initium',
    features: [
      'Startup Bootcamps',
      'Business Modeling',
      'Pitch Training',
      'E-commerce Skills',
      'Growth Strategies',
    ],
  },
  {
    name: 'Impetus',
    latin: 'Driving force, momentum',
    status: 'coming',
    target: 'Sales Teams',
    focus: 'Sales & Revenue Performance',
    description: 'Sales excellence programs covering everything from fundamentals to advanced negotiation, key account management, and sales leadership.',
    color: 'from-red-500 to-pink-500',
    bgGlow: 'bg-red-500/10',
    href: '/programs/impetus',
    features: [
      'Sales Fundamentals',
      'Negotiation Skills',
      'Key Account Management',
      'Sales Leadership',
      'CRM Mastery',
    ],
  },
  {
    name: 'Animus',
    latin: 'Mind, spirit, soul',
    status: 'coming',
    target: 'Employees & Individuals',
    focus: 'Wellness, Mindfulness & Mental Health',
    description: 'Holistic wellness programs addressing stress management, work-life balance, mindfulness, and emotional well-being in the workplace.',
    color: 'from-purple-500 to-violet-500',
    bgGlow: 'bg-purple-500/10',
    href: '/programs/animus',
    features: [
      'Stress Management',
      'Mindfulness',
      'Work-Life Balance',
      'Mental Health First Aid',
      'Wellness Retreats',
    ],
  },
  {
    name: 'Veritas',
    latin: 'Truth',
    status: 'coming',
    target: 'Corporations',
    focus: 'Compliance, Ethics & Governance',
    description: 'Ethics and compliance training including anti-corruption, data privacy, workplace integrity, and corporate governance programs.',
    color: 'from-slate-400 to-gray-500',
    bgGlow: 'bg-slate-500/10',
    href: '/programs/veritas',
    features: [
      'Anti-Corruption Training',
      'Data Privacy (DPA)',
      'Workplace Ethics',
      'Corporate Governance',
      'Risk Management',
    ],
  },
  {
    name: 'Praxis',
    latin: 'Practice, action',
    status: 'active',
    target: 'Builders & Creators',
    focus: 'AI-First Intensive Programs',
    description: 'Ship real products with AI — intensive 8-12 week programs in AI agents, AI-powered coding, and AI content creation. Build your portfolio, not a certificate.',
    color: 'from-pink-500 to-rose-500',
    bgGlow: 'bg-pink-500/10',
    href: '/programs/praxis',
    features: [
      'AI Agent Builder',
      'AI-Assisted Coding',
      'AI Media Studio',
      'Ship Weekly',
      'Portfolio & Demo Day',
    ],
  },
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
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-orange-500/8 blur-[100px]"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[80px]"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-[250px] h-[250px] rounded-full bg-emerald-500/5 blur-[80px]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity, delay: 4 }}
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
          The DOGM Ecosystem
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
        >
          <span className="text-[#f4efe6]">One Vision</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-300">
            Multiple Pathways
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-[#a8987a] leading-relaxed"
        >
          Each DOGM program is designed for specific audiences and goals, all unified under our
          mission to develop great minds. Explore our ecosystem of classically-named program arms.
        </motion.p>
      </motion.div>
    </section>
  );
}

function ProgramsGridSection() {
  return (
    <section className="relative py-20 sm:py-32 bg-[#060503]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f4efe6]">Program Arms</h2>
          <p className="mt-6 text-base lg:text-lg text-[#a8987a]">
            Each program arm serves a unique purpose in the development ecosystem.
          </p>
        </motion.div>

        <div className="space-y-6">
          {programs.map((program, index) => (
            <motion.div
              key={program.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`group relative rounded-2xl border transition-all duration-500 overflow-hidden ${
                program.status === 'active'
                  ? 'bg-gradient-to-br from-[#0d0a08] to-[#060503] border-orange-500/30 hover:border-orange-500/50'
                  : 'bg-[#0a0805]/50 border-[#1a1815] hover:border-[#2a2520]'
              }`}
            >
              {/* Glow effect for active */}
              {program.status === 'active' && (
                <div className={`absolute inset-0 ${program.bgGlow} opacity-20 blur-3xl`} />
              )}

              <div className="relative p-6 sm:p-8 lg:p-10">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-10">
                  {/* Left: Title and meta */}
                  <div className="lg:w-1/3">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${program.color}`}>
                        {program.name}
                      </h3>
                      {program.status === 'active' ? (
                        <span className="px-2 py-1 rounded-full bg-orange-500/20 text-[10px] font-mono text-orange-400 uppercase">
                          Active
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-full bg-[#1a1815] text-[10px] font-mono text-[#6f6160] uppercase">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <p className="text-sm italic text-[#6f6160] mb-4">&ldquo;{program.latin}&rdquo;</p>
                    <div className="space-y-2">
                      <p className="text-xs font-mono text-[#a8987a]">
                        <span className="text-[#6f6160]">Target:</span> {program.target}
                      </p>
                      <p className="text-sm text-orange-400 font-medium">{program.focus}</p>
                    </div>
                  </div>

                  {/* Center: Description */}
                  <div className="lg:w-1/3">
                    <p className={`text-sm leading-relaxed ${program.status === 'active' ? 'text-[#c9b89b]' : 'text-[#6f6160]'}`}>
                      {program.description}
                    </p>
                  </div>

                  {/* Right: Features and CTA */}
                  <div className="lg:w-1/3">
                    <ul className="space-y-2 mb-6">
                      {program.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-[#6f6160]">
                          <div className={`w-1.5 h-1.5 rounded-full ${program.status === 'active' ? 'bg-orange-500' : 'bg-[#3a3530]'}`} />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {program.status === 'active' ? (
                      <Link
                        href={program.href}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-400 rounded-lg font-semibold text-sm text-[#0d0906] hover:shadow-lg hover:shadow-orange-500/25 transition-all"
                      >
                        Explore {program.name}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1a1815] rounded-lg font-semibold text-sm text-[#6f6160] cursor-not-allowed"
                      >
                        Coming Soon
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const allProgramNames = [
  { name: 'Elevare', meaning: 'To lift up, elevate', purpose: 'Raising organizations to new heights', color: 'from-orange-500 to-amber-500', origin: 'Latin' },
  { name: 'Ascenda', meaning: 'To climb, ascend', purpose: 'Helping careers reach new peaks', color: 'from-blue-500 to-cyan-500', origin: 'Latin' },
  { name: 'Luminos', meaning: 'Full of light', purpose: 'Illuminating young minds', color: 'from-yellow-500 to-orange-400', origin: 'Latin' },
  { name: 'Initium', meaning: 'Beginning, origin', purpose: 'Where ventures start', color: 'from-emerald-500 to-teal-500', origin: 'Latin' },
  { name: 'Impetus', meaning: 'Driving force', purpose: 'Momentum for sales excellence', color: 'from-red-500 to-pink-500', origin: 'Latin' },
  { name: 'Animus', meaning: 'Mind, spirit, soul', purpose: 'Nurturing wellness & mindfulness', color: 'from-purple-500 to-violet-500', origin: 'Latin' },
  { name: 'Veritas', meaning: 'Truth', purpose: 'Upholding ethics & compliance', color: 'from-slate-400 to-gray-500', origin: 'Latin' },
  { name: 'Praxis', meaning: 'Practice, action', purpose: 'Learning through doing', color: 'from-pink-500 to-rose-500', origin: 'Greek' },
];

function NamingPhilosophySection() {
  const [displayedPrograms, setDisplayedPrograms] = useState(allProgramNames.slice(0, 4));
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsShuffling(true);
      setTimeout(() => {
        const shuffled = [...allProgramNames].sort(() => Math.random() - 0.5);
        setDisplayedPrograms(shuffled.slice(0, 4));
        setIsShuffling(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 sm:py-32 bg-gradient-to-b from-[#060503] to-[#0a0805]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <span className="inline-block text-xs font-mono uppercase tracking-[0.3em] text-orange-400/70 mb-4">
            Our Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f4efe6]">
            The Power of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
              Names
            </span>
          </h2>
          <p className="mt-8 text-[#a8987a] leading-relaxed max-w-2xl mx-auto">
            Each DOGM program carries a name rooted in classical language that embodies its essence and purpose.
            These names aren&apos;t just labels—they&apos;re promises of transformation.
          </p>

          {/* Animated program cards */}
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {displayedPrograms.map((item) => (
                <motion.div
                  key={item.name}
                  layout
                  initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                  animate={{
                    opacity: isShuffling ? 0.5 : 1,
                    scale: isShuffling ? 0.95 : 1,
                    rotateY: 0
                  }}
                  exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                  transition={{
                    duration: 0.4,
                    layout: { duration: 0.4 }
                  }}
                  className="group p-5 rounded-xl bg-gradient-to-br from-[#0d0a08] to-[#060503] border border-[#1a1815] hover:border-orange-500/30 text-left transition-colors duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${item.color}`}>
                      {item.name}
                    </h3>
                    <span className="text-[9px] font-mono text-[#4a4540] uppercase tracking-wider">
                      {item.origin}
                    </span>
                  </div>
                  <p className="text-xs italic text-[#6f6160]">&ldquo;{item.meaning}&rdquo;</p>
                  <p className="mt-2 text-xs text-[#a8987a] leading-relaxed">{item.purpose}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* All 8 programs mini display */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {allProgramNames.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className={`px-4 py-2 rounded-lg border transition-all duration-300 cursor-default ${
                  displayedPrograms.some(p => p.name === item.name)
                    ? 'border-orange-500/50 bg-orange-500/10'
                    : 'border-[#1a1815] bg-[#0a0805]/50 hover:border-[#2a2520]'
                }`}
              >
                <span className={`text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r ${item.color}`}>
                  {item.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
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
            Find Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
              Pathway
            </span>
          </h2>
          <p className="mt-8 text-base sm:text-lg text-[#a8987a] max-w-2xl mx-auto">
            Multiple programs are now live and ready to transform you.
            Choose the pathway that matches your goals and start your journey today.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-400 rounded-xl font-bold text-lg text-[#0d0906] hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-500"
            >
              Get Started
            </Link>
            <Link
              href="/services"
              className="w-full sm:w-auto px-10 py-5 rounded-xl font-semibold text-lg text-[#f4efe6] border border-[#3a3530] hover:border-orange-500/50 hover:bg-orange-500/5 transition-all duration-300 text-center"
            >
              View All Services
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function ProgramsContent() {
  return (
    <main className="min-h-screen bg-[#060503] text-[#f4efe6] antialiased">
      <Header />
      <HeroSection />
      <ProgramsGridSection />
      <NamingPhilosophySection />
      <CTASection />
      <Footer />
    </main>
  );
}
