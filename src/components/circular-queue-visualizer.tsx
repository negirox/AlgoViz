
"use client";

import { cn } from "@/lib/utils";

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

const CIRCLE_RADIUS = 100;
const NODE_RADIUS = 28;

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

  const getCoords = (index: number) => {
    const angle = angleStep * index - 90; // Start from top
    const x = CIRCLE_RADIUS + CIRCLE_RADIUS * Math.cos((angle * Math.PI) / 180);
    const y = CIRCLE_RADIUS + CIRCLE_RADIUS * Math.sin((angle * Math.PI) / 180);
    return { x, y };
  };

  return (
    <div className="flex items-center justify-center w-full min-h-[280px]">
        <svg 
          width={CIRCLE_RADIUS * 2 + NODE_RADIUS * 2} 
          height={CIRCLE_RADIUS * 2 + NODE_RADIUS * 2}
          overflow="visible"
          className="transform-gpu"
        >
          <g transform={`translate(${NODE_RADIUS}, ${NODE_RADIUS})`}>
            {/* Pointer Lines */}
            <defs>
              <marker
                id="arrowhead-pointer"
                markerWidth="10"
                markerHeight="7"
                refX="10"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="hsl(var(--primary))" />
              </marker>
            </defs>

            {front !== -1 && (
              <line
                x1={CIRCLE_RADIUS}
                y1={CIRCLE_RADIUS}
                x2={getCoords(front).x}
                y2={getCoords(front).y}
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                markerEnd="url(#arrowhead-pointer)"
                className="transition-all duration-300"
              />
            )}
            {rear !== -1 && (
               <line
                x1={CIRCLE_RADIUS}
                y1={CIRCLE_RADIUS}
                x2={getCoords(rear).x}
                y2={getCoords(rear).y}
                stroke="hsl(var(--accent))"
                strokeWidth="2"
                markerEnd="url(#arrowhead-pointer)"
                className="transition-all duration-300"
              />
            )}
            
            {/* Pointer Labels */}
            <foreignObject x={0} y={0} width={CIRCLE_RADIUS*2} height={CIRCLE_RADIUS*2}>
              <div className="w-full h-full flex items-center justify-center">
                  <div className="flex flex-col items-center justify-center font-code text-center">
                      {front !== -1 && <span className="font-bold text-primary">FRONT: {front}</span>}
                      {rear !== -1 && <span className="font-bold text-accent">REAR: {rear}</span>}
                  </div>
              </div>
            </foreignObject>


            {/* Queue Nodes */}
            {queue.map((value, index) => {
              const { x, y } = getCoords(index);
              return (
                <foreignObject 
                  key={index} 
                  x={x - NODE_RADIUS} 
                  y={y - NODE_RADIUS} 
                  width={NODE_RADIUS*2} 
                  height={NODE_RADIUS*2}
                >
                  <div
                    className={cn(
                      "w-full h-full rounded-full border-2 flex items-center justify-center transition-all duration-300 font-bold text-lg",
                      getHighlightClass(index),
                      value === null ? "bg-muted/30 text-muted-foreground/50 border-dashed" : "bg-card text-card-foreground"
                    )}
                  >
                    {value !== null ? value : <span className="text-xs">{index}</span>}
                  </div>
                </foreignObject>
              );
            })}
          </g>
        </svg>
    </div>
  );
}
