"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeEditor } from "@/components/code-editor";
import { VariableInspector } from "@/components/variable-inspector";
import { PlaybackControls } from "@/components/playback-controls";
import { ArrayVisualizer } from "@/components/array-visualizer";
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const BUBBLE_SORT_CODE = `function sort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}`;

const INITIAL_ARRAY = [5, 3, 8, 4, 2];

type TraceStep = {
  line: number;
  variables: Record<string, any>;
  array: number[];
  highlighted: number[];
};

// Simple execution trace generator for a specific bubble sort implementation
function generateTrace(arr: number[]): TraceStep[] {
    const trace: TraceStep[] = [];
    const localArr = [...arr];

    const addTrace = (line: number, variables: Record<string, any>, highlighted: number[] = []) => {
        trace.push({
            line,
            variables: { ...variables },
            array: [...localArr],
            highlighted,
        });
    };

    let n = localArr.length;
    addTrace(2, { arr: localArr, n });

    for (let i = 0; i < n - 1; i++) {
        addTrace(3, { arr: localArr, n, i });
        for (let j = 0; j < n - i - 1; j++) {
            addTrace(4, { arr: localArr, n, i, j });
            addTrace(5, { arr: localArr, n, i, j, comparison: `${localArr[j]} > ${localArr[j + 1]}` }, [j, j + 1]);
            if (localArr[j] > localArr[j + 1]) {
                addTrace(6, { arr: localArr, n, i, j, temp: localArr[j] }, [j, j+1]);
                let temp = localArr[j];
                localArr[j] = localArr[j + 1];
                addTrace(7, { arr: localArr, n, i, j, temp }, [j, j+1]);
                localArr[j + 1] = temp;
                addTrace(8, { arr: localArr, n, i, j, temp }, [j, j+1]);
            }
        }
    }
    addTrace(11, { arr: localArr, 'return value': localArr });
    return trace;
}


export function AlgoViz() {
  const [code, setCode] = useState(BUBBLE_SORT_CODE);
  const [executionTrace, setExecutionTrace] = useState<TraceStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { toast } = useToast();

  const handleTraceGeneration = useCallback(() => {
    setIsLoading(true);
    setCurrentStep(0);
    try {
      // For this example, we'll always use the initial array.
      // A full implementation would parse the input array from a text field.
      const trace = generateTrace(INITIAL_ARRAY);
      if (trace && trace.length > 0) {
        setExecutionTrace(trace);
      } else {
        toast({
          variant: "destructive",
          title: "Error Generating Trace",
          description: "Could not generate execution trace from the code.",
        });
        setExecutionTrace([]);
      }
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Execution Error",
        description: error.message || "An unexpected error occurred.",
      });
       setExecutionTrace([]);
    } finally {
      setIsLoading(false);
    }
  }, [toast]);
  
  useEffect(() => {
    // Re-generate trace when code changes, with a debounce
    const handler = setTimeout(() => {
        // NOTE: For this version, we are not parsing the user's code.
        // We will always run the hardcoded bubble sort trace generator.
        // A more advanced implementation would parse and execute the `code` string.
        handleTraceGeneration();
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [code, handleTraceGeneration]);

  const currentTrace = useMemo(() => executionTrace[currentStep], [executionTrace, currentStep]);

  const handleNext = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, executionTrace.length - 1));
  }, [executionTrace.length]);

  const handlePrev = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleReset = useCallback(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, []);

  const handlePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);
  
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    handleReset();
  };

  useEffect(() => {
    if (isPlaying) {
      if (currentStep >= executionTrace.length - 1) {
        setIsPlaying(false);
        return;
      }
      const interval = setInterval(() => {
        handleNext();
      }, 800); // Slower speed for better visualization
      return () => clearInterval(interval);
    }
  }, [isPlaying, currentStep, executionTrace.length, handleNext]);

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <Card className="mb-8 bg-card/50">
        <CardHeader>
          <CardTitle>Array Visualization</CardTitle>
          <CardDescription>Visual representation of the array being sorted</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
             <div className="flex items-center justify-center h-64">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
             </div>
          ) : (
            <ArrayVisualizer
              data={currentTrace?.array ?? []}
              highlightedIndices={currentTrace?.highlighted ?? []}
            />
          )}
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col gap-8 lg:sticky lg:top-20">
          <Card className="w-full bg-card/50">
            <CardHeader>
              <CardTitle>Code Editor</CardTitle>
              <CardDescription>Enter your sorting algorithm in JavaScript. The visualizer currently supports a specific bubble sort implementation.</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeEditor
                code={code}
                onCodeChange={handleCodeChange}
                highlightedLine={currentTrace?.line} />
            </CardContent>
          </Card>
           {executionTrace.length > 0 && (
            <PlaybackControls
              onPrev={handlePrev}
              onNext={handleNext}
              onPlayPause={handlePlayPause}
              onReset={handleReset}
              isPlaying={isPlaying}
              canStepPrev={currentStep > 0}
              canStepNext={currentStep < executionTrace.length - 1}
            />
          )}
        </div>
        <div className="flex flex-col gap-8">
          {executionTrace.length > 0 && currentTrace && (
            <VariableInspector variables={currentTrace.variables} />
          )}
        </div>
      </div>
    </div>
  );
}
