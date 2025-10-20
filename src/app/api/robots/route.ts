import { NextResponse } from 'next/server';

export async function GET() {
  const robotsContent = `User-agent: *
Allow: /

# Important pages
Allow: /privacy
Allow: /terms

# Block admin areas (if any exist in future)
Disallow: /admin/
Disallow: /api/

# Sitemap location
Sitemap: ${process.env.NEXT_PUBLIC_SITE_URL || 'https://verdancesystemsai.com'}/sitemap.xml

# Crawl delay for respectful crawling
Crawl-delay: 1`;

  return new NextResponse(robotsContent, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}