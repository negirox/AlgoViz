"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
          <pre className="font-code text-sm bg-muted p-4 rounded-md overflow-x-auto">
            <code>{JSON.stringify(variables, null, 2)}</code>
          </pre>
        ) : (
          <p className="text-muted-foreground text-sm">No variables to display for this step.</p>
        )}
      </CardContent>
    </Card>
  );
}
