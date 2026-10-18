'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#060503] text-[#f4efe6] antialiased">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 pt-6 sm:pt-8">
        <SiteHeader />
      </div>

      {/* 404 Content */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[#060503]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#060503] via-[#0a0705] to-[#060503]" />
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

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          {/* 404 Number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h1 className="text-[120px] sm:text-[160px] md:text-[200px] font-bold leading-none tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#f4efe6] via-[#f4efe6]/60 to-[#f4efe6]/10">
                4
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-orange-400 via-orange-500 to-orange-500/20">
                0
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#f4efe6] via-[#f4efe6]/60 to-[#f4efe6]/10">
                4
              </span>
            </h1>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-block text-xs font-mono uppercase tracking-[0.3em] text-orange-400/70 mb-4">
              Page Not Found
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#f4efe6]">
              This path doesn&apos;t exist
              <span className="text-orange-500">.</span>
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 text-base sm:text-lg text-[#a8987a] max-w-xl mx-auto leading-relaxed"
          >
            The page you&apos;re looking for may have been moved, removed, or never existed.
            Let&apos;s get you back on track.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/"
              className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-400 rounded-xl font-semibold text-[#0d0906] overflow-hidden hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-500"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Back to Home
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
            <Link
              href="/programs"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-[#f4efe6] border border-[#3a3530] hover:border-orange-500/50 hover:bg-orange-500/5 transition-all duration-300 text-center"
            >
              View Programs
            </Link>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-6 text-sm font-mono text-[#6f6160]"
          >
            {[
              { label: 'Curriculum', href: '/curriculum' },
              { label: 'Contact', href: '/contact' },
              { label: 'Enroll', href: '/enroll' },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-orange-400 transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />
    </main>
  );
}
