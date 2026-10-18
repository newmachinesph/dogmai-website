'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import DOGMPDFDocument from '../components/PDFDocument';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import BentoItem from '../components/BentoItem';

// Dynamically import PDF components to avoid SSR issues
const PDFDownloadLinkDynamic = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);

const PDFViewerDynamic = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFViewer),
  { ssr: false }
);

export default function PDFBrochurePage() {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white dogm-theme">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-6">
        <SiteHeader />

        {/* Skip to main content - Accessibility */}
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
            <span className="text-white">Download Brochure</span>
          </nav>

          {/* Hero Section */}
          <section aria-labelledby="brochure-heading">
            <div className="bento-grid grid grid-cols-1 gap-0 lg:grid-cols-4">
              <BentoItem className="bg-transparent p-6 sm:p-10 lg:p-14 min-h-[360px] flex flex-col justify-between lg:col-span-3">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-[2px] w-12 bg-gradient-to-r from-orange-500 to-transparent"></div>
                    <p className="text-xs font-mono uppercase tracking-[0.35em] text-orange-500">// PDF BROCHURE</p>
                    <div className="h-[2px] flex-1 bg-gradient-to-r from-orange-500/20 to-transparent"></div>
                  </div>
                  <h1 id="brochure-heading" className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] font-sans tracking-tight">
                    Everything You Need to Know. <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-300">One PDF.</span>
                  </h1>
                  <p className="mt-6 text-lg text-slate-300 font-mono max-w-3xl leading-relaxed">
                    Get the complete DOGM.AI bootcamp overview — curriculum, schedule, pricing, and FAQs. Perfect for sharing or reviewing offline.
                  </p>
                </div>
                <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 text-sm font-mono text-slate-400 sm:grid-cols-4">
                  <div className="group">
                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-300 font-sans group-hover:drop-shadow-[0_0_15px_rgba(251,146,60,0.4)] transition-all duration-300">11</div>
                    <div className="group-hover:text-orange-300/70 transition-colors duration-300">Pages</div>
                  </div>
                  <div className="group">
                    <div className="text-2xl font-bold text-white font-sans">20</div>
                    <div className="group-hover:text-slate-300 transition-colors duration-300">Week syllabus</div>
                  </div>
                  <div className="group">
                    <div className="text-2xl font-bold text-white font-sans">100%</div>
                    <div className="group-hover:text-slate-300 transition-colors duration-300">Fully Remote</div>
                  </div>
                  <div className="group">
                    <div className="text-2xl font-bold text-white font-sans">FAQ</div>
                    <div className="group-hover:text-slate-300 transition-colors duration-300">Included</div>
                  </div>
                </div>
              </BentoItem>

              <BentoItem
                showRightBorder
                className="bg-transparent p-6 sm:p-8 lg:p-10 min-h-[180px] flex flex-col justify-between lg:col-span-1"
              >
                <p className="text-xs font-mono uppercase tracking-[0.25em] text-slate-500 mb-6">Quick Actions</p>
                <div className="space-y-3 mt-4">
                  {isClient ? (
                    <PDFDownloadLinkDynamic
                      document={<DOGMPDFDocument />}
                      fileName="DOGM-Bootcamp-Brochure.pdf"
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-400 text-black px-6 py-3 rounded-lg font-bold hover:from-orange-400 hover:to-orange-300 hover:scale-105 active:scale-95 transition-all duration-200 font-mono text-sm shadow-lg shadow-orange-500/20 inline-block text-center"
                    >
                      {({ loading }) =>
                        loading ? 'Generating...' : 'Download PDF'
                      }
                    </PDFDownloadLinkDynamic>
                  ) : (
                    <button
                      disabled
                      className="w-full bg-slate-700 text-slate-400 px-6 py-3 rounded-lg font-bold font-mono text-sm cursor-not-allowed"
                    >
                      Loading...
                    </button>
                  )}
                  <a
                    href="/enroll"
                    className="w-full border border-slate-700 px-6 py-3 rounded-lg font-semibold hover:bg-slate-900 hover:border-slate-600 transition-all duration-200 font-mono text-sm inline-block text-center"
                  >
                    Enroll Now
                  </a>
                </div>
              </BentoItem>
            </div>
          </section>

          {/* PDF Preview Section */}
          <section aria-labelledby="preview-heading">
            <div className="bento-grid grid grid-cols-1 gap-0">
              <BentoItem showBottomBorder className="bg-transparent p-6 sm:p-8 lg:p-12 min-h-[200px] flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-[2px] w-12 bg-gradient-to-r from-orange-500 to-transparent"></div>
                  <p className="text-xs font-mono uppercase tracking-[0.35em] text-orange-500">// PREVIEW</p>
                  <div className="h-[2px] flex-1 bg-gradient-to-r from-orange-500/20 to-transparent"></div>
                </div>
                <h2 id="preview-heading" className="text-3xl font-bold font-sans">See What You're Getting</h2>
                <p className="mt-4 text-slate-400 font-mono text-sm max-w-2xl">
                  Preview the complete brochure below. Click "Download PDF" above to save a copy to share or review later.
                </p>
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
                      <DOGMPDFDocument />
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

          {/* CTA Section */}
          <section aria-labelledby="cta-heading">
            <div className="bento-grid grid grid-cols-1 gap-0 sm:grid-cols-2">
              <BentoItem showBottomBorder className="bg-transparent p-6 sm:p-10 lg:p-14 min-h-[280px] flex flex-col justify-center sm:col-span-2">
                <h2 id="cta-heading" className="text-4xl font-bold mb-5 font-sans">Ready to Start Your Journey?</h2>
                <p className="text-slate-300 text-lg mb-6 font-mono max-w-2xl">
                  Don't just read about it — become a developer who understands what they're building and uses AI strategically.
                </p>
                <div className="flex gap-4 flex-wrap items-center">
                  <a
                    href="/enroll"
                    className="bg-gradient-to-r from-orange-500 to-orange-400 text-black px-10 py-4 rounded-lg font-bold hover:from-orange-400 hover:to-orange-300 hover:scale-105 active:scale-95 transition-all duration-200 font-mono text-base shadow-lg shadow-orange-500/20 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black"
                    aria-label="Enroll in DOGM.AI Cohort 1"
                  >
                    Enroll Now
                  </a>
                  <a
                    href="/contact"
                    className="border border-slate-600 px-10 py-4 rounded-lg font-semibold hover:bg-white/5 hover:border-slate-500 transition-all duration-300 font-mono text-base focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-black"
                    aria-label="Contact us with questions"
                  >
                    Still Have Questions?
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
