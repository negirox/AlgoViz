import type { MetadataRoute } from 'next';
import { ALGO_CATEGORIES } from '@/lib/algo-templates';
import { COMPARISONS } from '@/lib/comparisons';
import { INTERVIEW_QUESTIONS } from '@/lib/interview-questions';
import { absoluteUrl, CONTENT_LAST_UPDATED } from '@/lib/site';

// Generated from the same data that drives the routes, so new pages are listed automatically.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(`${CONTENT_LAST_UPDATED}T00:00:00Z`);
  const entry = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: absoluteUrl(path),
    lastModified,
    priority,
  });

  const algorithmPages = Object.entries(ALGO_CATEGORIES).flatMap(([categoryKey, category]) =>
    Object.keys(category.algorithms).map((algorithmKey) => entry(`/${categoryKey}/${algorithmKey}`, 0.8))
  );

  return [
    entry('/', 1),
    ...algorithmPages,
    entry('/interview-questions', 0.8),
    ...INTERVIEW_QUESTIONS.map((q) => entry(`/interview-questions/${q.slug}`, 0.7)),
    entry('/compare', 0.8),
    ...COMPARISONS.map((c) => entry(`/compare/${c.slug}`, 0.7)),
    entry('/complexity-cheat-sheet', 0.7),
    entry('/about', 0.5),
    entry('/contact', 0.4),
    entry('/privacy-policy', 0.3),
  ];
}
