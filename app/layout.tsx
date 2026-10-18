import type { Metadata } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const raveo = localFont({
  src: [
    {
      path: "../public/fonts/variable/RaveoVF-subsetted.woff2",
      weight: "400 730",
      style: "normal",
    },
  ],
  variable: "--font-raveo",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DOGM.AI Bootcamp",
    template: "%s | DOGM.AI",
  },
  description:
    "AI-native coding bootcamp. Learn fundamentals, build real projects, and use AI strategically. 100% fully remote in the Philippines.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
      },
      {
        rel: "android-chrome",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
      },
    ],
  },
  openGraph: {
    type: "website",
    siteName: "DOGM.AI",
    url: siteUrl,
    images: [
      {
        url: "/imgs/og-image.png",
        width: 1200,
        height: 630,
        alt: "DOGM.AI Bootcamp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/imgs/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      {gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      ) : null}
      <body
        className={`${raveo.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
