
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JsonHighlighter } from './json-highlighter';

type VariableInspectorProps = {
  variables: Record<string, any>;
};

export function VariableInspector({ variables }: VariableInspectorProps) {
  return (
    <Card className="bg-card/50">
      <CardHeader>
        <CardTitle className="text-lg">Variable State</CardTitle>
      </CardHeader>
      <CardContent>
        {Object.keys(variables).length > 0 ? (
            <JsonHighlighter json={variables} />
        ) : (
          <p className="text-muted-foreground text-sm">No variables to display for this step.</p>
        )}
      </CardContent>
    </Card>
  );
}
