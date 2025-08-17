
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from 'lucide-react';
import { ArrayVisualizer } from '@/components/array-visualizer';
import type { TraceStep } from './algo-viz';

type VisualizerProps = {
    isLoading: boolean;
    traceStep?: TraceStep;
    type: 'array' | 'tree' | 'graph' | 'hash-table'; // Extensible for future types
};

export function Visualizer({ isLoading, traceStep, type }: VisualizerProps) {
  return (
    <Card className="bg-card/50">
      <CardHeader>
        <CardTitle>Visualization</CardTitle>
        <CardDescription>Visual representation of the data structure</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
           <div className="flex items-center justify-center h-64">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
           </div>
        ) : (
          <>
            {type === 'array' && (
              <ArrayVisualizer
                data={traceStep?.data ?? []}
                highlightedIndices={traceStep?.highlighted ?? []}
              />
            )}
            {/* Future visualizers will go here */}
            {type === 'tree' && <div className="flex items-center justify-center h-64 text-muted-foreground">Tree visualizer coming soon!</div>}
            {type === 'hash-table' && <div className="flex items-center justify-center h-64 text-muted-foreground">Hash Table visualizer coming soon!</div>}

          </>
        )}
      </CardContent>
    </Card>
  );
}
