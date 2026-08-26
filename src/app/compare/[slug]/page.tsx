import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Footer } from '@/components/footer';
import { COMPARISONS } from '@/lib/comparisons';
import { ALGO_CATEGORIES } from '@/lib/algo-templates';

type Algo = { name: string; description: string; timeComplexity: string; spaceComplexity: string };

export async function generateStaticParams() {
  return COMPARISONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params;
  const comparison = COMPARISONS.find((c) => c.slug === slug);
  if (!comparison) return {};
  return {
    title: `${comparison.title}: Which Should You Use? | AlgoViz`,
    description: comparison.summary,
    alternates: {
      canonical: `https://algo-viz-nu.vercel.app/compare/${comparison.slug}`,
    },
  };
}

export default async function ComparisonDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const comparison = COMPARISONS.find((c) => c.slug === slug);

  if (!comparison) {
    notFound();
  }

  const category = ALGO_CATEGORIES[comparison.category];
  const algorithms = category.algorithms as Record<string, Algo>;
  const algoA = algorithms[comparison.algoA];
  const algoB = algorithms[comparison.algoB];

  if (!algoA || !algoB) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans text-foreground">
      <div className="container max-w-4xl px-4 md:px-6 py-12 md:py-16 space-y-10">
        <Link href="/compare" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" />
          Back to Comparisons
        </Link>

        <div className="space-y-3">
          <Badge variant="secondary">{category.name}</Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{comparison.title}</h1>
          <p className="text-muted-foreground md:text-lg/relaxed">{comparison.summary}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[{ algo: algoA, key: comparison.algoA, when: comparison.whenToUseA },
            { algo: algoB, key: comparison.algoB, when: comparison.whenToUseB }].map(({ algo, key, when }) => (
            <Card key={key} className="bg-card/50 flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl">{algo.name}</CardTitle>
                <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1 text-xs font-mono text-muted-foreground">
                  <span>Time: {algo.timeComplexity}</span>
                  <span>Space: {algo.spaceComplexity}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <p className="text-sm text-muted-foreground">{algo.description}</p>
                <div className="rounded-md bg-muted/40 p-3">
                  <p className="text-xs font-semibold text-foreground mb-1">When to use it</p>
                  <p className="text-sm text-muted-foreground">{when}</p>
                </div>
                <Link
                  href={`/${comparison.category}/${key}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  Open visualizer <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Key Differences</h2>
          <ul className="space-y-3">
            {comparison.keyDifferences.map((diff, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{diff}</span>
              </li>
            ))}
          </ul>
        </div>

        <Card className="bg-primary/5 border-primary/30">
          <CardHeader>
            <CardTitle className="text-lg">Verdict</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{comparison.verdict}</p>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
