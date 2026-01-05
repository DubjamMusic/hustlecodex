import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'http://localhost:3000';
  
  const robotsTxt = `# Golden Globe - Prestige Console
# Robots.txt

User-agent: *
Allow: /

# Sitemaps
Sitemap: ${siteUrl}/sitemap.xml

# Disallow admin paths (if any in future)
Disallow: /api/
Disallow: /_next/

# Crawl-delay
Crawl-delay: 0
`;

  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send(robotsTxt);
}
