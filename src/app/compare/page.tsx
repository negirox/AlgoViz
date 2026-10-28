import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, GitCompareArrows } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { COMPARISONS } from '@/lib/comparisons';
import { ALGO_CATEGORIES } from '@/lib/algo-templates';
import { absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Algorithm Comparisons | AlgoViz',
  description: 'Head-to-head algorithm comparisons — Quick Sort vs Merge Sort, Linear vs Binary Search, Stack vs Queue, and more — with complexity, tradeoffs, and when to use each.',
  keywords: 'algorithm comparison, quick sort vs merge sort, linear search vs binary search, stack vs queue, binary search tree vs avl tree',
  alternates: {
    canonical: absoluteUrl('/compare'),
  },
};

export default function ComparePage() {
  return (
      <div className="container px-4 md:px-6 py-12 md:py-16 space-y-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" />
          Back to AlgoViz
        </Link>

        <div className="space-y-3 text-center max-w-2xl mx-auto">
          <GitCompareArrows className="mx-auto h-12 w-12 text-primary" />
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Compare Algorithms</h1>
          <p className="text-muted-foreground md:text-lg/relaxed">
            Head-to-head breakdowns of the algorithms and data structures learners mix up most
            often — with complexity, tradeoffs, and when to reach for each one.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMPARISONS.map((c) => {
            const category = ALGO_CATEGORIES[c.category];
            const algoA = (category.algorithms as Record<string, { timeComplexity: string }>)[c.algoA];
            const algoB = (category.algorithms as Record<string, { timeComplexity: string }>)[c.algoB];
            return (
              <Link href={`/compare/${c.slug}`} key={c.slug} className="group">
                <Card className="bg-card/50 hover:bg-card hover:border-primary transition-all duration-200 h-full flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-lg">{c.title}</CardTitle>
                    <CardDescription className="font-mono text-xs">
                      {algoA?.timeComplexity} vs {algoB?.timeComplexity}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow flex items-end justify-between">
                    <p className="text-sm text-muted-foreground line-clamp-2">{c.summary}</p>
                  </CardContent>
                  <CardContent className="pt-0 flex justify-end">
                    <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
  );
}
