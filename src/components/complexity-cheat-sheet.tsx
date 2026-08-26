"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ALGO_CATEGORIES } from "@/lib/algo-templates";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";

function complexityBadgeClass(complexity: string) {
  const c = complexity.toLowerCase();
  if (c.includes("1)")) return "text-emerald-400";
  if (c.includes("log log")) return "text-emerald-400";
  if (c.includes("log n)") || c.includes("√n") || c.includes("log3")) return "text-lime-400";
  if (c.includes("n)") && !c.includes("n^") && !c.includes("n log")) return "text-yellow-400";
  if (c.includes("n log n")) return "text-yellow-400";
  if (c.includes("n^2") || c.includes("n²")) return "text-orange-400";
  return "text-muted-foreground";
}

export function ComplexityCheatSheet() {
  const [query, setQuery] = useState("");

  const categories = useMemo(() => {
    const q = query.trim().toLowerCase();
    return Object.entries(ALGO_CATEGORIES)
      .map(([categoryKey, category]) => {
        const algorithms = Object.entries(category.algorithms).filter(([, algo]) =>
          q ? algo.name.toLowerCase().includes(q) : true
        );
        return { categoryKey, category, algorithms };
      })
      .filter(({ algorithms }) => algorithms.length > 0);
  }, [query]);

  return (
    <div className="space-y-10">
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter by algorithm name..."
          className="pl-9"
          aria-label="Filter algorithms"
        />
      </div>

      {categories.length === 0 && (
        <p className="text-muted-foreground">No algorithms match "{query}".</p>
      )}

      {categories.map(({ categoryKey, category, algorithms }) => (
        <section key={categoryKey} id={categoryKey} className="space-y-4 scroll-mt-20">
          <h2 className="text-2xl font-bold text-primary">{category.name}</h2>
          <div className="rounded-lg border border-border/60 bg-card/50">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Algorithm</TableHead>
                  <TableHead>Time Complexity</TableHead>
                  <TableHead>Space Complexity</TableHead>
                  <TableHead className="text-right">Visualize</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {algorithms.map(([algoKey, algo]) => (
                  <TableRow key={algoKey}>
                    <TableCell className="font-medium">{algo.name}</TableCell>
                    <TableCell className={`font-mono text-xs ${complexityBadgeClass(algo.timeComplexity)}`}>
                      {algo.timeComplexity}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {algo.spaceComplexity}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        href={`/${categoryKey}/${algoKey}`}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        View &rarr;
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      ))}
    </div>
  );
}
