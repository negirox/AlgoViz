
"use client";

import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

type CircularLinkedListNode = {
  value: string | number;
};

type CircularLinkedListVisualizerProps = {
  nodes: CircularLinkedListNode[];
  highlightedIndex?: number;
};

export function CircularLinkedListVisualizer({ nodes = [], highlightedIndex }: CircularLinkedListVisualizerProps) {
  if (!nodes || nodes.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        Enter commands to build the circular linked list.
      </div>
    );
  }

  const nodeWidth = 64;
  const gap = 40;
  const totalWidth = nodes.length * nodeWidth + (nodes.length - 1) * gap;

  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[200px] w-full">
      <div className="relative flex items-center justify-center" style={{ width: totalWidth }}>
        {nodes.map((node, index) => (
          <div
            key={index}
            className="flex items-center"
            style={{
              position: 'absolute',
              left: `${index * (nodeWidth + gap)}px`,
            }}
          >
            <div
              className={cn(
                "flex items-center justify-center w-16 h-16 rounded-md text-lg font-bold border-2 transition-all duration-200 z-10",
                "bg-card text-card-foreground border-border",
                index === highlightedIndex ? "border-primary bg-primary/20 scale-110" : ""
              )}
            >
              {node.value}
            </div>
            {index < nodes.length - 1 && (
              <div className="absolute left-full flex items-center" style={{ width: gap }}>
                <ArrowRight className="h-8 w-8 text-primary mx-auto" />
              </div>
            )}
          </div>
        ))}
        
        {nodes.length > 0 && (
          <svg 
            className="absolute top-full left-0 w-full h-16" 
            style={{ marginTop: '8px' }}
            overflow="visible"
          >
            <defs>
              <marker
                id="arrowhead-circular"
                markerWidth="10"
                markerHeight="7"
                refX="0"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="hsl(var(--primary))" />
              </marker>
            </defs>
            <path
              d={`M ${totalWidth - nodeWidth / 2},${nodeWidth / 2 + 5} 
                 C ${totalWidth - nodeWidth / 2},${nodeWidth + 20} 
                   ${nodeWidth / 2},${nodeWidth + 20} 
                   ${nodeWidth / 2},${nodeWidth / 2 + 5}`}
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              fill="none"
              markerStart="url(#arrowhead-circular)"
            />
          </svg>
        )}
      </div>
    </div>
  );
}
