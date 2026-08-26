import { ALGO_CATEGORIES, type AlgorithmCategoryKey } from './algo-templates';

// Loosely-typed shape used everywhere the comparisons are consumed (pages/components).
export type Comparison = {
  slug: string;
  title: string;
  category: AlgorithmCategoryKey;
  algoA: string;
  algoB: string;
  summary: string;
  whenToUseA: string;
  whenToUseB: string;
  keyDifferences: string[];
  verdict: string;
};

// Strictly-typed input, generic over the category, so algoA/algoB are checked against
// that specific category's algorithm keys at the call site below.
function defineComparison<C extends AlgorithmCategoryKey>(comparison: {
  slug: string;
  title: string;
  category: C;
  algoA: keyof (typeof ALGO_CATEGORIES)[C]['algorithms'];
  algoB: keyof (typeof ALGO_CATEGORIES)[C]['algorithms'];
  summary: string;
  whenToUseA: string;
  whenToUseB: string;
  keyDifferences: string[];
  verdict: string;
}): Comparison {
  return comparison as Comparison;
}

export const COMPARISONS: Comparison[] = [
  defineComparison({
    slug: 'quick-sort-vs-merge-sort',
    title: 'Quick Sort vs Merge Sort',
    category: 'sorting',
    algoA: 'quickSort',
    algoB: 'mergeSort',
    summary:
      'Both are O(n log n) divide-and-conquer sorts, but they make very different tradeoffs between speed, memory, and predictability.',
    whenToUseA:
      "Use Quick Sort when you're sorting in-place with limited memory and average-case performance matters more than worst-case guarantees — it's typically faster in practice due to better cache locality and lower constant factors.",
    whenToUseB:
      'Use Merge Sort when you need a stable sort, predictable O(n log n) performance in every case, or when sorting linked lists or external data that doesn\'t fit in memory.',
    keyDifferences: [
      'Quick Sort sorts in-place (O(log n) space for recursion); Merge Sort needs O(n) auxiliary space.',
      "Quick Sort's worst case is O(n²) on adversarial or already-sorted input with a poor pivot; Merge Sort is always O(n log n).",
      'Merge Sort is stable (equal elements keep their relative order); Quick Sort is not stable by default.',
      'Quick Sort generally has better real-world performance due to cache-friendly in-place partitioning.',
    ],
    verdict:
      'For general in-memory sorting where average speed matters, Quick Sort usually wins. For guaranteed worst-case performance or stability, reach for Merge Sort.',
  }),
  defineComparison({
    slug: 'bubble-sort-vs-selection-sort',
    title: 'Bubble Sort vs Selection Sort',
    category: 'sorting',
    algoA: 'bubbleSort',
    algoB: 'selectionSort',
    summary:
      'Two of the simplest O(n²) sorting algorithms, often taught side by side as a first introduction to sorting — but they behave quite differently on real data.',
    whenToUseA:
      "Use Bubble Sort mainly for teaching, or when the input is nearly sorted — with an early-exit optimization it can finish in close to O(n) on already-sorted data.",
    whenToUseB:
      'Use Selection Sort when the cost of swapping elements is high (e.g. large records) since it performs at most n swaps, compared to Bubble Sort\'s potentially O(n²) swaps.',
    keyDifferences: [
      'Bubble Sort repeatedly swaps adjacent out-of-order elements; Selection Sort finds the minimum remaining element and swaps it into place once per pass.',
      'Bubble Sort can be optimized to exit early on a sorted/nearly-sorted array; Selection Sort always runs a full O(n²) comparison scan regardless of input order.',
      'Selection Sort performs O(n) swaps total; Bubble Sort can perform up to O(n²) swaps.',
      'Both are stable in typical implementations, both sort in-place with O(1) extra space.',
    ],
    verdict:
      'Neither scales to large datasets. Selection Sort is preferable when writes/swaps are expensive; Bubble Sort is preferable only for its simplicity or near-sorted inputs.',
  }),
  defineComparison({
    slug: 'merge-sort-vs-heap-sort',
    title: 'Merge Sort vs Heap Sort',
    category: 'sorting',
    algoA: 'mergeSort',
    algoB: 'heapSort',
    summary:
      'Both guarantee O(n log n) in every case, making them safer bets than Quick Sort when worst-case behavior matters — but they differ in memory usage and stability.',
    whenToUseA:
      'Use Merge Sort when stability is required (e.g. sorting objects by one field while preserving order of another) or when sorting external/linked data.',
    whenToUseB:
      'Use Heap Sort when memory is tight — it sorts in-place with O(1) extra space — and stability is not a requirement, such as implementing a priority queue or bounded top-k selection.',
    keyDifferences: [
      'Merge Sort needs O(n) extra space; Heap Sort sorts in-place with O(1) extra space.',
      'Merge Sort is stable; Heap Sort is not stable.',
      'Heap Sort has poor cache locality due to jumping around the heap; Merge Sort has more sequential memory access.',
      'Both guarantee O(n log n) worst-case time, unlike Quick Sort.',
    ],
    verdict:
      'Choose Heap Sort for guaranteed O(n log n) with minimal memory; choose Merge Sort when stability or external sorting is required.',
  }),
  defineComparison({
    slug: 'linear-search-vs-binary-search',
    title: 'Linear Search vs Binary Search',
    category: 'searching',
    algoA: 'linearSearch',
    algoB: 'binarySearch',
    summary:
      'The classic O(n) vs O(log n) tradeoff — Binary Search is dramatically faster, but only works on sorted data.',
    whenToUseA:
      "Use Linear Search when the data is unsorted, small, or a linked structure where random access isn't possible — it requires no preprocessing.",
    whenToUseB:
      'Use Binary Search whenever the data is already sorted (or sorting it once and searching many times is worth the O(n log n) upfront cost) and supports random access, like an array.',
    keyDifferences: [
      'Linear Search works on any collection; Binary Search requires the data to be sorted first.',
      'Linear Search is O(n); Binary Search is O(log n), a massive difference at scale (1M items: ~1,000,000 vs ~20 comparisons worst case).',
      'Binary Search needs random access (arrays); it performs poorly on structures like linked lists.',
      'Linear Search needs no setup; Binary Search only pays off if you search the same sorted data repeatedly.',
    ],
    verdict:
      'If your data is sorted (or can be sorted once and queried many times), Binary Search wins by orders of magnitude. Otherwise Linear Search is the only option.',
  }),
  defineComparison({
    slug: 'stack-vs-queue',
    title: 'Stack vs Queue',
    category: 'data-structures',
    algoA: 'stack',
    algoB: 'queue',
    summary:
      "Two of the most fundamental linear data structures, differing only in the order they release elements — LIFO vs FIFO — which shapes what each is used for.",
    whenToUseA:
      'Use a Stack for LIFO (Last-In, First-Out) needs: undo/redo history, expression/parenthesis matching, function call stacks, and depth-first traversal.',
    whenToUseB:
      'Use a Queue for FIFO (First-In, First-Out) needs: task/job scheduling, breadth-first traversal, print/request queues, and buffering data between producers and consumers.',
    keyDifferences: [
      'Stack: Last-In, First-Out (LIFO). Queue: First-In, First-Out (FIFO).',
      'Stack adds/removes from the same end (the "top"); Queue adds at the rear and removes from the front.',
      'Both support O(1) push/pop or enqueue/dequeue with an array-backed or linked implementation.',
      'Stacks power recursion and DFS; Queues power BFS and scheduling.',
    ],
    verdict:
      'Pick the structure that matches your access pattern: reversal / most-recent-first → Stack, in-order / fairness → Queue.',
  }),
  defineComparison({
    slug: 'binary-search-tree-vs-avl-tree',
    title: 'Binary Search Tree vs AVL Tree',
    category: 'tree',
    algoA: 'binarySearchTree',
    algoB: 'avlTree',
    summary:
      'An AVL Tree is a self-balancing Binary Search Tree — it does everything a BST does, but guarantees O(log n) operations even in the worst case.',
    whenToUseA:
      'Use a plain Binary Search Tree when insertions are close to random (which keeps it roughly balanced naturally) and implementation simplicity matters more than worst-case guarantees.',
    whenToUseB:
      'Use an AVL Tree when insertions can arrive in sorted or adversarial order and you need guaranteed O(log n) lookups, such as in database indexes or real-time systems.',
    keyDifferences: [
      'A plain BST can degrade into a linked list (O(n) operations) if elements are inserted in sorted order; an AVL Tree cannot.',
      'AVL Trees rebalance via rotations after every insert/delete to keep the height difference between subtrees at most 1.',
      'AVL Trees guarantee O(log n) search/insert/delete; BST is O(log n) average but O(n) worst case.',
      'AVL Trees do extra bookkeeping (height/balance factors) and rotation work, making writes slightly more expensive than a plain BST.',
    ],
    verdict:
      "If input order is unpredictable or adversarial, the guaranteed balance of an AVL Tree is worth the extra rotation overhead. For mostly-random data, a plain BST is simpler and fast enough.",
  }),
];
