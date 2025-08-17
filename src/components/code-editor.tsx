
"use client";

import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import React, { useRef, useEffect } from "react";

const LINE_HEIGHT = 24; // Corresponds to leading-relaxed in Tailwind

type CodeEditorProps = {
  code: string;
  onCodeChange: (newCode: string) => void;
  highlightedLine: number | undefined;
  readOnly?: boolean;
};

export function CodeEditor({ code, onCodeChange, highlightedLine, readOnly = false }: CodeEditorProps) {
  const lines = code.split('\n');
  const lineNumbers = Array.from({ length: lines.length }, (_, i) => i + 1).join('\n');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [code]);

  return (
    <div className="relative bg-muted/50 rounded-b-lg font-code text-sm border">
        <div className="flex">
            <pre className="text-right p-4 pr-2 text-muted-foreground select-none" style={{ lineHeight: `${LINE_HEIGHT}px` }}>{lineNumbers}</pre>
            <div className="relative flex-1">
                {highlightedLine !== undefined && (
                  <div
                    className="absolute top-0 left-0 w-full transition-transform duration-200 ease-in-out -z-0"
                    style={{ 
                      transform: `translateY(${(highlightedLine - 1) * LINE_HEIGHT}px)`,
                      height: `${LINE_HEIGHT}px`,
                      top: `7px`
                     }}
                  >
                    <div className="bg-primary/20 border-l-4 border-primary h-full ml-4" />
                  </div>
                )}
                <Textarea
                    ref={textareaRef}
                    value={code}
                    onChange={(e) => onCodeChange(e.target.value)}
                    readOnly={readOnly}
                    className="!bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none overflow-hidden text-foreground"
                    style={{ lineHeight: `${LINE_HEIGHT}px` }}
                    spellCheck="false"
                    rows={lines.length}
                />
            </div>
      </div>
    </div>
  );
}
