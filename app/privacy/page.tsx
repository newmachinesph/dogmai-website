import type { Metadata } from 'next';
import PrivacyContent from './PrivacyContent';

export const metadata: Metadata = {
  title: 'Privacy Policy - Data Protection & Privacy | DOGM.AI',
  description:
    'DOGM.AI Privacy Policy: Learn how we collect, use, and protect your personal information. Your privacy and data security are our priority.',
  keywords: [
    'DOGM.AI privacy policy',
    'data protection',
    'privacy practices',
    'personal information',
    'data security',
  ],
  openGraph: {
    title: 'Privacy Policy | DOGM.AI',
    description: 'Learn about how DOGM.AI collects, uses, and protects your personal information.',
    images: ['/imgs/og-image.png'],
    url: 'https://dogm.ai/privacy',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy | DOGM.AI',
    description: 'DOGM.AI data protection and privacy practices.',
    images: ['/imgs/og-image.png'],
  },
  alternates: {
    canonical: 'https://dogm.ai/privacy',
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
    { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: 'https://dogm.ai/privacy' },
  ],
};

export default function PrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PrivacyContent />
    </>
  );
}
