'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import BentoItem from '../components/BentoItem';
import { PraxisProgramPDF } from '../components/PraxisProgramPDF';
import type { ProgramSlug } from '../programs/praxis/data/programs';

const PDFDownloadLinkDynamic = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);

const PDFViewerDynamic = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFViewer),
  { ssr: false }
);

const programMeta: { slug: ProgramSlug; name: string; tagline: string; color: string; hoverColor: string; fileName: string; gradient: string; textColor: string }[] = [
  {
    slug: 'ai-agent-builder',
    name: 'AI Agent Builder',
    tagline: 'Build autonomous AI agents that research, decide, execute, and report back.',
    color: 'from-violet-500 to-purple-500',
    hoverColor: 'from-violet-400 to-purple-400',
    fileName: 'DOGMAI-Praxis-AI-Agent-Builder.pdf',
    gradient: 'bg-gradient-to-r from-violet-500 to-purple-500',
    textColor: 'text-violet-400',
  },
  {
    slug: 'ai-assisted-coding',
    name: 'AI-Assisted Coding',
    tagline: 'Ship real products with AI — no CS degree required.',
    color: 'from-cyan-500 to-blue-500',
    hoverColor: 'from-cyan-400 to-blue-400',
    fileName: 'DOGMAI-Praxis-AI-Assisted-Coding.pdf',
    gradient: 'bg-gradient-to-r from-cyan-500 to-blue-500',
    textColor: 'text-cyan-400',
  },
  {
    slug: 'ai-media-studio',
    name: 'AI Content & Media Studio',
    tagline: 'Build a full creative studio powered by AI and code.',
    color: 'from-amber-500 to-orange-500',
    hoverColor: 'from-amber-400 to-orange-400',
    fileName: 'DOGMAI-Praxis-AI-Media-Studio.pdf',
    gradient: 'bg-gradient-to-r from-amber-500 to-orange-500',
    textColor: 'text-amber-400',
  },
];

export default function PraxisPDFsPage() {
  const [isClient, setIsClient] = React.useState(false);
  const [previewSlug, setPreviewSlug] = React.useState<ProgramSlug | null>(null);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white dogm-theme">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-6">
        <SiteHeader />

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded-lg focus:font-mono focus:text-sm"
        >
          Skip to main content
        </a>

        <div className="mt-6 space-y-16" id="main-content">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-sm font-mono text-slate-400">
            <a href="/" className="hover:text-orange-400 transition">Home</a>
            <span className="mx-2 text-slate-600">/</span>
            <a href="/programs/praxis" className="hover:text-orange-400 transition">Praxis</a>
            <span className="mx-2 text-slate-600">/</span>
            <span className="text-white">Download PDFs</span>
          </nav>

          {/* Hero */}
          <section aria-labelledby="pdf-heading">
            <div className="bento-grid grid grid-cols-1 gap-0">
              <BentoItem className="bg-transparent p-6 sm:p-10 lg:p-14 min-h-[280px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-[2px] w-12 bg-gradient-to-r from-orange-500 to-transparent"></div>
                    <p className="text-xs font-mono uppercase tracking-[0.35em] text-orange-500">// PRAXIS PROGRAM PDFs</p>
                    <div className="h-[2px] flex-1 bg-gradient-to-r from-orange-500/20 to-transparent"></div>
                  </div>
                  <h1 id="pdf-heading" className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] font-sans tracking-tight">
                    Program Brochures. <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-300">White-label Ready.</span>
                  </h1>
                  <p className="mt-6 text-lg text-slate-300 font-mono max-w-3xl leading-relaxed">
                    Download individual PDF brochures for each Praxis program — clean white background, print-ready, and perfect for sharing.
                  </p>
                </div>
                <div className="mt-10 grid grid-cols-3 gap-4 text-sm font-mono text-slate-400">
                  <div className="group">
                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400 font-sans">Agent</div>
                    <div className="group-hover:text-violet-300/70 transition-colors duration-300">10 Weeks · 170 Hrs</div>
                  </div>
                  <div className="group">
                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-sans">Coding</div>
                    <div className="group-hover:text-cyan-300/70 transition-colors duration-300">12 Weeks · 200 Hrs</div>
                  </div>
                  <div className="group">
                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 font-sans">Media</div>
                    <div className="group-hover:text-amber-300/70 transition-colors duration-300">8 Weeks · 140 Hrs</div>
                  </div>
                </div>
              </BentoItem>
            </div>
          </section>

          {/* Download Cards */}
          <section aria-labelledby="downloads-heading">
            <div className="bento-grid grid grid-cols-1 gap-0">
              <BentoItem showBottomBorder className="bg-transparent p-6 sm:p-8 lg:p-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-[2px] w-12 bg-gradient-to-r from-orange-500 to-transparent"></div>
                  <p className="text-xs font-mono uppercase tracking-[0.35em] text-orange-500">// DOWNLOAD</p>
                  <div className="h-[2px] flex-1 bg-gradient-to-r from-orange-500/20 to-transparent"></div>
                </div>
                <h2 id="downloads-heading" className="text-3xl font-bold font-sans mb-8">Choose a Program</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {programMeta.map((prog) => (
                    <div
                      key={prog.slug}
                      className="bg-white/[0.03] border border-slate-800 rounded-xl p-6 flex flex-col justify-between hover:border-slate-600 transition-all duration-300"
                    >
                      <div>
                        <div className={`h-1 w-16 rounded-full ${prog.gradient} mb-4`}></div>
                        <h3 className={`text-xl font-bold font-sans mb-2 ${prog.textColor}`}>{prog.name}</h3>
                        <p className="text-sm text-slate-400 font-mono leading-relaxed mb-6">{prog.tagline}</p>
                      </div>
                      <div className="space-y-3">
                        {isClient ? (
                          <PDFDownloadLinkDynamic
                            document={<PraxisProgramPDF slug={prog.slug} />}
                            fileName={prog.fileName}
                            className={`w-full bg-gradient-to-r ${prog.color} text-black px-5 py-3 rounded-lg font-bold hover:scale-105 active:scale-95 transition-all duration-200 font-mono text-sm shadow-lg inline-block text-center`}
                          >
                            {({ loading }: { loading: boolean }) =>
                              loading ? 'Generating...' : 'Download PDF'
                            }
                          </PDFDownloadLinkDynamic>
                        ) : (
                          <button
                            disabled
                            className="w-full bg-slate-700 text-slate-400 px-5 py-3 rounded-lg font-bold font-mono text-sm cursor-not-allowed"
                          >
                            Loading...
                          </button>
                        )}
                        <button
                          onClick={() => setPreviewSlug(previewSlug === prog.slug ? null : prog.slug)}
                          className="w-full border border-slate-700 px-5 py-3 rounded-lg font-semibold hover:bg-slate-900 hover:border-slate-600 transition-all duration-200 font-mono text-sm text-center"
                        >
                          {previewSlug === prog.slug ? 'Hide Preview' : 'Preview'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </BentoItem>
            </div>
          </section>

          {/* PDF Preview */}
          {previewSlug && (
            <section aria-labelledby="preview-heading">
              <div className="bento-grid grid grid-cols-1 gap-0">
                <BentoItem showBottomBorder className="bg-transparent p-6 sm:p-8 lg:p-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-[2px] w-12 bg-gradient-to-r from-orange-500 to-transparent"></div>
                    <p className="text-xs font-mono uppercase tracking-[0.35em] text-orange-500">// PREVIEW</p>
                    <div className="h-[2px] flex-1 bg-gradient-to-r from-orange-500/20 to-transparent"></div>
                  </div>
                  <h2 id="preview-heading" className="text-3xl font-bold font-sans mb-2">
                    {programMeta.find((p) => p.slug === previewSlug)?.name}
                  </h2>
                  <p className="text-slate-400 font-mono text-sm mb-6">PDF preview — click &quot;Download PDF&quot; above to save.</p>
                </BentoItem>

                <BentoItem className="bg-transparent p-0 min-h-[850px]">
                  <div className="bg-black/40 border border-slate-800 rounded-lg overflow-hidden m-4 sm:m-6 lg:m-8">
                    {isClient ? (
                      <PDFViewerDynamic
                        width="100%"
                        height="800"
                        style={{ border: 'none', backgroundColor: '#0a0a0a' }}
                        showToolbar={true}
                      >
                        <PraxisProgramPDF slug={previewSlug} />
                      </PDFViewerDynamic>
                    ) : (
                      <div className="flex items-center justify-center h-[800px] text-slate-400 font-mono">
                        <div className="text-center">
                          <div className="w-12 h-12 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
                          <p>Loading PDF preview...</p>
                        </div>
                      </div>
                    )}
                  </div>
                </BentoItem>
              </div>
            </section>
          )}

          {/* CTA */}
          <section aria-labelledby="cta-heading">
            <div className="bento-grid grid grid-cols-1 gap-0">
              <BentoItem showBottomBorder className="bg-transparent p-6 sm:p-10 lg:p-14 min-h-[240px] flex flex-col justify-center">
                <h2 id="cta-heading" className="text-4xl font-bold mb-5 font-sans">Ready to Build?</h2>
                <p className="text-slate-300 text-lg mb-6 font-mono max-w-2xl">
                  Build your portfolio, not a certificate. Ship real projects every week.
                </p>
                <div className="flex gap-4 flex-wrap items-center">
                  <a
                    href="/programs/praxis"
                    className="bg-gradient-to-r from-orange-500 to-orange-400 text-black px-10 py-4 rounded-lg font-bold hover:from-orange-400 hover:to-orange-300 hover:scale-105 active:scale-95 transition-all duration-200 font-mono text-base shadow-lg shadow-orange-500/20"
                  >
                    Explore Programs
                  </a>
                  <a
                    href="https://facebook.com/DoGMAIAcademy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-slate-600 px-10 py-4 rounded-lg font-semibold hover:bg-white/5 hover:border-slate-500 transition-all duration-300 font-mono text-base"
                  >
                    Enroll Now
                  </a>
                </div>
              </BentoItem>
            </div>
          </section>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
