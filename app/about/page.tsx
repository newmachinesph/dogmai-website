import type { Metadata } from 'next';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
  title: 'About Us - DOGM.AI | Developers of Great Minds',
  description:
    'Learn about DOGM.AI (Developers of Great Minds), a premier corporate training and professional development company in the Philippines. Our mission, vision, values, and commitment to transforming organizations.',
  keywords: [
    'about DOGM.AI',
    'corporate training company Philippines',
    'professional development company',
    'leadership training provider',
    'organizational development',
    'human capital development',
    'training company mission',
    'Elevare training',
  ],
  openGraph: {
    title: 'About DOGM.AI - Building the Future of Human Capital',
    description:
      'Discover our story, mission, and values. DOGM.AI is dedicated to transforming individuals and organizations through world-class training programs.',
    images: ['/imgs/og-image.png'],
    url: 'https://dogm.ai/about',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About DOGM.AI - Developers of Great Minds',
    description:
      'Premier corporate training company in the Philippines. Learn about our mission to transform human capital.',
    images: ['/imgs/og-image.png'],
  },
  alternates: {
    canonical: 'https://dogm.ai/about',
  },
};

const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About DOGM.AI',
  description:
    'Learn about DOGM.AI, a premier corporate training and professional development company dedicated to transforming individuals and organizations.',
  url: 'https://dogm.ai/about',
  mainEntity: {
    '@type': 'Organization',
    name: 'DOGM.AI',
    alternateName: 'Developers of Great Minds',
    description:
      'Premier corporate training and professional development company in the Philippines.',
    foundingDate: '2026',
    areaServed: 'Philippines',
    knowsAbout: [
      'Corporate Training',
      'Leadership Development',
      'Lean Six Sigma',
      'Executive Coaching',
      'Digital Transformation',
    ],
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dogm.ai' },
    { '@type': 'ListItem', position: 2, name: 'About', item: 'https://dogm.ai/about' },
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutContent />
    </>
  );
}
