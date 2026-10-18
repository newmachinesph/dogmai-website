import { ReactNode } from 'react';
import SiteHeader from '../SiteHeader';
import SiteFooter from '../SiteFooter';
import ScrollProgress from '../ScrollProgress';
import Breadcrumb from './Breadcrumb';
import JsonLd from './JsonLd';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageLayoutProps {
  children: ReactNode;
  breadcrumbs: BreadcrumbItem[];
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

export default function PageLayout({ children, breadcrumbs, jsonLd }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-black text-white dogm-theme">
      {jsonLd && <JsonLd data={jsonLd} />}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-6">
        <SiteHeader />

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded-lg focus:font-mono focus:text-sm"
        >
          Skip to main content
        </a>

        <div className="mt-6 space-y-16" id="main-content">
          <Breadcrumb items={breadcrumbs} />
          {children}
        </div>
      </div>

      <SiteFooter />
      <ScrollProgress />
    </div>
  );
}
