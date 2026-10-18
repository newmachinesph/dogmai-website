'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LogoIcon from './LogoIcon';

interface SiteHeaderProps {
  showNav?: boolean;
}

export default function SiteHeader({ showNav = true }: SiteHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="flex items-center justify-between pb-2">
          <div className="flex items-center gap-4 sm:gap-8">
            <a href="/" className="flex items-center gap-2 sm:gap-3 group">
              <LogoIcon size={28} className="group-hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.5)] transition-all duration-300" />
              <span className="text-xl sm:text-2xl font-bold font-sans">DOGM.AI</span>
            </a>
            {showNav ? (
              <nav className="hidden md:flex gap-6 font-mono text-sm">
                <a href="/" className="text-slate-400 hover:text-white transition">Home</a>
                <a href="/curriculum" className="text-slate-400 hover:text-white transition">Curriculum</a>
                <a href="/cohorts" className="text-slate-400 hover:text-white transition">Cohorts</a>
                <a href="/contact" className="text-slate-400 hover:text-white transition">Contact</a>
              </nav>
            ) : null}
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href="/pdf-brochure"
              className="hidden sm:block text-slate-400 hover:text-white transition font-mono text-sm"
            >
              Download Brochure
            </a>
            <a
              href="/enroll"
              className="hidden sm:block bg-white text-black px-3 sm:px-4 py-2 rounded-lg font-semibold hover:bg-slate-200 transition font-mono text-sm"
            >
              Enroll Now
            </a>
            {/* Mobile menu button */}
            {showNav && (
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-slate-400 hover:text-white transition"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {showNav && isMobileMenuOpen && (
            <motion.nav
              className="md:hidden py-4 border-t border-slate-800 mt-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="flex flex-col gap-4 font-mono text-sm">
                <a
                  href="/"
                  className="text-slate-300 hover:text-white transition py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </a>
                <a
                  href="/curriculum"
                  className="text-slate-300 hover:text-white transition py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Curriculum
                </a>
                <a
                  href="/cohorts"
                  className="text-slate-300 hover:text-white transition py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Cohorts
                </a>
                <a
                  href="/contact"
                  className="text-slate-300 hover:text-white transition py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </a>
                <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
                  <a
                    href="/pdf-brochure"
                    className="text-slate-300 hover:text-white transition py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Download Brochure
                  </a>
                  <a
                    href="/enroll"
                    className="bg-white text-black px-4 py-3 rounded-lg font-semibold hover:bg-slate-200 transition text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Enroll Now
                  </a>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
