import type { Metadata } from 'next';
import ElevareContent from './ElevareContent';

export const metadata: Metadata = {
  title: 'Elevare - Corporate Training & Organizational Development | DOGM.AI',
  description:
    'Elevare by DOGM.AI offers comprehensive corporate training programs including leadership development, Lean Six Sigma certifications, digital transformation, executive coaching, and team building in the Philippines.',
  keywords: [
    'corporate training Philippines',
    'leadership development programs',
    'Lean Six Sigma certification',
    'executive coaching',
    'team building programs',
    'digital transformation training',
    'organizational development',
    'HR training',
    'process optimization',
    'bootcamp training',
    'Elevare DOGM',
  ],
  openGraph: {
    title: 'Elevare - Transform Your Organization with World-Class Training',
    description:
      '50+ training programs across 7 service categories. Leadership, Lean Six Sigma, digital transformation, and more. Customized corporate training solutions.',
    images: ['/imgs/og-image.png'],
    url: 'https://dogm.ai/elevare',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elevare Corporate Training - DOGM.AI',
    description:
      'Comprehensive corporate training solutions: Leadership, Lean Six Sigma, Digital Transformation, Executive Programs, and more.',
    images: ['/imgs/og-image.png'],
  },
  alternates: {
    canonical: 'https://dogm.ai/elevare',
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Elevare Corporate Training',
  provider: {
    '@type': 'Organization',
    name: 'DOGM.AI',
  },
  description:
    'Comprehensive corporate training programs including leadership development, Lean Six Sigma certifications, digital transformation, and executive coaching.',
  areaServed: 'Philippines',
  serviceType: [
    'Corporate Training',
    'Leadership Development',
    'Lean Six Sigma Certification',
    'Executive Coaching',
    'Team Building',
    'Digital Transformation',
    'Process Optimization',
  ],
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    priceCurrency: 'PHP',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dogm.ai' },
    { '@type': 'ListItem', position: 2, name: 'Elevare', item: 'https://dogm.ai/elevare' },
  ],
};

export default function ElevarePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ElevareContent />
    </>
  );
}
