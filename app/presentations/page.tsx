'use client';

import { useState } from 'react';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import { curriculumData, type WeekContent } from './curriculumData';

const phaseColors: Record<number, { border: string; bg: string; text: string }> = {
  1: { border: 'border-emerald-500', bg: 'bg-emerald-500/20', text: 'text-emerald-400' },
  2: { border: 'border-blue-500', bg: 'bg-blue-500/20', text: 'text-blue-400' },
  3: { border: 'border-purple-500', bg: 'bg-purple-500/20', text: 'text-purple-400' },
};

const phaseNames: Record<number, string> = {
  1: 'Core Foundations',
  2: 'Frontend Development',
  3: 'Backend & Databases',
};

function WeekCard({ week }: { week: WeekContent }) {
  const [downloadingDay, setDownloadingDay] = useState<number | null>(null);
  const colors = phaseColors[week.phase];

  const handleDownload = async (dayNumber: number) => {
    setDownloadingDay(dayNumber);
    try {
      const response = await fetch(`/api/generate-pptx/day${dayNumber}`);
      if (!response.ok) throw new Error('Failed to generate presentation');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `DOGM-Week${week.week}-Day${dayNumber}.pptx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download presentation. Please try again.');
    } finally {
      setDownloadingDay(null);
    }
  };

  return (
    <div className="mb-12">
      <div className="flex items-center gap-4 mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-mono ${colors.bg} ${colors.text}`}>
          Phase {week.phase}
        </span>
        <h2 className="text-xl font-bold">Week {week.week}: {week.title}</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {week.days.map((day) => (
          <div
            key={day.day}
            className={`bg-white/5 border border-slate-800 rounded-lg p-6 hover:${colors.border} hover:border-opacity-50 transition`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`h-10 w-10 rounded-lg ${colors.bg} flex items-center justify-center`}>
                <span className={`font-bold ${colors.text}`}>{day.dayOfWeek}</span>
              </div>
              <div>
                <h3 className="font-bold">Day {day.day}</h3>
                <p className="text-sm text-slate-400 font-mono">{day.title}</p>
              </div>
            </div>

            <p className="text-sm text-slate-400 font-mono mb-4 line-clamp-2">
              {day.description}
            </p>

            <div className="flex gap-2">
              <a
                href={`/presentations/day${day.day}`}
                className="flex-1 bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-lg font-mono text-sm transition flex items-center justify-center gap-2"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                View
              </a>
              <button
                onClick={() => handleDownload(day.day)}
                disabled={downloadingDay === day.day}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-mono text-sm transition flex items-center justify-center gap-2"
              >
                {downloadingDay === day.day ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    ...
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    PPTX
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PresentationsPage() {
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);

  const filteredWeeks = selectedPhase
    ? curriculumData.filter((week) => week.phase === selectedPhase)
    : curriculumData;

  return (
    <div className="min-h-screen bg-black text-white dogm-theme">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-6">
        <SiteHeader />

        <div className="mt-12 space-y-12">
          <nav aria-label="Breadcrumb" className="text-sm font-mono text-slate-400">
            <a href="/" className="hover:text-emerald-400 transition">Home</a>
            <span className="mx-2">/</span>
            <span className="text-slate-300">Presentations</span>
          </nav>

          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[2px] w-12 bg-gradient-to-r from-orange-500 to-transparent"></div>
              <p className="text-xs font-mono uppercase tracking-[0.35em] text-orange-500">// COURSE MATERIALS</p>
              <div className="h-[2px] flex-1 bg-gradient-to-r from-orange-500/20 to-transparent"></div>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] font-sans mb-6">
              Course Presentations
            </h1>

            <p className="text-lg text-slate-300 font-mono max-w-3xl leading-relaxed mb-8">
              Download lecture slides and presentation materials for each day of the DOGM.AI bootcamp.
              48 presentations across 16 weeks of learning.
            </p>

            {/* Phase Filter */}
            <div className="flex flex-wrap gap-3 mb-8">
              <button
                onClick={() => setSelectedPhase(null)}
                className={`px-4 py-2 rounded-lg font-mono text-sm transition ${
                  selectedPhase === null
                    ? 'bg-orange-600 text-white'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10'
                }`}
              >
                All Phases
              </button>
              {[1, 2, 3].map((phase) => (
                <button
                  key={phase}
                  onClick={() => setSelectedPhase(phase)}
                  className={`px-4 py-2 rounded-lg font-mono text-sm transition ${
                    selectedPhase === phase
                      ? `${phaseColors[phase].bg} ${phaseColors[phase].text} border ${phaseColors[phase].border}`
                      : 'bg-white/5 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  Phase {phase}: {phaseNames[phase]}
                </button>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <div className="bg-white/5 border border-slate-800 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-emerald-400">48</p>
                <p className="text-sm font-mono text-slate-400">Presentations</p>
              </div>
              <div className="bg-white/5 border border-slate-800 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-blue-400">16</p>
                <p className="text-sm font-mono text-slate-400">Weeks</p>
              </div>
              <div className="bg-white/5 border border-slate-800 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-purple-400">3</p>
                <p className="text-sm font-mono text-slate-400">Phases</p>
              </div>
              <div className="bg-white/5 border border-slate-800 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-orange-400">4</p>
                <p className="text-sm font-mono text-slate-400">Capstone Weeks</p>
              </div>
            </div>
          </section>

          {/* Weeks Grid */}
          <section>
            {filteredWeeks.map((week) => (
              <WeekCard key={week.week} week={week} />
            ))}
          </section>

          {/* Capstone Note */}
          <section className="bg-gradient-to-r from-purple-500/10 to-transparent border border-purple-500/30 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <span className="text-4xl">🚀</span>
              <div>
                <h3 className="text-xl font-bold text-purple-400 mb-2">Weeks 17-20: Capstone Project</h3>
                <p className="text-slate-300 font-mono">
                  The final 4 weeks are dedicated to your capstone project. No presentations - just building,
                  deploying, and presenting your full-stack application to the world!
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
