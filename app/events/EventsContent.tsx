'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Header, Footer } from '../components/shared';

// ============================================================================
// EVENTS PAGE - Coming Soon
// ============================================================================

export default function EventsContent() {
  return (
    <main className="min-h-screen bg-[#060503] text-[#f4efe6] antialiased">
      <Header />

      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[#060503]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#060503] via-[#0a0705] to-[#060503]" />
          <motion.div
            className="absolute top-1/3 right-1/3 w-[400px] h-[400px] rounded-full bg-orange-500/5 blur-[100px]"
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-orange-500/10 flex items-center justify-center"
          >
            <svg className="w-10 h-10 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-block text-xs font-mono uppercase tracking-[0.3em] text-orange-400/70 mb-6"
          >
            Events
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
              Coming Soon
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 max-w-xl mx-auto text-base sm:text-lg text-[#a8987a] leading-relaxed"
          >
            We&apos;re planning exciting workshops, seminars, and networking events.
            Be the first to know when we announce our upcoming events.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-400 rounded-xl font-semibold text-[#0d0906] hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-500"
            >
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-[#f4efe6] border border-[#3a3530] hover:border-orange-500/50 hover:bg-orange-500/5 transition-all duration-300 text-center"
            >
              Get Notified
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 text-sm text-[#6f6160]"
          >
            Contact us if you&apos;re interested in hosting an event with DOGM
          </motion.p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
