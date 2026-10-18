import type { Metadata } from 'next';
import BentoItem from '../components/BentoItem';
import {
  SectionHeader,
  StatGrid,
  EnrollForm,
  PageLayout,
  PageHero,
} from '../components/ui';

export const metadata: Metadata = {
  title: 'Enroll Now | DOGM.AI Web Development Bootcamp Philippines',
  description:
    'Secure your seat in DOGM.AI Cohort 1. 20-week web development bootcamp, 25 seats only. PHP 40,000 full payment or PHP 9,000 x 5 months installment. 100% fully remote.',
  keywords: [
    'enroll coding bootcamp Philippines',
    'web development course enrollment',
    'DOGM.AI registration',
    'coding bootcamp tuition Philippines',
    'learn to code enrollment',
    'bootcamp payment plan',
    'PHP web development course',
    'remote coding bootcamp enrollment',
  ],
  alternates: { canonical: 'https://dogm.ai/enroll' },
  openGraph: {
    title: 'Enroll in DOGM.AI Cohort 1 - 25 Seats Only',
    description: 'Join the 20-week fundamentals-first web development bootcamp. 100% remote. PHP 40,000 full or PHP 9,000 x 5 installments. Limited to 25 learners.',
    url: 'https://dogm.ai/enroll',
    siteName: 'DOGM.AI',
    images: [{ url: '/imgs/og-image.png', width: 1200, height: 630, alt: 'Enroll in DOGM.AI Web Dev Bootcamp' }],
    locale: 'en_PH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enroll in DOGM.AI - Web Development Bootcamp Philippines',
    description: '20 weeks, 25 seats, 100% remote. PHP 40,000 full payment or installment plan available.',
    images: ['/imgs/og-image.png'],
  },
};

const offerSchema = {
  '@context': 'https://schema.org',
  '@type': 'Offer',
  name: 'DOGM.AI Web Development Bootcamp - Cohort 1',
  description: '20-week fundamentals-first web development bootcamp. 100% fully remote. Limited to 25 learners.',
  url: 'https://dogm.ai/enroll',
  priceCurrency: 'PHP',
  price: '40000',
  priceValidUntil: '2025-12-31',
  availability: 'https://schema.org/LimitedAvailability',
  itemOffered: {
    '@type': 'Course',
    name: 'DOGM.AI Web Development Bootcamp',
    provider: { '@type': 'Organization', name: 'DOGM.AI', url: 'https://dogm.ai' },
    courseMode: 'Online',
    educationalLevel: 'Beginner',
    numberOfCredits: 320,
    teaches: ['HTML', 'CSS', 'JavaScript', 'React', 'Full-Stack Development'],
  },
  seller: { '@type': 'Organization', name: 'DOGM.AI', url: 'https://dogm.ai' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dogm.ai' },
    { '@type': 'ListItem', position: 2, name: 'Enroll', item: 'https://dogm.ai/enroll' },
  ],
};

const PRICING_OPTIONS = [
  {
    label: 'Recommended',
    title: 'Full Payment',
    price: 'PHP 40,000',
    color: 'orange' as const,
    features: ['Save PHP 5,000 vs installment', 'One-time payment', 'Full access immediately'],
    footer: 'Best value for your investment',
  },
  {
    label: 'Flexible',
    title: '5-Month Installment',
    price: 'PHP 9,000',
    priceNote: '/mo',
    color: 'emerald' as const,
    features: ['PHP 45,000 total (5 payments)', 'Monthly payments', 'Same full program access'],
    footer: 'Spread the cost over time',
  },
];

const ENROLLMENT_STEPS = [
  { number: '01', title: 'Choose Your Plan', description: 'Pick full payment or the 5-month installment option.', footer: 'Both plans include the full program', color: 'orange' as const },
  { number: '02', title: 'Confirm Your Seat', description: 'We send a confirmation and enrollment packet after payment.', footer: 'Seats are first-come, first-served', color: 'emerald' as const },
  { number: '03', title: 'Get Ready', description: 'We help you set up your tools and prep before week one.', footer: 'Prep checklist sent to your email', color: 'blue' as const },
];

export default function EnrollPage() {
  return (
    <PageLayout
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Enroll' }]}
      jsonLd={[offerSchema, breadcrumbSchema]}
    >
      <PageHero
        id="enroll-heading"
        label="// ENROLL"
        title={<><span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-200 to-white">Secure Your</span>{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-300 to-amber-400">Seat.</span></>}
        description="DOGM.AI is capped at 25 learners per cohort. If you want in, secure your spot early."
        stats={[
          { value: 'Cohort 1', label: 'Now enrolling', color: 'orange' },
          { value: '20', label: 'Weeks', color: 'emerald' },
          { value: '25', label: 'Seats only', color: 'white' },
          { value: '100%', label: 'Fully Remote', color: 'white' },
        ]}
        sidePanel={
          <div className="group hover:bg-gradient-to-br hover:from-emerald-500/[0.03] hover:to-transparent transition-all duration-500 -m-6 sm:-m-8 lg:-m-10 p-6 sm:p-8 lg:p-10 h-full flex flex-col justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 flex items-center justify-center group-hover:from-emerald-500/30 group-hover:border-emerald-400/50 group-hover:shadow-lg group-hover:shadow-emerald-500/10 transition-all duration-300">
                <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-xs font-mono uppercase tracking-[0.25em] text-slate-500 group-hover:text-emerald-400/70 transition-colors duration-300">Quick Take</p>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold font-sans group-hover:text-emerald-200 transition-colors duration-300">Early Bird</h3>
              <p className="mt-2 text-sm text-slate-400 font-mono group-hover:text-slate-300 transition-colors duration-300">Full payment saves PHP 5,000. Early bird ends Feb 28.</p>
            </div>
          </div>
        }
      />

      {/* Pricing Section */}
      <section aria-labelledby="pricing-heading">
        <div className="bento-grid grid grid-cols-1 gap-0 sm:grid-cols-2">
          <BentoItem className="bg-transparent p-6 sm:p-8 lg:p-12 min-h-[200px] flex flex-col justify-center sm:col-span-2">
            <SectionHeader label="// PRICING OPTIONS" />
            <h2 id="pricing-heading" className="text-3xl font-bold font-sans">Choose Your Payment Plan</h2>
            <p className="mt-4 text-slate-400 font-mono text-sm max-w-2xl">Same program. Same curriculum. Pick the payment option that works for you.</p>
          </BentoItem>

          {PRICING_OPTIONS.map((option, index) => (
            <BentoItem
              key={option.title}
              showBottomBorder
              showRightBorder={index === 1}
              className={`bg-transparent p-6 sm:p-8 lg:p-10 min-h-[320px] flex flex-col justify-between group hover:bg-gradient-to-br hover:from-${option.color}-500/[0.03] hover:to-transparent transition-all duration-500`}
            >
              <div>
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-${option.color}-500/20 to-${option.color}-600/10 border border-${option.color}-500/30 flex items-center justify-center mb-6 group-hover:from-${option.color}-500/30 group-hover:border-${option.color}-400/50 group-hover:shadow-lg group-hover:shadow-${option.color}-500/10 transition-all duration-300`}>
                  <svg className={`w-7 h-7 text-${option.color}-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {option.color === 'orange' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    )}
                  </svg>
                </div>
                <p className={`text-xs font-mono uppercase tracking-[0.25em] text-${option.color}-400 mb-2`}>{option.label}</p>
                <h3 className={`text-2xl font-bold font-sans mb-2 group-hover:text-${option.color}-200 transition-colors duration-300`}>{option.title}</h3>
                <p className={`text-4xl font-bold font-sans text-${option.color}-400 mb-4`}>
                  {option.price}{option.priceNote && <span className="text-lg text-slate-400">{option.priceNote}</span>}
                </p>
                <ul className="text-slate-400 text-sm font-mono space-y-2 group-hover:text-slate-300 transition-colors duration-300">
                  {option.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full bg-${option.color}-400`}></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-slate-500 font-mono text-xs mt-4">{option.footer}</p>
            </BentoItem>
          ))}
        </div>
      </section>

      {/* Enrollment Steps */}
      <section aria-labelledby="enrollment-steps-heading">
        <div className="bento-grid grid grid-cols-1 gap-0 sm:grid-cols-3">
          <BentoItem className="bg-transparent p-6 sm:p-8 lg:p-12 min-h-[200px] flex flex-col justify-center sm:col-span-3">
            <SectionHeader label="// ENROLLMENT STEPS" />
            <h2 id="enrollment-steps-heading" className="text-3xl font-bold font-sans">Three Simple Steps</h2>
            <p className="mt-4 text-slate-400 font-mono text-sm max-w-2xl">From choosing your plan to being ready for week one</p>
          </BentoItem>

          {ENROLLMENT_STEPS.map((step, index) => (
            <BentoItem
              key={step.number}
              showBottomBorder
              showRightBorder={index === 2}
              className={`bg-transparent p-6 sm:p-8 lg:p-10 min-h-[240px] flex flex-col justify-between group hover:bg-gradient-to-br hover:from-${step.color}-500/[0.03] hover:to-transparent transition-all duration-500`}
            >
              <div>
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-${step.color}-500/20 to-${step.color}-600/10 border border-${step.color}-500/30 flex items-center justify-center mb-6 group-hover:from-${step.color}-500/30 group-hover:border-${step.color}-400/50 group-hover:shadow-lg group-hover:shadow-${step.color}-500/10 transition-all duration-300`}>
                  <span className={`text-${step.color}-400 font-bold font-mono text-base`}>{step.number}</span>
                </div>
                <h3 className={`text-2xl font-bold font-sans group-hover:text-${step.color}-200 transition-colors duration-300`}>{step.title}</h3>
                <p className="mt-3 text-slate-400 font-mono text-sm max-w-md leading-relaxed group-hover:text-slate-300 transition-colors duration-300">{step.description}</p>
              </div>
              <p className="text-slate-500 font-mono text-xs">{step.footer}</p>
            </BentoItem>
          ))}
        </div>
      </section>

      {/* Enrollment Form */}
      <section aria-labelledby="application-form-heading">
        <div className="bento-grid grid grid-cols-1 gap-0 lg:grid-cols-3">
          <BentoItem className="bg-transparent p-6 sm:p-8 lg:p-12 min-h-[320px] flex flex-col justify-between lg:col-span-2">
            <div>
              <SectionHeader label="// ENROLLMENT FORM" />
              <h2 id="application-form-heading" className="text-4xl font-bold font-sans">Apply for Cohort 1</h2>
              <p className="mt-4 text-slate-300 font-mono text-sm max-w-2xl leading-relaxed">Share your details and we will reach out with next steps within 1-2 business days.</p>
            </div>
            <EnrollForm />
          </BentoItem>

          <BentoItem showRightBorder className="bg-transparent p-6 sm:p-8 lg:p-10 min-h-[320px] flex flex-col justify-between group hover:bg-gradient-to-br hover:from-white/[0.02] hover:to-transparent transition-all duration-500">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-slate-700 flex items-center justify-center group-hover:border-slate-600 group-hover:shadow-lg group-hover:shadow-white/5 transition-all duration-300">
                  <svg className="w-7 h-7 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-xs font-mono uppercase tracking-[0.25em] text-slate-500">What we need</p>
              </div>
              <h3 className="text-2xl font-bold font-sans group-hover:text-white transition-colors duration-300">Standard Info</h3>
              <p className="mt-3 text-sm text-slate-400 font-mono max-w-md leading-relaxed group-hover:text-slate-300 transition-colors duration-300">Contact details, experience level, and payment preference.</p>
            </div>
            <div className="mt-6 bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 p-5 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm font-mono text-slate-300 leading-relaxed">This is a signal of interest. We confirm seats after payment.</p>
              </div>
            </div>
          </BentoItem>
        </div>
      </section>
    </PageLayout>
  );
}
