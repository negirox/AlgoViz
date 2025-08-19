
"use client";

import { cn } from "@/lib/utils";
import { ArrowRight, ArrowLeft } from "lucide-react";

type DoublyLinkedListNode = {
  value: string | number;
};

type DoublyLinkedListVisualizerProps = {
  nodes: DoublyLinkedListNode[];
  highlightedIndex?: number;
};

export function DoublyLinkedListVisualizer({ nodes = [], highlightedIndex }: DoublyLinkedListVisualizerProps) {
  if (!nodes || nodes.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        Enter commands to build the doubly linked list.
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center flex-wrap gap-x-0 gap-y-4 p-4 min-h-[100px]">
      <div className="flex items-center justify-center font-bold font-code pr-4">HEAD</div>
      <div className="flex items-center justify-center font-bold font-code pr-2">↔</div>
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
          {index < nodes.length && (
            <div className="flex flex-col items-center mx-2">
              <ArrowRight className="h-6 w-6 text-green-500" />
              <ArrowLeft className="h-6 w-6 text-red-500" />
            </div>
          )}
        </div>
      ))}
       <div className="flex items-center justify-center font-bold font-code pl-2">↔</div>
       <div className="flex items-center justify-center font-bold font-code pl-4">TAIL</div>
    </div>
  );
}
