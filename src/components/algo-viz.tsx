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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

const ALGO_TEMPLATES = {
  bubbleSort: {
    name: "Bubble Sort",
    code: `function bubbleSort(arr) {
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
  selectionSort: {
    name: "Selection Sort",
    code: `function selectionSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let min_idx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[min_idx]) {
        min_idx = j;
      }
    }
    let temp = arr[min_idx];
    arr[min_idx] = arr[i];
    arr[i] = temp;
  }
  return arr;
}`,
    input: "64, 25, 12, 22, 11",
    visualizer: "array"
  },
  insertionSort: {
    name: "Insertion Sort",
    code: `function insertionSort(arr) {
  let n = arr.length;
  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
    input: "12, 11, 13, 5, 6",
    visualizer: "array"
  },
  mergeSort: {
    name: "Merge Sort",
    code: `function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  let resultArray = [], leftIndex = 0, rightIndex = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      resultArray.push(left[leftIndex]);
      leftIndex++;
    } else {
      resultArray.push(right[rightIndex]);
      rightIndex++;
    }
  }
  return resultArray
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));
}`,
    input: "38, 27, 43, 3, 9, 82, 10",
    visualizer: "array"
  },
  quickSort: {
    name: "Quick Sort",
    code: `function quickSort(arr, low, high) {
  if (low < high) {
    let pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  let pivot = arr[high];
  let i = (low - 1);
  for (let j = low; j <= high - 1; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return (i + 1);
}`,
    input: "10, 7, 8, 9, 1, 5",
    visualizer: "array"
  },
  heapSort: {
    name: "Heap Sort",
    code: `function heapSort(arr) {
    var n = arr.length;
    for (var i = Math.floor(n / 2) - 1; i >= 0; i--)
        heapify(arr, n, i);
    for (var i = n - 1; i > 0; i--) {
        var temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        heapify(arr, i, 0);
    }
    return arr;
}
function heapify(arr, n, i) {
    var largest = i;
    var l = 2 * i + 1;
    var r = 2 * i + 2;
    if (l < n && arr[l] > arr[largest])
        largest = l;
    if (r < n && arr[r] > arr[largest])
        largest = r;
    if (largest != i) {
        var swap = arr[i];
        arr[i] = arr[largest];
        arr[largest] = swap;
        heapify(arr, n, largest);
    }
}`,
    input: "12, 11, 13, 5, 6, 7",
    visualizer: "array"
  },
  tree: {
    name: "Tree / Graph Traversal",
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

// Trace generation functions for each sorting algorithm
function generateBubbleSortTrace(arr: number[]): TraceStep[] {
    const trace: TraceStep[] = [];
    const localArr = [...arr];
    const addTrace = (line: number, variables: Record<string, any>, highlighted: number[] = []) => {
        trace.push({ line, variables: { ...variables }, data: [...localArr], highlighted });
    };
    let n = localArr.length;
    addTrace(2, { arr: `[${localArr.join(', ')}]`, n });
    for (let i = 0; i < n - 1; i++) {
        addTrace(3, { arr: `[${localArr.join(', ')}]`, n, i });
        for (let j = 0; j < n - i - 1; j++) {
            addTrace(4, { arr: `[${localArr.join(', ')}]`, n, i, j });
            addTrace(5, { arr: `[${localArr.join(', ')}]`, n, i, j, comparison: `${localArr[j]} > ${localArr[j + 1]}` }, [j, j + 1]);
            if (localArr[j] > localArr[j + 1]) {
                let temp = localArr[j];
                addTrace(6, { arr: `[${localArr.join(', ')}]`, n, i, j, temp }, [j, j+1]);
                localArr[j] = localArr[j + 1];
                addTrace(7, { arr: `[${localArr.join(', ')}]`, n, i, j, temp, 'arr[j]': localArr[j] }, [j, j+1]);
                localArr[j + 1] = temp;
                addTrace(8, { arr: `[${localArr.join(', ')}]`, n, i, j, temp, 'arr[j+1]': localArr[j+1] }, [j, j+1]);
            }
        }
    }
    addTrace(11, { arr: `[${localArr.join(', ')}]`, 'return value': `[${localArr.join(', ')}]` });
    return trace;
}

function generateSelectionSortTrace(arr: number[]): TraceStep[] {
  const trace: TraceStep[] = [];
  const localArr = [...arr];
  const addTrace = (line: number, variables: Record<string, any>, highlighted: number[] = []) => {
      trace.push({ line, variables: { ...variables }, data: [...localArr], highlighted });
  };
  let n = localArr.length;
  addTrace(2, { arr: `[${localArr.join(', ')}]`, n });
  for (let i = 0; i < n - 1; i++) {
    addTrace(3, { arr: `[${localArr.join(', ')}]`, n, i });
    let min_idx = i;
    addTrace(4, { arr: `[${localArr.join(', ')}]`, n, i, min_idx }, [i]);
    for (let j = i + 1; j < n; j++) {
      addTrace(5, { arr: `[${localArr.join(', ')}]`, n, i, min_idx, j });
      addTrace(6, { arr: `[${localArr.join(', ')}]`, n, i, min_idx, j, comparison: `${localArr[j]} < ${localArr[min_idx]}` }, [j, min_idx]);
      if (localArr[j] < localArr[min_idx]) {
        min_idx = j;
        addTrace(7, { arr: `[${localArr.join(', ')}]`, n, i, min_idx, j }, [j, min_idx]);
      }
    }
    let temp = localArr[min_idx];
    addTrace(10, { arr: `[${localArr.join(', ')}]`, n, i, min_idx, temp }, [min_idx, i]);
    localArr[min_idx] = localArr[i];
    addTrace(11, { arr: `[${localArr.join(', ')}]`, n, i, min_idx, temp, 'arr[min_idx]': localArr[min_idx] }, [min_idx, i]);
    localArr[i] = temp;
    addTrace(12, { arr: `[${localArr.join(', ')}]`, n, i, min_idx, temp, 'arr[i]': localArr[i] }, [min_idx, i]);
  }
  addTrace(14, { arr: `[${localArr.join(', ')}]`, 'return value': `[${localArr.join(', ')}]` });
  return trace;
}

function generateInsertionSortTrace(arr: number[]): TraceStep[] {
    const trace: TraceStep[] = [];
    const localArr = [...arr];
    const addTrace = (line: number, variables: Record<string, any>, highlighted: number[] = []) => {
        trace.push({ line, variables: { ...variables }, data: [...localArr], highlighted });
    };
    let n = localArr.length;
    addTrace(2, { arr: `[${localArr.join(', ')}]`, n });
    for (let i = 1; i < n; i++) {
        addTrace(3, { arr: `[${localArr.join(', ')}]`, n, i });
        let key = localArr[i];
        addTrace(4, { arr: `[${localArr.join(', ')}]`, n, i, key }, [i]);
        let j = i - 1;
        addTrace(5, { arr: `[${localArr.join(', ')}]`, n, i, key, j }, [i, j]);
        while (j >= 0 && localArr[j] > key) {
            addTrace(6, { arr: `[${localArr.join(', ')}]`, n, i, key, j, condition: `${j} >= 0 && ${localArr[j]} > ${key}` }, [j, i]);
            localArr[j + 1] = localArr[j];
            addTrace(7, { arr: `[${localArr.join(', ')}]`, n, i, key, j, 'arr[j+1]': localArr[j+1] }, [j+1, j]);
            j = j - 1;
            addTrace(8, { arr: `[${localArr.join(', ')}]`, n, i, key, j }, [j+1]);
        }
        addTrace(6, { arr: `[${localArr.join(', ')}]`, n, i, key, j, condition: j < 0 ? 'false' : `${j} >= 0 && ${localArr[j]} > ${key}` }, [j < 0 ? i : j, i]);
        localArr[j + 1] = key;
        addTrace(10, { arr: `[${localArr.join(', ')}]`, n, i, key, j, 'arr[j+1]': key }, [j+1]);
    }
    addTrace(12, { arr: `[${localArr.join(', ')}]`, 'return value': `[${localArr.join(', ')}]` });
    return trace;
}

const TRACE_GENERATORS = {
  bubbleSort: generateBubbleSortTrace,
  selectionSort: generateSelectionSortTrace,
  insertionSort: generateInsertionSortTrace,
  mergeSort: (arr: number[]) => { 
    // Simplified trace for complex recursive algorithms
    const trace: TraceStep[] = [];
    const sorted = [...arr].sort((a,b) => a - b);
    trace.push({line: 1, variables: {arr: `[${arr.join(', ')}]`}, data: arr, highlighted: []});
    trace.push({line: 15, variables: {'return value': `[${sorted.join(', ')}]`}, data: sorted, highlighted: []});
    return trace;
  },
   quickSort: (arr: number[]) => { 
    const trace: TraceStep[] = [];
    const sorted = [...arr].sort((a,b) => a - b);
    trace.push({line: 1, variables: {arr: `[${arr.join(', ')}]`}, data: arr, highlighted: []});
    trace.push({line: 18, variables: {'return value': `[${sorted.join(', ')}]`}, data: sorted, highlighted: []});
    return trace;
  },
  heapSort: (arr: number[]) => { 
    const trace: TraceStep[] = [];
    const sorted = [...arr].sort((a,b) => a - b);
    trace.push({line: 1, variables: {arr: `[${arr.join(', ')}]`}, data: arr, highlighted: []});
    trace.push({line: 13, variables: {'return value': `[${sorted.join(', ')}]`}, data: sorted, highlighted: []});
    return trace;
  },
  // Placeholders for other algorithms
  shellSort: (arr: number[]) => [],
  combSort: (arr: number[]) => [],
  cycleSort: (arr: number[]) => [],
  tree: (arr: any) => [],
};

export function AlgoViz() {
  const [algorithmType, setAlgorithmType] = useState<AlgorithmType>("bubbleSort");
  const [code, setCode] = useState(ALGO_TEMPLATES.bubbleSort.code);
  const [inputStr, setInputStr] = useState(ALGO_TEMPLATES.bubbleSort.input);
  const [executionTrace, setExecutionTrace] = useState<TraceStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const handleAlgorithmChange = (type: AlgorithmType) => {
    if (!type || !ALGO_TEMPLATES[type]) return;
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
    
    if (ALGO_TEMPLATES[algorithmType].visualizer === 'tree') {
        toast({
            title: "Coming Soon!",
            description: `Visualization for ${ALGO_TEMPLATES[algorithmType].name} is not yet implemented.`,
            variant: 'default',
        });
        setIsLoading(false);
        setExecutionTrace([]);
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
        setIsLoading(false);
        return;
      }

      const traceGenerator = TRACE_GENERATORS[algorithmType as keyof typeof TRACE_GENERATORS] as (arr: number[]) => TraceStep[];
      if (!traceGenerator) {
          toast({
              title: "Not Implemented",
              description: `The visualizer for ${ALGO_TEMPLATES[algorithmType].name} is not yet implemented.`,
          });
          setIsLoading(false);
          return;
      }

      const trace = traceGenerator(parsedArray);
      if (trace && trace.length > 0) {
        setExecutionTrace(trace);
      } else if (trace) {
         toast({
          title: "Visualization Not Ready",
          description: `The visualizer for ${ALGO_TEMPLATES[algorithmType].name} is coming soon.`,
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
  }, [algorithmType]);

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

  const visualizerType = ALGO_TEMPLATES[algorithmType].visualizer as 'array' | 'tree';

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
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
                    <SelectGroup>
                      <SelectLabel>Sorting Algorithms</SelectLabel>
                      <SelectItem value="bubbleSort">Bubble Sort</SelectItem>
                      <SelectItem value="selectionSort">Selection Sort</SelectItem>
                      <SelectItem value="insertionSort">Insertion Sort</SelectItem>
                      <SelectItem value="mergeSort">Merge Sort</SelectItem>
                      <SelectItem value="quickSort">Quick Sort</SelectItem>
                      <SelectItem value="heapSort">Heap Sort</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                        <SelectLabel>Other Data Structures</SelectLabel>
                        <SelectItem value="tree">Tree / Graph</SelectItem>
                    </SelectGroup>
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
                          placeholder={ALGO_TEMPLATES[algorithmType].visualizer === 'array' ? "e.g. 5, 3, 8, 4, 2" : "Enter data structure..."}
                      />
                      <Button onClick={handleTraceGeneration}>Visualize</Button>
                  </div>
              </div>
          </CardContent>
        </Card>
        
        <Visualizer
            isLoading={isLoading}
            traceStep={currentTrace}
            type={visualizerType}
        />
      </div>

      {executionTrace.length > 0 && (
        <div className="sticky bottom-4 z-10 flex justify-center">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <Card className="w-full bg-card/50">
          <CardHeader>
            <CardTitle>Code Editor</CardTitle>
            <CardDescription>The code is for reference. Editing it won't affect the visualization yet.</CardDescription>
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
