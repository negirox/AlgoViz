import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BarChartHorizontal } from 'lucide-react';
import { ComplexityCheatSheet } from '@/components/complexity-cheat-sheet';
import { absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Big-O Cheat Sheet: Algorithm Time & Space Complexity | AlgoViz',
  description: 'A complete Big-O cheat sheet covering the time and space complexity of every sorting, searching, tree, and data structure algorithm on AlgoViz, with direct links to interactive visualizations.',
  keywords: 'big o cheat sheet, time complexity, space complexity, algorithm complexity chart, sorting algorithm complexity, searching algorithm complexity, data structure complexity',
  alternates: {
    canonical: absoluteUrl('/complexity-cheat-sheet'),
  },
};

export default function ComplexityCheatSheetPage() {
  return (
      <div className="container px-4 md:px-6 py-12 md:py-16 space-y-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" />
          Back to AlgoViz
        </Link>

        <div className="space-y-3 text-center max-w-2xl mx-auto">
          <BarChartHorizontal className="mx-auto h-12 w-12 text-primary" />
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Big-O Cheat Sheet</h1>
          <p className="text-muted-foreground md:text-lg/relaxed">
            Every sorting, searching, tree, and data structure algorithm on AlgoViz, side by
            side, with its time and space complexity. Click any row to open its interactive
            visualizer.
          </p>
        </div>

        <ComplexityCheatSheet />
      </div>
  );
}
