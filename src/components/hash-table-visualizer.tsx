
"use client";

import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type HashItem = {
    key: string;
    value: string;
};

type TableState = {
    table: HashItem[][];
};

type HighlightedState = {
    key?: string;
    bucket?: number;
    collision?: boolean;
};

type HashTableVisualizerProps = {
    tableState?: TableState;
    highlighted?: HighlightedState;
};

export function HashTableVisualizer({ tableState, highlighted }: HashTableVisualizerProps) {
    if (!tableState) {
        return (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
                Enter key-value pairs to start hashing visualization.
            </div>
        );
    }

    const { table } = tableState;
    const { key: highlightedKey, bucket: highlightedBucket, collision } = highlighted || {};

    return (
        <TooltipProvider>
            <div className="flex flex-col space-y-2 font-code text-sm">
                {table.map((bucket, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <div className="text-right text-muted-foreground w-8">{index}</div>
                        <div
                            className={cn(
                                "flex-1 flex items-center border rounded-md min-h-[40px] p-2 transition-colors duration-300",
                                highlightedBucket === index ? "border-primary bg-primary/10" : "border-border",
                                highlightedBucket === index && collision ? "border-destructive bg-destructive/10" : ""
                            )}
                        >
                            {bucket.length === 0 ? (
                                <span className="text-muted-foreground/50">empty</span>
                            ) : (
                                bucket.map((item, itemIndex) => (
                                    <Tooltip key={item.key}>
                                        <TooltipTrigger asChild>
                                            <div
                                                className={cn(
                                                    "flex items-center gap-1 rounded-md px-2 py-1 transition-colors duration-300",
                                                    item.key === highlightedKey ? "bg-primary text-primary-foreground" : "bg-accent/50"
                                                )}
                                            >
                                                <span>{item.key}:</span>
                                                <span className="font-bold">{item.value}</span>
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Key: {item.key}</p>
                                            <p>Value: {item.value}</p>
                                        </TooltipContent>
                                        {itemIndex < bucket.length - 1 && <span className="mx-2 text-primary">→</span>}
                                    </Tooltip>
                                ))
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </TooltipProvider>
    );
}

