'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Header, Footer } from '../components/shared';

// ============================================================================
// TERMS OF SERVICE PAGE
// ============================================================================

const termsSections = [
  {
    title: 'Eligibility',
    description: 'Organizations and individuals must be authorized to enter into binding agreements on behalf of their company.',
    note: 'We may verify company details',
  },
  {
    title: 'Service Agreements',
    description: 'Your engagement is confirmed after a signed service agreement and initial payment is received.',
    note: 'Invoices sent via email',
  },
  {
    title: 'Program Access',
    description: 'Training materials and resources are provided for enrolled participants only. Do not share or redistribute.',
    note: 'Per-participant licensing',
  },
  {
    title: 'Intellectual Property',
    description: 'All course materials, frameworks, and methodologies are owned by DOGM unless stated otherwise.',
    note: 'No resale or redistribution',
  },
  {
    title: 'Acceptable Use',
    description: 'Participants must maintain professional conduct during all training sessions and interactions.',
    note: 'Respect trainers and peers',
  },
  {
    title: 'Cancellation',
    description: 'Cancellation terms vary by program. See your service agreement for specific terms.',
    note: 'Notice periods apply',
  },
  {
    title: 'Disclaimers',
    description: 'We provide training and development services. Specific business outcomes depend on implementation.',
    note: 'Results vary by organization',
  },
  {
    title: 'Liability',
    description: 'DOGM is not liable for indirect or consequential damages arising from service use.',
    note: 'Limits apply where permitted',
  },
  {
    title: 'Changes',
    description: 'We may update these terms. Material changes will be communicated to active clients.',
    note: 'Updated terms apply on posting',
  },
  {
    title: 'Contact',
    description: 'For questions about these terms, reach out to our team.',
    email: 'hello@dogm.ai',
  },
];

function HeroSection() {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-[#060503]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060503] via-[#0a0705] to-[#060503]" />
        <motion.div
          className="absolute top-1/3 right-1/3 w-[400px] h-[400px] rounded-full bg-orange-500/5 blur-[100px]"
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
          Terms of Service
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold"
        >
          <span className="text-[#f4efe6]">Straightforward Rules for </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
            Professional Partnerships
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 max-w-2xl mx-auto text-base sm:text-lg text-[#a8987a] leading-relaxed"
        >
          By engaging DOGM services, you agree to these terms. Please read them carefully.
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
            <div className="text-[#f4efe6] font-bold">PH</div>
            <div className="text-[#6f6160] text-xs">Governing Law</div>
          </div>
          <div className="text-center">
            <div className="text-[#f4efe6] font-bold">B2B</div>
            <div className="text-[#6f6160] text-xs">Focus</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TermsSection() {
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
            Terms Details
          </span>
        </motion.div>

        <div className="grid gap-6">
          {termsSections.map((section, index) => (
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
          <h2 className="text-2xl sm:text-3xl font-bold text-[#f4efe6]">Questions?</h2>
          <p className="mt-4 text-[#a8987a]">
            Our team is here to clarify any terms or discuss your specific requirements.
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

export default function TermsContent() {
  return (
    <main className="min-h-screen bg-[#060503] text-[#f4efe6] antialiased">
      <Header />
      <HeroSection />
      <TermsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
