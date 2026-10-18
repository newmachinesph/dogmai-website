import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { programSlugs, getProgram } from '../data/programs';
import ProgramDetailContent from './ProgramDetailContent';

export function generateStaticParams() {
  return programSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) return {};

  return {
    title: `${program.name.en} - Praxis by DOGM.AI`,
    description: program.description.en,
    openGraph: {
      title: `${program.name.en} | Praxis Intensive Program`,
      description: program.tagline.en,
      url: `https://dogm.ai/programs/praxis/${slug}`,
      images: ['/imgs/og-image.png'],
      type: 'website',
      siteName: 'DOGM.AI',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${program.name.en} - Praxis by DOGM.AI`,
      description: program.tagline.en,
      images: ['/imgs/og-image.png'],
    },
    alternates: {
      canonical: `https://dogm.ai/programs/praxis/${slug}`,
    },
  };
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) notFound();

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: program.name.en,
    description: program.description.en,
    provider: {
      '@type': 'Organization',
      name: 'DOGM.AI',
      url: 'https://dogm.ai',
    },
    timeRequired: `P${program.weeks}W`,
    url: `https://dogm.ai/programs/praxis/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <ProgramDetailContent slug={slug} />
    </>
  );
}
