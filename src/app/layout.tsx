import type { Metadata } from 'next';
import './globals.css';
import { defaultMetadata } from '../lib/seo';
import { GA_MEASUREMENT_ID } from '../lib/gtag';
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = defaultMetadata;

/**
 * Root layout component for the entire application
 * Includes global styles, fonts, analytics, and widget initialization
 * Provides consistent structure across all pages
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        {GA_MEASUREMENT_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}

        {/* Plausible Analytics */}
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
          />
        )}

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* Favicon - Verdance Systems Logo */}
        <link rel="icon" href="/LOGOFinal1.png" type="image/png" />
        <link rel="apple-touch-icon" href="/LOGOFinal1.png" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Verdance Systems AI',
              description: 'We build intelligent systems and websites that turn leads into customers, reduce manual work, and deliver predictable revenue growth.',
              url: 'https://verdancesystemsai.com',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+27739961535',
                contactType: 'customer service',
                email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'verdancesystems@gmail.com',
              },
            }),
          }}
        />
      </head>

      <body className="antialiased bg-white text-neutral-950">
        {children}
        <Analytics />

        {/* BuildMyAgent Widget - Final Script */}
        <script
          src="https://buildmyagent.io/widget/68ece20a5ba4585357eb476d/widget-professional.js?widgetId=68ece20a5ba4585357eb476d"
          async
        />

        {/* Performance monitoring script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Basic performance monitoring
              window.addEventListener('load', function() {
                if ('performance' in window) {
                  const navTiming = performance.getEntriesByType('navigation')[0];
                  if (navTiming && typeof gtag !== 'undefined') {
                    gtag('event', 'page_load_time', {
                      event_category: 'performance',
                      event_label: 'full_page_load',
                      value: Math.round(navTiming.loadEventEnd - navTiming.fetchStart)
                    });
                  }
                }
              });
            `,
          }}
        />
      </body>
    </html>
  );
}