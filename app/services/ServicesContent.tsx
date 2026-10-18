'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Header, Footer } from '../components/shared';

// ============================================================================
// SERVICES PAGE - Comprehensive Service Catalog
// ============================================================================

const services = [
  {
    id: 'corporate',
    title: 'Corporate Training',
    description: 'Transform your workforce with comprehensive programs in leadership, communication, and organizational development.',
    features: [
      'Leadership Development (all levels)',
      'Team Building & Collaboration',
      'Change Management',
      'Communication Skills',
      'Emotional Intelligence',
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    cta: 'View Programs',
    href: '/elevare#services',
  },
  {
    id: 'process',
    title: 'Process Optimization',
    description: 'Streamline operations with Lean Six Sigma certifications and proven process improvement methodologies.',
    features: [
      'Lean Six Sigma Certifications (Yellow, Green, Black Belt)',
      'Business Process Improvement',
      'Operational Excellence',
      'Quality Management Systems',
      'Continuous Improvement',
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    cta: 'Learn More',
    href: '/elevare#services',
  },
  {
    id: 'bootcamps',
    title: 'Intensive Bootcamps',
    description: 'Accelerated skill development through focused, hands-on training programs that deliver rapid results.',
    features: [
      'Leadership Bootcamp',
      'Lean Six Sigma Bootcamp',
      'Digital Transformation',
      'Project Management',
      'Data Analytics',
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    cta: 'View Bootcamps',
    href: '/elevare#bootcamps',
  },
  {
    id: 'executive',
    title: 'Executive Programs',
    description: 'World-class development for C-Suite leaders, senior management, and high-potential executives.',
    features: [
      'C-Suite Leadership Development',
      'Strategic Thinking & Planning',
      'Executive Presence',
      'Board Governance',
      'Global Leadership',
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    cta: 'Explore',
    href: '/elevare#services',
  },
  {
    id: 'team-building',
    title: 'Team Building',
    description: 'Custom-designed experiences that strengthen bonds, improve collaboration, and align teams.',
    features: [
      'Indoor/Outdoor Activities',
      'Virtual Team Building',
      'Department Alignment',
      'Values & Vision Sessions',
      'New Team Integration',
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    cta: 'Plan Event',
    href: '/contact',
  },
  {
    id: 'consulting',
    title: 'Consulting Services',
    description: 'Strategic guidance and assessments to identify opportunities and measure training effectiveness.',
    features: [
      'Organizational Assessment',
      'Training Needs Analysis',
      'Culture Surveys',
      '360° Assessments',
      'ROI Measurement',
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    cta: 'Get Assessment',
    href: '/contact',
  },
  {
    id: 'digital',
    title: 'Digital & AI Skills',
    description: 'Prepare your team for the future with cutting-edge technology and digital transformation training.',
    features: [
      'AI & Digital Transformation',
      'Data Analytics',
      'Automation Tools',
      'Cybersecurity Awareness',
      'Prompt Engineering',
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    cta: 'Learn More',
    href: '/elevare#services',
  },
  {
    id: 'wealth',
    title: 'Financial Literacy',
    description: 'Empower your employees with essential financial knowledge and wealth management skills.',
    features: [
      'Personal Financial Planning',
      'Investment Fundamentals',
      'Retirement Planning',
      'Wealth Building',
      'Insurance Basics',
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    cta: 'Explore',
    href: '/elevare#services',
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
    <section ref={ref} className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-[#060503]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060503] via-[#0a0705] to-[#060503]" />
        <motion.div
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-orange-500/8 blur-[120px]"
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
          What We Offer
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
        >
          <span className="text-[#f4efe6]">Our </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
            Services
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-[#a8987a] leading-relaxed"
        >
          Comprehensive training and development solutions designed to transform individuals,
          teams, and organizations.
        </motion.p>
      </motion.div>
    </section>
  );
}

function ServicesGridSection() {
  return (
    <section className="relative py-20 sm:py-32 bg-[#060503]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-6 sm:p-8 lg:p-10 rounded-2xl bg-gradient-to-br from-[#0d0a08] to-[#060503] border border-[#1a1815] hover:border-orange-500/30 transition-all duration-500"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors duration-300">
                    {service.icon}
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#f4efe6] group-hover:text-orange-300 transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="mt-4 text-sm sm:text-base text-[#a8987a] leading-relaxed">
                  {service.description}
                </p>

                <ul className="mt-6 space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-[#6f6160]">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500/50" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={service.href}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors"
                >
                  {service.cta}
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

function ProcessSection() {
  const steps = [
    {
      number: '01',
      title: 'Discovery',
      description: 'We start by understanding your organization, challenges, and goals through comprehensive needs assessment and interviews.',
    },
    {
      number: '02',
      title: 'Design',
      description: 'Our experts design a fully customized training program tailored to your specific needs, culture, and context.',
    },
    {
      number: '03',
      title: 'Deliver',
      description: 'We deliver engaging, impactful, and interactive training using the format and schedule that works best for you.',
    },
    {
      number: '04',
      title: 'Measure',
      description: 'We track outcomes and measure ROI to ensure the training delivers tangible, lasting, and meaningful business results.',
    },
  ];

  return (
    <section className="relative py-20 sm:py-32 bg-gradient-to-b from-[#060503] to-[#0a0805]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-xs font-mono uppercase tracking-[0.3em] text-orange-400/70 mb-4">
            How We Work
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f4efe6]">Our Process</h2>
          <p className="mt-6 text-base lg:text-lg text-[#a8987a]">
            A proven approach that ensures every engagement delivers maximum value.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {index < 3 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-orange-500/30 to-transparent z-0" />
              )}
              <div className="relative p-6 rounded-xl bg-gradient-to-br from-[#0d0a08] to-[#060503] border border-[#1a1815]">
                <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500/30 to-orange-500/10">
                  {step.number}
                </span>
                <h3 className="mt-4 text-lg font-bold text-[#f4efe6]">{step.title}</h3>
                <p className="mt-2 text-sm text-[#6f6160] leading-relaxed">{step.description}</p>
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
            Not Sure Where to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
              Start
            </span>
            ?
          </h2>
          <p className="mt-8 text-base sm:text-lg text-[#a8987a] max-w-2xl mx-auto">
            Let&apos;s have a conversation about your needs. Our team will help you identify
            the right programs and approach for your organization.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-400 rounded-xl font-bold text-lg text-[#0d0906] hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-500"
            >
              Get Free Consultation
            </Link>
            <Link
              href="/elevare"
              className="w-full sm:w-auto px-10 py-5 rounded-xl font-semibold text-lg text-[#f4efe6] border border-[#3a3530] hover:border-orange-500/50 hover:bg-orange-500/5 transition-all duration-300 text-center"
            >
              Explore Elevare
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function ServicesContent() {
  return (
    <main className="min-h-screen bg-[#060503] text-[#f4efe6] antialiased">
      <Header />
      <HeroSection />
      <ServicesGridSection />
      <ProcessSection />
      <CTASection />
      <Footer />
    </main>
  );
}
