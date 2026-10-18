'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import LogoIcon from '../LogoIcon';

const footerLinks = {
  company: [
    { label: 'About', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
  programs: [
    { label: 'Elevare', href: '/elevare' },
    { label: 'Bootcamps', href: '/services/bootcamps' },
    { label: 'Executive', href: '/services/executive' },
  ],
  resources: [
    { label: 'Blog', href: '/blog' },
    { label: 'Events', href: '/events' },
    { label: 'FAQ', href: '/contact#faq' },
  ],
  legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Refund Policy', href: '/refund-policy' },
  ],
};

const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61585851908758',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#060503] border-t border-[#1a1815]">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/[0.02] to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 sm:py-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <LogoIcon
                size={32}
                className="group-hover:drop-shadow-[0_0_12px_rgba(249,115,22,0.5)] transition-all duration-300"
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-[#f4efe6]">
                  DOGM<span className="text-orange-500">.</span>AI
                </span>
                <span className="text-[9px] font-mono text-[#6f6160] tracking-[0.15em] uppercase">
                  Developers of Great Minds
                </span>
              </div>
            </Link>
            <p className="mt-6 text-sm text-[#6f6160] leading-relaxed max-w-sm">
              Empowering individuals and organizations to unlock their highest potential through
              world-class training and development programs.
            </p>
            {/* Social links */}
            <div className="mt-6 flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6f6160] hover:text-orange-400 transition-colors duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#a8987a] mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#6f6160] hover:text-orange-400 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#a8987a] mb-4">
              Programs
            </h4>
            <ul className="space-y-3">
              {footerLinks.programs.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#6f6160] hover:text-orange-400 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#a8987a] mb-4">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#6f6160] hover:text-orange-400 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#a8987a] mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#6f6160] hover:text-orange-400 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Large brand section */}
        <motion.div
          className="py-16 sm:py-20 flex flex-col items-center justify-center border-t border-[#1a1815] relative"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-96 h-96 bg-orange-500/5 rounded-full blur-[100px]" />
          </div>

          <div className="relative group">
            <LogoIcon
              size={120}
              className="drop-shadow-[0_0_40px_rgba(249,115,22,0.3)] group-hover:drop-shadow-[0_0_60px_rgba(249,115,22,0.5)] transition-all duration-700"
            />
          </div>
          <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#f4efe6]">
            DOGM<span className="text-orange-500">.</span>AI
          </h2>
          <p className="mt-3 text-[#6f6160] font-mono text-xs sm:text-sm tracking-[0.3em] uppercase">
            Developers of Great Minds
          </p>
        </motion.div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-[#1a1815] flex items-center justify-center">
          <p className="text-xs text-[#6f6160] font-mono">
            &copy; {new Date().getFullYear()} DOGM.AI. All rights reserved. Philippines.
          </p>
        </div>
      </div>
    </footer>
  );
}
