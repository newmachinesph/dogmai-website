'use client';

import { motion } from 'framer-motion';
import LogoIcon from './LogoIcon';

export default function SiteFooter() {
  return (
    <motion.footer
        className="mt-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-12">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4 font-sans">DOGM.AI</h3>
              <p className="max-w-xs text-slate-400 text-sm font-mono">
                AI-native coding bootcamp. Built for people who want to understand what they're building.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 font-sans">Program</h4>
              <ul className="space-y-2 text-sm text-slate-400 font-mono">
                <li><a href="/curriculum" className="hover:text-white transition">Curriculum</a></li>
                <li><a href="/our-system" className="hover:text-white transition">Our System</a></li>
                <li><a href="/#pricing" className="hover:text-white transition">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 font-sans">About</h4>
              <ul className="space-y-2 text-sm text-slate-400 font-mono">
                <li><a href="/curriculum#approach" className="hover:text-white transition">Our Approach</a></li>
                <li><a href="/contact#faq" className="hover:text-white transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 font-sans">Get Started</h4>
              <ul className="space-y-2 text-sm text-slate-400 font-mono">
                <li><a href="/enroll" className="hover:text-white transition">Enroll Now</a></li>
                <li>
                  <a href="/pdf-brochure" className="hover:text-white transition">
                    Download Brochure
                  </a>
                </li>
                <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
          </div>

          {/* Large Logo Section */}
          <motion.div
            className="py-16 flex flex-col items-center justify-center relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Elegant fade lines with orange accent */}
            <div className="absolute top-0 left-0 right-0 h-[1px]">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-600/50 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-[1px]">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-600/50 to-transparent" />
            </div>

            {/* Glow effect behind logo */}
            <div className="relative group">
              <div className="absolute inset-0 blur-3xl bg-orange-500/15 rounded-full scale-150 group-hover:bg-orange-500/25 transition-all duration-700" />
              <LogoIcon size={140} className="relative drop-shadow-[0_0_30px_rgba(249,115,22,0.3)] group-hover:drop-shadow-[0_0_50px_rgba(249,115,22,0.5)] transition-all duration-500" />
            </div>

            <h2 className="mt-6 text-4xl sm:text-5xl font-bold font-sans tracking-tight">
              DOGM<span className="text-orange-500">.</span>AI
            </h2>

            <p className="mt-3 text-slate-400 font-mono text-sm sm:text-base tracking-widest uppercase">
              Developers of Great Minds
            </p>
          </motion.div>

          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <p className="text-slate-400 text-sm font-mono">
                &copy; 2026 DOGM.AI - Philippines
              </p>
              <a
                href="https://www.facebook.com/profile.php?id=61585851908758"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition"
                aria-label="Follow us on Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
            <div className="flex gap-6 font-mono text-sm">
              <a href="/privacy" className="text-slate-400 hover:text-white transition">Privacy Policy</a>
              <a href="/terms" className="text-slate-400 hover:text-white transition">Terms</a>
              <a href="/refund-policy" className="text-slate-400 hover:text-white transition">Refund Policy</a>
            </div>
          </div>
        </div>
      </motion.footer>
  );
}
