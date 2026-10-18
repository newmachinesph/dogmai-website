import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Enroll Now - Secure Your Bootcamp Seat',
  description:
    'Apply for DOGM.AI Cohort 1. Limited to 25 seats available. 100% fully remote in the Philippines. Flexible payment options. Early bird pricing available. Applications now open.',
  openGraph: {
    title: 'Enroll in DOGM.AI - Secure Your Spot Today',
    description:
      'Join DOGM.AI bootcamp. 25 seats per cohort. Full payment or installment plans. Application takes 5 minutes. 100% fully remote.',
    images: ['/imgs/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enroll in DOGM.AI Bootcamp',
    description:
      'Limited seats. Simple enrollment. Flexible payment. Start building real skills.',
    images: ['/imgs/og-image.png'],
  },
};

export default function EnrollLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
