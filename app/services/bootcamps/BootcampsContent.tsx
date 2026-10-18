'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Header, Footer } from '../../components/shared';

// ============================================================================
// BOOTCAMPS PAGE
// ============================================================================

const bootcamps = [
  {
    name: 'Leadership Bootcamp',
    duration: '3-5 days',
    focus: 'Leadership fundamentals to advanced',
    description: 'Intensive leadership development covering essential skills for emerging to senior leaders.',
    topics: ['Leadership Styles', 'Team Management', 'Communication', 'Decision Making', 'Conflict Resolution'],
  },
  {
    name: 'Lean Six Sigma Bootcamp',
    duration: '2-4 weeks',
    focus: 'Belt certifications',
    description: 'Comprehensive training for Yellow, Green, and Black Belt certifications with hands-on projects.',
    topics: ['DMAIC Methodology', 'Statistical Tools', 'Process Mapping', 'Root Cause Analysis', 'Project Work'],
  },
  {
    name: 'Digital Transformation Bootcamp',
    duration: '3-5 days',
    focus: 'AI, automation, digital tools',
    description: 'Prepare your team for the digital future with practical skills and strategic thinking.',
    topics: ['AI Applications', 'Automation Tools', 'Digital Strategy', 'Change Management', 'Data Literacy'],
  },
  {
    name: 'Sales Excellence Bootcamp',
    duration: '3 days',
    focus: 'Revenue growth strategies',
    description: 'Transform your sales team with proven techniques and modern selling approaches.',
    topics: ['Consultative Selling', 'Negotiation', 'Pipeline Management', 'Key Accounts', 'Sales Leadership'],
  },
  {
    name: 'Project Management Bootcamp',
    duration: '5 days',
    focus: 'Agile, Scrum, PMP prep',
    description: 'Master project management methodologies and prepare for industry certifications.',
    topics: ['Agile Principles', 'Scrum Framework', 'Risk Management', 'Stakeholder Management', 'PM Tools'],
  },
  {
    name: 'Data Analytics Bootcamp',
    duration: '4-6 weeks',
    focus: 'Data-driven decision making',
    description: 'Learn to extract insights from data and drive business decisions with confidence.',
    topics: ['Data Analysis', 'Visualization', 'Excel Advanced', 'SQL Basics', 'Dashboard Creation'],
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
          className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-orange-500/8 blur-[120px]"
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
          Intensive Programs
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
        >
          <span className="text-[#f4efe6]">Accelerated </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
            Bootcamps
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-[#a8987a] leading-relaxed"
        >
          Fast-track skill development through focused, hands-on training programs
          that deliver rapid results and immediate application.
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
            Enroll Now
          </Link>
          <a
            href="#bootcamps"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-[#f4efe6] border border-[#3a3530] hover:border-orange-500/50 hover:bg-orange-500/5 transition-all duration-300 text-center"
          >
            View Bootcamps
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

function BootcampsSection() {
  return (
    <section id="bootcamps" className="relative py-20 sm:py-32 bg-[#060503]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-xs font-mono uppercase tracking-[0.3em] text-orange-400/70 mb-4">
            Available Programs
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f4efe6]">
            Intensive Bootcamps
          </h2>
          <p className="mt-6 text-base lg:text-lg text-[#a8987a]">
            Condensed, high-impact programs designed for rapid skill acquisition.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bootcamps.map((bootcamp, index) => (
            <motion.div
              key={bootcamp.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-6 rounded-2xl bg-gradient-to-br from-[#0d0a08] to-[#060503] border border-[#1a1815] hover:border-orange-500/30 transition-all duration-500"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-orange-500/10 text-xs font-mono text-orange-400">
                    {bootcamp.duration}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#f4efe6] group-hover:text-orange-300 transition-colors duration-300">
                  {bootcamp.name}
                </h3>
                <p className="mt-1 text-sm text-orange-400/70">{bootcamp.focus}</p>
                <p className="mt-4 text-sm text-[#a8987a]">{bootcamp.description}</p>

                <ul className="mt-6 space-y-2">
                  {bootcamp.topics.map((topic, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-[#6f6160]">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500/50" />
                      {topic}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors"
                >
                  Learn More
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
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
              Level Up
            </span>
            ?
          </h2>
          <p className="mt-8 text-base sm:text-lg text-[#a8987a] max-w-2xl mx-auto">
            Join our next bootcamp cohort and accelerate your team&apos;s capabilities.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-400 rounded-xl font-bold text-lg text-[#0d0906] hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-500"
            >
              Register Interest
            </Link>
            <Link
              href="/services"
              className="w-full sm:w-auto px-10 py-5 rounded-xl font-semibold text-lg text-[#f4efe6] border border-[#3a3530] hover:border-orange-500/50 hover:bg-orange-500/5 transition-all duration-300 text-center"
            >
              All Services
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function BootcampsContent() {
  return (
    <main className="min-h-screen bg-[#060503] text-[#f4efe6] antialiased">
      <Header />
      <HeroSection />
      <BootcampsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
