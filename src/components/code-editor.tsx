"use client";

import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

type CodeEditorProps = {
  code: string;
  onCodeChange: (newCode: string) => void;
  highlightedLine: number | null;
  readOnly?: boolean;
};

export function CodeEditor({ code, onCodeChange, highlightedLine, readOnly = false }: CodeEditorProps) {
  const lines = code.split('\n');
  
  return (
    <div className="relative bg-muted/50 rounded-b-lg">
      <div className="absolute top-0 left-0 h-full w-full p-4 pointer-events-none">
        {lines.map((line, index) => (
          <div
            key={index}
            className={cn(
              "flex items-start transition-colors duration-300 rounded-md -ml-4 -mr-4 pl-4 pr-4 border-l-4 h-[21px]",
              index + 1 === highlightedLine
                ? "bg-primary/20 border-primary"
                : "border-transparent"
            )}
          />
        ))}
      </div>
      <Textarea
        value={code}
        onChange={(e) => onCodeChange(e.target.value)}
        readOnly={readOnly}
        className="font-code text-sm !bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none h-80 text-foreground"
        spellCheck="false"
        rows={lines.length}
      />
    </div>
  );
}
