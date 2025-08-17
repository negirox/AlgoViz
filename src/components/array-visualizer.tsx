"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useMemo } from 'react';

type ArrayVisualizerProps = {
  data: number[];
  highlightedIndices?: number[];
};

export function ArrayVisualizer({ data, highlightedIndices = [] }: ArrayVisualizerProps) {
  const chartData = useMemo(() => data.map((value, index) => ({ name: index.toString(), value })), [data]);
  const maxValue = useMemo(() => Math.max(...data, 0), [data]);

  if (!data || data.length === 0) {
    return (
        <div className="flex items-center justify-center h-64 text-muted-foreground">
            Enter an algorithm to start visualization.
        </div>
    );
  }

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
          <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
          <YAxis domain={[0, maxValue + 2]} stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--background))",
              borderColor: "hsl(var(--border))",
              color: "hsl(var(--foreground))"
            }}
            cursor={{ fill: 'hsl(var(--accent) / 0.2)' }}
          />
          <Bar dataKey="value" barSize={30}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={highlightedIndices.includes(index) ? 'hsl(var(--primary))' : 'hsl(var(--accent))'}
                className="transition-colors duration-300"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
