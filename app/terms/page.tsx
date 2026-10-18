import type { Metadata } from 'next';
import TermsContent from './TermsContent';

export const metadata: Metadata = {
  title: 'Terms of Service - Service Agreement | DOGM.AI',
  description:
    'DOGM.AI Terms of Service: Read our service agreement, eligibility requirements, intellectual property terms, and acceptable use policies for training services.',
  keywords: [
    'DOGM.AI terms of service',
    'service agreement',
    'terms and conditions',
    'training service terms',
    'acceptable use policy',
  ],
  openGraph: {
    title: 'Terms of Service | DOGM.AI',
    description: 'Read the terms and conditions for using DOGM.AI training services.',
    images: ['/imgs/og-image.png'],
    url: 'https://dogm.ai/terms',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Terms of Service | DOGM.AI',
    description: 'DOGM.AI service terms and conditions.',
    images: ['/imgs/og-image.png'],
  },
  alternates: {
    canonical: 'https://dogm.ai/terms',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dogm.ai' },
    { '@type': 'ListItem', position: 2, name: 'Terms of Service', item: 'https://dogm.ai/terms' },
  ],
};

export default function TermsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <TermsContent />
    </>
  );
}
