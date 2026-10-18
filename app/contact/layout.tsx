import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | DOGM.AI Corporate Training & Elevare',
  description:
    'Have questions about our corporate training programs? Contact us via email at hello@dogm.ai. We respond within 24 hours with real human answers about leadership development, Lean Six Sigma, and organizational transformation.',
  openGraph: {
    title: 'Contact DOGM.AI - Corporate Training Solutions',
    description:
      'Get answers about our training programs, certifications, and consulting services. Our team responds within 24 hours.',
    images: ['/imgs/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact DOGM.AI - Corporate Training',
    description:
      'Questions about corporate training? Real humans, real answers, within 24 hours.',
    images: ['/imgs/og-image.png'],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
