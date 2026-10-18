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
  title: 'Curriculum - 20-Week Web Development Program | DOGM.AI Bootcamp Philippines',
  description:
    'Complete 20-week DOGM.AI curriculum. 4 phases, 4 real projects, 320 hours. Learn JavaScript, React, Node.js, PostgreSQL. Fundamentals-first with AI-assisted learning. See the full breakdown.',
  keywords: ['coding curriculum', 'web development course outline', 'react bootcamp curriculum', 'full stack course philippines', 'javascript course syllabus'],
  openGraph: {
    title: 'DOGM.AI Curriculum - What You Actually Learn in 20 Weeks',
    description: 'Complete breakdown of our fundamentals-first curriculum. 4 real projects, 320+ hours of learning. From zero to building and deploying full-stack applications.',
    images: ['/imgs/og-image.png'],
    url: 'https://dogm.ai/curriculum',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DOGM.AI Full 20-Week Curriculum',
    description: 'Fundamentals first. 4 real projects. From zero to full-stack. See the complete breakdown.',
    images: ['/imgs/og-image.png'],
  },
  alternates: { canonical: 'https://dogm.ai/curriculum' },
};

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'DOGM.AI 20-Week Web Development Curriculum',
  description: 'Complete 20-week web development bootcamp curriculum covering JavaScript, React, Node.js, and PostgreSQL with AI-assisted learning methodology.',
  provider: { '@type': 'Organization', name: 'DOGM.AI', url: 'https://dogm.ai' },
  courseCode: 'DOGM-WD-001',
  numberOfCredits: 320,
  educationalLevel: 'Beginner',
  timeRequired: 'P20W',
  teaches: ['HTML & CSS', 'JavaScript Fundamentals', 'React Components', 'State Management', 'Node.js Backend', 'PostgreSQL Database', 'REST API Design', 'Git Version Control', 'Web Deployment'],
  hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online', courseSchedule: { '@type': 'Schedule', repeatFrequency: 'Weekly', byDay: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Saturday'] } },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dogm.ai' },
    { '@type': 'ListItem', position: 2, name: 'Curriculum', item: 'https://dogm.ai/curriculum' },
  ],
};

const PHASES = [
  { number: '01', weeks: 'Weeks 1-4', title: 'The Foundations', description: 'HTML, CSS, JavaScript — by hand. No frameworks. No shortcuts. No AI crutches.', items: ['What is code, really?', 'How browsers work', 'Building layouts from scratch', 'JavaScript fundamentals', 'Git and version control'], outcome: 'Your first live website', color: 'orange' as const },
  { number: '02', weeks: 'Weeks 5-10', title: 'Interactive Apps', description: 'React components, state management, and building UIs that actually do things.', items: ['Component thinking', 'State and props', 'Handling user input', 'Routing and navigation', 'Working with APIs'], outcome: 'Interactive web app', color: 'orange' as const },
  { number: '03', weeks: 'Weeks 11-15', title: 'Backend Power', description: 'Databases, authentication, APIs. The stuff that makes apps actually useful.', items: ['Server-side programming', 'Database design', 'REST APIs', 'User authentication', 'Data relationships'], outcome: 'Full-stack prototype', color: 'orange' as const },
  { number: '04', weeks: 'Weeks 16-20', title: 'Ship It', description: 'Your capstone project. Plan it, build it, debug it, deploy it. This is the real test.', items: ['Planning your app', 'Building complete features', 'Deploying online', 'Performance optimization', 'Portfolio presentation'], outcome: 'Live app you built', color: 'emerald' as const, highlight: true },
];

const TECH_STACK = [
  { abbr: 'JS', name: 'JavaScript', desc: 'The language of the web', detail: "Not TypeScript first. Raw JavaScript so you understand what's actually happening." },
  { abbr: 'RE', name: 'React', desc: 'Build modern UIs', detail: 'The most popular frontend framework. Learn it properly and pick up any other.' },
  { abbr: 'NX', name: 'Next.js', desc: 'Full-stack framework', detail: 'Build complete web apps with routing, server features, and API connections.' },
  { abbr: 'ND', name: 'Node.js', desc: 'Server-side JavaScript', detail: 'Write backend logic in the same language as your frontend.' },
  { abbr: 'PG', name: 'PostgreSQL', desc: 'Production database', detail: 'A real database used by real companies. Design schemas, write queries.' },
  { abbr: 'GT', name: 'Git + Deploy', desc: 'Ship your code', detail: 'Version control and deployment from day one. Every project lives online.' },
];

const AI_PHASES = [
  { weeks: 'Weeks 1-4', title: 'No AI', description: "You write every line by hand. No exceptions. If you don't understand the fundamentals, AI will cripple you.", color: 'red', icon: '✗' },
  { weeks: 'Weeks 5-10', title: 'AI as Study Partner', description: 'AI explains concepts, debugs errors, suggests improvements. But you still write the code. AI is your tutor, not your ghostwriter.', color: 'orange', icon: '◐' },
  { weeks: 'Weeks 11-20', title: 'Strategic AI Use', description: "Now you can leverage AI properly. Generate boilerplate, speed up repetitive tasks, explore patterns. Because you understand what it's doing.", color: 'emerald', icon: '✓' },
];

export default function CurriculumPage() {
  return (
    <PageLayout
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Curriculum' }]}
      jsonLd={[courseSchema, breadcrumbSchema]}
    >
      <PageHero
        id="curriculum-heading"
        label="// THE CURRICULUM"
        title={<>Here's Exactly What You'll <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-300 to-amber-400">Learn</span></>}
        description={<>20 weeks. No fluff. No "we'll figure it out later." Every week has a specific outcome you can <em className="text-orange-300/80 not-italic">see</em> and <em className="text-orange-300/80 not-italic">build</em>.</>}
        subdescription="If a week ends and you haven't built something real, we failed you. That's our promise."
        stats={[
          { value: '20', label: 'Weeks of building', color: 'orange' },
          { value: '4', label: 'Major phases', color: 'emerald' },
          { value: '4', label: 'Real projects', color: 'white' },
          { value: '320', label: 'Total hours', color: 'white' },
        ]}
        statsSize="md"
        sidePanel={
          <>
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-slate-500">The Goal</p>
            <div className="mt-2">
              <h3 className="text-2xl font-bold font-sans">Build Real Apps</h3>
              <p className="mt-2 text-sm text-slate-400 font-mono">By week 20, you deploy a working web application online. Real projects you can show.</p>
            </div>
          </>
        }
      />

      {/* Real Talk */}
      <section aria-labelledby="reality-heading">
        <div className="bento-grid grid grid-cols-1 gap-0 sm:grid-cols-2">
          <BentoItem className="bg-transparent p-6 sm:p-8 lg:p-12 min-h-[300px] flex flex-col justify-between sm:col-span-2">
            <div>
              <SectionHeader label="// REAL TALK" />
              <h2 id="reality-heading" className="text-4xl font-bold mb-6 font-sans">What Nobody Tells You About Learning To Code</h2>
              <p className="text-lg text-slate-300 font-mono mb-4">Most bootcamps promise you'll be "job-ready" in 12 weeks. That's a lie.</p>
              <p className="text-slate-300 font-mono text-sm max-w-3xl leading-relaxed">Learning to code is hard. Your brain has to completely rewire itself. You will spend hours stuck on bugs that make no sense. You will question if you're cut out for this. You will want to quit.</p>
              <p className="text-slate-300 font-mono text-sm max-w-3xl leading-relaxed mt-4">We take 20 weeks because that's how long it <em>actually</em> takes to learn fundamentals deeply enough to build real applications. Anyone who tells you otherwise is either lying or selling you garbage.</p>
            </div>
          </BentoItem>
        </div>
      </section>

      {/* The 4 Phases */}
      <section aria-labelledby="phases-heading">
        <div className="bento-grid grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4">
          <BentoItem className="bg-transparent p-6 sm:p-8 lg:p-12 min-h-[240px] flex flex-col justify-between sm:col-span-2 lg:col-span-4">
            <div>
              <SectionHeader label="// THE 4 PHASES" />
              <h2 id="phases-heading" className="text-4xl font-bold font-sans">The Journey From Zero To Deployed</h2>
              <p className="mt-4 text-slate-300 font-mono text-sm">Each phase ends with something you built. Not a tutorial you followed. Not code AI generated for you. Something <em>you</em> made.</p>
            </div>
          </BentoItem>

          {PHASES.map((phase, index) => (
            <BentoItem
              key={phase.number}
              showRightBorder={index === 3}
              className={`bg-transparent p-6 sm:p-8 lg:p-10 min-h-[360px] flex flex-col justify-between group hover:bg-gradient-to-br hover:from-${phase.color}-500/[0.03] hover:to-transparent transition-all duration-500`}
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-${phase.color}-500/20 to-${phase.color}-600/10 border border-${phase.color}-500/30 flex items-center justify-center group-hover:from-${phase.color}-500/30 group-hover:border-${phase.color}-400/50 group-hover:shadow-lg group-hover:shadow-${phase.color}-500/10 transition-all duration-300`}>
                    <span className={`text-${phase.color}-400 font-bold font-mono text-base`}>{phase.number}</span>
                  </div>
                  <p className={`text-xs font-mono uppercase tracking-[0.25em] text-slate-500 group-hover:text-${phase.color}-400/70 transition-colors duration-300`}>{phase.weeks}</p>
                </div>
                <h3 className={`text-2xl font-bold font-sans group-hover:text-${phase.color}-200 transition-colors duration-300`}>{phase.title}</h3>
                <p className="mt-3 text-slate-400 font-mono text-sm mb-4 group-hover:text-slate-300 transition-colors duration-300">{phase.description}</p>
                <ul className="text-slate-400 text-xs font-mono space-y-2 group-hover:text-slate-300 transition-colors duration-300">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full bg-${phase.color}-400`}></span>{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`mt-4 ${phase.highlight ? 'bg-emerald-500/15 border-2 border-emerald-400' : 'bg-emerald-500/10 border border-emerald-500/30'} p-3 rounded-lg group-hover:bg-emerald-500/15 group-hover:border-emerald-400/40 transition-all duration-300`}>
                <p className={`text-emerald-400 font-mono text-xs font-bold flex items-center gap-2 ${phase.highlight ? 'group-hover:text-emerald-300' : ''} transition-colors duration-300`}>
                  <span className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center text-[10px]">✓</span>
                  Outcome: {phase.outcome}
                </p>
              </div>
            </BentoItem>
          ))}
        </div>
      </section>

      {/* Weekly Schedule */}
      <section aria-labelledby="weekly-heading">
        <div className="bento-grid grid grid-cols-1 gap-0 sm:grid-cols-2">
          <BentoItem className="bg-transparent p-6 sm:p-8 lg:p-12 min-h-[260px] flex flex-col justify-between sm:col-span-2">
            <div>
              <SectionHeader label="// WEEKLY SCHEDULE" />
              <h2 id="weekly-heading" className="text-4xl font-bold font-sans">What A Week Actually Looks Like</h2>
              <p className="mt-4 text-slate-300 font-mono text-sm">No vague "self-paced learning." Every week has structure, live instruction, and actual deadlines.</p>
            </div>
          </BentoItem>

          <BentoItem className="bg-transparent p-6 sm:p-8 lg:p-10 min-h-[280px] flex flex-col justify-between group hover:bg-gradient-to-br hover:from-orange-500/[0.03] hover:to-transparent transition-all duration-500">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 flex items-center justify-center group-hover:from-orange-500/30 group-hover:border-orange-400/50 group-hover:shadow-lg group-hover:shadow-orange-500/10 transition-all duration-300">
                  <span className="text-orange-400 text-xl">💻</span>
                </div>
                <p className="text-xs font-mono uppercase tracking-[0.25em] text-slate-500 group-hover:text-orange-400/70 transition-colors duration-300">Monday-Thursday</p>
              </div>
              <h3 className="text-2xl font-bold mb-3 font-sans group-hover:text-orange-200 transition-colors duration-300">Weekday Sessions</h3>
              <p className="text-white font-semibold mb-2">7:00 PM - 9:30 PM</p>
              <p className="text-slate-400 text-sm font-mono mb-4 group-hover:text-slate-300 transition-colors duration-300">Live remote instruction, code-alongs, debugging sessions. We teach, you code, we review.</p>
              <p className="text-slate-500 text-xs font-mono">Can't make it live? Recordings available. But live is better — ask questions immediately.</p>
            </div>
          </BentoItem>

          <BentoItem showRightBorder className="bg-transparent p-6 sm:p-8 lg:p-10 min-h-[280px] flex flex-col justify-between group hover:bg-gradient-to-br hover:from-emerald-500/[0.03] hover:to-transparent transition-all duration-500">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 flex items-center justify-center group-hover:from-emerald-500/30 group-hover:border-emerald-400/50 group-hover:shadow-lg group-hover:shadow-emerald-500/10 transition-all duration-300">
                  <span className="text-emerald-400 text-xl">🎯</span>
                </div>
                <p className="text-xs font-mono uppercase tracking-[0.25em] text-slate-500 group-hover:text-emerald-400/70 transition-colors duration-300">Saturday</p>
              </div>
              <h3 className="text-2xl font-bold mb-3 font-sans group-hover:text-emerald-200 transition-colors duration-300">Saturday Deep-Dive</h3>
              <p className="text-white font-semibold mb-2">9:00 AM - 3:00 PM</p>
              <p className="text-slate-400 text-sm font-mono mb-4 group-hover:text-slate-300 transition-colors duration-300">Hands-on project work, pair programming, code reviews, debugging help.</p>
              <p className="text-slate-500 text-xs font-mono">This is where the magic happens. Working together, getting unstuck in real-time.</p>
            </div>
          </BentoItem>

          <BentoItem showBottomBorder className="bg-transparent p-6 sm:p-8 lg:p-10 min-h-[200px] flex flex-col justify-between sm:col-span-2">
            <div>
              <h3 className="text-2xl font-bold mb-3 font-sans">Independent Practice</h3>
              <p className="text-slate-400 text-sm font-mono mb-4">Expect 4-6 hours of independent coding per week minimum. This is where skills become permanent.</p>
              <div className="bg-white/5 border border-slate-800 p-4 rounded-lg">
                <p className="text-slate-300 font-mono text-xs"><strong className="text-white">Reality check:</strong> If you're not willing to code on your own time, this program won't work for you. We can't learn for you.</p>
              </div>
            </div>
          </BentoItem>
        </div>
      </section>

      {/* Tech Stack */}
      <section aria-labelledby="tools-heading">
        <div className="bento-grid grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-3">
          <BentoItem className="bg-transparent p-6 sm:p-8 lg:p-12 min-h-[240px] flex flex-col justify-between sm:col-span-2 lg:col-span-3">
            <div>
              <SectionHeader label="// TECH STACK" />
              <h2 id="tools-heading" className="text-4xl font-bold font-sans">The Tools You'll Master</h2>
              <p className="mt-4 text-slate-300 font-mono text-sm">Industry-standard tools. Not because they're trendy. Because they work.</p>
            </div>
          </BentoItem>

          {TECH_STACK.map((tech, index) => (
            <BentoItem
              key={tech.abbr}
              showRightBorder={index === 5}
              className="bg-transparent p-6 sm:p-8 lg:p-10 min-h-[220px] flex flex-col justify-between group hover:bg-gradient-to-br hover:from-white/[0.02] hover:to-transparent transition-all duration-500"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-xl border border-slate-700 bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center font-mono text-sm text-slate-300 group-hover:border-orange-500/30 group-hover:from-orange-500/10 group-hover:to-orange-500/5 transition-all duration-300">{tech.abbr}</div>
                  <div>
                    <h3 className="text-xl font-bold font-sans group-hover:text-orange-200 transition-colors duration-300">{tech.name}</h3>
                    <p className="text-xs font-mono text-slate-500">{tech.desc}</p>
                  </div>
                </div>
                <p className="text-slate-400 font-mono text-sm group-hover:text-slate-300 transition-colors duration-300">{tech.detail}</p>
              </div>
            </BentoItem>
          ))}
        </div>
      </section>

      {/* AI Integration */}
      <section aria-labelledby="ai-role-heading">
        <div className="bento-grid grid grid-cols-1 gap-0 lg:grid-cols-3">
          <BentoItem className="bg-transparent p-6 sm:p-10 lg:p-14 min-h-[450px] flex flex-col justify-between lg:col-span-2">
            <div>
              <SectionHeader label="// AI INTEGRATION" />
              <h2 id="ai-role-heading" className="text-4xl font-bold mb-6 font-sans">When You Use AI (And When You Don't)</h2>
              <div className="space-y-6">
                {AI_PHASES.map((phase) => (
                  <div key={phase.weeks} className="flex gap-4">
                    <div className={`w-16 h-16 rounded-full bg-${phase.color}-500/10 border border-${phase.color}-500/30 flex items-center justify-center flex-shrink-0`}>
                      <span className={`text-${phase.color}-400 text-base`}>{phase.icon}</span>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-white">{phase.weeks}: {phase.title}</p>
                      <p className="mt-2 text-slate-400 font-mono text-sm">{phase.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </BentoItem>

          <BentoItem showRightBorder className="bg-transparent p-6 sm:p-8 lg:p-10 min-h-[450px] flex flex-col justify-center">
            <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-2 border-orange-500 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4 font-sans">The Difference</h3>
              <p className="text-lg text-slate-300 font-mono mb-4">By week 20, you can build with or without AI.</p>
              <p className="text-sm text-slate-400 font-mono">That's what makes you valuable. You're not dependent on the tool. You're <em className="text-orange-300 not-italic">empowered</em> by it.</p>
            </div>
          </BentoItem>
        </div>
      </section>

      <CtaSection
        headingId="cta-heading"
        title={<>This Is The Curriculum. <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">No Surprises.</span></>}
        description="20 weeks. Real projects. Real skills. If you're ready to do the work, we're ready to teach you."
        buttons={[
          { text: 'Enroll Now', href: '/enroll', variant: 'primary', label: 'Enroll in DOGM.AI Cohort 1' },
          { text: 'Still Have Questions?', href: '/contact', variant: 'secondary', label: 'Contact us with questions' },
        ]}
      />
    </PageLayout>
  );
}
