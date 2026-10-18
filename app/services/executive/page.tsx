import type { Metadata } from 'next';
import ExecutiveContent from './ExecutiveContent';

export const metadata: Metadata = {
  title: 'Executive Programs - C-Suite & Leadership Development | DOGM.AI',
  description:
    'World-class executive development programs by DOGM.AI: C-Suite leadership, transformational leadership, strategic thinking, executive presence, and global leadership readiness training in the Philippines.',
  keywords: [
    'executive programs Philippines',
    'C-Suite leadership development',
    'executive coaching',
    'strategic leadership training',
    'executive presence',
    'board governance training',
    'senior leadership development',
  ],
  openGraph: {
    title: 'DOGM.AI Executive Programs - C-Suite & Leadership Excellence',
    description:
      'Elevate your leadership with world-class executive development: C-Suite programs, strategic thinking, and transformational leadership.',
    images: ['/imgs/og-image.png'],
    url: 'https://dogm.ai/services/executive',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DOGM.AI Executive Programs',
    description: 'C-Suite and senior leadership development programs for executives.',
    images: ['/imgs/og-image.png'],
  },
  alternates: {
    canonical: 'https://dogm.ai/services/executive',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dogm.ai' },
    { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://dogm.ai/services' },
    { '@type': 'ListItem', position: 3, name: 'Executive', item: 'https://dogm.ai/services/executive' },
  ],
};

export default function ExecutivePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ExecutiveContent />
    </>
  );
}
