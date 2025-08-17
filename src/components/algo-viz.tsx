
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
import { Faq } from '@/components/faq';
import { ALGO_CATEGORIES, AlgorithmCategoryKey, AlgorithmKey } from '@/lib/algo-templates';

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


const TRACE_GENERATORS: Record<string, (arr: number[], target?: number) => TraceStep[]> = {
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
  binarySearch: (arr, target) => generateBinarySearchTrace(arr, target!),
  tree: (arr: any) => [],
};

const getDefaultAlgorithm = (category: AlgorithmCategoryKey) => {
    const algorithms = ALGO_CATEGORIES[category]?.algorithms;
    const defaultKey = Object.keys(algorithms)[0] as AlgorithmKey<typeof category>;
    return { key: defaultKey, ...algorithms[defaultKey] };
};


export function AlgoViz() {
  const [algorithmCategory, setAlgorithmCategory] = useState<AlgorithmCategoryKey>('sorting');
  const [algorithmKey, setAlgorithmKey] = useState<AlgorithmKey<typeof algorithmCategory>>('bubbleSort');
  
  const selectedAlgorithm = ALGO_CATEGORIES[algorithmCategory].algorithms[algorithmKey as any] || getDefaultAlgorithm(algorithmCategory);

  const [code, setCode] = useState(selectedAlgorithm.code);
  const [inputStr, setInputStr] = useState(selectedAlgorithm.input);
  const [executionTrace, setExecutionTrace] = useState<TraceStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const handleAlgorithmCategoryChange = (category: AlgorithmCategoryKey) => {
      if (!category || !ALGO_CATEGORIES[category]) return;
      const firstAlgoKey = Object.keys(ALGO_CATEGORIES[category].algorithms)[0] as AlgorithmKey<typeof category>;
      setAlgorithmCategory(category);
      handleAlgorithmChange(firstAlgoKey, category);
  }

  const handleAlgorithmChange = (key: AlgorithmKey<any>, category = algorithmCategory) => {
      if (!key || !ALGO_CATEGORIES[category]?.algorithms[key]) return;
      
      const newAlgo = ALGO_CATEGORIES[category].algorithms[key];
      setAlgorithmKey(key);
      setCode(newAlgo.code);
      setInputStr(newAlgo.input);
      setExecutionTrace([]);
      setCurrentStep(0);
      setIsPlaying(false);
  }

  const handleTraceGeneration = useCallback(() => {
    setIsLoading(true);
    setCurrentStep(0);
    setExecutionTrace([]);
    
    if (selectedAlgorithm.visualizer === 'tree') {
        toast({
            title: "Coming Soon!",
            description: `Visualization for ${selectedAlgorithm.name} is not yet implemented.`,
            variant: 'default',
        });
        setIsLoading(false);
        setExecutionTrace([]);
        return;
    }

    try {
      let parsedArray: number[];
      let target: number | undefined;

      if (algorithmCategory === 'searching') {
        const parts = inputStr.split(';');
        if (parts.length !== 2) throw new Error("Input for searching must be in 'array;target' format (e.g., '1,2,3;2').");
        
        parsedArray = parts[0].split(',').map(s => s.trim()).filter(Boolean).map(Number);
        target = Number(parts[1].trim());
        if (isNaN(target)) throw new Error("Invalid target value.");

      } else {
        parsedArray = inputStr.split(',').map(s => s.trim()).filter(Boolean).map(Number);
      }
      
      if (parsedArray.some(isNaN)) {
        toast({
            variant: "destructive",
            title: "Invalid Input",
            description: "Please enter a comma-separated list of numbers.",
        });
        setIsLoading(false);
        return;
      }

      const traceGenerator = TRACE_GENERATORS[algorithmKey as keyof typeof TRACE_GENERATORS];
      if (!traceGenerator) {
          toast({
              title: "Not Implemented",
              description: `The visualizer for ${selectedAlgorithm.name} is not yet implemented.`,
          });
          setIsLoading(false);
          return;
      }

      const trace = traceGenerator(parsedArray, target);
      if (trace && trace.length > 0) {
        setExecutionTrace(trace);
      } else if (trace) {
         toast({
          title: "Visualization Not Ready",
          description: `The visualizer for ${selectedAlgorithm.name} is coming soon.`,
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
  }, [toast, inputStr, algorithmKey, selectedAlgorithm, algorithmCategory]);
  
  // Initial trace generation
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

  const visualizerType = selectedAlgorithm.visualizer as 'array' | 'tree';

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <Card className="w-full bg-card/50">
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
            <CardDescription>Select algorithm, provide input, and control playback.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="algo-category" className="text-sm font-medium mb-2 block">Category</label>
                  <Select value={algorithmCategory} onValueChange={(value) => handleAlgorithmCategoryChange(value as AlgorithmCategoryKey)}>
                    <SelectTrigger id="algo-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(ALGO_CATEGORIES).map(([key, category]) => (
                        <SelectItem key={key} value={key}>{category.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="algo-type" className="text-sm font-medium mb-2 block">Algorithm</label>
                  <Select value={algorithmKey} onValueChange={(value) => handleAlgorithmChange(value as AlgorithmKey<typeof algorithmCategory>)}>
                    <SelectTrigger id="algo-type">
                      <SelectValue placeholder="Select algorithm" />
                    </SelectTrigger>
                    <SelectContent>
                      {algorithmCategory === 'sorting' && (
                        <>
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
                            <SelectLabel>Hybrid Sorting</SelectLabel>
                            <SelectItem value="timSort">Tim Sort</SelectItem>
                            <SelectItem value="introSort">Intro Sort</SelectItem>
                          </SelectGroup>
                        </>
                      )}
                       {algorithmCategory === 'searching' && (
                         <SelectGroup>
                          <SelectLabel>Searching</SelectLabel>
                          <SelectItem value="binarySearch">Binary Search</SelectItem>
                        </SelectGroup>
                       )}
                       {algorithmCategory === 'tree' && (
                         <SelectGroup>
                          <SelectLabel>Tree/Graph</SelectLabel>
                          <SelectItem value="tree">Tree / Graph Traversal</SelectItem>
                        </SelectGroup>
                       )}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {selectedAlgorithm.timeComplexity && selectedAlgorithm.spaceComplexity && (
                <div className="flex justify-between text-sm text-muted-foreground pt-2">
                  <div className="font-mono text-xs">
                      <strong>Time:</strong> {selectedAlgorithm.timeComplexity}
                  </div>
                  <div className="font-mono text-xs">
                      <strong>Space:</strong> {selectedAlgorithm.spaceComplexity}
                  </div>
                </div>
              )}

              <div>
                  <label htmlFor="input-data" className="text-sm font-medium mb-2 block">Input Data</label>
                  <div className="flex gap-2">
                      <Input 
                          id="input-data"
                          value={inputStr}
                          onChange={(e) => setInputStr(e.target.value)}
                          placeholder={selectedAlgorithm.visualizer === 'array' ? "e.g. 5, 3, 8, 4, 2" : "Enter data structure..."}
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

      <Faq algorithm={algorithmKey} category={algorithmCategory} />
    </div>
  );
}
