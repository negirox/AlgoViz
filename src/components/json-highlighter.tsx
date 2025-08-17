
"use client";

import React from 'react';

type JsonHighlighterProps = {
  json: object;
};

export function JsonHighlighter({ json }: JsonHighlighterProps) {
  const jsonString = JSON.stringify(json, null, 2);

  const highlightedJson = jsonString.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
    let cls = 'text-syntax-number';
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'text-syntax-key';
      } else {
        cls = 'text-syntax-string';
      }
    } else if (/true|false/.test(match)) {
      cls = 'text-syntax-boolean';
    } else if (/null/.test(match)) {
      cls = 'text-syntax-null';
    }
    return `<span class="${cls}">${match}</span>`;
  });

  return (
    <pre className="font-code text-sm bg-muted p-4 rounded-md overflow-x-auto">
      <code dangerouslySetInnerHTML={{ __html: highlightedJson }} />
    </pre>
  );
}

// Define color classes for Tailwind
const colors = {
    'text-syntax-number': 'text-[hsl(var(--syntax-number))]',
    'text-syntax-key': 'text-[hsl(var(--syntax-key))]',
    'text-syntax-string': 'text-[hsl(var(--syntax-string))]',
    'text-syntax-boolean': 'text-[hsl(var(--syntax-boolean))]',
    'text-syntax-null': 'text-[hsl(var(--syntax-null))]',
};
