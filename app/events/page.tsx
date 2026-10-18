import type { Metadata } from 'next';
import EventsContent from './EventsContent';

export const metadata: Metadata = {
  title: 'Events - Workshops, Seminars & Training Events | DOGM.AI',
  description:
    'Discover upcoming DOGM.AI events, workshops, seminars, and training sessions. Join our corporate training events and networking opportunities in the Philippines.',
  keywords: [
    'training events Philippines',
    'corporate workshops',
    'leadership seminars',
    'DOGM.AI events',
    'professional development events',
    'business training events',
  ],
  openGraph: {
    title: 'DOGM.AI Events - Workshops & Training Sessions',
    description:
      'Join our upcoming corporate training events, workshops, and seminars. Network and learn with industry professionals.',
    images: ['/imgs/og-image.png'],
    url: 'https://dogm.ai/events',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DOGM.AI Events',
    description: 'Upcoming training events, workshops, and seminars.',
    images: ['/imgs/og-image.png'],
  },
  alternates: {
    canonical: 'https://dogm.ai/events',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dogm.ai' },
    { '@type': 'ListItem', position: 2, name: 'Events', item: 'https://dogm.ai/events' },
  ],
};

export default function EventsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <EventsContent />
    </>
  );
}
