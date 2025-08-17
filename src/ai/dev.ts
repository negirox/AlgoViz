"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeEditor } from "@/components/code-editor";
import { VariableInspector } from "@/components/variable-inspector";
import { PlaybackControls } from "@/components/playback-controls";
import { ArrayVisualizer } from "@/components/array-visualizer";

const BUBBLE_SORT_CODE = `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap arr[j] and arr[j+1]
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`;

const EXECUTION_TRACE = [
    { line: 1, variables: { arr: [5, 3, 8, 4, 2] } },
    { line: 2, variables: { arr: [5, 3, 8, 4, 2], n: 5 } },
    { line: 3, variables: { arr: [5, 3, 8, 4, 2], n: 5, i: 0 } },
    { line: 4, variables: { arr: [5, 3, 8, 4, 2], n: 5, i: 0, j: 0 } },
    { line: 5, variables: { arr: [5, 3, 8, 4, 2], n: 5, i: 0, j: 0, comparison: '5 > 3 is true' } },
    { line: 7, variables: { arr: [3, 5, 8, 4, 2], n: 5, i: 0, j: 0 } },
    { line: 4, variables: { arr: [3, 5, 8, 4, 2], n: 5, i: 0, j: 1 } },
    { line: 5, variables: { arr: [3, 5, 8, 4, 2], n: 5, i: 0, j: 1, comparison: '5 > 8 is false' } },
    { line: 4, variables: { arr: [3, 5, 8, 4, 2], n: 5, i: 0, j: 2 } },
    { line: 5, variables: { arr: [3, 5, 8, 4, 2], n: 5, i: 0, j: 2, comparison: '8 > 4 is true' } },
    { line: 7, variables: { arr: [3, 5, 4, 8, 2], n: 5, i: 0, j: 2 } },
    { line: 4, variables: { arr: [3, 5, 4, 8, 2], n: 5, i: 0, j: 3 } },
    { line: 5, variables: { arr: [3, 5, 4, 8, 2], n: 5, i: 0, j: 3, comparison: '8 > 2 is true' } },
    { line: 7, variables: { arr: [3, 5, 4, 2, 8], n: 5, i: 0, j: 3 } },
    { line: 3, variables: { arr: [3, 5, 4, 2, 8], n: 5, i: 1 } },
    { line: 4, variables: { arr: [3, 5, 4, 2, 8], n: 5, i: 1, j: 0 } },
    { line: 5, variables: { arr: [3, 5, 4, 2, 8], n: 5, i: 1, j: 0, comparison: '3 > 5 is false' } },
    // ... more steps for a full sort
    { line: 4, variables: { arr: '[3, 4, 2, 5, 8]', n: 5, i: 1, j: 1 } },
    { line: 5, variables: { arr: '[3, 4, 2, 5, 8]', n: 5, i: 1, j: 1, comparison: '4 > 2 is true' } },
    { line: 7, variables: { arr: '[3, 2, 4, 5, 8]', n: 5, i: 1, j: 1 } },
    { line: 4, variables: { arr: '[3, 2, 4, 5, 8]', n: 5, i: 1, j: 2 } },
    { line: 5, variables: { arr: '[3, 2, 4, 5, 8]', n: 5, i: 1, j: 2, comparison: '4 > 5 is false' } },
    { line: 3, variables: { arr: '[2, 3, 4, 5, 8]', n: 5, i: 2 } },
    // final step
    { line: 11, variables: { result: [2, 3, 4, 5, 8] } },
];


export function AlgoViz() {
  const [code, setCode] = useState(BUBBLE_SORT_CODE);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentTrace = useMemo(() => EXECUTION_TRACE[currentStep], [currentStep]);
  const arrayData = useMemo(() => {
    const arr = currentTrace.variables.arr;
    if (Array.isArray(arr)) return arr;
    if (typeof arr === 'string') {
      try {
        const parsed = JSON.parse(arr.replace(/'/g, '"'));
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  }, [currentTrace]);


  const handleNext = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, EXECUTION_TRACE.length - 1));
  }, []);

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
    // In a real scenario, you'd call a flow to generate a new trace here
    handleReset();
  };

  useEffect(() => {
    if (isPlaying) {
      if (currentStep >= EXECUTION_TRACE.length - 1) {
        setIsPlaying(false);
        return;
      }
      const interval = setInterval(() => {
        handleNext();
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [isPlaying, currentStep, handleNext]);
  

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
       <Card className="mb-8 bg-card/50">
        <CardHeader>
          <CardTitle>Array Visualization</CardTitle>
          <CardDescription>Visual representation of the array being sorted</CardDescription>
        </CardHeader>
        <CardContent>
          <ArrayVisualizer 
            data={arrayData} 
            highlightedIndices={
              currentTrace.variables.j !== undefined ? [currentTrace.variables.j, currentTrace.variables.j + 1] : []
            }
          />
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col gap-8 lg:sticky lg:top-20">
          <Card className="w-full bg-card/50">
            <CardHeader>
              <CardTitle>Code Editor</CardTitle>
              <CardDescription>Enter your algorithm in JavaScript</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <CodeEditor 
                code={code} 
                onCodeChange={handleCodeChange} 
                highlightedLine={currentTrace?.line} />
            </CardContent>
          </Card>
          <PlaybackControls
            onPrev={handlePrev}
            onNext={handleNext}
            onPlayPause={handlePlayPause}
            onReset={handleReset}
            isPlaying={isPlaying}
            canStepPrev={currentStep > 0}
            canStepNext={currentStep < EXECUTION_TRACE.length - 1}
          />
        </div>
        <div className="flex flex-col gap-8">
          <VariableInspector variables={currentTrace?.variables ?? {}} />
        </div>
      </div>
    </div>
  );
}