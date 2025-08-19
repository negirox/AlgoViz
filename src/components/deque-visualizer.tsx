
"use client";

import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

type DequeVisualizerProps = {
  data: (string | number)[];
  highlighted?: { index: number, type: 'front' | 'rear' };
};

export function DequeVisualizer({ data = [], highlighted }: DequeVisualizerProps) {
  if (!data || data.length === 0) {
    return (
        <div className="flex items-center justify-center h-64 text-muted-foreground">
            Enter commands to start deque visualization.
        </div>
    );
  }

  const getHighlightClass = (index: number) => {
    if (highlighted?.index !== index) return "border-border";
    if (highlighted.type === 'front') return "border-blue-500 bg-blue-500/10 scale-110";
    if (highlighted.type === 'rear') return "border-green-500 bg-green-500/10 scale-110";
    return "border-border";
  }

  return (
    <div className="flex flex-col items-center justify-center h-64 w-full p-4 rounded-md bg-muted/20">
        <div className="flex items-center justify-center w-full">
            <div className="flex flex-col items-center text-sm font-code text-blue-400 mr-2">
                <span>FRONT</span>
                <ArrowLeft className="h-4 w-4" />
                <ArrowRight className="h-4 w-4" />
            </div>
            <div className="flex items-center p-2 border-2 border-dashed border-muted rounded-md h-24 overflow-x-auto">
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
             <div className="flex flex-col items-center text-sm font-code text-green-400 ml-2">
                <span>REAR</span>
                <ArrowLeft className="h-4 w-4" />
                <ArrowRight className="h-4 w-4" />
            </div>
        </div>
    </div>
  );
}
