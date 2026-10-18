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
  title: 'Our Teaching System | DOGM.AI Web Development Bootcamp Philippines',
  description:
    "Discover DOGM.AI's three-pillar teaching methodology: live instruction, project-based learning, and strategic AI integration. 20 weeks to transform beginners into confident web developers.",
  keywords: [
    'coding bootcamp methodology',
    'live coding classes Philippines',
    'project-based web development',
    'AI-assisted programming education',
    'learn web development Philippines',
    'coding bootcamp teaching method',
    'fundamentals-first programming',
    'remote coding instruction',
  ],
  alternates: { canonical: 'https://dogm.ai/our-system' },
  openGraph: {
    title: 'How DOGM.AI Teaches - Live, Project-Based, AI-Enhanced',
    description: 'No buzzwords. No shortcuts. Three pillars: live instruction, real projects, and strategic AI use. Turn complete beginners into confident builders in 20 weeks.',
    url: 'https://dogm.ai/our-system',
    siteName: 'DOGM.AI',
    images: [{ url: '/imgs/og-image.png', width: 1200, height: 630, alt: 'DOGM.AI Teaching System' }],
    locale: 'en_PH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How DOGM.AI Actually Teaches Web Development',
    description: 'Live instruction + project-based learning + strategic AI = developers who understand fundamentals.',
    images: ['/imgs/og-image.png'],
  },
};

const educationalOrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'DOGM.AI',
  description: 'DOGM.AI is a web development bootcamp in the Philippines offering fundamentals-first education through live instruction, project-based learning, and strategic AI integration.',
  url: 'https://dogm.ai',
  logo: 'https://dogm.ai/imgs/logo.png',
  address: { '@type': 'PostalAddress', addressCountry: 'PH' },
  contactPoint: { '@type': 'ContactPoint', email: 'hello@dogm.ai', contactType: 'enrollment' },
  sameAs: ['https://www.facebook.com/profile.php?id=61585851908758'],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dogm.ai' },
    { '@type': 'ListItem', position: 2, name: 'Our System', item: 'https://dogm.ai/our-system' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How DOGM.AI Teaches Web Development',
  description: 'A 20-week structured approach to learning web development from zero to building real applications.',
  totalTime: 'P20W',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Live Instruction', text: 'Learn from real teachers in real-time through live remote sessions. Monday-Thursday evenings and Saturday deep-dives.' },
    { '@type': 'HowToStep', position: 2, name: 'Project-Based Learning', text: 'Build real applications every week. Complete 4 portfolio-ready projects by week 20.' },
    { '@type': 'HowToStep', position: 3, name: 'Strategic AI Integration', text: 'Learn fundamentals first (weeks 1-4), then use AI as a learning partner (weeks 5-10), and finally leverage AI strategically (weeks 11-20).' },
  ],
};

const PROBLEMS = [
  { title: 'Self-paced courses?', text: '97% of students never finish. No accountability. No structure. Easy to fall behind and give up.' },
  { title: 'Tutorial hell?', text: "You follow along, it works, but you can't build anything on your own. You never learned to think." },
  { title: 'Traditional bootcamps?', text: 'Move too fast, skip fundamentals, focus on job placement metrics over real learning.' },
];

const PILLARS = [
  { number: '01', title: 'Live Instruction', description: 'Real teachers, real-time. Not pre-recorded videos you watch alone.', items: ['Ask questions immediately', 'See concepts explained live', 'Learn with other students', 'Get unstuck in real-time'], footer: 'Mon-Thu 7PM + Sat 9AM · 100% Remote', color: 'orange' as const },
  { number: '02', title: 'Project-Based', description: 'You learn by building real things, not completing abstract exercises.', items: ['Every week builds something', 'Portfolio-ready projects', 'Real-world applications', 'Deployed online'], footer: '4 projects shipped by week 20', color: 'emerald' as const },
  { number: '03', title: 'Strategic AI Use', description: 'AI as your learning partner, not a crutch you depend on.', items: ['Fundamentals first (weeks 1-4)', 'AI as tutor (weeks 5-10)', 'Strategic leverage (weeks 11-20)', 'Build with or without it'], footer: 'Empowered, not dependent', color: 'blue' as const },
];

const SUPPORT_FEATURES = [
  { title: 'Live Mentors', description: 'Real developers who can answer your questions in real-time during sessions.', footer: 'Not chatbots or forums', color: 'orange' as const, icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
  { title: 'Cohort Community', description: 'Learn alongside 24 other students. Ask questions, share wins, debug together.', footer: 'Small groups build better', color: 'emerald' as const, icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  { title: 'Code Reviews', description: 'Get feedback on your code every week. Learn not just what works, but why.', footer: 'Improve your thinking', color: 'blue' as const, icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { title: 'Office Hours', description: 'Stuck on something specific? Book time with a mentor to work through it.', footer: 'No one left behind', color: 'white' as const, icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
];

const OUTCOMES = [
  { label: 'TECHNICAL SKILLS', text: 'Build full-stack web applications from scratch using modern tools and frameworks.' },
  { label: 'PROBLEM-SOLVING', text: "Debug errors, read documentation, figure things out when you're stuck." },
  { label: 'REAL PORTFOLIO', text: '4 deployed projects that prove you can build, not just follow tutorials.' },
  { label: 'AI FLUENCY', text: "Use AI strategically to build faster, not as a crutch you can't live without." },
];

export default function OurSystemPage() {
  return (
    <PageLayout
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Our System' }]}
      jsonLd={[educationalOrganizationSchema, breadcrumbSchema, howToSchema]}
    >
      <PageHero
        id="system-heading"
        label="// HOW WE TEACH"
        title={<><span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-200 to-white">The System</span>{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-300 to-amber-400">Behind The Learning</span></>}
        description="Most bootcamps throw you a bunch of videos and wish you luck. We built a system that actually works."
        subdescription={`This isn't some "revolutionary learning framework" with a clever acronym. It's just deliberate teaching designed to get you from zero to building real apps in 20 weeks.`}
        stats={[
          { value: 'Live', label: 'Not recorded', color: 'orange' },
          { value: 'Structured', label: 'Not self-paced', color: 'emerald' },
          { value: 'Hands-on', label: 'Not theory-heavy', color: 'white' },
          { value: 'Real', label: 'Not simulated', color: 'white' },
        ]}
        sidePanel={
          <div className="group hover:bg-gradient-to-br hover:from-orange-500/[0.03] hover:to-transparent transition-all duration-500 -m-6 sm:-m-8 lg:-m-10 p-6 sm:p-8 lg:p-10 h-full flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 flex items-center justify-center group-hover:from-orange-500/30 group-hover:border-orange-400/50 transition-all duration-300">
                <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="text-xs font-mono uppercase tracking-[0.25em] text-slate-500 group-hover:text-orange-400/70 transition-colors duration-300">The Point</p>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold font-sans group-hover:text-orange-200 transition-colors duration-300">Build Every Week</h3>
              <p className="mt-2 text-sm text-slate-400 font-mono group-hover:text-slate-300 transition-colors duration-300">You learn by building. Everything else supports that goal.</p>
            </div>
          </div>
        }
      />

      {/* Problem Section */}
      <section aria-labelledby="problem-heading">
        <div className="bento-grid grid grid-cols-1 gap-0 sm:grid-cols-2">
          <BentoItem className="bg-transparent p-6 sm:p-8 lg:p-12 min-h-[350px] flex flex-col justify-between sm:col-span-2">
            <div>
              <SectionHeader label="// THE PROBLEM WE SOLVE" />
              <h2 id="problem-heading" className="text-4xl font-bold mb-6 font-sans">Why Traditional Learning Fails For Coding</h2>
              <p className="text-lg text-slate-300 font-mono mb-4">Most people who try to learn coding quit. Not because they're not smart enough. Because the traditional paths are broken.</p>
              <div className="space-y-4">
                {PROBLEMS.map((problem) => (
                  <div key={problem.title} className="bg-white/5 border border-slate-800 p-4 rounded-lg">
                    <p className="text-slate-300 font-mono text-sm"><strong className="text-white">{problem.title}</strong> {problem.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </BentoItem>
        </div>
      </section>

      {/* Three Pillars */}
      <section aria-labelledby="method-heading">
        <div className="bento-grid grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-3">
          <BentoItem className="bg-transparent p-6 sm:p-8 lg:p-12 min-h-[240px] flex flex-col justify-between sm:col-span-2 lg:col-span-3">
            <div>
              <SectionHeader label="// OUR METHOD" />
              <h2 id="method-heading" className="text-4xl font-bold font-sans">The Three Pillars That Make It Work</h2>
              <p className="mt-4 text-slate-300 font-mono text-sm">We designed every part of the program around what actually works for learning hard technical skills.</p>
            </div>
          </BentoItem>

          {PILLARS.map((pillar, index) => (
            <BentoItem
              key={pillar.number}
              showRightBorder={index === 2}
              className={`bg-transparent p-6 sm:p-8 lg:p-10 min-h-[280px] flex flex-col justify-between group hover:bg-gradient-to-br hover:from-${pillar.color}-500/[0.03] hover:to-transparent transition-all duration-500`}
            >
              <div>
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-${pillar.color}-500/20 to-${pillar.color}-600/10 border border-${pillar.color}-500/30 flex items-center justify-center mb-4 group-hover:from-${pillar.color}-500/30 group-hover:border-${pillar.color}-400/50 transition-all duration-300`}>
                  <span className={`text-${pillar.color}-400 font-bold font-mono text-sm`}>{pillar.number}</span>
                </div>
                <h3 className={`text-2xl font-bold font-sans group-hover:text-${pillar.color}-200 transition-colors duration-300`}>{pillar.title}</h3>
                <p className="mt-3 text-slate-400 font-mono text-sm mb-4 group-hover:text-slate-300 transition-colors duration-300">{pillar.description}</p>
                <ul className="text-slate-400 text-xs font-mono space-y-2 group-hover:text-slate-300 transition-colors duration-300">
                  {pillar.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full bg-${pillar.color}-400`}></span>{item}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-slate-500 font-mono text-xs mt-4">{pillar.footer}</p>
            </BentoItem>
          ))}
        </div>
      </section>

      {/* Weekly Cycle */}
      <section aria-labelledby="weekly-heading">
        <div className="bento-grid grid grid-cols-1 gap-0 sm:grid-cols-2">
          <BentoItem className="bg-transparent p-6 sm:p-8 lg:p-12 min-h-[240px] flex flex-col justify-between sm:col-span-2">
            <div>
              <SectionHeader label="// WEEKLY CYCLE" />
              <h2 id="weekly-heading" className="text-4xl font-bold font-sans">Here's What A Typical Week Looks Like</h2>
              <p className="mt-4 text-slate-300 font-mono text-sm">Every week follows the same rhythm. Learn, build, review, repeat.</p>
            </div>
          </BentoItem>

          <BentoItem showBottomBorder className="bg-transparent p-6 sm:p-8 lg:p-10 min-h-[320px] flex flex-col justify-between group hover:bg-gradient-to-br hover:from-orange-500/[0.03] hover:to-transparent transition-all duration-500">
            <div>
              <h3 className="text-2xl font-bold mb-3 font-sans group-hover:text-orange-100 transition-colors duration-300">Monday-Thursday Nights</h3>
              <p className="text-white font-semibold mb-2">7:00 PM - 9:30 PM Live Remote</p>
              <div className="space-y-3 text-slate-400 text-sm font-mono group-hover:text-slate-300 transition-colors duration-300">
                <p><strong className="text-white">New Concept:</strong> We teach a new skill or tool</p>
                <p><strong className="text-white">Live Demo:</strong> We code it together, step by step</p>
                <p><strong className="text-white">Your Turn:</strong> You build while we're available for questions</p>
                <p className="text-xs text-slate-500 mt-4">Can't make it live? Recordings available. But live is way better.</p>
              </div>
            </div>
          </BentoItem>

          <BentoItem showBottomBorder showRightBorder className="bg-transparent p-6 sm:p-8 lg:p-10 min-h-[320px] flex flex-col justify-between group hover:bg-gradient-to-br hover:from-orange-500/[0.03] hover:to-transparent transition-all duration-500">
            <div>
              <h3 className="text-2xl font-bold mb-3 font-sans group-hover:text-orange-100 transition-colors duration-300">Saturday Deep-Dive</h3>
              <p className="text-white font-semibold mb-2">9:00 AM - 3:00 PM Live Remote</p>
              <div className="space-y-3 text-slate-400 text-sm font-mono group-hover:text-slate-300 transition-colors duration-300">
                <p><strong className="text-white">Project Work:</strong> Apply everything from the week</p>
                <p><strong className="text-white">Pair Programming:</strong> Learn by working with others</p>
                <p><strong className="text-white">Code Reviews:</strong> Get feedback on your approach</p>
                <p className="text-xs text-slate-500 mt-4">This is where struggling turns into understanding.</p>
              </div>
            </div>
          </BentoItem>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section aria-labelledby="different-heading">
        <div className="bento-grid grid grid-cols-1 gap-0 lg:grid-cols-3">
          <BentoItem className="bg-transparent p-6 sm:p-10 lg:p-14 min-h-[400px] flex flex-col justify-between lg:col-span-2">
            <div>
              <SectionHeader label="// WHAT MAKES US DIFFERENT" />
              <h2 id="different-heading" className="text-4xl font-bold mb-5 font-sans">We're Not Trying To Be Revolutionary</h2>
              <div className="space-y-4 text-slate-300 font-mono text-sm">
                <p className="text-lg">We're just honest about what it takes to learn to code.</p>
                <p>No hype. No promises of "job-ready in 12 weeks." No shortcuts. No magic AI that does the work for you.</p>
                <p>Just 20 weeks of structured learning, deliberate practice, and real instruction from people who actually build software.</p>
                <div className="bg-white/5 border border-slate-800 p-6 rounded-lg mt-6">
                  <p className="text-white font-bold mb-2">The Reality:</p>
                  <p className="text-sm">Learning to code is hard. It takes time. It takes effort. Anyone who tells you otherwise is lying to you.</p>
                  <p className="text-sm mt-3">But if you show up, do the work, and push through the hard parts? You will learn to build real applications.</p>
                </div>
              </div>
            </div>
          </BentoItem>

          <BentoItem showRightBorder className="bg-transparent p-6 sm:p-8 lg:p-10 min-h-[400px] flex flex-col justify-center">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold font-sans mb-3">Not For Everyone</h3>
                <p className="text-slate-400 font-mono text-sm">This program isn't for people looking for the easy path. It's for people who want to actually understand what they're building.</p>
              </div>
              <div className="bg-white/5 border-2 border-orange-500 p-6 rounded-lg">
                <p className="text-white font-mono text-sm font-bold mb-2">If you want real skills over quick credentials?</p>
                <p className="text-slate-400 font-mono text-xs">This is your program.</p>
              </div>
            </div>
          </BentoItem>
        </div>
      </section>

      {/* Support System */}
      <section aria-labelledby="support-heading">
        <div className="bento-grid grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4">
          <BentoItem className="bg-transparent p-6 sm:p-8 lg:p-12 min-h-[240px] flex flex-col justify-between sm:col-span-2 lg:col-span-4">
            <div>
              <SectionHeader label="// SUPPORT SYSTEM" />
              <h2 id="support-heading" className="text-4xl font-bold font-sans">You're Not Learning Alone</h2>
              <p className="mt-4 text-slate-300 font-mono text-sm">We built support into every part of the program so you never feel stuck and abandoned.</p>
            </div>
          </BentoItem>

          {SUPPORT_FEATURES.map((feature, index) => (
            <BentoItem
              key={feature.title}
              showRightBorder={index === 3}
              className={`bg-transparent p-6 sm:p-8 lg:p-10 min-h-[240px] flex flex-col justify-between group hover:bg-gradient-to-br hover:from-${feature.color}-500/[0.03] hover:to-transparent transition-all duration-500`}
            >
              <div>
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-${feature.color}-500/20 to-${feature.color}-600/10 border border-${feature.color === 'white' ? 'slate-700' : `${feature.color}-500/30`} flex items-center justify-center mb-4 group-hover:border-${feature.color === 'white' ? 'slate-600' : `${feature.color}-400/50`} transition-all duration-300`}>
                  <svg className={`w-5 h-5 text-${feature.color === 'white' ? 'slate-400' : `${feature.color}-400`}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <h3 className={`text-2xl font-bold mb-2 font-sans group-hover:text-${feature.color === 'white' ? 'white' : `${feature.color}-200`} transition-colors duration-300`}>{feature.title}</h3>
                <p className="text-slate-400 font-mono text-sm group-hover:text-slate-300 transition-colors duration-300">{feature.description}</p>
              </div>
              <p className="text-slate-500 font-mono text-xs">{feature.footer}</p>
            </BentoItem>
          ))}
        </div>
      </section>

      {/* Outcomes */}
      <section aria-labelledby="outcomes-heading">
        <div className="bento-grid grid grid-cols-1 gap-0 sm:grid-cols-2">
          <BentoItem className="bg-transparent p-6 sm:p-8 lg:p-12 min-h-[240px] flex flex-col justify-between sm:col-span-2">
            <div>
              <SectionHeader label="// REAL OUTCOMES" />
              <h2 id="outcomes-heading" className="text-4xl font-bold font-sans">What You'll Actually Walk Away With</h2>
              <p className="mt-4 text-slate-300 font-mono text-sm mb-6">We measure success by what you can build, not what certificate you get.</p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {OUTCOMES.map((outcome) => (
                  <div key={outcome.label} className="bg-white/5 border border-slate-800 p-4 rounded-lg">
                    <p className="text-emerald-400 font-mono text-xs font-bold mb-2">✓ {outcome.label}</p>
                    <p className="text-slate-300 font-mono text-sm">{outcome.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </BentoItem>

          <BentoItem showBottomBorder className="bg-transparent p-6 sm:p-8 lg:p-10 min-h-[200px] flex flex-col justify-center">
            <div className="text-center">
              <p className="text-slate-400 font-mono text-sm mb-2">What we don't give you:</p>
              <p className="text-2xl font-bold font-sans">Guaranteed job placement</p>
              <p className="text-slate-500 font-mono text-xs mt-3">We teach you to build. The market decides the rest.</p>
            </div>
          </BentoItem>

          <BentoItem showBottomBorder showRightBorder className="bg-transparent p-6 sm:p-8 lg:p-10 min-h-[200px] flex flex-col justify-center">
            <div className="text-center">
              <p className="text-slate-400 font-mono text-sm mb-2">What we do give you:</p>
              <p className="text-2xl font-bold font-sans">Real skills that compound</p>
              <p className="text-slate-500 font-mono text-xs mt-3">Build on this foundation for years to come.</p>
            </div>
          </BentoItem>
        </div>
      </section>

      <CtaSection
        headingId="cta-heading"
        title="This Is How We Teach. No Gimmicks."
        description="If you want real skills over quick wins, we built this program for you."
        buttons={[
          { text: 'Enroll Now', href: '/enroll', variant: 'primary', label: 'Enroll in DOGM.AI Cohort 1' },
          { text: 'See The Full Curriculum', href: '/curriculum', variant: 'secondary', label: 'View the full curriculum' },
        ]}
      />
    </PageLayout>
  );
}
