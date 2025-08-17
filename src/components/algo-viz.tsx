"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeEditor } from "@/components/code-editor";
import { VariableInspector } from "@/components/variable-inspector";
import { PlaybackControls } from "@/components/playback-controls";
import { ArrayVisualizer } from "@/components/array-visualizer";
import { AiExplainer } from './ai-explainer';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { useToast } from '@/hooks/use-toast';
import { generateTrace, GenerateTraceOutput } from '@/ai/flows/generate-trace';
import { explainStep } from '@/ai/flows/explain-step';
import { Loader2 } from 'lucide-react';

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

const INITIAL_ARRAY = '[5, 3, 8, 4, 2]';

type TraceStep = GenerateTraceOutput['trace'][0];

export function AlgoViz() {
  const [code, setCode] = useState(BUBBLE_SORT_CODE);
  const [inputArray, setInputArray] = useState(INITIAL_ARRAY);
  const [executionTrace, setExecutionTrace] = useState<TraceStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [explanation, setExplanation] = useState('');
  const [isExplaining, setIsExplaining] = useState(false);
  const { toast } = useToast();

  const currentTrace = useMemo(() => executionTrace[currentStep], [executionTrace, currentStep]);

  const arrayData = useMemo(() => {
    if (!currentTrace) return [];
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

  const handleTraceGeneration = useCallback(async () => {
    setIsLoading(true);
    setExecutionTrace([]);
    setCurrentStep(0);
    try {
      const result = await generateTrace({ code, inputArray });
      if (result.trace && result.trace.length > 0) {
        setExecutionTrace(result.trace);
      } else {
        toast({
          variant: "destructive",
          title: "Error Generating Trace",
          description: "Could not generate execution trace. Please check the code and input array.",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred while generating the trace.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [code, inputArray, toast]);
  
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    handleTraceGeneration();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getExplanation = useCallback(async () => {
    if (!currentTrace) return;
    setIsExplaining(true);
    try {
      const result = await explainStep({
        code,
        step: `Line ${currentTrace.line}`,
        variables: JSON.stringify(currentTrace.variables, null, 2),
      });
      setExplanation(result.explanation);
    } catch (error) {
      console.error(error);
      setExplanation('Could not load explanation.');
    } finally {
      setIsExplaining(false);
    }
  }, [currentTrace, code]);

  useEffect(() => {
    if (currentTrace) {
      getExplanation();
    }
  }, [currentTrace, getExplanation]);

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

  useEffect(() => {
    if (isPlaying) {
      if (currentStep >= executionTrace.length - 1) {
        setIsPlaying(false);
        return;
      }
      const interval = setInterval(() => {
        handleNext();
      }, 1000);
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
              data={arrayData}
              highlightedIndices={
                currentTrace?.variables.j !== undefined ? [currentTrace.variables.j, currentTrace.variables.j + 1] : []
              }
            />
          )}
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col gap-8 lg:sticky lg:top-20">
          <Card className="w-full bg-card/50">
            <CardHeader>
              <CardTitle>Algorithm</CardTitle>
              <CardDescription>Enter your algorithm and input array</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <CodeEditor
                code={code}
                onCodeChange={setCode}
                highlightedLine={currentTrace?.line} />
              <div className='space-y-2'>
                <Label htmlFor='input-array'>Input Array (as JSON)</Label>
                <Textarea
                  id="input-array"
                  value={inputArray}
                  onChange={(e) => setInputArray(e.target.value)}
                  className="font-code text-sm"
                  rows={2}
                />
              </div>
              <Button onClick={handleTraceGeneration} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : 'Run & Visualize'}
              </Button>
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
          {executionTrace.length > 0 && (
            <>
              <VariableInspector variables={currentTrace?.variables ?? {}} />
              <AiExplainer explanation={explanation} isLoading={isExplaining || isLoading} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
