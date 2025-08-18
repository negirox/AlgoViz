"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ALGO_CATEGORIES } from "@/lib/algo-templates";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function AlgorithmShowcase() {
    return (
        <section className="py-12 md:py-20 lg:py-24">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Explore Algorithms</h2>
                    <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl/relaxed">
                        Dive into a curated collection of classic algorithms, each with a dedicated page featuring an interactive visualization, code breakdown, and detailed explanations.
                    </p>
                </div>
                <div className="grid gap-8">
                    {Object.entries(ALGO_CATEGORIES).map(([categoryKey, category]) => (
                        <div key={categoryKey}>
                            <h3 className="text-2xl font-bold mb-6 text-primary">{category.name}</h3>
                            <TooltipProvider>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {Object.entries(category.algorithms).map(([algoKey, algo]) => (
                                        <Tooltip key={algoKey}>
                                            <TooltipTrigger asChild>
                                                <Link href={`/${categoryKey}/${algoKey}`} className="group">
                                                    <Card className="bg-card/50 hover:bg-card hover:border-primary transition-all duration-200 h-full flex flex-col">
                                                        <CardHeader>
                                                            <CardTitle className="text-lg">{algo.name}</CardTitle>
                                                            <CardDescription>
                                                                Time: <span className="font-mono text-xs">{algo.timeComplexity}</span><br />
                                                                Space: <span className="font-mono text-xs">{algo.spaceComplexity}</span>
                                                            </CardDescription>
                                                        </CardHeader>
                                                        <CardContent className="flex-grow flex items-end justify-between">
                                                            <p className="text-sm text-muted-foreground">View Visualization</p>
                                                            <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                                        </CardContent>
                                                    </Card>
                                                </Link>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p className="max-w-xs">{algo.description}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    ))}
                                </div>
                            </TooltipProvider>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
