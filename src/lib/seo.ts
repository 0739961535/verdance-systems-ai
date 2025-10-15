import { Metadata } from 'next';

/**
 * SEO configuration and metadata generation utilities
 * Provides consistent metadata across the application
 * Optimized for search engines and social media sharing
 */

const siteConfig = {
  name: 'Verdance Systems AI',
  description: 'We build intelligent systems and websites that turn leads into customers, reduce manual work, and deliver predictable revenue growth.',
  url: 'https://verdancesystemsai.com',
  ogImage: '/og-image.png',
  creator: '@verdancesystems',
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL('https://verdancesystemsai.com'),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'AI automation',
    'lead generation',
    'business automation',
    'AI chatbots',
    'voice agents',
    'CRM integration',
    'website automation',
    'lead capture',
    'business growth',
    'sales automation',
  ],
  authors: [
    {
      name: 'Verdance Systems AI',
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.creator,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.creator,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
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
  verification: {
    google: '', // Add Google Search Console verification ID here
    yandex: '', // Add Yandex verification ID here
    yahoo: '', // Add Yahoo verification ID here
  },
};

/**
 * Generate structured data for SEO
 */
export function generateStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+27739961535',
      contactType: 'customer service',
      email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'verdancesystems@gmail.com',
    },
    sameAs: [
      // Add social media URLs here when available
    ],
  };
}