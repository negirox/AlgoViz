import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Footer } from '@/components/footer';
import { CompassIcon, Home, BrainCircuit, BarChartHorizontal } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans text-foreground">
      <main className="flex-1 flex items-center">
        <div className="container max-w-2xl px-4 md:px-6 py-16 text-center space-y-8">
          <div className="space-y-3">
            <CompassIcon className="mx-auto h-14 w-14 text-primary" />
            <p className="text-sm font-mono text-muted-foreground">Error 404</p>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
              This page took a wrong turn
            </h1>
            <p className="max-w-md mx-auto text-muted-foreground md:text-lg/relaxed">
              We couldn't find the page you were looking for. It may have been moved, renamed,
              or never existed — try one of the paths below instead.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/complexity-cheat-sheet">
                <BarChartHorizontal className="mr-2 h-4 w-4" />
                Big-O Cheat Sheet
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/interview-questions">
                <BrainCircuit className="mr-2 h-4 w-4" />
                Interview Questions
              </Link>
            </Button>
          </div>

          <Card className="bg-card/50 text-left">
            <CardHeader>
              <CardTitle className="text-base">Looking for a specific algorithm?</CardTitle>
              <CardDescription>
                Every visualizer lives at <code className="text-xs">/&lt;category&gt;/&lt;algorithm&gt;</code> —
                for example{' '}
                <Link href="/sorting/quickSort" className="text-primary hover:underline">
                  /sorting/quickSort
                </Link>{' '}
                or{' '}
                <Link href="/tree/avlTree" className="text-primary hover:underline">
                  /tree/avlTree
                </Link>
                . Head back to the homepage to browse the full catalog of sorting, searching,
                tree, and data structure visualizations.
              </CardDescription>
            </CardHeader>
            <CardContent />
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
