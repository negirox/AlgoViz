"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeEditor } from "@/components/code-editor";
import { VariableInspector } from "@/components/variable-inspector";
import { PlaybackControls } from "@/components/playback-controls";
import { AiExplainer } from "@/components/ai-explainer";
import { explainStep } from "@/ai/flows/explain-step";

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
    { line: 1, variables: { arr: '[5, 3, 8, 4, 2]' } },
    { line: 2, variables: { arr: '[5, 3, 8, 4, 2]', n: 5 } },
    { line: 3, variables: { arr: '[5, 3, 8, 4, 2]', n: 5, i: 0 } },
    { line: 4, variables: { arr: '[5, 3, 8, 4, 2]', n: 5, i: 0, j: 0 } },
    { line: 5, variables: { arr: '[5, 3, 8, 4, 2]', n: 5, i: 0, j: 0, comparison: '5 > 3 is true' } },
    { line: 7, variables: { arr: '[3, 5, 8, 4, 2]', n: 5, i: 0, j: 0 } },
    { line: 4, variables: { arr: '[3, 5, 8, 4, 2]', n: 5, i: 0, j: 1 } },
    { line: 5, variables: { arr: '[3, 5, 8, 4, 2]', n: 5, i: 0, j: 1, comparison: '5 > 8 is false' } },
    { line: 4, variables: { arr: '[3, 5, 8, 4, 2]', n: 5, i: 0, j: 2 } },
    { line: 5, variables: { arr: '[3, 5, 8, 4, 2]', n: 5, i: 0, j: 2, comparison: '8 > 4 is true' } },
    { line: 7, variables: { arr: '[3, 5, 4, 8, 2]', n: 5, i: 0, j: 2 } },
    { line: 4, variables: { arr: '[3, 5, 4, 8, 2]', n: 5, i: 0, j: 3 } },
    { line: 5, variables: { arr: '[3, 5, 4, 8, 2]', n: 5, i: 0, j: 3, comparison: '8 > 2 is true' } },
    { line: 7, variables: { arr: '[3, 5, 4, 2, 8]', n: 5, i: 0, j: 3 } },
    { line: 3, variables: { arr: '[3, 5, 4, 2, 8]', n: 5, i: 1 } },
    { line: 4, variables: { arr: '[3, 5, 4, 2, 8]', n: 5, i: 1, j: 0 } },
    { line: 5, variables: { arr: '[3, 5, 4, 2, 8]', n: 5, i: 1, j: 0, comparison: '3 > 5 is false' } },
    { line: 11, variables: { result: '[2, 3, 4, 5, 8]' } },
];


export function AlgoViz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [isLoadingExplanation, setIsLoadingExplanation] = useState(true);

  const currentTrace = useMemo(() => EXECUTION_TRACE[currentStep], [currentStep]);

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
  
  useEffect(() => {
    const fetchExplanation = async () => {
      if (!currentTrace) return;
      setIsLoadingExplanation(true);
      try {
        const result = await explainStep({
          code: BUBBLE_SORT_CODE,
          step: `Line ${currentTrace.line}: ${BUBBLE_SORT_CODE.split('\\n')[currentTrace.line - 1]?.trim()}`,
          variables: JSON.stringify(currentTrace.variables),
        });
        setExplanation(result.explanation);
      } catch (error) {
        console.error("Failed to fetch explanation:", error);
        setExplanation("Could not generate explanation for this step.");
      } finally {
        setIsLoadingExplanation(false);
      }
    };
    fetchExplanation();
  }, [currentStep, currentTrace]);


  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col gap-8 lg:sticky lg:top-20">
          <Card className="w-full bg-card/50">
            <CardHeader>
              <CardTitle>Code Editor</CardTitle>
              <CardDescription>Bubble Sort Algorithm in JavaScript</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <CodeEditor code={BUBBLE_SORT_CODE} highlightedLine={currentTrace?.line} />
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
          <AiExplainer explanation={explanation} isLoading={isLoadingExplanation} />
        </div>
      </div>
    </div>
  );
}
