
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
  countingSort: {
    name: "Counting Sort",
    code: `function countingSort(arr) {
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const range = max - min + 1;
  const count = new Array(range).fill(0);
  const output = new Array(arr.length);
  for (let i = 0; i < arr.length; i++) {
    count[arr[i] - min]++;
  }
  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
  }
  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[arr[i] - min] - 1] = arr[i];
    count[arr[i] - min]--;
  }
  for (let i = 0; i < arr.length; i++) {
    arr[i] = output[i];
  }
  return arr;
}`,
    input: "4, 2, 2, 8, 3, 3, 1",
    visualizer: "array"
  },
  radixSort: {
    name: "Radix Sort",
    code: `function radixSort(arr) {
    const max = Math.max(...arr);
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        countingSort(arr, exp);
    }
    return arr;
}

function countingSort(arr, exp) {
    let n = arr.length;
    let output = new Array(n);
    let count = new Array(10).fill(0);
    for (let i = 0; i < n; i++) {
        count[Math.floor(arr[i] / exp) % 10]++;
    }
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }
    for (let i = n - 1; i >= 0; i--) {
        output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
        count[Math.floor(arr[i] / exp) % 10]--;
    }
    for (let i = 0; i < n; i++) {
        arr[i] = output[i];
    }
}`,
    input: "170, 45, 75, 90, 802, 24, 2, 66",
    visualizer: "array"
  },
  bucketSort: {
    name: "Bucket Sort",
    code: `function bucketSort(arr, n = 5) {
    if (arr.length === 0) {
        return arr;
    }
    let min = Math.min(...arr);
    let max = Math.max(...arr);
    let buckets = Array.from({length: n}, () => []);
    for (let i = 0; i < arr.length; i++) {
        let bucketIndex = Math.floor(n * (arr[i] - min) / (max - min + 1));
        buckets[bucketIndex].push(arr[i]);
    }
    for (let i = 0; i < buckets.length; i++) {
        buckets[i].sort((a, b) => a - b);
    }
    let result = [].concat(...buckets);
    return result;
}`,
    input: "0.897, 0.565, 0.656, 0.1234, 0.665, 0.3434",
    visualizer: "array"
  },
  pigeonholeSort: {
      name: "Pigeonhole Sort",
      code: `function pigeonholeSort(arr) {
    let min = Math.min(...arr);
    let max = Math.max(...arr);
    let range = max - min + 1;
    let holes = new Array(range).fill(0).map(() => []);

    for (let i = 0; i < arr.length; i++) {
        holes[arr[i] - min].push(arr[i]);
    }

    let index = 0;
    for (let i = 0; i < range; i++) {
        let hole = holes[i];
        for (let j = 0; j < hole.length; j++) {
            arr[index++] = hole[j];
        }
    }
    return arr;
}`,
      input: "8, 3, 2, 7, 4, 6, 8",
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

function generateMergeSortTrace(arr: number[]): TraceStep[] {
    const trace: TraceStep[] = [];
    const localArr = [...arr];

    function merge(arr: number[], l: number, m: number, r: number) {
        const n1 = m - l + 1;
        const n2 = r - m;
        const L = arr.slice(l, m + 1);
        const R = arr.slice(m + 1, r + 1);
        
        trace.push({ line: 11, variables: {left: `[${L.join(',')}]`, right: `[${R.join(',')}]`}, data: [...localArr], highlighted: arr.slice(l, r + 1).map((_, i) => l + i) });

        let i = 0, j = 0, k = l;
        trace.push({ line: 12, variables: {left: `[${L.join(',')}]`, right: `[${R.join(',')}]`, resultArray: "[]", leftIndex: i, rightIndex: j}, data: [...localArr], highlighted: [] });

        while (i < n1 && j < n2) {
            trace.push({ line: 13, variables: {left: `[${L.join(',')}]`, right: `[${R.join(',')}]`, condition: `${L[i]} < ${R[j]}`}, data: [...localArr], highlighted: [l+i, m+1+j] });
            if (L[i] <= R[j]) {
                trace.push({ line: 14, variables: {}, data: [...localArr], highlighted: [l+i] });
                arr[k] = L[i];
                localArr[k] = L[i];
                trace.push({ line: 15, variables: {resultArray: `[${arr.slice(l, k+1).join(',')}]`, leftIndex: i}, data: [...localArr], highlighted: [k] });
                i++;
                trace.push({ line: 16, variables: {resultArray: `[${arr.slice(l, k+1).join(',')}]`, leftIndex: i}, data: [...localArr], highlighted: [k] });
            } else {
                trace.push({ line: 17, variables: {}, data: [...localArr], highlighted: [m+1+j] });
                arr[k] = R[j];
                localArr[k] = R[j];
                trace.push({ line: 18, variables: {resultArray: `[${arr.slice(l, k+1).join(',')}]`, rightIndex: j}, data: [...localArr], highlighted: [k] });
                j++;
                 trace.push({ line: 19, variables: {resultArray: `[${arr.slice(l, k+1).join(',')}]`, rightIndex: j}, data: [...localArr], highlighted: [k] });
            }
            k++;
        }

        while (i < n1) {
             trace.push({ line: 23, variables: {resultArray: `[${arr.slice(l, k).join(',')}]`}, data: [...localArr], highlighted: [l+i] });
            arr[k] = L[i];
            localArr[k] = L[i];
            i++;
            k++;
        }

        while (j < n2) {
             trace.push({ line: 24, variables: {resultArray: `[${arr.slice(l, k).join(',')}]`}, data: [...localArr], highlighted: [m+1+j] });
            arr[k] = R[j];
            localArr[k] = R[j];
            j++;
            k++;
        }
        trace.push({ line: 25, variables: {resultArray: `[${arr.slice(l, r+1).join(',')}]`}, data: [...localArr], highlighted: arr.slice(l, r + 1).map((_, i) => l + i) });
    }

    function sort(arr: number[], l: number, r: number) {
        trace.push({ line: 1, variables: {arr: `[${arr.slice(l,r+1).join(',')}]`}, data: [...localArr], highlighted: arr.slice(l,r+1).map((_,i) => l+i) });
        if (l < r) {
            trace.push({ line: 2, variables: { arr: `[${arr.slice(l,r+1).join(',')}]`, condition: `${arr.length} <= 1`}, data: [...localArr], highlighted: [] });
            const m = Math.floor(l + (r - l) / 2);
            trace.push({ line: 5, variables: { arr: `[${arr.slice(l,r+1).join(',')}]`, mid: m}, data: [...localArr], highlighted: [m] });
            
            trace.push({ line: 6, variables: { arr: `[${arr.slice(l,r+1).join(',')}]`}, data: [...localArr], highlighted: arr.slice(l, m+1).map((_,i) => l+i) });
            sort(arr, l, m);
            trace.push({ line: 7, variables: { arr: `[${arr.slice(l,r+1).join(',')}]`}, data: [...localArr], highlighted: arr.slice(m+1,r+1).map((_,i) => m+1+i) });
            sort(arr, m + 1, r);

            trace.push({ line: 8, variables: { arr: `[${arr.slice(l,r+1).join(',')}]`}, data: [...localArr], highlighted: arr.slice(l, r + 1).map((_, i) => l + i) });
            merge(arr, l, m, r);
        } else {
             trace.push({ line: 2, variables: { arr: `[${arr.slice(l,r+1).join(',')}]`, condition: `${arr.length} <= 1`}, data: [...localArr], highlighted: [] });
             trace.push({ line: 3, variables: { arr: `[${arr.slice(l,r+1).join(',')}]`}, data: [...localArr], highlighted: [] });
        }
    }
    
    sort(localArr, 0, localArr.length - 1);
    trace.push({line: 9, variables: { 'return value': `[${localArr.join(', ')}]`}, data: localArr, highlighted: []});
    return trace;
}


function generateQuickSortTrace(arr: number[]): TraceStep[] {
    const trace: TraceStep[] = [];
    const localArr = [...arr];

    function partition(low: number, high: number) {
        trace.push({ line: 11, variables: { arr: `[${localArr.join(', ')}]`, low, high }, data: [...localArr], highlighted: [] });
        let pivot = localArr[high];
        trace.push({ line: 12, variables: { arr: `[${localArr.join(', ')}]`, low, high, pivot }, data: [...localArr], highlighted: [high] });
        let i = low - 1;
        trace.push({ line: 13, variables: { arr: `[${localArr.join(', ')}]`, low, high, pivot, i }, data: [...localArr], highlighted: [] });

        for (let j = low; j < high; j++) {
            trace.push({ line: 14, variables: { arr: `[${localArr.join(', ')}]`, low, high, pivot, i, j }, data: [...localArr], highlighted: [j] });
            trace.push({ line: 15, variables: { arr: `[${localArr.join(', ')}]`, low, high, pivot, i, j, condition: `${localArr[j]} < ${pivot}` }, data: [...localArr], highlighted: [j, high] });
            if (localArr[j] < pivot) {
                i++;
                trace.push({ line: 16, variables: { arr: `[${localArr.join(', ')}]`, low, high, pivot, i, j }, data: [...localArr], highlighted: [i] });
                [localArr[i], localArr[j]] = [localArr[j], localArr[i]];
                trace.push({ line: 17, variables: { arr: `[${localArr.join(', ')}]`, low, high, pivot, i, j }, data: [...localArr], highlighted: [i,j] });
            }
        }
        [localArr[i + 1], localArr[high]] = [localArr[high], localArr[i + 1]];
        trace.push({ line: 20, variables: { arr: `[${localArr.join(', ')}]`, low, high, pivot, i }, data: [...localArr], highlighted: [i+1, high] });
        trace.push({ line: 21, variables: { arr: `[${localArr.join(', ')}]`, low, high, 'return value': i + 1 }, data: [...localArr], highlighted: [i+1] });
        return i + 1;
    }

    function sort(low: number, high: number) {
        trace.push({ line: 1, variables: { arr: `[${localArr.join(', ')}]`, low, high }, data: [...localArr], highlighted: [] });
        trace.push({ line: 2, variables: { arr: `[${localArr.join(', ')}]`, low, high, condition: `${low} < ${high}` }, data: [...localArr], highlighted: [] });
        if (low < high) {
            let pi = partition(low, high);
            trace.push({ line: 3, variables: { arr: `[${localArr.join(', ')}]`, low, high, pi }, data: [...localArr], highlighted: [pi] });
            trace.push({ line: 4, variables: { arr: `[${localArr.join(', ')}]`, low, high, pi }, data: [...localArr], highlighted: [] });
            sort(low, pi - 1);
            trace.push({ line: 5, variables: { arr: `[${localArr.join(', ')}]`, low, high, pi }, data: [...localArr], highlighted: [] });
            sort(pi + 1, high);
        }
    }
    
    sort(0, localArr.length - 1);
    trace.push({line: 8, variables: { 'return value': `[${localArr.join(', ')}]`}, data: localArr, highlighted: []});
    return trace;
}

function generateHeapSortTrace(arr: number[]): TraceStep[] {
    const trace: TraceStep[] = [];
    const localArr = [...arr];
    let n = localArr.length;

    function heapify(size: number, i: number) {
        trace.push({ line: 14, variables: { arr: `[${localArr.join(', ')}]`, n: size, i }, data: [...localArr], highlighted: [i] });
        let largest = i;
        let l = 2 * i + 1;
        let r = 2 * i + 2;
        trace.push({ line: 15, variables: { arr: `[${localArr.join(', ')}]`, n: size, i, largest }, data: [...localArr], highlighted: [i] });
        trace.push({ line: 16, variables: { arr: `[${localArr.join(', ')}]`, n: size, i, largest, l }, data: [...localArr], highlighted: [l] });
        trace.push({ line: 17, variables: { arr: `[${localArr.join(', ')}]`, n: size, i, largest, l, r }, data: [...localArr], highlighted: [r] });
        trace.push({ line: 18, variables: { arr: `[${localArr.join(', ')}]`, n: size, i, largest, l, r, condition: `${l} < ${size} && ${localArr[l]} > ${localArr[largest]}` }, data: [...localArr], highlighted: [l, largest] });
        if (l < size && localArr[l] > localArr[largest]) {
            largest = l;
            trace.push({ line: 19, variables: { arr: `[${localArr.join(', ')}]`, n: size, i, largest }, data: [...localArr], highlighted: [largest] });
        }
        trace.push({ line: 20, variables: { arr: `[${localArr.join(', ')}]`, n: size, i, largest, l, r, condition: `${r} < ${size} && ${localArr[r]} > ${localArr[largest]}` }, data: [...localArr], highlighted: [r, largest] });
        if (r < size && localArr[r] > localArr[largest]) {
            largest = r;
            trace.push({ line: 21, variables: { arr: `[${localArr.join(', ')}]`, n: size, i, largest }, data: [...localArr], highlighted: [largest] });
        }

        trace.push({ line: 22, variables: { arr: `[${localArr.join(', ')}]`, n: size, i, largest, condition: `${largest} != ${i}`}, data: [...localArr], highlighted: [largest, i] });
        if (largest !== i) {
            let swap = localArr[i];
            trace.push({ line: 23, variables: { arr: `[${localArr.join(', ')}]`, n: size, i, largest, swap }, data: [...localArr], highlighted: [i, largest] });
            localArr[i] = localArr[largest];
            trace.push({ line: 24, variables: { arr: `[${localArr.join(', ')}]`, n: size, i, largest, 'arr[i]': localArr[i] }, data: [...localArr], highlighted: [i, largest] });
            localArr[largest] = swap;
            trace.push({ line: 25, variables: { arr: `[${localArr.join(', ')}]`, n: size, i, largest, 'arr[largest]': localArr[largest] }, data: [...localArr], highlighted: [i, largest] });
            heapify(size, largest);
        }
    }

    trace.push({ line: 2, variables: { arr: `[${localArr.join(', ')}]`, n }, data: [...localArr], highlighted: [] });
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        trace.push({ line: 3, variables: { arr: `[${localArr.join(', ')}]`, n, i }, data: [...localArr], highlighted: [i] });
        heapify(n, i);
        trace.push({ line: 4, variables: { arr: `[${localArr.join(', ')}]`, n, i }, data: [...localArr], highlighted: [i] });
    }

    for (let i = n - 1; i > 0; i--) {
        trace.push({ line: 5, variables: { arr: `[${localArr.join(', ')}]`, n, i }, data: [...localArr], highlighted: [i] });
        let temp = localArr[0];
        trace.push({ line: 6, variables: { arr: `[${localArr.join(', ')}]`, n, i, temp }, data: [...localArr], highlighted: [0, i] });
        localArr[0] = localArr[i];
        trace.push({ line: 7, variables: { arr: `[${localArr.join(', ')}]`, n, i, temp, 'arr[0]': localArr[0] }, data: [...localArr], highlighted: [0, i] });
        localArr[i] = temp;
        trace.push({ line: 8, variables: { arr: `[${localArr.join(', ')}]`, n, i, temp, 'arr[i]': localArr[i] }, data: [...localArr], highlighted: [0, i] });
        heapify(i, 0);
        trace.push({ line: 9, variables: { arr: `[${localArr.join(', ')}]`, n, i }, data: [...localArr], highlighted: [i] });
    }
    trace.push({ line: 12, variables: { arr: `[${localArr.join(', ')}]`, 'return value': `[${localArr.join(', ')}]` }, data: [...localArr], highlighted: [] });
    return trace;
}

function generateCountingSortTrace(arr: number[]): TraceStep[] {
    const trace: TraceStep[] = [];
    const localArr = [...arr];
    const addTrace = (line: number, variables: Record<string, any>, highlighted: number[] = []) => {
        trace.push({ line, variables: { ...variables }, data: [...localArr], highlighted });
    };

    const max = Math.max(...localArr);
    addTrace(2, { arr: `[${localArr.join(', ')}]`, max });
    const min = Math.min(...localArr);
    addTrace(3, { arr: `[${localArr.join(', ')}]`, max, min });
    const range = max - min + 1;
    addTrace(4, { arr: `[${localArr.join(', ')}]`, max, min, range });
    const count = new Array(range).fill(0);
    addTrace(5, { arr: `[${localArr.join(', ')}]`, count: `[${count.join(',')}]` });
    const output = new Array(localArr.length);
    addTrace(6, { arr: `[${localArr.join(', ')}]`, count: `[${count.join(',')}]`, output: `[${output.join(',')}]` });

    for (let i = 0; i < localArr.length; i++) {
        addTrace(7, { i }, [i]);
        count[localArr[i] - min]++;
        addTrace(8, { i, count: `[${count.join(',')}]` }, [i]);
    }
    
    for (let i = 1; i < count.length; i++) {
        addTrace(10, { i, count: `[${count.join(',')}]` });
        count[i] += count[i - 1];
        addTrace(11, { i, count: `[${count.join(',')}]` });
    }

    for (let i = localArr.length - 1; i >= 0; i--) {
        addTrace(13, { i }, [i]);
        output[count[localArr[i] - min] - 1] = localArr[i];
        addTrace(14, { i, output: `[${output.join(',')}]` }, [i]);
        count[localArr[i] - min]--;
        addTrace(15, { i, count: `[${count.join(',')}]` }, [i]);
    }

    for (let i = 0; i < localArr.length; i++) {
        addTrace(17, { i });
        localArr[i] = output[i];
        addTrace(18, { i, arr: `[${localArr.join(',')}]` }, [i]);
    }
    addTrace(20, { 'return value': `[${localArr.join(', ')}]` });
    return trace;
}

function generateRadixSortTrace(arr: number[]): TraceStep[] {
    const trace: TraceStep[] = [];
    let localArr = [...arr];

    const max = Math.max(...localArr);
    trace.push({line: 2, variables: { arr: `[${localArr.join(',')}]`, max }, data: [...localArr], highlighted:[] });
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        trace.push({line: 3, variables: { arr: `[${localArr.join(',')}]`, exp }, data: [...localArr], highlighted:[] });
        
        let n = localArr.length;
        let output = new Array(n);
        let count = new Array(10).fill(0);
        trace.push({line: 11, variables: { arr: `[${localArr.join(',')}]`, exp, n, output: `[${output.join(',')}]`, count: `[${count.join(',')}]`}, data: [...localArr], highlighted:[] });
        for (let i = 0; i < n; i++) {
            trace.push({line: 12, variables: {i}, data: [...localArr], highlighted:[i] });
            count[Math.floor(localArr[i] / exp) % 10]++;
            trace.push({line: 13, variables: {i, count: `[${count.join(',')}]` }, data: [...localArr], highlighted:[i] });
        }
        for (let i = 1; i < 10; i++) {
             trace.push({line: 15, variables: {i}, data: [...localArr], highlighted:[] });
            count[i] += count[i - 1];
             trace.push({line: 16, variables: {i, count: `[${count.join(',')}]`}, data: [...localArr], highlighted:[] });
        }
        for (let i = n - 1; i >= 0; i--) {
            trace.push({line: 18, variables: {i}, data: [...localArr], highlighted:[i] });
            output[count[Math.floor(localArr[i] / exp) % 10] - 1] = localArr[i];
            trace.push({line: 19, variables: {i, output: `[${output.join(',')}]`}, data: [...localArr], highlighted:[i] });
            count[Math.floor(localArr[i] / exp) % 10]--;
            trace.push({line: 20, variables: {i, count: `[${count.join(',')}]`}, data: [...localArr], highlighted:[i] });
        }
        for (let i = 0; i < n; i++) {
            trace.push({line: 22, variables: {i}, data: [...localArr], highlighted:[i] });
            localArr[i] = output[i];
            trace.push({line: 23, variables: {i, arr: `[${localArr.join(',')}]`}, data: [...output], highlighted:[i] });
        }
        trace.push({line: 5, variables: { arr: `[${localArr.join(',')}]`, exp }, data: [...localArr], highlighted:[] });
    }
    trace.push({line: 7, variables: { 'return value': `[${localArr.join(', ')}]` }, data: [...localArr], highlighted:[] });

    return trace;
}

function generateBucketSortTrace(arr: number[]): TraceStep[] {
    const trace: TraceStep[] = [];
    let localArr = [...arr];
    const addTrace = (line: number, variables: Record<string, any>, highlighted: number[] = []) => {
        trace.push({ line, variables: { ...variables }, data: [...localArr], highlighted });
    };

    const n = 5; // Number of buckets

    addTrace(1, { arr: `[${localArr.join(', ')}]`, n });
    if (localArr.length === 0) {
        addTrace(2, {});
        addTrace(3, { 'return value': '[]' });
        return trace;
    }

    addTrace(5, {});
    let min = Math.min(...localArr);
    addTrace(6, { min });
    let max = Math.max(...localArr);
    addTrace(7, { min, max });
    let buckets = Array.from({length: n}, () => []);
    addTrace(8, { buckets: JSON.stringify(buckets) });

    for (let i = 0; i < localArr.length; i++) {
        addTrace(9, { i }, [i]);
        let bucketIndex = Math.floor(n * (localArr[i] - min) / (max - min + 1));
        addTrace(10, { i, bucketIndex }, [i]);
        buckets[bucketIndex].push(localArr[i]);
        addTrace(11, { i, bucketIndex, buckets: JSON.stringify(buckets) }, [i]);
    }

    for (let i = 0; i < buckets.length; i++) {
        addTrace(13, { i, buckets: JSON.stringify(buckets) });
        buckets[i].sort((a, b) => a - b);
        addTrace(14, { i, buckets: JSON.stringify(buckets) });
    }

    localArr = [].concat(...buckets);
    addTrace(16, { result: `[${localArr.join(',')}]` });
    addTrace(17, { 'return value': `[${localArr.join(',')}]` });

    return trace;
}

function generatePigeonholeSortTrace(arr: number[]): TraceStep[] {
    const trace: TraceStep[] = [];
    let localArr = [...arr];
    const addTrace = (line: number, variables: Record<string, any>, highlighted: number[] = []) => {
        trace.push({ line, variables: { ...variables }, data: [...localArr], highlighted });
    };

    let min = Math.min(...localArr);
    addTrace(2, { arr: `[${localArr.join(',')}]`, min });
    let max = Math.max(...localArr);
    addTrace(3, { min, max });
    let range = max - min + 1;
    addTrace(4, { min, max, range });
    let holes = new Array(range).fill(0).map(() => []);
    addTrace(5, { holes: JSON.stringify(holes) });

    for (let i = 0; i < localArr.length; i++) {
        addTrace(7, { i }, [i]);
        holes[localArr[i] - min].push(localArr[i]);
        addTrace(8, { i, holes: JSON.stringify(holes) }, [i]);
    }

    let index = 0;
    addTrace(11, { index });
    for (let i = 0; i < range; i++) {
        addTrace(12, { i, index });
        let hole = holes[i];
        addTrace(13, { i, index, hole: `[${hole.join(',')}]` });
        for (let j = 0; j < hole.length; j++) {
            addTrace(14, { i, j, index });
            localArr[index++] = hole[j];
            addTrace(15, { i, j, index, arr: `[${localArr.join(',')}]` }, [index - 1]);
        }
    }
    addTrace(18, { 'return value': `[${localArr.join(',')}]` });
    return trace;
}


const TRACE_GENERATORS = {
  bubbleSort: generateBubbleSortTrace,
  selectionSort: generateSelectionSortTrace,
  insertionSort: generateInsertionSortTrace,
  mergeSort: generateMergeSortTrace,
  quickSort: generateQuickSortTrace,
  heapSort: generateHeapSortTrace,
  countingSort: generateCountingSortTrace,
  radixSort: generateRadixSortTrace,
  bucketSort: generateBucketSortTrace,
  pigeonholeSort: generatePigeonholeSortTrace,
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
      if (parsedArray.some(isNaN) && algorithmType !== 'bucketSort') { // Bucket sort can handle floats
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
            <CardDescription>Select algorithm, provide input, and control playback.</CardDescription>
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
                      <SelectLabel>Comparison Sorting</SelectLabel>
                      <SelectItem value="bubbleSort">Bubble Sort</SelectItem>
                      <SelectItem value="selectionSort">Selection Sort</SelectItem>
                      <SelectItem value="insertionSort">Insertion Sort</SelectItem>
                      <SelectItem value="mergeSort">Merge Sort</SelectItem>
                      <SelectItem value="quickSort">Quick Sort</SelectItem>
                      <SelectItem value="heapSort">Heap Sort</SelectItem>
                    </SelectGroup>
                     <SelectGroup>
                      <SelectLabel>Non-Comparison Sorting</SelectLabel>
                      <SelectItem value="countingSort">Counting Sort</SelectItem>
                      <SelectItem value="radixSort">Radix Sort</SelectItem>
                      <SelectItem value="bucketSort">Bucket Sort</SelectItem>
                      <SelectItem value="pigeonholeSort">Pigeonhole Sort</SelectItem>
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

    
