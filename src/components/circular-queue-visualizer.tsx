
"use client";

import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";

type QueueState = {
  queue: (number | null)[];
  front: number;
  rear: number;
  size: number;
};

type HighlightedState = {
  index?: number;
  type?: 'enqueue' | 'dequeue' | 'front' | 'rear';
};

type CircularQueueVisualizerProps = {
  queueState?: QueueState;
  highlighted?: HighlightedState;
};

export function CircularQueueVisualizer({ queueState, highlighted }: CircularQueueVisualizerProps) {
  if (!queueState) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        Enter commands to start the circular queue visualization.
      </div>
    );
  }

  const { queue, front, rear, size } = queueState;

  const getHighlightClass = (index: number) => {
    if (highlighted?.index !== index) return "border-border";
    if (highlighted.type === 'enqueue') return "border-green-500 bg-green-500/10 scale-110";
    if (highlighted.type === 'dequeue') return "border-red-500 bg-red-500/10 scale-110";
    return "border-primary bg-primary/20 scale-110";
  };
  
  const angleStep = 360 / size;

  return (
    <div className="relative flex items-center justify-center w-64 h-64">
      {queue.map((value, index) => {
        const angle = angleStep * index - 90; // Start from the top
        const x = 50 + 40 * Math.cos((angle * Math.PI) / 180);
        const y = 50 + 40 * Math.sin((angle * Math.PI) / 180);

        return (
          <div
            key={index}
            className={cn(
              "absolute flex items-center justify-center w-14 h-14 rounded-full border-2 transition-all duration-300 font-bold text-lg",
              getHighlightClass(index),
              value === null ? "bg-muted/30 text-muted-foreground/50 border-dashed" : "bg-card text-card-foreground"
            )}
            style={{
              left: `calc(${x}% - 28px)`,
              top: `calc(${y}% - 28px)`,
            }}
          >
            {value !== null ? value : index}
          </div>
        );
      })}

      {front !== -1 && (
        <div 
          className="absolute flex flex-col items-center text-red-400 font-code text-sm transition-transform duration-300"
          style={{ transform: `rotate(${angleStep * front}deg) translateY(-110px) rotate(-${angleStep * front}deg)` }}
        >
          <span>FRONT</span>
          <ArrowDown className="h-5 w-5" />
        </div>
      )}
       {rear !== -1 && (
        <div 
          className="absolute flex flex-col items-center text-green-400 font-code text-sm transition-transform duration-300"
          style={{ transform: `rotate(${angleStep * rear}deg) translateY(85px) rotate(-${angleStep * rear}deg)` }}
        >
          <ArrowUp className="h-5 w-5" />
          <span>REAR</span>
        </div>
      )}
    </div>
  );
}
