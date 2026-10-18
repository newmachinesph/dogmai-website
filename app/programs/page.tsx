import type { Metadata } from 'next';
import ProgramsContent from './ProgramsContent';

export const metadata: Metadata = {
  title: 'Programs - DOGM.AI Training Ecosystem | Corporate & Individual Development',
  description:
    'Explore DOGM.AI training programs: Elevare for corporate training, Ascenda for career acceleration, Initium for entrepreneurship, and Praxis for AI-first intensive programs including AI Agent Builder, AI-Assisted Coding, and AI Media Studio in the Philippines.',
  keywords: [
    'training programs Philippines',
    'corporate development programs',
    'career acceleration',
    'entrepreneurship training',
    'AI bootcamps',
    'AI Agent Builder',
    'AI-Assisted Coding',
    'AI Media Studio',
    'leadership programs',
    'DOGM programs',
    'Elevare',
    'Ascenda',
    'Initium',
    'Praxis',
  ],
  openGraph: {
    title: 'DOGM.AI Programs - One Vision, Multiple Pathways',
    description:
      'Discover our ecosystem of training programs designed for corporations, individuals, and entrepreneurs. Find your pathway to growth.',
    images: ['/imgs/og-image.png'],
    url: 'https://dogm.ai/programs',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DOGM.AI Programs - Training for Every Journey',
    description:
      'Corporate training, career acceleration, entrepreneurship, and bootcamps. Multiple pathways to develop great minds.',
    images: ['/imgs/og-image.png'],
  },
  alternates: {
    canonical: 'https://dogm.ai/programs',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dogm.ai' },
    { '@type': 'ListItem', position: 2, name: 'Programs', item: 'https://dogm.ai/programs' },
  ],
};

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'DOGM.AI Training Programs',
  description: 'Complete list of DOGM.AI training program arms',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'Service',
        name: 'Elevare',
        description: 'Corporate Training & Organizational Development',
        url: 'https://dogm.ai/elevare',
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'Service',
        name: 'Ascenda',
        description: 'Career Acceleration & Professional Growth',
        url: 'https://dogm.ai/programs/ascenda',
      },
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: {
        '@type': 'Service',
        name: 'Initium',
        description: 'Entrepreneurship & Startup Development',
        url: 'https://dogm.ai/programs/initium',
      },
    },
    {
      '@type': 'ListItem',
      position: 4,
      item: {
        '@type': 'Service',
        name: 'Praxis',
        description: 'AI-First Intensive Programs: AI Agent Builder, AI-Assisted Coding, AI Media Studio',
        url: 'https://dogm.ai/programs/praxis',
      },
    },
  ],
};

export default function ProgramsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <ProgramsContent />
    </>
  );
}
