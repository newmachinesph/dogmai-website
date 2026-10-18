import type { Metadata } from 'next';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
  title: 'Contact Us - Get in Touch with DOGM.AI | Corporate Training Inquiries',
  description:
    'Contact DOGM.AI for corporate training inquiries, program information, and partnership opportunities. Email hello@dogm.ai or use our contact form. Response within 24 hours.',
  keywords: [
    'contact DOGM.AI',
    'corporate training inquiry',
    'training consultation',
    'business partnership',
    'training proposal request',
    'Philippines training company contact',
  ],
  openGraph: {
    title: 'Contact DOGM.AI - Start Your Training Journey',
    description:
      'Get in touch for corporate training inquiries, program details, or partnership opportunities. Free consultation available.',
    images: ['/imgs/og-image.png'],
    url: 'https://dogm.ai/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact DOGM.AI - Corporate Training Inquiries',
    description:
      'Reach out for training consultations, program information, and partnership opportunities.',
    images: ['/imgs/og-image.png'],
  },
  alternates: {
    canonical: 'https://dogm.ai/contact',
  },
};

const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact DOGM.AI',
  description: 'Contact page for DOGM.AI corporate training inquiries',
  url: 'https://dogm.ai/contact',
  mainEntity: {
    '@type': 'Organization',
    name: 'DOGM.AI',
    email: 'hello@dogm.ai',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@dogm.ai',
      contactType: 'customer service',
      areaServed: 'Philippines',
      availableLanguage: ['English', 'Filipino'],
    },
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dogm.ai' },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://dogm.ai/contact' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do you customize training programs for our organization?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We start with a comprehensive needs assessment to understand your goals, challenges, and culture. From there, we design a tailored program that addresses your specific requirements.',
      },
    },
    {
      '@type': 'Question',
      name: 'What industries do you serve?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We work across multiple sectors including BPO/Contact Centers, Banking & Financial Services, Manufacturing, Healthcare, Retail & Hospitality, and Government.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer Lean Six Sigma certifications?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Through Elevare, we offer Yellow Belt, Green Belt, and Black Belt certifications with practical application.',
      },
    },
    {
      '@type': 'Question',
      name: 'What delivery formats are available?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer in-person, virtual live sessions, hybrid programs, self-paced e-learning, and blended learning approaches.',
      },
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ContactContent />
    </>
  );
}
