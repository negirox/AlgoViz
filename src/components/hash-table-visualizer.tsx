
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
    keyToInsert?: string;
    keyToSearch?: string;
    foundKey?: string;
    bucket?: number;
    collision?: boolean;
    success?: boolean;
    fail?: boolean;
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
    const { bucket: highlightedBucket, collision, keyToInsert, keyToSearch, foundKey, success, fail } = highlighted || {};

    const getHighlightClass = (index: number) => {
        if (highlightedBucket !== index) return "border-border";
        if (success) return "border-green-500 bg-green-500/10";
        if (fail) return "border-red-500 bg-red-500/10";
        if (collision) return "border-destructive bg-destructive/10";
        return "border-primary bg-primary/10";
    }

    const getItemClass = (itemKey: string) => {
        if (keyToSearch && itemKey === foundKey) {
            if (success) return "bg-green-500 text-white";
            if (fail) return "bg-red-500 text-white";
            return "bg-blue-500 text-white";
        }
        if (itemKey === keyToInsert || itemKey === keyToSearch) return "bg-primary text-primary-foreground";
        return "bg-accent/50";
    }

    return (
        <TooltipProvider>
            <div className="flex flex-col space-y-2 font-code text-sm">
                {table.map((bucket, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <div className="text-right text-muted-foreground w-8">{index}</div>
                        <div
                            className={cn(
                                "flex-1 flex items-center border rounded-md min-h-[40px] p-2 transition-colors duration-300",
                                getHighlightClass(index)
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
                                                    getItemClass(item.key)
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
