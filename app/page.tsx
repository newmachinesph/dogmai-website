import type { Metadata } from 'next';
import HomeContent from './HomeContent';

export const metadata: Metadata = {
  title: 'DOGM.AI - Corporate Training & Professional Development Philippines',
  description:
    'DOGM (Developers of Great Minds) offers world-class corporate training, leadership development, Lean Six Sigma certifications, executive coaching, and digital transformation programs in the Philippines.',
  keywords: [
    'corporate training Philippines',
    'leadership development',
    'Lean Six Sigma certification',
    'executive coaching',
    'professional development',
    'team building',
    'digital transformation training',
    'DOGM.AI',
    'organizational development',
    'workforce training',
  ],
  openGraph: {
    title: 'DOGM.AI - Developers of Great Minds | Corporate Training Excellence',
    description:
      'Transform your organization with world-class training programs. Leadership development, Lean Six Sigma, executive coaching, and digital transformation.',
    images: ['/imgs/og-image.png'],
    url: 'https://dogm.ai',
    type: 'website',
    siteName: 'DOGM.AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DOGM.AI - Corporate Training & Professional Development',
    description:
      'World-class corporate training, leadership development, and Lean Six Sigma certifications in the Philippines.',
    images: ['/imgs/og-image.png'],
  },
  alternates: {
    canonical: 'https://dogm.ai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'DOGM.AI',
  alternateName: 'Developers of Great Minds',
  url: 'https://dogm.ai',
  logo: 'https://dogm.ai/imgs/og-image.png',
  description:
    'Premier corporate training and professional development company in the Philippines offering leadership development, Lean Six Sigma certifications, executive coaching, and digital transformation programs.',
  email: 'hello@dogm.ai',
  sameAs: [
    'https://www.facebook.com/profile.php?id=61585851908758',
    'https://linkedin.com/company/DOGM',
  ],
  areaServed: {
    '@type': 'Country',
    name: 'Philippines',
  },
  serviceType: [
    'Corporate Training',
    'Leadership Development',
    'Lean Six Sigma Certification',
    'Executive Coaching',
    'Digital Transformation',
    'Team Building',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'DOGM.AI',
  url: 'https://dogm.ai',
  description: 'Corporate training and professional development platform',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://dogm.ai/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <HomeContent />
    </>
  );
}
