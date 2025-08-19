
"use client";

import { cn } from "@/lib/utils";

type StackVisualizerProps = {
  data: (string | number)[];
  highlightedIndex?: number;
};

export function StackVisualizer({ data = [], highlightedIndex }: StackVisualizerProps) {
  if (!data || data.length === 0) {
    return (
        <div className="flex items-center justify-center h-64 text-muted-foreground">
            Enter commands to start stack visualization.
        </div>
    );
  }

  return (
    <div className="flex flex-col-reverse items-center justify-start h-80 w-full p-4 border rounded-md bg-muted/20 overflow-y-auto">
        {data.map((value, index) => (
            <div
                key={index}
                className={cn(
                    "flex items-center justify-center w-3/4 h-12 rounded-md my-1 text-lg font-bold border-2 transition-all duration-200",
                    "bg-card text-card-foreground border-border",
                    index === highlightedIndex && "border-primary bg-primary/20",
                    index === data.length - 1 && "shadow-lg"
                )}
            >
                {value}
            </div>
        ))}
        <div className="text-sm text-muted-foreground mt-2 font-code">
            {data.length > 0 ? "Top" : "Stack is Empty"}
        </div>
    </div>
  );
}
