'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import LogoIcon from '../LogoIcon';

const navItems = [
  { label: 'About', href: '/about' },
  { label: 'Elevare', href: '/elevare' },
  { label: 'Programs', href: '/programs' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#060503] backdrop-blur-xl shadow-lg shadow-black/40'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group relative z-10">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <LogoIcon
                size={28}
                className="group-hover:drop-shadow-[0_0_12px_rgba(249,115,22,0.6)] transition-all duration-300"
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold text-[#f4efe6] tracking-tight">
                DOGM<span className="text-orange-500">.</span>AI
              </span>
              <span className="text-[8px] sm:text-[9px] font-mono text-[#6f6160] -mt-0.5 tracking-[0.15em] uppercase hidden sm:block">
                Developers of Great Minds
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-[#a8987a] hover:text-[#f4efe6] transition-colors duration-300 group"
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute inset-0 rounded-lg bg-orange-500/0 group-hover:bg-orange-500/10 transition-colors duration-300" />
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-4 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-400 rounded-lg text-sm font-semibold text-[#0d0906] hover:shadow-lg hover:shadow-orange-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden relative z-10 p-2 -mr-2 text-[#a8987a] hover:text-[#f4efe6] transition-colors"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <div className="w-6 h-5 relative">
              <motion.span
                animate={mobileMenuOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
                className="absolute top-0 left-0 w-full h-0.5 bg-current rounded-full origin-center"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
              <motion.span
                animate={mobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                className="absolute top-1/2 left-0 w-full h-0.5 bg-current rounded-full -translate-y-1/2"
                transition={{ duration: 0.2 }}
              />
              <motion.span
                animate={mobileMenuOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
                className="absolute bottom-0 left-0 w-full h-0.5 bg-current rounded-full origin-center"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:hidden bg-[#060503]/98 backdrop-blur-xl border-t border-[#1a1815]/50"
          >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.2 }}
                >
                  <Link
                    href={item.href}
                    className="block px-4 py-3 text-lg text-[#c9b89b] hover:text-[#f4efe6] hover:bg-orange-500/10 rounded-lg transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.05, duration: 0.2 }}
                className="pt-4 mt-4 border-t border-[#1a1815]"
              >
                <Link
                  href="/contact"
                  className="block w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-400 rounded-xl text-center font-semibold text-[#0d0906] hover:shadow-lg hover:shadow-orange-500/25 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
