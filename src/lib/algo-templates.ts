

export const ALGO_CATEGORIES = {
  sorting: {
    name: "Sorting",
    algorithms: {
      bubbleSort: {
        name: "Bubble Sort",
        description: "A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.",
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
        description: "An in-place comparison sorting algorithm. It divides the input list into two parts: a sorted sublist which is built up from left to right and a sublist of the remaining unsorted items that occupy the rest of the list. Initially, the sorted sublist is empty and the unsorted sublist is the entire input list. The algorithm proceeds by finding the smallest (or largest, depending on sorting order) element in the unsorted sublist, exchanging (swapping) it with the leftmost unsorted element (putting it in sorted order), and moving the sublist boundaries one element to the right.",
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
        description: "A simple sorting algorithm that builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort. However, it provides several advantages: simple implementation, efficient for (quite) small data sets, adaptive (i.e., efficient) for data sets that are already substantially sorted: the time complexity is O(nk) when each element in the input is no more than k places away from its sorted position, and stable (i.e., does not change the relative order of elements with equal keys).",
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
        description: "An efficient, stable, comparison-based sorting algorithm. Most implementations produce a stable sort, which means that the order of equal elements is the same in the input and output. Merge sort is a divide and conquer algorithm that was invented by John von Neumann in 1945. The algorithm splits the array into two halves, recursively sorts them, and then merges the two sorted halves.",
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
        description: "An efficient, in-place, comparison-based sorting algorithm. It applies the divide-and-conquer strategy. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively.",
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
        description: "A comparison-based sorting technique based on a Binary Heap data structure. It is similar to selection sort where we first find the maximum element and place the maximum element at the end. We repeat the same process for the remaining elements.",
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
        description: "An integer sorting algorithm that operates by counting the number of objects that have each distinct key value. It is only suitable for direct use in situations where the variation in keys is not significantly greater than the number of items.",
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
        description: "A non-comparative sorting algorithm. It avoids comparison by creating and distributing elements into buckets according to their radix. For elements with more than one significant digit, this bucketing process is repeated for each digit, while preserving the ordering of the prior step, until all digits have been considered.",
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
        description: "A distribution sort that works by distributing the elements of an array into a number of buckets. Each bucket is then sorted individually, either using a different sorting algorithm, or by recursively applying the bucket sort algorithm. It is a distribution sort, a generalization of pigeonhole sort that allows for a larger range of keys.",
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
        description: "A sorting algorithm that is suitable for sorting lists of elements where the number of elements and the number of possible key values are approximately the same. It requires knowing the range of the values in advance.",
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
        description: "A hybrid stable sorting algorithm, derived from merge sort and insertion sort, designed to perform well on many kinds of real-world data. It was invented by Tim Peters in 2002 for use in the Python programming language.",
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
        description: "A hybrid sorting algorithm that provides both fast average performance and optimal worst-case performance. It starts with quicksort, switches to heapsort when the recursion depth exceeds a level based on the number of elements being sorted, and switches to insertion sort for small partitions.",
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
      [arr[i], arr[j]] = [arr[j], arr[j]];
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
    },
  },
  searching: {
    name: "Searching",
    algorithms: {
      linearSearch: {
        name: "Linear Search",
        description: "A simple method for finding an element within a list. It sequentially checks each element of the list until a match is found or the whole list has been searched. It is one of the simplest searching algorithms.",
        code: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // Found
    }
  }
  return -1; // Not found
}`,
        input: "2,8,5,12,16,23,38,56,72,91;16",
        visualizer: "array",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      binarySearch: {
        name: "Binary Search",
        description: "An efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you've narrowed down the possible locations to just one.",
        code: `function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    let mid = Math.floor(low + (high - low) / 2);
    if (arr[mid] === target) {
      return mid; // Found
    } else if (arr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return -1; // Not found
}`,
        input: "2,5,8,12,16,23,38,56,72,91;23",
        visualizer: "array",
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
      },
      jumpSearch: {
        name: "Jump Search",
        description: "A searching algorithm for sorted arrays. The basic idea is to check fewer elements than linear search by jumping ahead by fixed steps and then doing a linear search in the identified block.",
        code: `function jumpSearch(arr, x) {
    let n = arr.length;
    let step = Math.floor(Math.sqrt(n));
    let prev = 0;
    while (arr[Math.min(step, n) - 1] < x) {
        prev = step;
        step += Math.floor(Math.sqrt(n));
        if (prev >= n)
            return -1;
    }
    while (arr[prev] < x) {
        prev++;
        if (prev == Math.min(step, n))
            return -1;
    }
    if (arr[prev] == x)
        return prev;
    return -1;
}`,
        input: "0,1,1,2,3,5,8,13,21,34,55,89,144,233,377,610;55",
        visualizer: "array",
        timeComplexity: "O(√n)",
        spaceComplexity: "O(1)",
      },
      interpolationSearch: {
        name: "Interpolation Search",
        description: "An improvement over Binary Search for instances where the values in a sorted array are uniformly distributed. It estimates the position of the target value rather than always checking the middle.",
        code: `function interpolationSearch(arr, x) {
    let n = arr.length;
    let lo = 0, hi = n - 1;
    while (lo <= hi && x >= arr[lo] && x <= arr[hi]) {
        if (lo == hi) {
            if (arr[lo] == x) return lo;
            return -1;
        }
        let pos = lo + Math.floor(((hi - lo) / (arr[hi] - arr[lo])) * (x - arr[lo]));
        if (arr[pos] == x)
            return pos;
        if (arr[pos] < x)
            lo = pos + 1;
        else
            hi = pos - 1;
    }
    return -1;
}`,
        input: "10,12,13,16,18,19,20,21,22,23,24,33,35,42,47;18",
        visualizer: "array",
        timeComplexity: "O(log log n)",
        spaceComplexity: "O(1)",
      },
      exponentialSearch: {
        name: "Exponential Search",
        description: "An algorithm used for searching in sorted, unbounded arrays. It involves two steps: first finding a range where the element could be, and then performing a binary search within that range.",
        code: `function exponentialSearch(arr, x) {
    let n = arr.length;
    if (arr[0] == x)
        return 0;
    let i = 1;
    while (i < n && arr[i] <= x)
        i = i * 2;
    return binarySearch(arr, i / 2, Math.min(i, n - 1), x);
}

function binarySearch(arr, l, r, x) {
    if (r >= l) {
        let mid = l + Math.floor((r - l) / 2);
        if (arr[mid] == x)
            return mid;
        if (arr[mid] > x)
            return binarySearch(arr, l, mid - 1, x);
        return binarySearch(arr, mid + 1, r, x);
    }
    return -1;
}`,
        input: "2,3,4,10,40;10",
        visualizer: "array",
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
      },
      ternarySearch: {
        name: "Ternary Search",
        description: "A divide and conquer searching technique. It is similar to binary search but divides the array into three parts and determines which part the key lies in.",
        code: `function ternarySearch(l, r, key, ar) {
    while (r >= l) {
        let mid1 = l + Math.floor((r - l) / 3);
        let mid2 = r - Math.floor((r - l) / 3);

        if (ar[mid1] == key) {
            return mid1;
        }
        if (ar[mid2] == key) {
            return mid2;
        }

        if (key < ar[mid1]) {
            r = mid1 - 1;
        } else if (key > ar[mid2]) {
            l = mid2 + 1;
        } else {
            l = mid1 + 1;
            r = mid2 - 1;
        }
    }
    return -1;
}`,
        input: "1,2,3,4,5,6,7,8,9,10;5",
        visualizer: "array",
        timeComplexity: "O(log3 n)",
        spaceComplexity: "O(1)",
      },
    }
  },
  tree: {
    name: "Tree / Graph",
    algorithms: {
      inOrderTraversal: {
        name: "In-order Traversal",
        description: "A tree traversal method that visits nodes in the order: left child, root, right child. For a Binary Search Tree, this traversal visits nodes in ascending order.",
        code: `function traverse(node) {
  if (node) { // if node is not null
    traverse(node.left);
    
    // visit(node)
    visited_path.push(node.value);
    
    traverse(node.right);
  }
  // return from recursion
}

// final_path = visited_path`,
        input: `{ "value": 10, "left": { "value": 5, "left": { "value": 2, "left": null, "right": null }, "right": { "value": 7, "left": null, "right": null } }, "right": { "value": 15, "left": { "value": 12, "left": null, "right": null }, "right": { "value": 18, "left": null, "right": null } } }`,
        visualizer: "tree",
        timeComplexity: "O(n)",
        spaceComplexity: "O(h)",
      },
      preOrderTraversal: {
        name: "Pre-order Traversal",
        description: "A tree traversal method that visits nodes in the order: root, left child, right child. It's used to create a copy of the tree.",
        code: `function traverse(node) {
  if (node) {
    // visit(node)
    visited_path.push(node.value);

    traverse(node.left);
    traverse(node.right);
  }
  // return from recursion
}

// final_path = visited_path`,
        input: `{ "value": 10, "left": { "value": 5, "left": { "value": 2, "left": null, "right": null }, "right": { "value": 7, "left": null, "right": null } }, "right": { "value": 15, "left": { "value": 12, "left": null, "right": null }, "right": { "value": 18, "left": null, "right": null } } }`,
        visualizer: "tree",
        timeComplexity: "O(n)",
        spaceComplexity: "O(h)",
      },
      postOrderTraversal: {
        name: "Post-order Traversal",
        description: "A tree traversal method that visits nodes in the order: left child, right child, root. It is used to delete the tree.",
        code: `function traverse(node) {
  if (node) {
    traverse(node.left);
    traverse(node.right);

    // visit(node)
    visited_path.push(node.value);
  }
  // return from recursion
}

// final_path = visited_path`,
        input: `{ "value": 10, "left": { "value": 5, "left": { "value": 2, "left": null, "right": null }, "right": { "value": 7, "left": null, "right": null } }, "right": { "value": 15, "left": { "value": 12, "left": null, "right": null }, "right": { "value": 18, "left": null, "right": null } } }`,
        visualizer: "tree",
        timeComplexity: "O(n)",
        spaceComplexity: "O(h)",
      },
      bfsTraversal: {
          name: "Breadth-First Search (BFS)",
          description: "A graph traversal algorithm that explores the neighbor nodes first, before moving to the next level neighbors. It's often used to find the shortest path in an unweighted graph.",
          code: `function bfs(root) {
    const queue = [];
    if (root) {
        queue.push(root);
    }
    while (queue.length > 0) {
        const node = queue.shift();
        // visit(node)
        visited_path.push(node.value);

        if (node.left) {
            queue.push(node.left);
        }
        if (node.right) {
            queue.push(node.right);
        }
    }
    return visited_path;
}`,
          input: `{ "value": 10, "left": { "value": 5, "left": { "value": 2, "left": null, "right": null }, "right": { "value": 7, "left": null, "right": null } }, "right": { "value": 15, "left": { "value": 12, "left": null, "right": null }, "right": { "value": 18, "left": null, "right": null } } }`,
          visualizer: "tree",
          timeComplexity: "O(n)",
          spaceComplexity: "O(w)",
      },
      bestFirstSearch: {
          name: "Best-First Search",
          description: "A graph search algorithm which explores a graph by expanding the most promising node chosen according to a specified rule. It uses a priority queue to select the next node to visit based on a heuristic cost.",
          code: `function bestFirstSearch(startNode, target) {
    let pq = new PriorityQueue();
    pq.add(startNode);
    let visited = new Set();

    while (!pq.isEmpty()) {
        let currentNode = pq.poll(); // Get node with best score

        if (currentNode === target) return "Found!";
        
        visited.add(currentNode);

        for (let neighbor of currentNode.neighbors) {
            if (!visited.has(neighbor)) {
                pq.add(neighbor);
            }
        }
    }
    return "Not Found";
}`,
          input: `{ "value": 10, "left": { "value": 5, "left": { "value": 18, "left": null, "right": null }, "right": { "value": 2, "left": null, "right": null } }, "right": { "value": 15, "left": { "value": 12, "left": null, "right": null }, "right": { "value": 7, "left": null, "right": null } } };2`,
          visualizer: "tree",
          timeComplexity: "O(n log n)",
          spaceComplexity: "O(n)",
      },
      binarySearchTree: {
        name: "Binary Search Tree",
        description: "A node-based binary tree data structure which has the following properties: the left subtree of a node contains only nodes with keys lesser than the node's key; the right subtree of a node contains only nodes with keys greater than the node's key; the left and right subtree each must also be a binary search tree.",
        code: `function buildBST(keys) {
  let root = null;
  keys.forEach(key => {
    root = insert(root, key);
  });
  return root;
}

function insert(node, key) {
  if (node === null) {
    return new Node(key);
  }
  if (key < node.key) {
    node.left = insert(node.left, key);
  } else if (key > node.key) {
    node.right = insert(node.right, key);
  }
  return node;
}`,
        input: "8,3,10,1,6,14,4,7,13",
        visualizer: 'tree',
        timeComplexity: "O(log n) Avg",
        spaceComplexity: "O(h) Avg",
      },
      avlTree: {
        name: "AVL Tree",
        description: "A self-balancing binary search tree. It was the first such data structure to be invented. In an AVL tree, the heights of the two child subtrees of any node differ by at most one; if at any time they differ by more than one, rebalancing is done to restore this property.",
        code: `// AVL Tree insertion
function insert(node, key) {
    // 1. Perform standard BST insertion
    if (node == null) return new Node(key);
    if (key < node.key) node.left = insert(node.left, key);
    else if (key > node.key) node.right = insert(node.right, key);
    else return node;

    // 2. Update height of this ancestor node
    node.height = 1 + Math.max(height(node.left), height(node.right));

    // 3. Get the balance factor
    let balance = getBalance(node);

    // 4. If unbalanced, then perform rotations
    // Left Left Case
    if (balance > 1 && key < node.left.key) return rightRotate(node);
    // Right Right Case
    if (balance < -1 && key > node.right.key) return leftRotate(node);
    // Left Right Case
    if (balance > 1 && key > node.left.key) {
        node.left = leftRotate(node.left);
        return rightRotate(node);
    }
    // Right Left Case
    if (balance < -1 && key < node.right.key) {
        node.right = rightRotate(node.right);
        return leftRotate(node);
    }
    return node;
}`,
        input: "10,20,30,40,50,25",
        visualizer: 'tree',
        timeComplexity: "O(log n)",
        spaceComplexity: "O(log n)",
      },
      minHeap: {
        name: "Min-Heap",
        description: "A Min-Heap is a specialized tree-based data structure that satisfies the heap property: the value of each node is less than or equal to the value of its children. This means the smallest element is always at the root. It is commonly used to implement priority queues.",
        code: `// Heapify a subtree rooted with node i
function heapify(arr, n, i) {
    let smallest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] < arr[smallest]) {
        smallest = left;
    }

    if (right < n && arr[right] < arr[smallest]) {
        smallest = right;
    }

    if (smallest !== i) {
        [arr[i], arr[smallest]] = [arr[smallest], arr[i]];
        heapify(arr, n, smallest);
    }
}

// Build a min-heap from an array
function buildHeap(arr) {
    const n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
}

// Extract the minimum element
function extractMin(arr) {
    const min = arr[0];
    arr[0] = arr.pop();
    heapify(arr, arr.length, 0);
    return min;
}
`,
        input: "10,20,15,30,40,5,50,1",
        visualizer: "tree",
        timeComplexity: "O(log n) Insert/Delete",
        spaceComplexity: "O(1)",
      },
    }
  },
  'data-structures': {
      name: "Data Structures",
      algorithms: {
          hashing: {
              name: "Hashing",
              description: "A technique used to map data of an arbitrary size to data of a fixed size. The values returned by a hash function are called hash values, hash codes, digests, or simply hashes. The values are used to index a fixed-size table called a hash table.",
              code: `class HashTable {
    constructor(size) {
        this.table = new Array(size);
        this.size = size;
    }

    hash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = (hash + key.charCodeAt(i) * i) % this.size;
        }
        return hash;
    }

    set(key, value) {
        const index = this.hash(key);
        if(!this.table[index]) {
            this.table[index] = [];
        }
        // ... collision handling to update or push ...
        this.table[index].push({ key, value });
    }

    get(key) {
        const index = this.hash(key);
        // ... collision handling to find the correct item ...
        return this.table[index];
    }
}`,
              input: "apple,red;banana,yellow;grape,purple;orange,orange;mango,yellow;strawberry,red;peach,orange;lemon,yellow;lime,green;cherry,red;blueberry,blue;watermelon,green;pear,green;pineapple,yellow;kiwi,green",
              visualizer: "hash-table",
              timeComplexity: "O(1) Average",
              spaceComplexity: "O(n)",
          },
          stack: {
            name: "Stack",
            description: "A linear data structure that follows the Last-In, First-Out (LIFO) principle. Elements are added (pushed) and removed (popped) from the same end, called the 'top'.",
            code: `class Stack {
  constructor() {
    this.items = [];
  }
  push(element) {
    this.items.push(element);
  }
  pop() {
    if (this.isEmpty()) {
      return "Underflow";
    }
    return this.items.pop();
  }
  peek() {
    return this.items[this.items.length - 1];
  }
  isEmpty() {
    return this.items.length === 0;
  }
}`,
            input: "push 10,push 20,push 30,pop,push 40,pop,pop",
            visualizer: "stack",
            timeComplexity: "O(1)",
            spaceComplexity: "O(n)",
          },
          queue: {
            name: "Queue",
            description: "A linear data structure that follows the First-In, First-Out (FIFO) principle. Elements are added (enqueued) at the rear and removed (dequeued) from the front, like a line of people.",
            code: `class Queue {
  constructor() {
    this.items = [];
  }
  enqueue(element) {
    this.items.push(element);
  }
  dequeue() {
    if (this.isEmpty()) {
      return "Underflow";
    }
    return this.items.shift();
  }
  front() {
    return this.items[0];
  }
  isEmpty() {
    return this.items.length === 0;
  }
}`,
            input: "enqueue 10,enqueue 20,dequeue,enqueue 30,enqueue 40,dequeue",
            visualizer: "queue",
            timeComplexity: "O(1)",
            spaceComplexity: "O(n)",
          },
          deque: {
            name: "Double-Ended Queue (Deque)",
            description: "A Deque, or double-ended queue, is a generalized version of a Queue. Elements can be added or removed from either the front or the rear, providing maximum flexibility.",
            code: `class Deque {
  constructor() {
    this.items = [];
  }
  addFront(element) {
    this.items.unshift(element);
  }
  addRear(element) {
    this.items.push(element);
  }
  removeFront() {
    if(this.isEmpty()) return "Underflow";
    return this.items.shift();
  }
  removeRear() {
    if(this.isEmpty()) return "Underflow";
    return this.items.pop();
  }
  // ... other helper methods
}`,
            input: "addRear 10,addRear 20,addFront 5,removeRear,removeFront",
            visualizer: "deque",
            timeComplexity: "O(1)",
            spaceComplexity: "O(n)",
          },
          singlyLinkedList: {
            name: "Singly Linked List",
            description: "A linear data structure where elements are stored in nodes. Each node contains a data field and a reference (or 'pointer') to the next node in the sequence. Unlike arrays, linked lists do not have a fixed size and allow for efficient insertions and deletions.",
            code: `class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}
class LinkedList {
    constructor() {
        this.head = null;
    }
    // ... insert, delete, search methods ...
    insertAtEnd(data) {
      const newNode = new Node(data);
      if (!this.head) {
          this.head = newNode;
          return;
      }
      let current = this.head;
      while (current.next) {
          current = current.next;
      }
      current.next = newNode;
    }
}`,
            input: "insert 10,insert 20,insert 5,delete 20,insert 15",
            visualizer: "linked-list",
            timeComplexity: "O(n) Search",
            spaceComplexity: "O(n)",
          },
          doublyLinkedList: {
            name: "Doubly Linked List",
            description: "A Doubly Linked List is a type of linked list where each node contains a data field and two pointers: one to the next node in the sequence (next pointer) and one to the previous node (prev pointer). This bidirectional linking allows for traversal in both directions.",
            code: `class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}
class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }
    // ... insert, delete methods ...
    insertAtEnd(data) {
      const newNode = new Node(data);
      if (!this.head) {
          this.head = newNode;
          this.tail = newNode;
          return;
      }
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
}`,
            input: "insert 10,insert 20,insert 30,delete 20",
            visualizer: "doubly-linked-list",
            timeComplexity: "O(n) Search",
            spaceComplexity: "O(n)",
          },
          circularLinkedList: {
            name: "Circular Linked List",
            description: "A Circular Linked List is a variation of a linked list in which the last node points back to the first node, creating a circle. There is no 'null' at the end. This structure is useful for applications that require continuous looping, like managing processes in a round-robin scheduler.",
            code: `class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}
class CircularLinkedList {
    constructor() {
        this.head = null;
    }
    // ... insert, delete, traversal methods ...
    insertAtEnd(data) {
      const newNode = new Node(data);
      if (!this.head) {
          this.head = newNode;
          newNode.next = this.head; // Points to itself
          return;
      }
      let current = this.head;
      while (current.next !== this.head) {
          current = current.next;
      }
      current.next = newNode;
      newNode.next = this.head;
    }
}`,
            input: "insert 10,insert 20,insert 30,insert 40",
            visualizer: "circular-linked-list",
            timeComplexity: "O(n) Search/Insert",
            spaceComplexity: "O(n)",
          }
      }
  }
} as const;

export type AlgorithmCategoryKey = keyof typeof ALGO_CATEGORIES;
export type AlgorithmKey<T extends AlgorithmCategoryKey> = keyof (typeof ALGO_CATEGORIES)[T]['algorithms'];
