import type { Metadata } from 'next';
import BentoItem from '../components/BentoItem';
import {
  SectionHeader,
  StatGrid,
  PageLayout,
  PageHero,
  CtaSection,
} from '../components/ui';

export const metadata: Metadata = {
  title: 'Cohort Schedule & Remote Format | DOGM.AI Web Dev Bootcamp Philippines',
  description:
    'Join DOGM.AI\'s 100% fully remote web development bootcamp. 20 weeks, 25 seats per cohort. Live sessions Mon-Thu 7-9:30 PM + Saturday deep-dives 9 AM-3 PM. Apply now.',
  keywords: [
    'remote coding bootcamp Philippines',
    'online web development course',
    'live coding classes Manila',
    'part-time bootcamp Philippines',
    'evening coding classes',
    'weekend coding bootcamp',
    'DOGM.AI cohort',
    'learn programming online Philippines',
  ],
  alternates: { canonical: 'https://dogm.ai/cohorts' },
  openGraph: {
    title: 'DOGM.AI Cohorts - 100% Fully Remote Web Dev Bootcamp',
    description: 'Live remote sessions Mon-Thu evenings + Saturday deep-dives. 20 weeks of fundamentals-first learning. 25 seats per cohort. Join from anywhere in the Philippines.',
    url: 'https://dogm.ai/cohorts',
    siteName: 'DOGM.AI',
    images: [{ url: '/imgs/og-image.png', width: 1200, height: 630, alt: 'DOGM.AI Remote Coding Bootcamp' }],
    locale: 'en_PH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DOGM.AI Cohorts - 100% Remote Bootcamp Philippines',
    description: 'Live remote sessions from anywhere in PH. 20 weeks, 25 seats. Mon-Thu evenings + Saturday deep-dives.',
    images: ['/imgs/og-image.png'],
  },
};

const courseInstanceSchema = {
  '@context': 'https://schema.org',
  '@type': 'CourseInstance',
  name: 'DOGM.AI Web Development Bootcamp - Cohort 1',
  description: '20-week fundamentals-first web development bootcamp. 100% fully remote with live sessions.',
  courseMode: 'Online',
  courseWorkload: 'P20W',
  instructor: { '@type': 'Organization', name: 'DOGM.AI', url: 'https://dogm.ai' },
  offers: { '@type': 'Offer', price: '40000', priceCurrency: 'PHP', availability: 'https://schema.org/LimitedAvailability', validFrom: '2025-01-01' },
  location: { '@type': 'VirtualLocation', url: 'https://dogm.ai' },
  maximumAttendeeCapacity: 25,
  eventSchedule: [
    { '@type': 'Schedule', byDay: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], startTime: '19:00', endTime: '21:30', scheduleTimezone: 'Asia/Manila' },
    { '@type': 'Schedule', byDay: 'Saturday', startTime: '09:00', endTime: '15:00', scheduleTimezone: 'Asia/Manila' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dogm.ai' },
    { '@type': 'ListItem', position: 2, name: 'Cohorts', item: 'https://dogm.ai/cohorts' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Is the DOGM.AI bootcamp fully remote?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, DOGM.AI is 100% fully remote. All sessions are conducted via live video. You can join from anywhere in the Philippines with a stable internet connection.' } },
    { '@type': 'Question', name: 'What is the weekly schedule for DOGM.AI?', acceptedAnswer: { '@type': 'Answer', text: 'Classes are held Monday to Thursday from 7:00 PM to 9:30 PM, plus Saturday deep-dives from 9:00 AM to 3:00 PM. All sessions are live and interactive.' } },
    { '@type': 'Question', name: 'How many students are in each DOGM.AI cohort?', acceptedAnswer: { '@type': 'Answer', text: 'Each cohort is limited to 25 seats to ensure personalized attention and quality instruction.' } },
    { '@type': 'Question', name: 'Do I need coding experience to join?', acceptedAnswer: { '@type': 'Answer', text: 'No coding experience required. We start from zero. If you can use a computer and browser, you\'re ready. What matters is your commitment to learning.' } },
  ],
};

const REQUIREMENTS = [
  'Laptop (Mac or Windows, at least 8GB RAM)',
  'Stable internet connection for live video sessions',
  'Quiet space for focused learning',
  '20-22 hours per week commitment (classes + practice)',
  'Willingness to struggle through hard problems',
];

export default function CohortsPage() {
  return (
    <PageLayout
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Cohorts' }]}
      jsonLd={[courseInstanceSchema, breadcrumbSchema, faqSchema]}
    >
      <PageHero
        id="cohorts-heading"
        label="// 100% FULLY REMOTE"
        title={<><span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-200 to-white">Learn From Anywhere.</span>{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-300 to-amber-400">Build Together.</span></>}
        description="All sessions are live and remote. Join from anywhere in the Philippines with a stable internet connection. No commute. No location restrictions."
        subdescription="Same curriculum. Same no-BS approach. One cohort, fully committed to fundamentals-first learning."
        stats={[
          { value: '1', label: 'Active cohort', color: 'orange' },
          { value: '25', label: 'Seats available', color: 'emerald' },
          { value: '20', label: 'Weeks total', color: 'white' },
          { value: '100%', label: 'Fully remote', color: 'white' },
        ]}
      />

      {/* Cohort Details */}
      <section aria-labelledby="cohort-heading">
        <div className="bento-grid grid grid-cols-1 gap-0 lg:grid-cols-3">
          <BentoItem className="bg-transparent p-6 sm:p-8 lg:p-12 min-h-[280px] flex flex-col justify-between lg:col-span-3">
            <div>
              <SectionHeader label="// CURRENT COHORT" />
              <h2 id="cohort-heading" className="text-4xl font-bold font-sans mb-3">DOGM.AI Cohort 1</h2>
              <p className="text-slate-300 font-mono text-sm max-w-2xl">20-week fundamentals-first program. 100% fully remote. Applications now open.</p>
            </div>
          </BentoItem>

          <BentoItem className="bg-transparent p-6 sm:p-8 lg:p-10 min-h-[240px] flex flex-col justify-between group hover:bg-gradient-to-br hover:from-orange-500/[0.03] hover:to-transparent transition-all duration-500">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.25em] text-slate-500 mb-3 group-hover:text-orange-400/70 transition-colors duration-300">Duration</p>
              <h3 className="text-3xl font-bold font-sans mb-2 group-hover:text-orange-200 transition-colors duration-300">20 Weeks</h3>
              <p className="text-slate-400 font-mono text-sm group-hover:text-slate-300 transition-colors duration-300">Intensive learning • Real projects</p>
            </div>
          </BentoItem>

          <BentoItem className="bg-transparent p-6 sm:p-8 lg:p-10 min-h-[240px] flex flex-col justify-between group hover:bg-gradient-to-br hover:from-emerald-500/[0.03] hover:to-transparent transition-all duration-500">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.25em] text-slate-500 mb-3 group-hover:text-emerald-400/70 transition-colors duration-300">Seats Available</p>
              <h3 className="text-3xl font-bold font-sans mb-2 text-emerald-400 group-hover:drop-shadow-[0_0_15px_rgba(52,211,153,0.4)] transition-all duration-300">25 Seats</h3>
              <p className="text-slate-400 font-mono text-sm group-hover:text-slate-300 transition-colors duration-300">Limited availability</p>
            </div>
          </BentoItem>

          <BentoItem showRightBorder className="bg-transparent p-6 sm:p-8 lg:p-10 min-h-[240px] flex flex-col justify-between group hover:bg-gradient-to-br hover:from-white/[0.02] hover:to-transparent transition-all duration-500">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.25em] text-slate-500 mb-3 group-hover:text-orange-400/70 transition-colors duration-300">Format</p>
              <h3 className="text-xl font-bold font-sans mb-2 group-hover:text-white transition-colors duration-300">100% Remote</h3>
              <p className="text-slate-400 font-mono text-sm group-hover:text-slate-300 transition-colors duration-300">Live sessions via video<br />Join from anywhere in Philippines</p>
            </div>
          </BentoItem>

          <BentoItem showBottomBorder className="bg-transparent p-6 sm:p-8 lg:p-10 min-h-[200px] flex flex-col justify-between lg:col-span-2 group hover:bg-gradient-to-br hover:from-white/[0.02] hover:to-transparent transition-all duration-500">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.25em] text-slate-500 mb-3 group-hover:text-orange-400/70 transition-colors duration-300">What Makes This Different</p>
              <p className="text-slate-300 font-mono text-sm leading-relaxed group-hover:text-slate-200 transition-colors duration-300">Small cohort means personalized attention. Fully remote format gives you flexibility to join from anywhere. We focus on fundamentals, not shortcuts.</p>
            </div>
          </BentoItem>

          <BentoItem showBottomBorder showRightBorder className="bg-transparent p-6 sm:p-8 lg:p-10 min-h-[200px] flex items-center">
            <a href="/enroll" className="w-full bg-gradient-to-r from-orange-500 to-orange-400 text-black px-10 py-4 rounded-lg font-bold hover:from-orange-400 hover:to-amber-400 shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300 font-mono text-center focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-black">Enroll Now →</a>
          </BentoItem>
        </div>
      </section>

      {/* Weekly Schedule */}
      <section>
        <div className="bento-grid grid grid-cols-1 gap-0 sm:grid-cols-2">
          <BentoItem className="bg-transparent p-6 sm:p-8 lg:p-12 min-h-[200px] flex flex-col justify-center sm:col-span-2">
            <SectionHeader label="// WEEKLY SCHEDULE" />
            <h2 className="text-3xl font-bold font-sans mb-2">100% Live Remote Sessions</h2>
            <p className="text-slate-400 font-mono text-sm max-w-2xl">All sessions conducted via live video. Here's how the weekly schedule works.</p>
          </BentoItem>

          <BentoItem showBottomBorder className="bg-transparent p-6 sm:p-8 lg:p-10 min-h-[260px] flex flex-col justify-between group hover:bg-gradient-to-br hover:from-orange-500/[0.03] hover:to-transparent transition-all duration-500">
            <div>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 flex items-center justify-center mb-6 group-hover:from-orange-500/30 group-hover:border-orange-400/50 group-hover:shadow-lg group-hover:shadow-orange-500/10 transition-all duration-300">
                <svg className="w-7 h-7 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold font-sans mb-2 group-hover:text-orange-200 transition-colors duration-300">Monday - Thursday</h3>
              <p className="text-slate-400 font-mono text-sm mb-4 group-hover:text-slate-300 transition-colors duration-300">Live remote sessions • 7:00 PM - 9:30 PM</p>
              <p className="text-slate-500 font-mono text-xs">Interactive lectures, code-alongs, Q&A. Recordings available if you miss.</p>
            </div>
          </BentoItem>

          <BentoItem showBottomBorder showRightBorder className="bg-transparent p-6 sm:p-8 lg:p-10 min-h-[260px] flex flex-col justify-between group hover:bg-gradient-to-br hover:from-emerald-500/[0.03] hover:to-transparent transition-all duration-500">
            <div>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 flex items-center justify-center mb-6 group-hover:from-emerald-500/30 group-hover:border-emerald-400/50 group-hover:shadow-lg group-hover:shadow-emerald-500/10 transition-all duration-300">
                <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold font-sans mb-2 group-hover:text-emerald-200 transition-colors duration-300">Saturday Deep-Dive</h3>
              <p className="text-slate-400 font-mono text-sm mb-4 group-hover:text-slate-300 transition-colors duration-300">Live remote sessions • 9:00 AM - 3:00 PM</p>
              <p className="text-slate-500 font-mono text-xs">Hands-on labs, pair programming, project work. Build together online.</p>
            </div>
          </BentoItem>
        </div>
      </section>

      {/* Requirements */}
      <section>
        <div className="bento-grid grid grid-cols-1 gap-0">
          <BentoItem className="bg-transparent p-6 sm:p-10 lg:p-14 min-h-[400px] flex flex-col justify-between">
            <div>
              <SectionHeader label="// REQUIREMENTS" />
              <h2 className="text-4xl font-bold font-sans mb-6">Is This For You?</h2>
              <div className="space-y-6 text-slate-300 font-mono text-sm max-w-3xl">
                <div>
                  <p className="text-white font-bold mb-4">You'll need:</p>
                  <ul className="space-y-3">
                    {REQUIREMENTS.map((req) => (
                      <li key={req} className="flex items-center gap-3 group">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 group-hover:bg-orange-300 transition-colors duration-300"></span>
                        <span className="group-hover:text-white transition-colors duration-300">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 p-6 rounded-lg mt-8 hover:border-emerald-400/40 transition-colors duration-300">
                  <div className="flex items-start gap-3">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                      <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-bold mb-1">No coding experience required</p>
                      <p className="text-slate-400">We start from zero. If you can use a computer and browser, you're ready. What matters is your commitment to learning.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BentoItem>
        </div>
      </section>

      {/* Questions CTA */}
      <section>
        <div className="bento-grid grid grid-cols-1 gap-0 sm:grid-cols-2">
          <BentoItem showBottomBorder className="bg-transparent p-6 sm:p-8 lg:p-10 min-h-[200px] flex flex-col justify-center group hover:bg-gradient-to-br hover:from-white/[0.02] hover:to-transparent transition-all duration-500">
            <div>
              <p className="text-slate-500 font-mono text-sm mb-2 group-hover:text-slate-400 transition-colors duration-300">Questions about the program?</p>
              <a href="/contact" className="text-xl font-bold font-mono hover:text-orange-400 transition-colors duration-300 inline-flex items-center gap-2 group-hover:gap-3">
                Talk to us <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </BentoItem>

          <BentoItem showBottomBorder showRightBorder className="bg-transparent p-6 sm:p-8 lg:p-10 min-h-[200px] flex flex-col justify-center group hover:bg-gradient-to-br hover:from-orange-500/[0.03] hover:to-transparent transition-all duration-500">
            <div>
              <p className="text-slate-500 font-mono text-sm mb-2 group-hover:text-orange-400/70 transition-colors duration-300">Ready to join?</p>
              <a href="/enroll" className="text-xl font-bold font-mono hover:text-orange-400 transition-colors duration-300 inline-flex items-center gap-2 group-hover:gap-3">
                Start enrollment <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </BentoItem>
        </div>
      </section>
    </PageLayout>
  );
}
