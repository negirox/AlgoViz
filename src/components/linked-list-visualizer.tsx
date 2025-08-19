
"use client";

import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

type LinkedListNode = {
  value: string | number;
};

type LinkedListVisualizerProps = {
  nodes: LinkedListNode[];
  highlightedIndex?: number;
};

export function LinkedListVisualizer({ nodes = [], highlightedIndex }: LinkedListVisualizerProps) {
  if (!nodes || nodes.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        Enter commands to build the linked list.
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center flex-wrap gap-x-0 gap-y-4 p-4 min-h-[100px]">
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
       <div className="flex items-center justify-center font-bold font-code pl-4">NULL</div>
    </div>
  );
}
