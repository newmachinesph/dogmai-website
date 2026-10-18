'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Header, Footer } from '../components/shared';

// ============================================================================
// PRIVACY POLICY PAGE
// ============================================================================

const privacySections = [
  {
    title: 'Information We Collect',
    description: 'Company details, contact information, payment records, and training participation data to deliver our services.',
    note: 'Business contact info, usage data',
  },
  {
    title: 'How We Use It',
    description: 'To deliver training programs, process payments, communicate about engagements, and improve our services.',
    note: 'No spam, essential updates only',
  },
  {
    title: 'Cookies',
    description: 'We use cookies for login sessions, preferences, and basic analytics. You can control these in your browser settings.',
    note: 'Session, preferences, analytics',
  },
  {
    title: 'Data Sharing',
    description: 'We only share data with trusted service providers that help us deliver our training programs.',
    note: 'Payments, email, video conferencing',
  },
  {
    title: 'Security',
    description: 'We implement industry-standard security measures to protect your information.',
    note: 'Encrypted transit, access controls',
  },
  {
    title: 'Your Rights',
    description: 'You can request access, correction, or deletion of your personal data at any time.',
    note: 'Email us to start a request',
  },
  {
    title: 'Data Retention',
    description: 'We retain data only as long as needed for service delivery and legal compliance.',
    note: 'Standard retention windows apply',
  },
  {
    title: 'Contact',
    description: 'Questions about privacy? Our team is here to help.',
    email: 'hello@dogm.ai',
  },
];

function HeroSection() {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-[#060503]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060503] via-[#0a0705] to-[#060503]" />
        <motion.div
          className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-orange-500/5 blur-[100px]"
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
          Privacy Policy
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold"
        >
          <span className="text-[#f4efe6]">Your Data, </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
            Your Trust
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 max-w-2xl mx-auto text-base sm:text-lg text-[#a8987a] leading-relaxed"
        >
          This policy explains what we collect, why we collect it, and how you can control it.
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
            <div className="text-[#6f6160] text-xs">Primary Region</div>
          </div>
          <div className="text-center">
            <div className="text-[#f4efe6] font-bold">No Sale</div>
            <div className="text-[#6f6160] text-xs">Data Policy</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PrivacySection() {
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
            Privacy Details
          </span>
          <div className="p-6 rounded-xl bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20">
            <h3 className="text-xl font-bold text-[#f4efe6]">We Do Not Sell Your Data</h3>
            <p className="mt-2 text-sm text-[#a8987a]">
              Your information stays with us unless you request deletion or a legal requirement applies.
            </p>
          </div>
        </motion.div>

        <div className="grid gap-6">
          {privacySections.map((section, index) => (
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
          <h2 className="text-2xl sm:text-3xl font-bold text-[#f4efe6]">Privacy Questions?</h2>
          <p className="mt-4 text-[#a8987a]">
            Our team is available to answer any questions about how we handle your data.
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

export default function PrivacyContent() {
  return (
    <main className="min-h-screen bg-[#060503] text-[#f4efe6] antialiased">
      <Header />
      <HeroSection />
      <PrivacySection />
      <CTASection />
      <Footer />
    </main>
  );
}
