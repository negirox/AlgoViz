
"use client";

import { cn } from "@/lib/utils";
import { ArrowRight, ArrowLeft } from "lucide-react";

type QueueVisualizerProps = {
  data: (string | number)[];
  highlighted?: { index: number, type: 'enqueue' | 'dequeue' };
};

export function QueueVisualizer({ data = [], highlighted }: QueueVisualizerProps) {
  if (!data || data.length === 0) {
    return (
        <div className="flex items-center justify-center h-64 text-muted-foreground">
            Enter commands to start queue visualization.
        </div>
    );
  }
  
  const getHighlightClass = (index: number) => {
    if (highlighted?.index !== index) return "border-border";
    if (highlighted.type === 'enqueue') return "border-green-500 bg-green-500/10 scale-110";
    if (highlighted.type === 'dequeue') return "border-red-500 bg-red-500/10 scale-110";
    return "border-border";
  }

  return (
    <div className="flex flex-col items-center justify-center h-64 w-full p-4 rounded-md bg-muted/20">
        <div className="flex items-center justify-between w-full text-sm font-code text-muted-foreground px-4">
            <span>Front</span>
            <span>Rear</span>
        </div>
        <div className="flex items-center p-2 border-2 border-dashed border-muted rounded-md h-24 w-full">
            <ArrowRight className="h-6 w-6 text-red-500 mr-2 flex-shrink-0" />
            <div className="flex items-center w-full h-full overflow-x-auto">
                {data.map((value, index) => (
                    <div
                        key={index}
                        className={cn(
                            "flex items-center justify-center w-16 h-16 rounded-md mx-1 text-lg font-bold border-2 transition-all duration-300 flex-shrink-0",
                            "bg-card text-card-foreground",
                            getHighlightClass(index)
                        )}
                    >
                        {value}
                    </div>
                ))}
            </div>
            <ArrowLeft className="h-6 w-6 text-green-500 ml-2 flex-shrink-0" />
        </div>
         <div className="flex items-center justify-between w-full text-xs font-code text-muted-foreground px-4 mt-1">
            <span>(Dequeue)</span>
            <span>(Enqueue)</span>
        </div>
    </div>
  );
}
