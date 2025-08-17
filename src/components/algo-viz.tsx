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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AiExplainer } from './ai-explainer';
import { explainStep } from '@/ai/flows/explain-step';

const ALGO_TEMPLATES = {
  sorting: {
    code: `function sort(arr) {
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
}`,
    input: "5, 3, 8, 4, 2",
    visualizer: "array"
  },
  tree: {
    code: `class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Example: In-order traversal
function traverse(node) {
  if (node) {
    traverse(node.left);
    // visit(node)
    traverse(node.right);
  }
}`,
    input: "{ \"value\": 10, \"left\": { \"value\": 5 }, \"right\": { \"value\": 15 } }",
    visualizer: "tree"
  }
} as const;

type AlgorithmType = keyof typeof ALGO_TEMPLATES;

export type TraceStep = {
  line: number;
  variables: Record<string, any>;
  data: any;
  highlighted: any;
};

// Simple execution trace generator for a specific bubble sort implementation
function generateTrace(arr: number[]): TraceStep[] {
    const trace: TraceStep[] = [];
    const localArr = [...arr];

    const addTrace = (line: number, variables: Record<string, any>, highlighted: number[] = []) => {
        trace.push({
            line,
            variables: { ...variables },
            data: [...localArr],
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
  const [algorithmType, setAlgorithmType] = useState<AlgorithmType>("sorting");
  const [code, setCode] = useState(ALGO_TEMPLATES.sorting.code);
  const [inputStr, setInputStr] = useState(ALGO_TEMPLATES.sorting.input);
  const [executionTrace, setExecutionTrace] = useState<TraceStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [explanation, setExplanation] = useState('');
  const [isExplanationLoading, setIsExplanationLoading] = useState(false);

  const { toast } = useToast();

  const handleAlgorithmChange = (type: AlgorithmType) => {
    setAlgorithmType(type);
    setCode(ALGO_TEMPLATES[type].code);
    setInputStr(ALGO_TEMPLATES[type].input);
    setExecutionTrace([]);
    setCurrentStep(0);
    setIsPlaying(false);
  }

  const handleTraceGeneration = useCallback(() => {
    setIsLoading(true);
    setCurrentStep(0);
    setExecutionTrace([]);
    
    if (algorithmType !== 'sorting') {
        toast({
            title: "Coming Soon!",
            description: `Visualization for ${algorithmType} algorithms is not yet implemented.`,
        });
        setIsLoading(false);
        return;
    }

    try {
      const parsedArray = inputStr.split(',').map(s => s.trim()).filter(Boolean).map(Number);
      if (parsedArray.some(isNaN)) {
        toast({
            variant: "destructive",
            title: "Invalid Input",
            description: "Please enter a comma-separated list of numbers for sorting.",
        });
        return;
      }

      const trace = generateTrace(parsedArray);
      if (trace && trace.length > 0) {
        setExecutionTrace(trace);
      } else {
        toast({
          variant: "destructive",
          title: "Error Generating Trace",
          description: "Could not generate execution trace from the code.",
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
  }, [toast, inputStr, algorithmType]);
  
  // Initial trace generation
  useEffect(() => {
    handleTraceGeneration();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [algorithmType]); // Re-run when algo type changes

  const currentTrace = useMemo(() => executionTrace[currentStep], [executionTrace, currentStep]);

  useEffect(() => {
    if (currentTrace) {
      setIsExplanationLoading(true);
      explainStep({
        code,
        currentLine: currentTrace.line,
        variables: JSON.stringify(currentTrace.variables),
      })
      .then(result => {
        setExplanation(result.explanation);
      })
      .catch(error => {
        console.error("Error fetching explanation:", error);
        setExplanation("Could not load explanation for this step.");
      })
      .finally(() => {
        setIsExplanationLoading(false);
      });
    }
  }, [currentTrace, code]);

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
      }, 800);
      return () => clearInterval(interval);
    }
  }, [isPlaying, currentStep, executionTrace.length, handleNext]);

  const visualizerType = ALGO_TEMPLATES[algorithmType].visualizer as 'array' | 'tree';

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <Visualizer
          isLoading={isLoading}
          traceStep={currentTrace}
          type={visualizerType}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mt-8">
        <div className="flex flex-col gap-8 lg:sticky lg:top-20">
          <Card className="w-full bg-card/50">
            <CardHeader>
              <CardTitle>Configuration</CardTitle>
              <CardDescription>Select algorithm type and provide input data.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div>
                  <label htmlFor="algo-type" className="text-sm font-medium mb-2 block">Algorithm Type</label>
                  <Select value={algorithmType} onValueChange={(value) => handleAlgorithmChange(value as AlgorithmType)}>
                    <SelectTrigger id="algo-type">
                      <SelectValue placeholder="Select algorithm type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sorting">Sorting</SelectItem>
                      <SelectItem value="tree">Tree / Graph</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                    <label htmlFor="input-data" className="text-sm font-medium mb-2 block">Input Data</label>
                    <div className="flex gap-2">
                        <Input 
                            id="input-data"
                            value={inputStr}
                            onChange={(e) => setInputStr(e.target.value)}
                            placeholder={algorithmType === 'sorting' ? "e.g. 5, 3, 8, 4, 2" : "Enter data structure..."}
                        />
                        <Button onClick={handleTraceGeneration}>Visualize</Button>
                    </div>
                </div>
            </CardContent>
          </Card>
          <Card className="w-full bg-card/50">
            <CardHeader>
              <CardTitle>Code Editor</CardTitle>
              <CardDescription>Enter your algorithm in JavaScript.</CardDescription>
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
            <>
              <AiExplainer explanation={explanation} isLoading={isExplanationLoading} />
              <VariableInspector variables={currentTrace.variables} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
