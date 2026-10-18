'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Header, Footer } from '../components/shared';

// ============================================================================
// REFUND POLICY PAGE
// ============================================================================

const refundSections = [
  {
    title: 'Eligibility',
    description: 'Refund eligibility depends on the specific service agreement and program type. Custom terms may apply.',
    note: 'See your service agreement',
  },
  {
    title: 'Training Programs',
    description: 'For standard training programs, cancellation requests made 14+ days before the start date are eligible for a full refund.',
    note: '14-day notice period',
  },
  {
    title: 'Custom Engagements',
    description: 'Custom consulting and development work follows the cancellation terms specified in your service agreement.',
    note: 'Agreement terms apply',
  },
  {
    title: 'How to Request',
    description: 'Email us with your company name, engagement details, and reason for the request.',
    email: 'hello@dogm.ai',
  },
  {
    title: 'Processing Time',
    description: 'Approved refunds are processed within 10 business days. Payment provider timelines may add additional time.',
    note: '10 business days',
  },
  {
    title: 'Rescheduling Option',
    description: 'If your schedule changes, you may be able to reschedule to a later date instead of canceling.',
    note: 'Subject to availability',
  },
  {
    title: 'Exclusions',
    description: 'Completed services, materials already delivered, or cancellations made after program start are generally non-refundable.',
    note: 'Per service agreement',
  },
  {
    title: 'Questions',
    description: 'Not sure about your options? We&apos;re happy to discuss alternatives.',
    email: 'hello@dogm.ai',
  },
];

function HeroSection() {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-[#060503]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060503] via-[#0a0705] to-[#060503]" />
        <motion.div
          className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-orange-500/5 blur-[100px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-block text-xs font-mono uppercase tracking-[0.3em] text-orange-400/70 mb-6"
        >
          Refund Policy
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold"
        >
          <span className="text-[#f4efe6]">Clear, Fair, and </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
            Upfront
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 max-w-2xl mx-auto text-base sm:text-lg text-[#a8987a] leading-relaxed"
        >
          We protect your investment while maintaining the quality of our services.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex flex-wrap justify-center gap-6 text-sm"
        >
          <div className="text-center">
            <div className="text-orange-400 font-bold">Jan 2026</div>
            <div className="text-[#6f6160] text-xs">Last Updated</div>
          </div>
          <div className="text-center">
            <div className="text-emerald-400 font-bold">14 Days</div>
            <div className="text-[#6f6160] text-xs">Standard Notice</div>
          </div>
          <div className="text-center">
            <div className="text-[#f4efe6] font-bold">Email</div>
            <div className="text-[#6f6160] text-xs">Request Method</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function RefundSection() {
  return (
    <section className="relative py-20 sm:py-32 bg-[#060503]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="inline-block text-xs font-mono uppercase tracking-[0.3em] text-orange-400/70 mb-4">
            Refund Details
          </span>
          <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20">
            <h3 className="text-xl font-bold text-[#f4efe6]">Flexible Cancellation</h3>
            <p className="mt-2 text-sm text-[#a8987a]">
              We understand business needs change. Contact us to discuss your options if circumstances arise.
            </p>
          </div>
        </motion.div>

        <div className="grid gap-6">
          {refundSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.05 }}
              className="p-6 rounded-xl bg-gradient-to-br from-[#0d0a08] to-[#060503] border border-[#1a1815] hover:border-orange-500/20 transition-colors duration-300"
            >
              <h3 className="text-lg font-bold text-[#f4efe6]">{section.title}</h3>
              <p className="mt-2 text-sm text-[#a8987a]">{section.description}</p>
              {section.note && (
                <p className="mt-3 text-xs text-[#6f6160] font-mono">{section.note}</p>
              )}
              {section.email && (
                <a
                  href={`mailto:${section.email}`}
                  className="mt-3 inline-block text-sm text-orange-400 hover:text-orange-300 transition-colors"
                >
                  {section.email}
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative py-16 sm:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d0906] via-orange-950/10 to-[#060503]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-[#f4efe6]">Need Assistance?</h2>
          <p className="mt-4 text-[#a8987a]">
            Our team can help you understand your options and find the best solution.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-400 rounded-xl font-semibold text-[#0d0906] hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-300"
            >
              Contact Us
            </Link>
            <Link
              href="/"
              className="px-8 py-3 rounded-xl font-semibold text-[#f4efe6] border border-[#3a3530] hover:border-orange-500/50 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function RefundPolicyContent() {
  return (
    <main className="min-h-screen bg-[#060503] text-[#f4efe6] antialiased">
      <Header />
      <HeroSection />
      <RefundSection />
      <CTASection />
      <Footer />
    </main>
  );
}
