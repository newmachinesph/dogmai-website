'use client';

import { useState, useRef, Suspense } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Header, Footer } from '../components/shared';
import { LanguageProvider, useLanguage, LanguageSwitcher } from './i18n';

// ============================================================================
// ELEVARE PAGE - Complete Training Program Showcase
// ============================================================================

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const { t } = useLanguage();

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-[#060503]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060503] via-[#0a0705] to-[#060503]" />
        <motion.div
          className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-orange-500/10 blur-[150px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-amber-500/5 blur-[100px]"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* Language Switcher */}
      <div className="absolute top-24 right-4 sm:right-8 z-20">
        <LanguageSwitcher />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-300 to-amber-400">
            {t.hero.title}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-xl sm:text-2xl text-[#c9b89b] font-light italic"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-[#a8987a] leading-relaxed"
        >
          {t.hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-400 rounded-xl font-semibold text-[#0d0906] hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-500"
          >
            {t.hero.ctaConsultation}
          </Link>
          <a
            href="#services"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-[#f4efe6] border border-[#3a3530] hover:border-orange-500/50 hover:bg-orange-500/5 transition-all duration-300 text-center"
          >
            {t.hero.ctaView}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

function StatsSection() {
  const { t } = useLanguage();
  const stats = [
    { value: '7+', label: t.stats.serviceCategories },
    { value: '50+', label: t.stats.trainingPrograms },
    { value: '6', label: t.stats.deliveryFormats },
    { value: '6', label: t.stats.industriesServed },
  ];

  return (
    <section className="relative py-16 sm:py-20 border-y border-[#1a1815] bg-[#060503]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                {stat.value}
              </div>
              <div className="mt-2 text-xs sm:text-sm font-mono text-[#6f6160] uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState(t.services.categories[0].id);
  const activeService = t.services.categories.find((c) => c.id === activeCategory);

  return (
    <section id="services" className="relative py-20 sm:py-32 bg-[#060503] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-xs font-mono uppercase tracking-[0.3em] text-orange-400/70 mb-4">
            {t.services.label}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f4efe6]">
            {t.services.title}
          </h2>
          <p className="mt-6 text-base lg:text-lg text-[#a8987a]">
            {t.services.description}
          </p>
        </motion.div>

        {/* Category tabs - swipable on mobile */}
        <div className="mb-12 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex sm:flex-wrap sm:justify-center gap-2 sm:gap-3 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 scrollbar-hide">
            {t.services.categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-orange-500 text-[#0d0906]'
                    : 'bg-[#1a1815] text-[#a8987a] hover:bg-[#2a2520] hover:text-[#f4efe6]'
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>

        {/* Active category content */}
        <AnimatePresence mode="wait">
          {activeService && (
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-[#0d0a08] to-[#060503] rounded-2xl border border-[#1a1815] p-6 sm:p-8 lg:p-12"
            >
              <div className="mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-[#f4efe6]">{activeService.title}</h3>
                <p className="mt-1 text-sm text-orange-400 font-mono">{activeService.subtitle}</p>
                <p className="mt-4 text-[#a8987a] max-w-2xl">{activeService.description}</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {activeService.programs.map((program, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3 p-4 rounded-lg bg-[#0a0805] border border-[#1a1815]"
                  >
                    <div className="flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-orange-500" />
                    <span className="text-sm text-[#c9b89b]">{program}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function BootcampsSection() {
  const { t } = useLanguage();

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
            {t.bootcamps.label}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f4efe6]">{t.bootcamps.title}</h2>
          <p className="mt-6 text-base lg:text-lg text-[#a8987a]">
            {t.bootcamps.description}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.bootcamps.items.map((bootcamp, index) => (
            <motion.div
              key={bootcamp.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group p-6 rounded-xl bg-gradient-to-br from-[#0d0a08] to-[#060503] border border-[#1a1815] hover:border-orange-500/30 transition-all duration-500"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-orange-500/10 text-xs font-mono text-orange-400">
                  {bootcamp.duration}
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#f4efe6] group-hover:text-orange-300 transition-colors">
                {bootcamp.name}
              </h3>
              <p className="mt-2 text-sm text-[#6f6160]">{bootcamp.focus}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamBuildingSection() {
  const { t } = useLanguage();

  return (
    <section className="relative py-20 sm:py-32 bg-[#060503]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2a2520] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <span className="inline-block text-xs font-mono uppercase tracking-[0.3em] text-orange-400/70 mb-4">
              {t.teamBuilding.label}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f4efe6]">
              {t.teamBuilding.title}
            </h2>
            <p className="mt-6 text-[#a8987a] leading-relaxed">
              {t.teamBuilding.description}
            </p>

            <ul className="mt-8 space-y-4">
              {t.teamBuilding.activities.map((activity, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  <span className="text-[#c9b89b]">{activity}</span>
                </motion.li>
              ))}
            </ul>

            <Link
              href="/contact"
              className="mt-10 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-400 rounded-lg font-semibold text-[#0d0906] hover:shadow-lg hover:shadow-orange-500/25 transition-all"
            >
              {t.teamBuilding.ctaPlan}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {t.teamBuilding.values.map((item, i) => (
                <div
                  key={item.value}
                  className={`p-6 rounded-xl bg-gradient-to-br from-[#0d0a08] to-[#060503] border border-[#1a1815] ${
                    i % 2 === 1 ? 'translate-y-4' : ''
                  }`}
                >
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
                    <span className="text-xl">{item.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#f4efe6]">{item.value}</h3>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function IndustriesSection() {
  const { t } = useLanguage();

  return (
    <section className="relative py-20 sm:py-32 bg-gradient-to-b from-[#0a0805] to-[#060503]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-xs font-mono uppercase tracking-[0.3em] text-orange-400/70 mb-4">
            {t.industries.label}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f4efe6]">{t.industries.title}</h2>
          <p className="mt-6 text-base lg:text-lg text-[#a8987a]">
            {t.industries.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {t.industries.items.map((industry, index) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group p-6 rounded-xl bg-gradient-to-br from-[#0d0a08] to-[#060503] border border-[#1a1815] hover:border-orange-500/30 text-center transition-all duration-500"
            >
              <span className="text-3xl">{industry.icon}</span>
              <h3 className="mt-4 text-sm font-medium text-[#c9b89b] group-hover:text-[#f4efe6] transition-colors">
                {industry.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DeliveryFormatsSection() {
  const { t } = useLanguage();

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
            {t.delivery.label}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f4efe6]">{t.delivery.title}</h2>
          <p className="mt-6 text-base lg:text-lg text-[#a8987a]">
            {t.delivery.description}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.delivery.formats.map((format, index) => (
            <motion.div
              key={format.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 rounded-xl bg-gradient-to-br from-[#0d0a08] to-[#060503] border border-[#1a1815] hover:border-orange-500/30 transition-all duration-500"
            >
              <span className="text-3xl">{format.icon}</span>
              <h3 className="mt-4 text-lg font-bold text-[#f4efe6] group-hover:text-orange-300 transition-colors">
                {format.name}
              </h3>
              <p className="mt-2 text-sm text-[#6f6160]">{format.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConsultingSection() {
  const { t } = useLanguage();

  return (
    <section className="relative py-20 sm:py-32 bg-gradient-to-b from-[#060503] to-[#0a0805] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="order-2 lg:order-1 relative overflow-hidden"
          >
            <div className="absolute -top-4 -left-4 w-full h-full rounded-2xl bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/10" />
            <div className="relative bg-gradient-to-br from-[#1a1815] to-[#0d0a08] rounded-2xl p-8 border border-[#2a2520]">
              <div className="grid grid-cols-2 gap-4">
                {t.consulting.services.map((service, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-[#0a0805]">
                    <svg className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-[#c9b89b]">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="order-1 lg:order-2"
          >
            <span className="inline-block text-xs font-mono uppercase tracking-[0.3em] text-orange-400/70 mb-4">
              {t.consulting.label}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f4efe6]">
              {t.consulting.title}
            </h2>
            <p className="mt-6 text-[#a8987a] leading-relaxed">
              {t.consulting.description1}
            </p>
            <p className="mt-4 text-[#a8987a] leading-relaxed">
              {t.consulting.description2}
            </p>

            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-400 rounded-lg font-semibold text-[#0d0906] hover:shadow-lg hover:shadow-orange-500/25 transition-all"
            >
              {t.consulting.ctaSchedule}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const { t } = useLanguage();

  return (
    <section className="relative py-20 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d0906] via-orange-950/20 to-[#060503]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-orange-500/5 blur-[150px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f4efe6]">
            {t.cta.title}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
              {t.cta.highlight}
            </span>
            ?
          </h2>
          <p className="mt-8 text-base sm:text-lg text-[#a8987a] max-w-2xl mx-auto">
            {t.cta.description}
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-400 rounded-xl font-bold text-lg text-[#0d0906] hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-500"
            >
              {t.cta.ctaProposal}
            </Link>
            <Link
              href="mailto:hello@dogm.ai"
              className="w-full sm:w-auto px-10 py-5 rounded-xl font-semibold text-lg text-[#f4efe6] border border-[#3a3530] hover:border-orange-500/50 hover:bg-orange-500/5 transition-all duration-300 text-center"
            >
              hello@dogm.ai
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-[#6f6160]">
            {t.cta.benefits.map((item) => (
              <span key={item} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ElevarePageContent() {
  return (
    <main className="min-h-screen bg-[#060503] text-[#f4efe6] antialiased">
      <Header />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <BootcampsSection />
      <TeamBuildingSection />
      <IndustriesSection />
      <DeliveryFormatsSection />
      <ConsultingSection />
      <CTASection />
      <Footer />
    </main>
  );
}

export default function ElevareContent() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#060503]" />}>
      <LanguageProvider>
        <ElevarePageContent />
      </LanguageProvider>
    </Suspense>
  );
}
