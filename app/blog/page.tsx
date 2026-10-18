import type { Metadata } from 'next';
import BlogContent from './BlogContent';

export const metadata: Metadata = {
  title: 'Blog - Insights on Corporate Training & Development | DOGM.AI',
  description:
    'Stay updated with insights, trends, and best practices in corporate training, leadership development, Lean Six Sigma, and organizational transformation from DOGM.AI.',
  keywords: [
    'corporate training blog',
    'leadership development insights',
    'training best practices',
    'organizational development articles',
    'DOGM.AI blog',
    'professional development tips',
  ],
  openGraph: {
    title: 'DOGM.AI Blog - Training & Development Insights',
    description:
      'Expert insights on corporate training, leadership development, and organizational transformation.',
    images: ['/imgs/og-image.png'],
    url: 'https://dogm.ai/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DOGM.AI Blog',
    description: 'Insights and best practices in corporate training and development.',
    images: ['/imgs/og-image.png'],
  },
  alternates: {
    canonical: 'https://dogm.ai/blog',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dogm.ai' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dogm.ai/blog' },
  ],
};

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogContent />
    </>
  );
}
