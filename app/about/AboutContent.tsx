'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Header, Footer } from '../components/shared';

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-[#060503]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060503] via-[#0a0705] to-[#060503]" />
        <motion.div
          className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-orange-500/8 blur-[120px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
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
          transition={{ delay: 0.2 }}
          className="inline-block text-xs font-mono uppercase tracking-[0.3em] text-orange-400/70 mb-6"
        >
          About Us
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1]"
        >
          <span className="text-[#f4efe6]">Building the </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
            Future
          </span>
          <br />
          <span className="text-[#f4efe6]">of Human Capital</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-[#a8987a] leading-relaxed"
        >
          DOGM (Developers of Great Minds) is a premier training and development company
          dedicated to transforming individuals and organizations through world-class programs.
        </motion.p>
      </motion.div>
    </section>
  );
}

function StorySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="relative py-20 sm:py-32 bg-[#060503]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-mono uppercase tracking-[0.3em] text-orange-400/70 mb-4">
              Our Story
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f4efe6] leading-[1.1]">
              From Vision to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                Impact
              </span>
            </h2>
            <div className="mt-8 space-y-6 text-[#a8987a] leading-relaxed">
              <p>
                DOGM was founded with a singular vision: to develop great minds that can shape
                the future. In a rapidly evolving world where skills become obsolete quickly,
                we recognized the need for a different approach to learning and development.
              </p>
              <p>
                We believe that every individual has untapped potential waiting to be unlocked.
                Through our flagship program <span className="text-orange-400">Elevare</span> and
                our expanding ecosystem of specialized programs, we&apos;re making world-class
                training accessible to professionals across the Philippines and beyond.
              </p>
              <p>
                Our methodology combines the best of traditional learning with cutting-edge
                techniques, ensuring that our participants don&apos;t just learn—they transform.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -top-4 -right-4 w-full h-full rounded-2xl bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/10" />
            <div className="relative bg-gradient-to-br from-[#1a1815] to-[#0d0a08] rounded-2xl p-8 lg:p-12 border border-[#2a2520]">
              <div className="space-y-8">
                {[
                  { year: '2026', event: 'DOGM Founded', description: 'Vision for transformative training begins', achieved: true },
                  { year: '2026', event: 'Elevare Launched', description: 'First corporate training programs delivered', achieved: false },
                  { year: '2026', event: 'Rapid Expansion', description: '50+ programs, 10K+ lives transformed', achieved: false },
                  { year: '2026', event: 'Ecosystem Growth', description: 'New program arms in development', achieved: false },
                ].map((milestone, i) => (
                  <div key={i} className={`flex gap-6 ${!milestone.achieved ? 'opacity-40' : ''}`}>
                    <div className="flex-shrink-0 w-16 text-right">
                      <span className={`text-sm font-mono ${milestone.achieved ? 'text-orange-400' : 'text-orange-400/50'}`}>{milestone.year}</span>
                    </div>
                    <div className="relative">
                      <div className={`absolute -left-[21px] top-1.5 w-2 h-2 rounded-full ${milestone.achieved ? 'bg-orange-500' : 'bg-orange-500/30 border border-dashed border-orange-500/50'}`} />
                      {i < 3 && <div className={`absolute -left-[17px] top-4 w-px h-full ${milestone.achieved ? 'bg-[#2a2520]' : 'bg-[#2a2520]/50 border-dashed'}`} />}
                      <h3 className={`text-lg font-bold ${milestone.achieved ? 'text-[#f4efe6]' : 'text-[#f4efe6]/60'}`}>{milestone.event}</h3>
                      <p className={`mt-1 text-sm ${milestone.achieved ? 'text-[#6f6160]' : 'text-[#6f6160]/60'}`}>{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MissionVisionSection() {
  return (
    <section className="relative py-20 sm:py-32 bg-gradient-to-b from-[#060503] to-[#0a0805]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="relative p-8 lg:p-12 rounded-2xl bg-gradient-to-br from-[#0d0a08] to-[#060503] border border-[#1a1815]"
          >
            <div className="absolute top-8 right-8 w-16 h-16 rounded-full bg-orange-500/5 blur-xl" />
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-[#f4efe6]">Our Mission</h3>
              <p className="mt-6 text-[#a8987a] leading-relaxed">
                To empower individuals and organizations to unlock their highest potential through
                transformative training and development experiences that create lasting impact.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative p-8 lg:p-12 rounded-2xl bg-gradient-to-br from-[#0d0a08] to-[#060503] border border-[#1a1815]"
          >
            <div className="absolute top-8 right-8 w-16 h-16 rounded-full bg-orange-500/5 blur-xl" />
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-[#f4efe6]">Our Vision</h3>
              <p className="mt-6 text-[#a8987a] leading-relaxed">
                To be the leading force in human capital development in the Philippines and beyond,
                recognized for excellence, innovation, and measurable outcomes.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ValuesDetailSection() {
  const values = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Excellence',
      description: 'We pursue the highest standards in everything we do, from content development to delivery.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Partnership',
      description: 'We work alongside our clients as partners, invested in their success and growth.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: 'Impact',
      description: 'We measure our success by the tangible results and transformations we create.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'Innovation',
      description: 'We continuously evolve our methods to stay ahead of industry trends and needs.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: 'Integrity',
      description: 'We operate with transparency, honesty, and ethical practices in all interactions.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Global Mindset',
      description: 'We bring world-class expertise with local relevance and cultural understanding.',
    },
  ];

  return (
    <section className="relative py-20 sm:py-32 bg-[#060503]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2a2520] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-xs font-mono uppercase tracking-[0.3em] text-orange-400/70 mb-4">
            What Drives Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f4efe6]">Our Core Values</h2>
          <p className="mt-6 text-base lg:text-lg text-[#a8987a]">
            These principles guide every decision we make and every program we deliver.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0d0a08] to-[#060503] border border-[#1a1815] hover:border-orange-500/30 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors duration-300">
                {value.icon}
              </div>
              <h3 className="mt-6 text-xl font-bold text-[#f4efe6] group-hover:text-orange-300 transition-colors duration-300">
                {value.title}
              </h3>
              <p className="mt-3 text-sm text-[#a8987a] leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ElevareEdgeSection() {
  const differentiators = [
    {
      title: 'Tailored Solutions',
      description: 'Industry-specific blueprints customized to your organization\'s unique needs and challenges.',
    },
    {
      title: 'Future-Ready Programs',
      description: 'AI, digital transformation, and cutting-edge skills for the modern workplace.',
    },
    {
      title: 'Integrated Approach',
      description: 'Combining skills development with systems optimization for holistic transformation.',
    },
    {
      title: 'Global Expertise',
      description: 'World-class methodologies adapted for local relevance and cultural context.',
    },
    {
      title: 'Measurable Impact',
      description: 'Data-driven results with clear ROI metrics and business outcome alignment.',
    },
    {
      title: 'Partnership Model',
      description: 'Long-term engagement focused on sustainable growth and continuous improvement.',
    },
  ];

  return (
    <section className="relative py-20 sm:py-32 bg-gradient-to-b from-[#0a0805] to-[#060503]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-xs font-mono uppercase tracking-[0.3em] text-orange-400/70 mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f4efe6]">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">Elevare</span> Edge
          </h2>
          <p className="mt-6 text-base lg:text-lg text-[#a8987a]">
            What sets our training programs apart from the rest.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentiators.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-6 rounded-xl border border-[#1a1815] hover:border-orange-500/30 bg-[#0a0805]/50 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#f4efe6] group-hover:text-orange-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#6f6160] leading-relaxed">
                    {item.description}
                  </p>
                </div>
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
            Let&apos;s Build Something{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
              Great
            </span>{' '}
            Together
          </h2>
          <p className="mt-8 text-base sm:text-lg text-[#a8987a] max-w-2xl mx-auto">
            Whether you&apos;re looking to transform your organization or accelerate your personal growth, we&apos;re here to help.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-400 rounded-xl font-semibold text-[#0d0906] hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-500"
            >
              Get in Touch
            </Link>
            <Link
              href="/elevare"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-[#f4efe6] border border-[#3a3530] hover:border-orange-500/50 hover:bg-orange-500/5 transition-all duration-300 text-center"
            >
              Explore Programs
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function AboutContent() {
  return (
    <main className="min-h-screen bg-[#060503] text-[#f4efe6] antialiased">
      <Header />
      <HeroSection />
      <StorySection />
      <MissionVisionSection />
      <ValuesDetailSection />
      <ElevareEdgeSection />
      <CTASection />
      <Footer />
    </main>
  );
}
