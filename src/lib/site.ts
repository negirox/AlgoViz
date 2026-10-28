// Canonical site origin. Set NEXT_PUBLIC_SITE_URL (e.g. https://algoviz.dev) when the site
// moves to a custom domain; every canonical URL, the sitemap and robots.txt follow it.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://algo-viz-nu.vercel.app').replace(/\/$/, '');

// Bump this whenever page content is revised. It is shown on content pages and used as
// <lastmod> in the sitemap, so keep it honest.
export const CONTENT_LAST_UPDATED = '2026-10-28';

export const CONTACT_EMAIL = 'mukeshsingh.negi07@gmail.com';

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function formatDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}
