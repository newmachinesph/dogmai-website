import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Download Brochure | DOGM.AI Web Development Bootcamp Philippines',
  description:
    'Download the complete DOGM.AI bootcamp brochure. 11-page PDF with full curriculum, schedule, pricing, FAQs. Perfect for sharing or reviewing offline.',
  keywords: [
    'DOGM.AI brochure',
    'coding bootcamp PDF',
    'web development course brochure',
    'bootcamp curriculum PDF',
    'DOGM.AI download',
  ],
  alternates: {
    canonical: 'https://dogm.ai/pdf-brochure',
  },
  openGraph: {
    title: 'Download DOGM.AI Bootcamp Brochure',
    description:
      'Complete 11-page PDF: curriculum, schedule, pricing, and FAQs. Everything you need to know about our 20-week web development bootcamp.',
    url: 'https://dogm.ai/pdf-brochure',
    siteName: 'DOGM.AI',
    images: ['/imgs/og-image.png'],
    locale: 'en_PH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Download DOGM.AI Bootcamp Brochure',
    description:
      'Full curriculum, schedule, and pricing in one PDF. Download now.',
    images: ['/imgs/og-image.png'],
  },
};

export default function PDFBrochureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
