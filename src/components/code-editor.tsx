"use client";

import { cn } from "@/lib/utils";

type CodeEditorProps = {
  code: string;
  highlightedLine: number | null;
};

export function CodeEditor({ code, highlightedLine }: CodeEditorProps) {
  return (
    <div className="bg-muted/50 rounded-b-lg overflow-hidden">
      <pre className="font-code text-sm p-4 overflow-x-auto">
        {code.split('\n').map((line, index) => (
          <div
            key={index}
            className={cn(
              "flex items-start transition-colors duration-300 rounded-md -ml-4 -mr-4 pl-4 pr-4 border-l-4",
              index + 1 === highlightedLine
                ? "bg-primary/10 border-primary"
                : "border-transparent"
            )}
          >
            <span
              className="w-8 text-right pr-4 text-muted-foreground/50 select-none"
              aria-hidden="true"
            >
              {index + 1}
            </span>
            <code className="flex-1">{line}</code>
          </div>
        ))}
      </pre>
    </div>
  );
}
