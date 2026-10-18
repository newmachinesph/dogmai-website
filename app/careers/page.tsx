import type { Metadata } from 'next';
import CareersContent from './CareersContent';

export const metadata: Metadata = {
  title: 'Careers - Join DOGM.AI | Work in Corporate Training',
  description:
    'Join the DOGM.AI team. Explore career opportunities in corporate training, leadership development, and organizational transformation. Growth-focused culture with competitive benefits.',
  keywords: [
    'DOGM.AI careers',
    'training company jobs',
    'corporate training careers',
    'Philippines jobs',
    'professional development careers',
    'training facilitator jobs',
  ],
  openGraph: {
    title: 'Careers at DOGM.AI - Build the Future of Training',
    description:
      'Join our mission to develop great minds. Explore opportunities in corporate training, consulting, and organizational development.',
    images: ['/imgs/og-image.png'],
    url: 'https://dogm.ai/careers',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers at DOGM.AI',
    description: 'Join our team and help transform organizations through world-class training.',
    images: ['/imgs/og-image.png'],
  },
  alternates: {
    canonical: 'https://dogm.ai/careers',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dogm.ai' },
    { '@type': 'ListItem', position: 2, name: 'Careers', item: 'https://dogm.ai/careers' },
  ],
};

export default function CareersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CareersContent />
    </>
  );
}
