
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
import { Faq } from '@/components/faq';
import { ALGO_CATEGORIES, AlgorithmCategoryKey, AlgorithmKey } from '@/lib/algo-templates';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export type TraceStep = {
  line: number;
  variables: Record<string, any>;
  data: any;
  highlighted: any;
  secondaryHighlight?: any;
  tableState?: any;
  treeData?: any;
  traversalPath?: number[];
};

type TreeNode = {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
  height?: number;
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

function generateTimSortTrace(arr: number[]): TraceStep[] {
    const trace: TraceStep[] = [];
    const localArr = [...arr];
    const RUN = 32;

    const addTrace = (line: number, variables: Record<string, any>, highlighted: number[] = []) => {
        trace.push({ line, variables: { ...variables }, data: [...localArr], highlighted });
    };

    function insertionSortForTim(arr: number[], left: number, right: number) {
        addTrace(4, { arr: `[${localArr.join(',')}]`, left, right }, Array.from({length: right - left + 1}, (_, i) => left + i));
        for (let i = left + 1; i <= right; i++) {
            addTrace(5, { i }, [i]);
            let temp = arr[i];
            addTrace(6, { i, temp }, [i]);
            let j = i - 1;
            addTrace(7, { i, temp, j }, [j]);
            while (j >= left && arr[j] > temp) {
                addTrace(8, { j, temp, condition: `${arr[j]} > ${temp}` }, [j, j + 1]);
                arr[j + 1] = arr[j];
                localArr[j + 1] = arr[j+1];
                addTrace(9, { arr: `[${localArr.join(',')}]` }, [j + 1]);
                j--;
                addTrace(10, { j }, [j+1]);
            }
            arr[j + 1] = temp;
            localArr[j + 1] = temp;
            addTrace(12, { arr: `[${localArr.join(',')}]` }, [j + 1]);
        }
    }

    function mergeForTim(arr: number[], l: number, m: number, r: number) {
        addTrace(16, { arr: `[${localArr.join(',')}]`, l, m, r }, Array.from({length: r - l + 1}, (_, i) => l + i));
        let len1 = m - l + 1, len2 = r - m;
        let left = new Array(len1);
        let right = new Array(len2);
        addTrace(17, { len1, len2 });
        addTrace(18, { left: '[]' });
        addTrace(19, { right: '[]' });

        for (let i = 0; i < len1; i++) {
            left[i] = arr[l + i];
            addTrace(21, { i, left: `[${left.slice(0, i+1).join(',')}]` }, [l+i]);
        }
        for (let i = 0; i < len2; i++) {
            right[i] = arr[m + 1 + i];
            addTrace(23, { i, right: `[${right.slice(0, i+1).join(',')}]` }, [m+1+i]);
        }
        
        let i = 0, j = 0, k = l;
        addTrace(25, { i, j, k });

        while (i < len1 && j < len2) {
            addTrace(27, { condition: `${left[i]} <= ${right[j]}` }, [l + i, m + 1 + j]);
            if (left[i] <= right[j]) {
                arr[k] = left[i];
                localArr[k] = left[i];
                addTrace(29, { arr: `[${localArr.join(',')}]`, k, value: left[i] }, [k]);
                i++;
                addTrace(30, { i }, []);
            } else {
                arr[k] = right[j];
                localArr[k] = right[j];
                addTrace(32, { arr: `[${localArr.join(',')}]`, k, value: right[j] }, [k]);
                j++;
                addTrace(33, { j }, []);
            }
            k++;
            addTrace(35, { k }, []);
        }

        while (i < len1) {
            addTrace(38, { i, len1 }, [l+i]);
            arr[k] = left[i];
            localArr[k] = left[i];
            addTrace(39, { arr: `[${localArr.join(',')}]`, k, value: left[i] }, [k]);
            k++; i++;
            addTrace(40, { k, i }, []);
        }

        while (j < len2) {
            addTrace(44, { j, len2 }, [m+1+j]);
            arr[k] = right[j];
            localArr[k] = right[j];
            addTrace(45, { arr: `[${localArr.join(',')}]`, k, value: right[j] }, [k]);
            k++; j++;
            addTrace(46, { k, j }, []);
        }
    }

    let n = localArr.length;
    addTrace(51, { n });

    for (let i = 0; i < n; i += RUN) {
        addTrace(53, { i, RUN });
        const right = Math.min(i + RUN - 1, n - 1);
        insertionSortForTim(localArr, i, right);
        addTrace(54, { arr: `[${localArr.join(',')}]` }, Array.from({length: right - i + 1}, (_, k) => i + k));
    }

    for (let size = RUN; size < n; size = 2 * size) {
        addTrace(58, { size });
        for (let left = 0; left < n; left += 2 * size) {
            addTrace(59, { left });
            let mid = left + size - 1;
            addTrace(60, { mid });
            let right = Math.min((left + 2 * size - 1), (n - 1));
            addTrace(61, { right });
            addTrace(62, { condition: `${mid} < ${right}` });
            if (mid < right) {
                mergeForTim(localArr, left, mid, right);
                addTrace(63, { arr: `[${localArr.join(',')}]` }, Array.from({length: right - left + 1}, (_, k) => left + k));
            }
        }
    }
    addTrace(67, { 'return value': `[${localArr.join(',')}]` });
    return trace;
}

function generateIntroSortTrace(arr: number[]): TraceStep[] {
    const trace: TraceStep[] = [];
    const localArr = [...arr];

    const addTrace = (line: number, variables: Record<string, any>, highlighted: number[] = []) => {
        trace.push({ line, variables: { ...variables, arr: `[${localArr.join(',')}]` }, data: [...localArr], highlighted });
    };

    function insertionSort(begin: number, end: number) {
        addTrace(68, { begin, end, status: "Running Insertion Sort" }, Array.from({length: end-begin+1}, (_,i) => begin+i) );
        for (let i = begin + 1; i <= end; i++) {
            addTrace(69, { i }, [i]);
            let key = localArr[i];
            addTrace(70, { i, key }, [i]);
            let j = i - 1;
            addTrace(71, { i, key, j }, [j]);
            while (j >= begin && localArr[j] > key) {
                addTrace(72, { j, key, condition: `${localArr[j]} > ${key}` }, [j, j+1]);
                localArr[j + 1] = localArr[j];
                addTrace(73, { arr: `[${localArr.join(',')}]` }, [j+1]);
                j = j - 1;
                addTrace(74, { j }, [j+1]);
            }
            localArr[j + 1] = key;
            addTrace(76, { arr: `[${localArr.join(',')}]` }, [j+1]);
        }
    }

    function heapify(n: number, i: number, offset: number) {
        addTrace(52, { n, i, offset });
        let largest = i;
        addTrace(53, { largest });
        let l = 2 * i + 1;
        addTrace(54, { l });
        let r = 2 * i + 2;
        addTrace(55, { r });

        addTrace(56, { condition: `${l} < ${n} && ${localArr[offset + l]} > ${localArr[offset + largest]}`}, [offset+l, offset+largest]);
        if (l < n && localArr[offset + l] > localArr[offset + largest]) largest = l;
        addTrace(57, { largest });
        
        addTrace(58, { condition: `${r} < ${n} && ${localArr[offset + r]} > ${localArr[offset + largest]}` }, [offset+r, offset+largest]);
        if (r < n && localArr[offset + r] > localArr[offset + largest]) largest = r;
        addTrace(59, { largest });

        addTrace(60, { condition: `${largest} !== ${i}`}, [offset+i, offset+largest]);
        if (largest !== i) {
            [localArr[offset+i], localArr[offset+largest]] = [localArr[offset+largest], localArr[offset+i]];
            addTrace(61, { arr: `[${localArr.join(',')}]` }, [offset+i, offset+largest]);
            heapify(n, largest, offset);
            addTrace(62, {});
        }
    }
    
    function heapSort(begin: number, end: number) {
        addTrace(43, { begin, end, status: "Running Heap Sort" }, Array.from({length: end-begin+1}, (_,i) => begin+i));
        let n = end - begin + 1;
        addTrace(44, { n });
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            addTrace(45, { i });
            heapify(n, i, begin);
            addTrace(46, {});
        }
        for (let i = n - 1; i > 0; i--) {
            addTrace(48, { i });
            [localArr[begin], localArr[begin + i]] = [localArr[begin + i], localArr[begin]];
            addTrace(49, { arr: `[${localArr.join(',')}]` }, [begin, begin+i]);
            heapify(i, 0, begin);
            addTrace(50, {});
        }
    }

    function partition(begin: number, end: number) {
        addTrace(25, { begin, end });
        let pivot = localArr[end];
        addTrace(26, { pivot }, [end]);
        let i = begin - 1;
        addTrace(27, { i });
        for (let j = begin; j < end; j++) {
            addTrace(28, { j }, [j]);
            addTrace(29, { condition: `${localArr[j]} <= ${pivot}`}, [j, end]);
            if (localArr[j] <= pivot) {
                i++;
                addTrace(30, { i });
                [localArr[i], localArr[j]] = [localArr[j], localArr[i]];
                addTrace(31, { arr: `[${localArr.join(',')}]` }, [i, j]);
            }
        }
        [localArr[i + 1], localArr[end]] = [localArr[end], localArr[i + 1]];
        addTrace(34, { arr: `[${localArr.join(',')}]` }, [i+1, end]);
        addTrace(35, { 'return value': i + 1 });
        return i + 1;
    }

    function introsort_helper(begin: number, end: number, maxdepth: number) {
        const partitionSize = end - begin;
        addTrace(8, { begin, end, maxdepth, partitionSize });
        if (partitionSize < 16) {
            addTrace(9, { status: "Switching to Insertion Sort" });
            insertionSort(begin, end);
            addTrace(10, {});
            return;
        }
        addTrace(12, { maxdepth, condition: `${maxdepth} === 0`});
        if (maxdepth === 0) {
            addTrace(13, { status: "Max depth reached. Switching to Heap Sort" });
            heapSort(begin, end);
            addTrace(14, {});
            return;
        }
        addTrace(16, {});
        let p = partition(begin, end);
        addTrace(17, { p });
        introsort_helper(begin, p - 1, maxdepth - 1);
        addTrace(18, {});
        introsort_helper(p + 1, end, maxdepth - 1);
        addTrace(19, {});
    }

    addTrace(1, { arr: `[${localArr.join(',')}]` });
    let maxdepth = Math.floor(Math.log2(localArr.length)) * 2;
    addTrace(2, { maxdepth });
    introsort_helper(0, localArr.length - 1, maxdepth);
    addTrace(3, {});
    addTrace(4, { 'return value': `[${localArr.join(',')}]` });
    return trace;
}

function generateLinearSearchTrace(arr: number[], target: number): TraceStep[] {
    const trace: TraceStep[] = [];
    const localArr = [...arr];
    const addTrace = (line: number, variables: Record<string, any>, highlighted: number[] = []) => {
        trace.push({ line, variables: { ...variables }, data: [...localArr], highlighted });
    };

    addTrace(1, { arr: `[${localArr.join(', ')}]`, target });
    for (let i = 0; i < localArr.length; i++) {
        addTrace(2, { i }, [i]);
        addTrace(3, { i, "arr[i]": localArr[i], target, condition: `${localArr[i]} === ${target}` }, [i]);
        if (localArr[i] === target) {
            addTrace(4, { 'return value': i }, [i]);
            return trace;
        }
    }
    addTrace(7, { 'return value': -1 });
    return trace;
}


function generateBinarySearchTrace(arr: number[], target: number): TraceStep[] {
    const trace: TraceStep[] = [];
    const localArr = [...arr].sort((a,b) => a-b); // Binary search needs sorted array
    const addTrace = (line: number, variables: Record<string, any>, highlighted: number[] = []) => {
        trace.push({ line, variables: { ...variables }, data: [...localArr], highlighted });
    };

    let low = 0;
    addTrace(2, { arr: `[${localArr.join(', ')}]`, target, low });
    let high = localArr.length - 1;
    addTrace(3, { arr: `[${localArr.join(', ')}]`, target, low, high });

    while (low <= high) {
        addTrace(4, { low, high, condition: `${low} <= ${high}`}, [low, high]);
        let mid = Math.floor(low + (high - low) / 2);
        addTrace(5, { low, high, mid }, [low, high, mid]);
        addTrace(6, { low, high, mid, "arr[mid]": localArr[mid], target, condition: `${localArr[mid]} === ${target}` }, [mid]);
        if (localArr[mid] === target) {
            addTrace(7, { 'return value': mid }, [mid]);
            return trace;
        }
        addTrace(8, { low, high, mid, "arr[mid]": localArr[mid], target, condition: `${localArr[mid]} < ${target}` }, [mid]);
        if (localArr[mid] < target) {
            low = mid + 1;
            addTrace(9, { low }, [low, high]);
        } else {
            high = mid - 1;
            addTrace(11, { high }, [low, high]);
        }
    }
    addTrace(4, { low, high, condition: `${low} <= ${high}`}, []);
    addTrace(14, { 'return value': -1 });
    return trace;
}

function generateJumpSearchTrace(arr: number[], target: number): TraceStep[] {
    const trace: TraceStep[] = [];
    const localArr = [...arr].sort((a,b) => a-b);
    const addTrace = (line: number, variables: Record<string, any>, highlighted: number[] = []) => {
        trace.push({ line, variables: { ...variables }, data: [...localArr], highlighted });
    };
    
    const n = localArr.length;
    addTrace(1, { arr: `[${localArr.join(', ')}]`, target, n });
    let step = Math.floor(Math.sqrt(n));
    addTrace(2, { n, step });
    let prev = 0;
    addTrace(3, { n, step, prev });

    addTrace(4, { condition: `${localArr[Math.min(step, n) - 1]} < ${target}` }, [Math.min(step, n) - 1]);
    while (localArr[Math.min(step, n) - 1] < target) {
        prev = step;
        addTrace(5, { prev }, [prev]);
        step += Math.floor(Math.sqrt(n));
        addTrace(6, { prev, step }, [step]);
        addTrace(7, { prev, n, condition: `${prev} >= ${n}` });
        if (prev >= n) {
            addTrace(8, { 'return value': -1 });
            return trace;
        }
        addTrace(4, { condition: `${localArr[Math.min(step, n) - 1]} < ${target}` }, [Math.min(step, n) - 1]);
    }
    
    addTrace(11, { prev, condition: `${localArr[prev]} < ${target}` }, [prev]);
    while (localArr[prev] < target) {
        prev++;
        addTrace(12, { prev }, [prev]);
        addTrace(13, { prev, step, n, condition: `${prev} == ${Math.min(step, n)}` });
        if (prev === Math.min(step, n)) {
            addTrace(14, { 'return value': -1 });
            return trace;
        }
        addTrace(11, { prev, condition: `${localArr[prev]} < ${target}` }, [prev]);
    }

    addTrace(17, { prev, condition: `${localArr[prev]} === ${target}` }, [prev]);
    if (localArr[prev] === target) {
        addTrace(18, { 'return value': prev }, [prev]);
        return trace;
    }
    addTrace(20, { 'return value': -1 });
    return trace;
}

function generateInterpolationSearchTrace(arr: number[], target: number): TraceStep[] {
    const trace: TraceStep[] = [];
    const localArr = [...arr].sort((a, b) => a - b);
    const addTrace = (line: number, variables: Record<string, any>, highlighted: number[] = []) => {
        trace.push({ line, variables: { ...variables }, data: [...localArr], highlighted });
    };

    let n = localArr.length;
    let lo = 0, hi = n - 1;
    addTrace(1, { arr: `[${localArr.join(', ')}]`, target, n });
    addTrace(2, { lo, hi });

    addTrace(3, { lo, hi, target, condition: `${lo} <= ${hi} && ${target} >= ${localArr[lo]} && ${target} <= ${localArr[hi]}` });
    while (lo <= hi && target >= localArr[lo] && target <= localArr[hi]) {
        if (lo === hi) {
            addTrace(4, { condition: `${lo} === ${hi}`});
            if (localArr[lo] === target) {
                 addTrace(5, { 'return value': lo }, [lo]);
                 return trace;
            }
            addTrace(6, { 'return value': -1 });
            return trace;
        }
        
        let pos = lo + Math.floor(((hi - lo) / (localArr[hi] - localArr[lo])) * (target - localArr[lo]));
        addTrace(9, { lo, hi, pos, formula: `pos = ${lo} + floor((${hi}-${lo}) / (${localArr[hi]}-${localArr[lo]})) * (${target}-${localArr[lo]})` }, [pos, lo, hi]);

        addTrace(10, { pos, condition: `${localArr[pos]} == ${target}` }, [pos]);
        if (localArr[pos] === target) {
            addTrace(11, { 'return value': pos }, [pos]);
            return trace;
        }

        addTrace(13, { pos, condition: `${localArr[pos]} < ${target}` }, [pos]);
        if (localArr[pos] < target) {
            lo = pos + 1;
            addTrace(14, { lo }, [lo, hi]);
        } else {
            hi = pos - 1;
            addTrace(16, { hi }, [lo, hi]);
        }
        addTrace(3, { lo, hi, target, condition: `${lo} <= ${hi} && ${target} >= ${localArr[lo]} && ${target} <= ${localArr[hi]}` });
    }
    addTrace(19, { 'return value': -1 });
    return trace;
}

function generateExponentialSearchTrace(arr: number[], target: number): TraceStep[] {
    const trace: TraceStep[] = [];
    const localArr = [...arr].sort((a,b) => a-b);
    const addTrace = (line: number, variables: Record<string, any>, highlighted: number[] = []) => {
        trace.push({ line, variables: { ...variables }, data: [...localArr], highlighted });
    };

    let n = localArr.length;
    addTrace(1, { arr: `[${localArr.join(', ')}]`, target, n });

    addTrace(2, { condition: `${localArr[0]} == ${target}` }, [0]);
    if (localArr[0] === target) {
        addTrace(3, { 'return value': 0 }, [0]);
        return trace;
    }

    let i = 1;
    addTrace(5, { i });
    addTrace(6, { i, n, condition: `${i} < ${n} && ${localArr[i]} <= ${target}` }, [i]);
    while (i < n && localArr[i] <= target) {
        i = i * 2;
        addTrace(7, { i }, [i < n ? i : n-1]);
        addTrace(6, { i, n, condition: `${i} < ${n} && ${localArr[i]} <= ${target}` }, [i < n ? i : n-1]);
    }
    
    // Binary Search part
    let low = i / 2;
    let high = Math.min(i, n - 1);
    addTrace(10, { from: low, to: high, status: "Calling Binary Search" }, Array.from({length: high-low+1}, (_, k) => low + k));

    while (low <= high) {
        addTrace(16, { low, high, condition: `${low} <= ${high}`}, [low, high]);
        let mid = Math.floor(low + (high - low) / 2);
        addTrace(17, { low, high, mid }, [low, high, mid]);
        addTrace(18, { mid, "arr[mid]": localArr[mid], target, condition: `${localArr[mid]} === ${target}` }, [mid]);
        if (localArr[mid] === target) {
            addTrace(19, { 'return value': mid }, [mid]);
            return trace;
        }
        addTrace(20, { mid, "arr[mid]": localArr[mid], target, condition: `${localArr[mid]} < ${target}` }, [mid]);
        if (localArr[mid] < target) {
            low = mid + 1;
            addTrace(21, { low }, [low, high]);
        } else {
            high = mid - 1;
            addTrace(23, { high }, [low, high]);
        }
    }
    addTrace(16, { low, high, condition: `${low} <= ${high}`}, []);

    addTrace(26, { 'return value': -1 });
    return trace;
}

function generateTernarySearchTrace(arr: number[], target: number): TraceStep[] {
    const trace: TraceStep[] = [];
    const localArr = [...arr].sort((a,b) => a-b);
    const addTrace = (line: number, variables: Record<string, any>, highlighted: number[] = []) => {
        trace.push({ line, variables: { ...variables }, data: [...localArr], highlighted });
    };

    let l = 0, r = localArr.length - 1;
    addTrace(1, { arr: `[${localArr.join(', ')}]`, target, l, r });
    
    addTrace(2, { l, r, condition: `${r} >= ${l}`}, [l,r]);
    while (r >= l) {
        let mid1 = l + Math.floor((r - l) / 3);
        addTrace(3, { l, r, mid1 }, [l,r,mid1]);
        let mid2 = r - Math.floor((r - l) / 3);
        addTrace(4, { l, r, mid1, mid2 }, [l,r,mid1,mid2]);

        addTrace(6, { mid1, condition: `${localArr[mid1]} == ${target}` }, [mid1]);
        if (localArr[mid1] === target) {
            addTrace(7, { 'return value': mid1 }, [mid1]);
            return trace;
        }
        addTrace(8, { mid2, condition: `${localArr[mid2]} == ${target}` }, [mid2]);
        if (localArr[mid2] === target) {
            addTrace(9, { 'return value': mid2 }, [mid2]);
            return trace;
        }
        
        addTrace(11, { target, mid1, condition: `${target} < ${localArr[mid1]}` }, [mid1]);
        if (target < localArr[mid1]) {
            r = mid1 - 1;
            addTrace(12, { r }, [l,r]);
        } else if (target > localArr[mid2]) {
            addTrace(13, { target, mid2, condition: `${target} > ${localArr[mid2]}` }, [mid2]);
            l = mid2 + 1;
            addTrace(14, { l }, [l,r]);
        } else {
            l = mid1 + 1;
            r = mid2 - 1;
            addTrace(16, { l, r }, [l,r]);
        }
        addTrace(2, { l, r, condition: `${r} >= ${l}`}, [l,r]);
    }
    
    addTrace(19, { 'return value': -1 });
    return trace;
}

function generateHashTableTrace(pairs: {key: string, value: string}[], size: number, searchKey?: string): TraceStep[] {
    const trace: TraceStep[] = [];
    const table: {key: string, value: string}[][] = Array.from({ length: size }, () => []);

    const hash = (key: string) => {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = (hash + key.charCodeAt(i) * i) % size;
        }
        return hash;
    };

    trace.push({ line: 1, variables: { status: 'Initializing hash table', size }, data: [], highlighted: {}, tableState: { table: JSON.parse(JSON.stringify(table)) }});

    for (const pair of pairs) {
        const { key, value } = pair;
        trace.push({ line: 14, variables: { action: 'set', key, value }, data: [], highlighted: { keyToInsert: key }, tableState: { table: JSON.parse(JSON.stringify(table)) }});

        const index = hash(key);
        trace.push({ line: 8, variables: { key, value, calculation: `(hash + charCode * i) % ${size}`, 'hash_value (index)': index }, data: [], highlighted: { keyToInsert: key }, tableState: { table: JSON.parse(JSON.stringify(table)) }});
        trace.push({ line: 15, variables: { key, value, index }, data: [], highlighted: { keyToInsert: key, bucket: index }, tableState: { table: JSON.parse(JSON.stringify(table)) }});
        
        const bucket = table[index];
        const existingIndex = bucket.findIndex(item => item.key === key);

        if (existingIndex !== -1) {
             trace.push({ line: 16, variables: { key, value, index, status: 'Key exists, updating value'}, data: [], highlighted: { keyToInsert: key, bucket: index, collision: true }, tableState: { table: JSON.parse(JSON.stringify(table)) }});
            bucket[existingIndex].value = value;
        } else {
            if (bucket.length > 0) {
                 trace.push({ line: 17, variables: { key, value, index, status: 'Collision detected!' }, data: [], highlighted: { keyToInsert: key, bucket: index, collision: true }, tableState: { table: JSON.parse(JSON.stringify(table)) }});
            }
            bucket.push({ key, value });
             trace.push({ line: 18, variables: { key, value, index, status: 'Inserting new key-value pair' }, data: [], highlighted: { keyToInsert: key, bucket: index }, tableState: { table: JSON.parse(JSON.stringify(table)) }});
        }
        // Add a final state for this insertion
        trace.push({ line: 20, variables: { status: `Finished inserting '${key}'` }, data: [], highlighted: {}, tableState: { table: JSON.parse(JSON.stringify(table)) }});
    }
    
    trace.push({ line: 20, variables: { status: 'Finished all insertions.' }, data: [], highlighted: {}, tableState: { table: JSON.parse(JSON.stringify(table)) }});

    if(searchKey) {
        trace.push({ line: 22, variables: { action: 'get', key: searchKey }, data: [], highlighted: { keyToSearch: searchKey }, tableState: { table: JSON.parse(JSON.stringify(table)) }});
        const index = hash(searchKey);
        trace.push({ line: 8, variables: { key: searchKey, calculation: `(hash + charCode * i) % ${size}`, 'hash_value (index)': index }, data: [], highlighted: { keyToSearch: searchKey }, tableState: { table: JSON.parse(JSON.stringify(table)) }});
        trace.push({ line: 23, variables: { key: searchKey, index }, data: [], highlighted: { keyToSearch: searchKey, bucket: index }, tableState: { table: JSON.parse(JSON.stringify(table)) }});

        const bucket = table[index];
        let foundItem = null;
        for(let i = 0; i < bucket.length; i++) {
            const item = bucket[i];
            trace.push({ line: 24, variables: { key: searchKey, status: `Checking item in bucket...` }, data: [], highlighted: { keyToSearch: searchKey, bucket: index, foundKey: item.key }, tableState: { table: JSON.parse(JSON.stringify(table)) }});
            if(item.key === searchKey) {
                foundItem = item;
                trace.push({ line: 25, variables: { key: searchKey, status: 'Key found!', value: item.value }, data: [], highlighted: { keyToSearch: searchKey, bucket: index, foundKey: item.key, success: true }, tableState: { table: JSON.parse(JSON.stringify(table)) }});
                break;
            }
        }
        if (!foundItem) {
             trace.push({ line: 26, variables: { key: searchKey, status: 'Key not found in bucket.' }, data: [], highlighted: { keyToSearch: searchKey, bucket: index, fail: true }, tableState: { table: JSON.parse(JSON.stringify(table)) }});
        }
    }

    return trace;
}

function generateStackTrace(commands: string): TraceStep[] {
    const trace: TraceStep[] = [];
    const stack: number[] = [];
    const commandList = commands.split(',').map(cmd => cmd.trim());

    trace.push({ line: 2, variables: { status: 'Initializing stack' }, data: [...stack], highlighted: [] });

    for (const command of commandList) {
        const [operation, valueStr] = command.split(' ');
        const value = Number(valueStr);

        if (operation === 'push' && !isNaN(value)) {
            trace.push({ line: 4, variables: { action: `push(${value})` }, data: [...stack], highlighted: [] });
            stack.push(value);
            trace.push({ line: 5, variables: { status: `Pushed ${value}`, top: value }, data: [...stack], highlighted: [stack.length - 1] });
        } else if (operation === 'pop') {
            trace.push({ line: 7, variables: { action: 'pop()' }, data: [...stack], highlighted: [stack.length - 1] });
            if (stack.length === 0) {
                trace.push({ line: 8, variables: { status: 'Underflow: cannot pop from empty stack' }, data: [...stack], highlighted: [] });
            } else {
                const poppedValue = stack.pop();
                trace.push({ line: 11, variables: { status: `Popped ${poppedValue}`, top: stack[stack.length - 1] ?? 'empty' }, data: [...stack], highlighted: [] });
            }
        }
    }
    trace.push({ line: 18, variables: { status: 'Operations complete', final_stack: `[${stack.join(', ')}]` }, data: [...stack], highlighted: [] });
    return trace;
}

function generateInOrderTraversalTrace(tree: TreeNode): TraceStep[] {
    const trace: TraceStep[] = [];
    const traversalPath: number[] = [];

    function traverse(node: TreeNode | null) {
        trace.push({ line: 2, variables: { 'current_node': node?.value ?? 'null' }, data: [], highlighted: node?.value ?? null, treeData: tree, traversalPath: [...traversalPath] });

        if (!node) {
            trace.push({ line: 3, variables: { 'node': 'is null', 'action': 'return' }, data: [], highlighted: null, treeData: tree, traversalPath: [...traversalPath] });
            return;
        }

        trace.push({ line: 4, variables: { 'from_node': node.value, 'action': 'traversing left' }, data: [], highlighted: node.value, treeData: tree, traversalPath: [...traversalPath] });
        traverse(node.left);

        trace.push({ line: 7, variables: { 'current_node': node.value, 'action': 'visiting node' }, data: [], highlighted: node.value, treeData: tree, traversalPath: [...traversalPath] });
        traversalPath.push(node.value);
        trace.push({ line: 8, variables: { 'current_node': node.value, 'visited_path': `[${traversalPath.join(', ')}]` }, data: [], highlighted: node.value, treeData: tree, traversalPath: [...traversalPath] });
        
        trace.push({ line: 10, variables: { 'from_node': node.value, 'action': 'traversing right' }, data: [], highlighted: node.value, treeData: tree, traversalPath: [...traversalPath] });
        traverse(node.right);
        
        trace.push({ line: 12, variables: { 'finished_subtree_at': node.value, 'action': 'return' }, data: [], highlighted: node.value, treeData: tree, traversalPath: [...traversalPath] });
    }
    
    trace.push({ line: 1, variables: { status: 'starting traversal' }, data: [], highlighted: null, treeData: tree, traversalPath: [] });
    traverse(tree);
    trace.push({ line: 15, variables: { 'final_path': `[${traversalPath.join(', ')}]` }, data: [], highlighted: null, treeData: tree, traversalPath: [...traversalPath] });
    
    return trace;
}

function generatePreOrderTraversalTrace(tree: TreeNode): TraceStep[] {
    const trace: TraceStep[] = [];
    const traversalPath: number[] = [];

    function traverse(node: TreeNode | null) {
        trace.push({ line: 2, variables: { 'current_node': node?.value ?? 'null' }, data: [], highlighted: node?.value ?? null, treeData: tree, traversalPath: [...traversalPath] });

        if (!node) {
            trace.push({ line: 3, variables: { 'node': 'is null', 'action': 'return' }, data: [], highlighted: null, treeData: tree, traversalPath: [...traversalPath] });
            return;
        }
        
        trace.push({ line: 5, variables: { 'current_node': node.value, 'action': 'visiting node' }, data: [], highlighted: node.value, treeData: tree, traversalPath: [...traversalPath] });
        traversalPath.push(node.value);
        trace.push({ line: 6, variables: { 'current_node': node.value, 'visited_path': `[${traversalPath.join(', ')}]` }, data: [], highlighted: node.value, treeData: tree, traversalPath: [...traversalPath] });

        trace.push({ line: 8, variables: { 'from_node': node.value, 'action': 'traversing left' }, data: [], highlighted: node.value, treeData: tree, traversalPath: [...traversalPath] });
        traverse(node.left);
        
        trace.push({ line: 9, variables: { 'from_node': node.value, 'action': 'traversing right' }, data: [], highlighted: node.value, treeData: tree, traversalPath: [...traversalPath] });
        traverse(node.right);
        
        trace.push({ line: 11, variables: { 'finished_subtree_at': node.value, 'action': 'return' }, data: [], highlighted: node.value, treeData: tree, traversalPath: [...traversalPath] });
    }
    
    trace.push({ line: 1, variables: { status: 'starting traversal' }, data: [], highlighted: null, treeData: tree, traversalPath: [] });
    traverse(tree);
    trace.push({ line: 14, variables: { 'final_path': `[${traversalPath.join(', ')}]` }, data: [], highlighted: null, treeData: tree, traversalPath: [...traversalPath] });
    
    return trace;
}

function generatePostOrderTraversalTrace(tree: TreeNode): TraceStep[] {
    const trace: TraceStep[] = [];
    const traversalPath: number[] = [];

    function traverse(node: TreeNode | null) {
        trace.push({ line: 2, variables: { 'current_node': node?.value ?? 'null' }, data: [], highlighted: node?.value ?? null, treeData: tree, traversalPath: [...traversalPath] });

        if (!node) {
            trace.push({ line: 3, variables: { 'node': 'is null', 'action': 'return' }, data: [], highlighted: null, treeData: tree, traversalPath: [...traversalPath] });
            return;
        }

        trace.push({ line: 4, variables: { 'from_node': node.value, 'action': 'traversing left' }, data: [], highlighted: node.value, treeData: tree, traversalPath: [...traversalPath] });
        traverse(node.left);
        
        trace.push({ line: 5, variables: { 'from_node': node.value, 'action': 'traversing right' }, data: [], highlighted: node.value, treeData: tree, traversalPath: [...traversalPath] });
        traverse(node.right);
        
        trace.push({ line: 8, variables: { 'current_node': node.value, 'action': 'visiting node' }, data: [], highlighted: node.value, treeData: tree, traversalPath: [...traversalPath] });
        traversalPath.push(node.value);
        trace.push({ line: 9, variables: { 'current_node': node.value, 'visited_path': `[${traversalPath.join(', ')}]` }, data: [], highlighted: node.value, treeData: tree, traversalPath: [...traversalPath] });

        trace.push({ line: 11, variables: { 'finished_subtree_at': node.value, 'action': 'return' }, data: [], highlighted: node.value, treeData: tree, traversalPath: [...traversalPath] });
    }
    
    trace.push({ line: 1, variables: { status: 'starting traversal' }, data: [], highlighted: null, treeData: tree, traversalPath: [] });
    traverse(tree);
    trace.push({ line: 14, variables: { 'final_path': `[${traversalPath.join(', ')}]` }, data: [], highlighted: null, treeData: tree, traversalPath: [...traversalPath] });
    
    return trace;
}

function generateBFSTraversalTrace(tree: TreeNode): TraceStep[] {
    const trace: TraceStep[] = [];
    if (!tree) return trace;
    
    const traversalPath: number[] = [];
    const queue: (TreeNode | null)[] = [];

    const getQueueValues = (q: (TreeNode | null)[]) => q.map(n => n ? n.value : 'null').join(', ');
    
    trace.push({ line: 1, variables: { status: "Starting Traversal" }, data: [], highlighted: null, treeData: tree, traversalPath: [] });

    queue.push(tree);
    trace.push({ line: 3, variables: { action: `Enqueue root (${tree.value})`, queue: `[${getQueueValues(queue)}]` }, data: [], highlighted: tree.value, treeData: tree, traversalPath: [...traversalPath] });

    while (queue.length > 0) {
        trace.push({ line: 5, variables: { queue: `[${getQueueValues(queue)}]`, condition: `${queue.length} > 0` }, data: [], highlighted: null, treeData: tree, traversalPath: [...traversalPath] });
        
        const currentNode = queue.shift();
        trace.push({ line: 6, variables: { action: `Dequeue ${currentNode?.value}`, queue: `[${getQueueValues(queue)}]`, current_node: currentNode?.value }, data: [], highlighted: currentNode?.value, treeData: tree, traversalPath: [...traversalPath] });
        
        if (currentNode) {
            traversalPath.push(currentNode.value);
            trace.push({ line: 8, variables: { action: `Visit ${currentNode.value}`, visited_path: `[${traversalPath.join(', ')}]`}, data: [], highlighted: currentNode.value, treeData: tree, traversalPath: [...traversalPath] });

            if (currentNode.left) {
                queue.push(currentNode.left);
                trace.push({ line: 10, variables: { action: `Enqueue left child (${currentNode.left.value})`, queue: `[${getQueueValues(queue)}]`}, data: [], highlighted: currentNode.left.value, treeData: tree, traversalPath: [...traversalPath] });
            }
            if (currentNode.right) {
                queue.push(currentNode.right);
                trace.push({ line: 12, variables: { action: `Enqueue right child (${currentNode.right.value})`, queue: `[${getQueueValues(queue)}]`}, data: [], highlighted: currentNode.right.value, treeData: tree, traversalPath: [...traversalPath] });
            }
        }
    }
    trace.push({ line: 5, variables: { queue: "[]", condition: `0 > 0` }, data: [], highlighted: null, treeData: tree, traversalPath: [...traversalPath] });
    trace.push({ line: 15, variables: { final_path: `[${traversalPath.join(', ')}]` }, data: [], highlighted: null, treeData: tree, traversalPath: [...traversalPath] });
    
    return trace;
}

function generateBestFirstSearchTrace(tree: TreeNode, target: number): TraceStep[] {
    const trace: TraceStep[] = [];
    if (!tree) return trace;
    
    const priorityQueue: { node: TreeNode; path: number[] }[] = [];
    const visited = new Set<number>();
    
    const getQueueValues = (q: { node: TreeNode; path: number[] }[]) => q.map(item => item.node.value).join(', ');

    trace.push({ line: 1, variables: { status: "Starting Search", target }, data: [], highlighted: null, treeData: tree, traversalPath: [] });
    
    priorityQueue.push({ node: tree, path: [tree.value] });
    trace.push({ line: 3, variables: { action: `Add start node (${tree.value}) to priority queue`, priority_queue: getQueueValues(priorityQueue) }, data: [], highlighted: tree.value, treeData: tree, traversalPath: [] });

    while (priorityQueue.length > 0) {
        trace.push({ line: 5, variables: { condition: `${priorityQueue.length} > 0`, priority_queue: getQueueValues(priorityQueue) }, data: [], highlighted: null, treeData: tree });
        
        // Sort PQ to simulate priority (here, lower value is higher priority)
        priorityQueue.sort((a, b) => a.node.value - b.node.value);
        trace.push({ line: 6, variables: { action: `Sort priority queue`, priority_queue: getQueueValues(priorityQueue) }, data: [], highlighted: null, treeData: tree });

        const { node: currentNode, path } = priorityQueue.shift()!;
        trace.push({ line: 8, variables: { action: `Expand best node: ${currentNode.value}`, current_path: path.join(' -> '), priority_queue: getQueueValues(priorityQueue) }, data: [], highlighted: currentNode.value, treeData: tree, traversalPath: path });

        trace.push({ line: 9, variables: { current_node: currentNode.value, target, condition: `${currentNode.value} === ${target}` }, data: [], highlighted: currentNode.value, treeData: tree, traversalPath: path });
        if (currentNode.value === target) {
            trace.push({ line: 10, variables: { status: "Target found!", final_path: path.join(' -> ') }, data: [], highlighted: currentNode.value, treeData: tree, traversalPath: path });
            return trace;
        }

        visited.add(currentNode.value);
        trace.push({ line: 11, variables: { action: `Mark ${currentNode.value} as visited`, visited: Array.from(visited).join(', ') }, data: [], highlighted: currentNode.value, treeData: tree, traversalPath: path });

        const children = [currentNode.left, currentNode.right].filter(Boolean) as TreeNode[];
        for (const child of children) {
            trace.push({ line: 13, variables: { action: `Checking child ${child.value} of ${currentNode.value}` }, data: [], highlighted: child.value, treeData: tree, traversalPath: path });
            if (!visited.has(child.value)) {
                trace.push({ line: 14, variables: { child: child.value, status: 'Not visited. Adding to queue.' }, data: [], highlighted: child.value, treeData: tree, traversalPath: path });
                const newPath = [...path, child.value];
                priorityQueue.push({ node: child, path: newPath });
                trace.push({ line: 15, variables: { action: `Add ${child.value} to queue`, priority_queue: getQueueValues(priorityQueue) }, data: [], highlighted: child.value, treeData: tree, traversalPath: path });
            } else {
                 trace.push({ line: 14, variables: { child: child.value, status: 'Already visited. Skipping.' }, data: [], highlighted: child.value, treeData: tree, traversalPath: path });
            }
        }
    }

    trace.push({ line: 5, variables: { condition: `0 > 0`, status: "Queue empty" }, data: [], highlighted: null, treeData: tree });
    trace.push({ line: 19, variables: { status: "Target not found" }, data: [], highlighted: null, treeData: tree });

    return trace;
}


function generateBinarySearchTreeTrace(arr: number[]): TraceStep[] {
    const trace: TraceStep[] = [];
    let tree: TreeNode | null = null;
    
    const cloneTree = (node: TreeNode | null): TreeNode | null => {
        if (!node) return null;
        return { value: node.value, left: cloneTree(node.left), right: cloneTree(node.right) };
    }

    const insertNode = (key: number) => {
        const newNode = { value: key, left: null, right: null };
        trace.push({ line: 6, variables: { status: `Inserting ${key}`}, data: [], highlighted: key, treeData: cloneTree(tree) });

        if (tree === null) {
            trace.push({ line: 7, variables: { status: 'Tree is empty, inserting as root' }, data: [], highlighted: key, treeData: null });
            tree = newNode;
            trace.push({ line: 8, variables: { status: `Inserted ${key} as root` }, data: [], highlighted: key, treeData: cloneTree(tree) });
            return;
        }

        let current = tree;
        while (true) {
            trace.push({ line: 10, variables: { current_node: current.value, insert_key: key, condition: `${key} < ${current.value}` }, data: [], highlighted: current.value, treeData: cloneTree(tree) });
            if (key < current.value) {
                trace.push({ line: 11, variables: { current_node: current.value, insert_key: key, status: 'Going left' }, data: [], highlighted: current.value, treeData: cloneTree(tree) });
                if (current.left === null) {
                    trace.push({ line: 12, variables: { parent: current.value, status: `Inserting ${key} as left child` }, data: [], highlighted: key, treeData: cloneTree(tree) });
                    current.left = newNode;
                    trace.push({ line: 13, variables: { status: `Inserted ${key}` }, data: [], highlighted: key, treeData: cloneTree(tree) });
                    return;
                }
                current = current.left;
            } else {
                trace.push({ line: 14, variables: { current_node: current.value, insert_key: key, condition: `${key} > ${current.value}` }, data: [], highlighted: current.value, treeData: cloneTree(tree) });
                if (current.right === null) {
                    trace.push({ line: 15, variables: { parent: current.value, status: `Inserting ${key} as right child` }, data: [], highlighted: key, treeData: cloneTree(tree) });
                    current.right = newNode;
                    trace.push({ line: 16, variables: { status: `Inserted ${key}` }, data: [], highlighted: key, treeData: cloneTree(tree) });
                    return;
                }
                current = current.right;
            }
        }
    };
    
    trace.push({ line: 1, variables: { status: 'Building BST from input array' }, data: [], highlighted: null, treeData: null });
    arr.forEach(insertNode);
    trace.push({ line: 18, variables: { status: 'BST construction complete' }, data: [], highlighted: null, treeData: cloneTree(tree) });
    return trace;
}

function generateAVLTreeTrace(arr: number[]): TraceStep[] {
    const trace: TraceStep[] = [];
    let root: TreeNode | null = null;

    const cloneTree = (node: TreeNode | null): TreeNode | null => {
        if (!node) return null;
        return { 
            value: node.value, 
            height: node.height, 
            left: cloneTree(node.left), 
            right: cloneTree(node.right) 
        };
    };

    const getHeight = (node: TreeNode | null) => node ? node.height : 0;
    const getBalanceFactor = (node: TreeNode | null) => node ? getHeight(node.left) - getHeight(node.right) : 0;

    const rightRotate = (y: TreeNode) => {
        trace.push({ line: 20, variables: { action: `Right-rotating around ${y.value}` }, data: [], highlighted: y.value, secondaryHighlight: [y.left!.value], treeData: cloneTree(root) });
        const x = y.left!;
        const T2 = x.right;
        x.right = y;
        y.left = T2;
        y.height = Math.max(getHeight(y.left), getHeight(y.right)) + 1;
        x.height = Math.max(getHeight(x.left), getHeight(x.right)) + 1;
        trace.push({ line: 20, variables: { status: `Rotation complete` }, data: [], highlighted: x.value, secondaryHighlight: [y.value], treeData: cloneTree(x) });
        return x;
    };

    const leftRotate = (x: TreeNode) => {
        trace.push({ line: 22, variables: { action: `Left-rotating around ${x.value}` }, data: [], highlighted: x.value, secondaryHighlight: [x.right!.value], treeData: cloneTree(root) });
        const y = x.right!;
        const T2 = y.left;
        y.left = x;
        x.right = T2;
        x.height = Math.max(getHeight(x.left), getHeight(x.right)) + 1;
        y.height = Math.max(getHeight(y.left), getHeight(y.right)) + 1;
        trace.push({ line: 22, variables: { status: `Rotation complete` }, data: [], highlighted: y.value, secondaryHighlight: [x.value], treeData: cloneTree(y) });
        return y;
    };

    const insertNode = (node: TreeNode | null, key: number): TreeNode => {
        // 1. Standard BST insertion
        trace.push({ line: 5, variables: { action: "Standard BST Insert", node: node?.value ?? 'null', key }, data: [], highlighted: key, treeData: cloneTree(root) });
        if (!node) {
            trace.push({ line: 6, variables: { status: `Inserting new node ${key}` }, data: [], highlighted: key, treeData: cloneTree(root) });
            return { value: key, left: null, right: null, height: 1 };
        }
        if (key < node.value) {
            trace.push({ line: 7, variables: { status: `Going left from ${node.value}` }, data: [], highlighted: node.value, treeData: cloneTree(root) });
            node.left = insertNode(node.left, key);
        } else if (key > node.value) {
            trace.push({ line: 8, variables: { status: `Going right from ${node.value}` }, data: [], highlighted: node.value, treeData: cloneTree(root) });
            node.right = insertNode(node.right, key);
        } else {
            trace.push({ line: 9, variables: { status: `Key ${key} already exists` }, data: [], highlighted: node.value, treeData: cloneTree(root) });
            return node;
        }
        
        root = cloneTree(root); // Update root for consistent trace
        if(node) {
            const findAndReplace = (n: TreeNode | null, newNode: TreeNode) => {
                if(!n) return null;
                if(n.value === newNode.value) return newNode;
                n.left = findAndReplace(n.left, newNode);
                n.right = findAndReplace(n.right, newNode);
                return n;
            }
            findAndReplace(root, node);
        }

        // 2. Update height
        trace.push({ line: 12, variables: { action: `Update height for ${node.value}` }, data: [], highlighted: node.value, treeData: cloneTree(root) });
        node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right));
        trace.push({ line: 12, variables: { status: `New height for ${node.value} is ${node.height}` }, data: [], highlighted: node.value, treeData: cloneTree(root) });

        // 3. Get balance factor
        const balance = getBalanceFactor(node);
        trace.push({ line: 15, variables: { action: `Check balance for ${node.value}`, balance }, data: [], highlighted: node.value, treeData: cloneTree(root) });

        // 4. Perform rotations if needed
        // Left Left Case
        if (balance > 1 && key < node.left!.value) {
            trace.push({ line: 19, variables: { status: `Left-Left Case at ${node.value}`}, data: [], highlighted: node.value, secondaryHighlight: [node.left!.value], treeData: cloneTree(root) });
            return rightRotate(node);
        }
        // Right Right Case
        if (balance < -1 && key > node.right!.value) {
            trace.push({ line: 21, variables: { status: `Right-Right Case at ${node.value}`}, data: [], highlighted: node.value, secondaryHighlight: [node.right!.value], treeData: cloneTree(root) });
            return leftRotate(node);
        }
        // Left Right Case
        if (balance > 1 && key > node.left!.value) {
            trace.push({ line: 23, variables: { status: `Left-Right Case at ${node.value}`}, data: [], highlighted: node.value, secondaryHighlight: [node.left!.value, node.left!.right!.value], treeData: cloneTree(root) });
            node.left = leftRotate(node.left!);
            trace.push({ line: 24, variables: { status: `Intermediate state after left rotation on ${node.left!.value}`}, data: [], highlighted: node.value, treeData: cloneTree(root) });
            return rightRotate(node);
        }
        // Right Left Case
        if (balance < -1 && key < node.right!.value) {
             trace.push({ line: 26, variables: { status: `Right-Left Case at ${node.value}`}, data: [], highlighted: node.value, secondaryHighlight: [node.right!.value, node.right!.left!.value], treeData: cloneTree(root) });
            node.right = rightRotate(node.right!);
            trace.push({ line: 27, variables: { status: `Intermediate state after right rotation on ${node.right!.value}`}, data: [], highlighted: node.value, treeData: cloneTree(root) });
            return leftRotate(node);
        }

        trace.push({ line: 30, variables: { status: `Node ${node.value} is balanced` }, data: [], highlighted: node.value, treeData: cloneTree(root) });
        return node;
    };

    trace.push({ line: 1, variables: { status: 'Building AVL tree...' }, data: [], highlighted: null, treeData: null });
    arr.forEach(key => {
        root = insertNode(root, key);
        trace.push({ line: 2, variables: { status: `Finished inserting ${key}. Root is now ${root.value}` }, data: [], highlighted: null, treeData: cloneTree(root) });
    });

    return trace;
}



const TRACE_GENERATORS: Record<string, (arr: any, target?: any, searchKey?: string) => TraceStep[]> = {
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
  timSort: generateTimSortTrace,
  introSort: generateIntroSortTrace,
  linearSearch: (arr, target) => generateLinearSearchTrace(arr, target!),
  binarySearch: (arr, target) => generateBinarySearchTrace(arr, target!),
  jumpSearch: (arr, target) => generateJumpSearchTrace(arr, target!),
  interpolationSearch: (arr, target) => generateInterpolationSearchTrace(arr, target!),
  exponentialSearch: (arr, target) => generateExponentialSearchTrace(arr, target!),
  ternarySearch: (arr, target) => generateTernarySearchTrace(arr, target!),
  hashing: (pairs, _target, searchKey) => generateHashTableTrace(pairs, 10, searchKey), // Default size 10
  stack: (commands) => generateStackTrace(commands),
  inOrderTraversal: (tree: any) => generateInOrderTraversalTrace(tree),
  preOrderTraversal: (tree: any) => generatePreOrderTraversalTrace(tree),
  postOrderTraversal: (tree: any) => generatePostOrderTraversalTrace(tree),
  bfsTraversal: (tree: any) => generateBFSTraversalTrace(tree),
  bestFirstSearch: (tree: any, target: any) => generateBestFirstSearchTrace(tree, target),
  binarySearchTree: (arr: any) => generateBinarySearchTreeTrace(arr),
  avlTree: (arr: any) => generateAVLTreeTrace(arr),
};

type AlgorithmClientPageProps = {
  categoryKey: AlgorithmCategoryKey;
  algorithmKey: AlgorithmKey<any>;
  algorithm: (typeof ALGO_CATEGORIES)[AlgorithmCategoryKey]['algorithms'][AlgorithmKey<any>];
  category: (typeof ALGO_CATEGORIES)[AlgorithmCategoryKey];
}

export default function AlgorithmClientPage({ categoryKey, algorithmKey, algorithm, category }: AlgorithmClientPageProps) {
  const [code, setCode] = useState(algorithm.code || '');
  const [inputStr, setInputStr] = useState(() => {
    if (algorithm?.input.includes(';')) {
        return algorithm?.input.split(';')[0] || '';
    }
    return algorithm?.input || '';
  });

  const [targetStr, setTargetStr] = useState(() => {
      if (algorithm?.input.includes(';')) {
          const parts = algorithm.input.split(';');
          return parts.length > 1 ? parts[1] : '';
      }
      return '';
  });

  const [searchKeyStr, setSearchKeyStr] = useState('grape');

  const [executionTrace, setExecutionTrace] = useState<TraceStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  
  const handleTraceGeneration = useCallback(() => {
    setIsLoading(true);
    setCurrentStep(0);
    setExecutionTrace([]);
    
    try {
      const traceGenerator = TRACE_GENERATORS[algorithmKey as keyof typeof TRACE_GENERATORS];
      if (!traceGenerator) {
          toast({
              title: "Not Implemented",
              description: `The visualizer for ${algorithm.name} is not yet implemented.`,
          });
          setIsLoading(false);
          return;
      }
      
      let trace: TraceStep[] = [];

      if (categoryKey === 'searching') {
        const parsedArray = inputStr.split(',').map(s => s.trim()).filter(Boolean).map(Number);
        if (parsedArray.some(isNaN)) throw new Error("Invalid array input. Please enter comma-separated numbers.");
        
        const target = Number(targetStr.trim());
        if (isNaN(target)) throw new Error("Invalid target value. Please enter a number.");
        
        trace = traceGenerator(parsedArray, target);

      } else if (categoryKey === 'data-structures' && algorithmKey === 'hashing') {
        const pairs = inputStr.split(';').map(s => {
            const [key, value] = s.split(',').map(p => p.trim());
            if (!key || !value) throw new Error("Invalid key-value pair format. Use 'key,value;key2,value2'.");
            return { key, value };
        });
        trace = traceGenerator(pairs, undefined, searchKeyStr.trim());
      } else if (categoryKey === 'data-structures' && algorithmKey === 'stack') {
          trace = traceGenerator(inputStr, undefined, undefined);
      } else if (categoryKey === 'tree' && ['inOrderTraversal', 'preOrderTraversal', 'postOrderTraversal', 'bfsTraversal', 'bestFirstSearch'].includes(algorithmKey)) {
          try {
              const parsedTree = JSON.parse(inputStr);
              const target = Number(targetStr.trim());
              if (algorithmKey === 'bestFirstSearch' && isNaN(target)) {
                  throw new Error("Invalid target value for Best-First Search. Please enter a number.");
              }
              trace = traceGenerator(parsedTree, target);
          } catch (e) {
              throw new Error("Invalid JSON input for the tree structure.");
          }
      } else { // Sorting or BST/AVL construction
        const parsedArray = inputStr.split(',').map(s => s.trim()).filter(Boolean).map(Number);
        if (parsedArray.some(isNaN)) throw new Error("Invalid input. Please enter comma-separated numbers.");
        trace = traceGenerator(parsedArray, undefined);
      }
      
      if (trace && trace.length > 0) {
        setExecutionTrace(trace);
      } else if (trace) {
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
  }, [toast, inputStr, targetStr, searchKeyStr, algorithmKey, algorithm, categoryKey]);
  
  useEffect(() => {
    handleTraceGeneration();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [algorithmKey]);

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

  const visualizerType = algorithm.visualizer as 'array' | 'tree' | 'hash-table';
  const needsTargetInput = (categoryKey === 'searching') || (categoryKey === 'tree' && algorithmKey === 'bestFirstSearch');

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
                            categoryKey === 'tree' ? "e.g. { \"value\": 10, ... }" :
                            categoryKey === 'data-structures' && algorithmKey === 'stack' ? "e.g. push 5,push 10,pop" :
                            "e.g. key1,val1;key2,val2"
                          }
                          className="flex-1"
                      />
                      {needsTargetInput && (
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

      <Faq algorithm={algorithmKey} category={categoryKey} />
    </div>
  );
}

    