
export const ALGO_TEMPLATES = {
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
    visualizer: "array",
    timeComplexity: "O(n^2)",
    spaceComplexity: "O(1)",
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
    visualizer: "array",
    timeComplexity: "O(n^2)",
    spaceComplexity: "O(1)",
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
    visualizer: "array",
    timeComplexity: "O(n^2)",
    spaceComplexity: "O(1)",
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
    visualizer: "array",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
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
    visualizer: "array",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(log n)",
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
    visualizer: "array",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
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
    visualizer: "array",
    timeComplexity: "O(n + k)",
    spaceComplexity: "O(k)",
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
    visualizer: "array",
    timeComplexity: "O(d * (n+k))",
    spaceComplexity: "O(n + k)",
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
    visualizer: "array",
    timeComplexity: "O(n + k)",
    spaceComplexity: "O(n)",
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
      visualizer: "array",
      timeComplexity: "O(n + N)",
      spaceComplexity: "O(N)",
  },
  timSort: {
    name: "Tim Sort",
    code: `const RUN = 32;

// Insertion sort for sub-arrays
function insertionSort(arr, left, right) {
    for (let i = left + 1; i <= right; i++) {
        let temp = arr[i];
        let j = i - 1;
        while (j >= left && arr[j] > temp) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = temp;
    }
}

// Merge function to merge sorted runs
function merge(arr, l, m, r) {
    let len1 = m - l + 1, len2 = r - m;
    let left = new Array(len1);
    let right = new Array(len2);
    for (let i = 0; i < len1; i++)
        left[i] = arr[l + i];
    for (let i = 0; i < len2; i++)
        right[i] = arr[m + 1 + i];

    let i = 0, j = 0, k = l;

    while (i < len1 && j < len2) {
        if (left[i] <= right[j]) {
            arr[k] = left[i];
            i++;
        } else {
            arr[k] = right[j];
            j++;
        }
        k++;
    }

    while (i < len1) {
        arr[k] = left[i];
        k++;
        i++;
    }

    while (j < len2) {
        arr[k] = right[j];
        k++;
        j++;
    }
}

// Main Tim Sort function
function timSort(arr) {
    let n = arr.length;
    // Sort individual sub-arrays of size RUN
    for (let i = 0; i < n; i += RUN) {
        insertionSort(arr, i, Math.min((i + RUN - 1), (n - 1)));
    }

    // Start merging from size RUN. It will merge
    // to form size 2*RUN, then 4*RUN, 8*RUN and so on
    for (let size = RUN; size < n; size = 2 * size) {
        for (let left = 0; left < n; left += 2 * size) {
            let mid = left + size - 1;
            let right = Math.min((left + 2 * size - 1), (n - 1));
            if(mid < right) {
              merge(arr, left, mid, right);
            }
        }
    }
    return arr;
}`,
    input: "5, 21, 7, 23, 19, 1, 45, 67, 89, 3, 0, -1, 50",
    visualizer: "array",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
  },
  introSort: {
    name: "Intro Sort",
    code: `function introSort(arr) {
  let maxdepth = Math.floor(Math.log2(arr.length)) * 2;
  introsort_helper(arr, 0, arr.length - 1, maxdepth);
  return arr;
}

function introsort_helper(arr, begin, end, maxdepth) {
  if (end - begin < 16) {
    insertionSort(arr, begin, end);
    return;
  }
  if (maxdepth === 0) {
    heapSort(arr, begin, end);
    return;
  }
  let p = partition(arr, begin, end);
  introsort_helper(arr, begin, p - 1, maxdepth - 1);
  introsort_helper(arr, p + 1, end, maxdepth - 1);
}

function partition(arr, begin, end) {
  let pivot = arr[end];
  let i = begin - 1;
  for (let j = begin; j < end; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[end]] = [arr[end], arr[i + 1]];
  return i + 1;
}

function heapSort(arr, begin, end) {
  let n = end - begin + 1;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i, begin);
  }
  for (let i = n - 1; i > 0; i--) {
    [arr[begin], arr[begin + i]] = [arr[begin + i], arr[begin]];
    heapify(arr, i, 0, begin);
  }
}

function heapify(arr, n, i, offset) {
  let largest = i;
  let l = 2 * i + 1;
  let r = 2 * i + 2;
  if (l < n && arr[offset + l] > arr[offset + largest]) largest = l;
  if (r < n && arr[offset + r] > arr[offset + largest]) largest = r;
  if (largest !== i) {
    [arr[offset+i], arr[offset+largest]] = [arr[offset+largest], arr[offset+i]];
    heapify(arr, n, largest, offset);
  }
}

function insertionSort(arr, left, right) {
  for (let i = left + 1; i <= right; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= left && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
}`,
    input: "2, 1, 0, 5, 8, 3, 7, 4, 9, 6",
    visualizer: "array",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(log n)",
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
    visualizer: "tree",
    timeComplexity: "N/A",
    spaceComplexity: "N/A",
  }
} as const;
