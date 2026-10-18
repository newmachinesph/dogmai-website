import type { Metadata } from 'next';
import BootcampsContent from './BootcampsContent';

export const metadata: Metadata = {
  title: 'Intensive Bootcamps - Accelerated Training Programs | DOGM.AI',
  description:
    'Fast-track skill development with DOGM.AI intensive bootcamps: Leadership, Lean Six Sigma, Digital Transformation, Sales Excellence, Project Management, and Data Analytics training in the Philippines.',
  keywords: [
    'training bootcamps Philippines',
    'leadership bootcamp',
    'Lean Six Sigma bootcamp',
    'digital transformation training',
    'sales training bootcamp',
    'project management bootcamp',
    'data analytics training',
    'intensive training programs',
  ],
  openGraph: {
    title: 'DOGM.AI Intensive Bootcamps - Accelerated Skill Development',
    description:
      'Fast-track your team with intensive bootcamps: Leadership, Lean Six Sigma, Digital Transformation, and more.',
    images: ['/imgs/og-image.png'],
    url: 'https://dogm.ai/services/bootcamps',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DOGM.AI Intensive Bootcamps',
    description: 'Accelerated training programs for rapid skill development.',
    images: ['/imgs/og-image.png'],
  },
  alternates: {
    canonical: 'https://dogm.ai/services/bootcamps',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dogm.ai' },
    { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://dogm.ai/services' },
    { '@type': 'ListItem', position: 3, name: 'Bootcamps', item: 'https://dogm.ai/services/bootcamps' },
  ],
};

export default function BootcampsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BootcampsContent />
    </>
  );
}
