
"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeEditor } from "@/components/code-editor";
import { VariableInspector } from "@/components/variable-inspector";
import { PlaybackControls } from "@/components/playback-controls";
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Visualizer } from '@/components/visualizer';
import { ALGO_CATEGORIES, AlgorithmCategoryKey, AlgorithmKey } from '@/lib/algo-templates';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { buildTrace, COMMAND_DRIVEN_STRUCTURES, needsTargetInput, splitDefaultInput, type TraceStep } from '@/lib/trace-generators';


type AlgorithmClientPageProps = {
  categoryKey: AlgorithmCategoryKey;
  algorithmKey: AlgorithmKey<any>;
  algorithm: (typeof ALGO_CATEGORIES)[AlgorithmCategoryKey]['algorithms'][AlgorithmKey<any>];
  category: (typeof ALGO_CATEGORIES)[AlgorithmCategoryKey];
}

export default function AlgorithmClientPage({ categoryKey, algorithmKey, algorithm, category }: AlgorithmClientPageProps) {
  const algoKey = String(algorithmKey);
  const defaultInput = splitDefaultInput(categoryKey, algoKey, algorithm?.input || '');
  const [code, setCode] = useState(algorithm.code || '');
  const [inputStr, setInputStr] = useState(defaultInput.inputStr);
  const [targetStr, setTargetStr] = useState(defaultInput.targetStr);
  const [searchKeyStr, setSearchKeyStr] = useState('grape');

  // Build the default trace during the first render so the visualizer is
  // populated in the server-rendered HTML instead of showing an empty state.
  const [executionTrace, setExecutionTrace] = useState<TraceStep[]>(() => {
    try {
      return buildTrace(categoryKey, algoKey, defaultInput.inputStr, defaultInput.targetStr, 'grape') ?? [];
    } catch {
      return [];
    }
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  
  const handleTraceGeneration = useCallback(() => {
    setIsLoading(true);
    setCurrentStep(0);
    setExecutionTrace([]);
    
    try {
      const trace = buildTrace(categoryKey, algoKey, inputStr, targetStr, searchKeyStr);
      if (!trace) {
          toast({
              title: "Not Implemented",
              description: `The visualizer for ${algorithm.name} is not yet implemented.`,
          });
          return;
      }
      
      if (trace.length > 0) {
        setExecutionTrace(trace);
      } else {
         toast({
          title: "Visualization Not Ready",
          description: `The visualizer for ${algorithm.name} is coming soon.`,
        });
      }
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Execution Error",
        description: error.message || "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, inputStr, targetStr, searchKeyStr, algoKey, algorithm, categoryKey]);

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
    setExecutionTrace([]);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    if (isPlaying) {
      if (currentStep >= executionTrace.length - 1) {
        setIsPlaying(false);
        return;
      }
      const interval = setInterval(() => {
        handleNext();
      }, 800);
      return () => clearInterval(interval);
    }
  }, [isPlaying, currentStep, executionTrace.length, handleNext]);

  const visualizerType = algorithm.visualizer as | 'array' | 'tree' | 'hash-table' | 'stack' | 'linked-list' | 'doubly-linked-list' | 'circular-linked-list' | 'queue' | 'deque' | 'circular-queue';
  const showTargetInput = needsTargetInput(categoryKey, algoKey);

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 flex flex-col gap-8">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to All Algorithms
        </Link>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <Card className="w-full bg-card/50">
          <CardHeader>
            <CardTitle>{algorithm.name}</CardTitle>
            <CardDescription>
                <strong>Category:</strong> {category.name} | <strong>Time:</strong> {algorithm.timeComplexity} | <strong>Space:</strong> {algorithm.spaceComplexity}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
              <div>
                  <label htmlFor="input-data" className="text-sm font-medium mb-2 block">Input Data</label>
                  <div className="flex gap-2">
                      <Input 
                          id="input-data"
                          value={inputStr}
                          onChange={(e) => setInputStr(e.target.value)}
                          placeholder={
                            categoryKey === 'sorting' ? "e.g. 5, 3, 8, 4, 2" :
                            categoryKey === 'searching' ? "e.g. 2, 8, 5, 12" :
                            categoryKey === 'tree' ? "e.g. { \"value\": 10, ... } or 10,20,5..." :
                            categoryKey === 'data-structures' && COMMAND_DRIVEN_STRUCTURES.includes(algoKey) ? "e.g. push 5,push 10,pop" :
                            "e.g. key1,val1;key2,val2"
                          }
                          className="flex-1"
                      />
                      {showTargetInput && (
                        <Input
                          id="target-data"
                          value={targetStr}
                          onChange={(e) => setTargetStr(e.target.value)}
                          placeholder="Target"
                          className="w-24"
                        />
                      )}
                      <Button onClick={handleTraceGeneration}>Visualize</Button>
                  </div>
                  {categoryKey === 'data-structures' && algorithmKey === 'hashing' && (
                    <div className='flex gap-2 mt-2'>
                        <Input
                            id="search-key"
                            value={searchKeyStr}
                            onChange={(e) => setSearchKeyStr(e.target.value)}
                            placeholder="Key to search"
                            className="flex-1"
                        />
                    </div>
                  )}
              </div>
              {executionTrace.length > 0 && (
                <div className="flex justify-center pt-4">
                  <PlaybackControls
                    onPrev={handlePrev}
                    onNext={handleNext}
                    onPlayPause={handlePlayPause}
                    onReset={handleReset}
                    isPlaying={isPlaying}
                    canStepPrev={currentStep > 0}
                    canStepNext={currentStep < executionTrace.length - 1}
                  />
                </div>
              )}
          </CardContent>
        </Card>
        
        <Visualizer
            isLoading={isLoading}
            traceStep={currentTrace}
            type={visualizerType}
        />
      </div>

       <Card className="w-full bg-card/50">
            <CardHeader>
                <CardTitle>About {algorithm.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground leading-relaxed">{algorithm.description}</p>
            </CardContent>
        </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <Card className="w-full bg-card/50">
          <CardHeader>
            <CardTitle>Code Editor</CardTitle>
            <CardDescription>The code is for reference. Editing it won't affect the visualization.</CardDescription>
          </CardHeader>
          <CardContent>
            <CodeEditor
              code={code}
              onCodeChange={handleCodeChange}
              highlightedLine={currentTrace?.line}
              readOnly={true} />
          </CardContent>
        </Card>
        
        {executionTrace.length > 0 && currentTrace && (
          <VariableInspector variables={currentTrace.variables} />
        )}
      </div>

    </div>
  );
}
