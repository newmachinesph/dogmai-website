import type { Metadata } from 'next';
import RefundPolicyContent from './RefundPolicyContent';

export const metadata: Metadata = {
  title: 'Refund Policy - Cancellation & Refund Terms | DOGM.AI',
  description:
    'DOGM.AI Refund Policy: Understand our cancellation terms, refund eligibility, processing time, and rescheduling options for training programs.',
  keywords: [
    'DOGM.AI refund policy',
    'cancellation policy',
    'training refund',
    'service cancellation',
    'refund eligibility',
  ],
  openGraph: {
    title: 'Refund Policy | DOGM.AI',
    description: 'Learn about DOGM.AI cancellation and refund policies for training programs.',
    images: ['/imgs/og-image.png'],
    url: 'https://dogm.ai/refund-policy',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Refund Policy | DOGM.AI',
    description: 'DOGM.AI cancellation and refund terms.',
    images: ['/imgs/og-image.png'],
  },
  alternates: {
    canonical: 'https://dogm.ai/refund-policy',
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
    { '@type': 'ListItem', position: 2, name: 'Refund Policy', item: 'https://dogm.ai/refund-policy' },
  ],
};

export default function RefundPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <RefundPolicyContent />
    </>
  );
}
