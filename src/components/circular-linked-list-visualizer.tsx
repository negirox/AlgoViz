
"use client";

import { cn } from "@/lib/utils";
import { ArrowRight, CornerDownLeft } from "lucide-react";

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

  return (
    <div className="relative flex items-center justify-center flex-wrap gap-x-0 gap-y-8 p-8 min-h-[150px]">
      <div className="flex items-center justify-center font-bold font-code pr-4">HEAD</div>
      {nodes.map((node, index) => (
        <div key={index} className="flex items-center">
          <div
            className={cn(
              "flex items-center justify-center w-16 h-16 rounded-md text-lg font-bold border-2 transition-all duration-200",
              "bg-card text-card-foreground border-border",
              index === highlightedIndex ? "border-primary bg-primary/20 scale-110" : ""
            )}
          >
            {node.value}
          </div>
          {index < nodes.length - 1 && (
            <div className="flex flex-col items-center mx-2">
              <ArrowRight className="h-8 w-8 text-primary" />
            </div>
          )}
        </div>
      ))}
      {nodes.length > 0 && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center text-primary">
            <CornerDownLeft className="h-8 w-8" />
            <span className="font-code font-bold">Points to HEAD</span>
        </div>
      )}
    </div>
  );
}
