import type { Metadata } from 'next';
import ServicesContent from './ServicesContent';

export const metadata: Metadata = {
  title: 'Services - Corporate Training & Development Solutions | DOGM.AI',
  description:
    'Comprehensive corporate training services by DOGM.AI: leadership development, process optimization, intensive bootcamps, executive programs, and consulting services in the Philippines.',
  keywords: [
    'corporate training services',
    'leadership development',
    'process optimization',
    'training bootcamps',
    'executive training',
    'consulting services',
    'organizational development',
    'team training Philippines',
  ],
  openGraph: {
    title: 'DOGM.AI Services - Training & Development Solutions',
    description:
      'Corporate training, bootcamps, executive programs, and consulting. Comprehensive solutions to transform your organization.',
    images: ['/imgs/og-image.png'],
    url: 'https://dogm.ai/services',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DOGM.AI Services - Corporate Training Solutions',
    description:
      'Leadership, process optimization, bootcamps, and executive programs. Tailored training solutions for your organization.',
    images: ['/imgs/og-image.png'],
  },
  alternates: {
    canonical: 'https://dogm.ai/services',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dogm.ai' },
    { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://dogm.ai/services' },
  ],
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'DOGM.AI Training Services',
  provider: {
    '@type': 'Organization',
    name: 'DOGM.AI',
  },
  description:
    'Comprehensive corporate training and development services including leadership programs, process optimization, bootcamps, and executive development.',
  areaServed: 'Philippines',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Training Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Corporate Training',
          description: 'Leadership development, team building, and organizational development programs',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Intensive Bootcamps',
          description: 'Accelerated skill development through focused, hands-on training programs',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Executive Programs',
          description: 'C-Suite development, strategic thinking, and global leadership readiness',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Consulting Services',
          description: 'Needs assessment, culture surveys, process audits, and ROI measurement',
        },
      },
    ],
  },
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <ServicesContent />
    </>
  );
}
