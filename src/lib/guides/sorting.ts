import type { GuideMap } from './types';

export const SORTING_GUIDES: GuideMap = {
  bubbleSort: {
    overview: [
      "Bubble Sort walks along the array comparing each pair of neighbours. Whenever the left value is bigger than the right one, the two are swapped. After one full pass, the largest value has been carried — bubbled — all the way to the last position, where it stays for good.",
      "Each later pass can therefore stop one position earlier, because the tail of the array is already final. That is why the inner loop in the code runs to `n - i - 1` rather than to the end of the array.",
      "In the visualizer, watch the two highlighted bars on every comparison step. With the default input `5, 3, 8, 4, 2` the value 8 reaches the end after the first pass, 5 settles next, and so on until no out-of-order pair is left.",
    ],
    steps: [
      "Start at index 0 and compare `arr[j]` with `arr[j + 1]`.",
      "If `arr[j] > arr[j + 1]`, swap them; otherwise leave them alone.",
      "Move one position right and repeat until the end of the unsorted part.",
      "The largest unsorted value is now in its final place, so shrink the unsorted part by one.",
      "Repeat passes until the unsorted part has a single element (or, in the optimised version, until a pass makes no swaps).",
    ],
    complexity: [
      { label: 'Best case', value: 'O(n)', why: 'Only with the early-exit flag: one pass over sorted input finds no swaps and stops. The version shown here always does every pass, so it is O(n^2) even on sorted data.' },
      { label: 'Average case', value: 'O(n^2)', why: 'About n^2/2 comparisons, and on random data roughly half of them lead to a swap.' },
      { label: 'Worst case', value: 'O(n^2)', why: 'Reverse-sorted input makes every comparison a swap.' },
      { label: 'Extra space', value: 'O(1)', why: 'Swaps happen in place using a single temporary variable.' },
    ],
    whenToUse: [
      "Teaching and interviews: it is the easiest sort to trace by hand, which makes it a good warm-up for reasoning about loop invariants.",
      "Tiny or almost-sorted arrays where code size matters more than speed, and only with the early-exit optimisation.",
      "Checking whether an array is already sorted: one optimised pass answers that in O(n).",
    ],
    pitfalls: [
      "Off-by-one errors in the inner loop: running `j` up to `n - 1` reads past the sorted tail and, in some languages, past the array.",
      "Using `>=` instead of `>` in the comparison swaps equal elements and silently makes the sort unstable.",
      "Forgetting that the textbook version has no early exit, so it never benefits from sorted input.",
    ],
  },
  selectionSort: {
    overview: [
      "Selection Sort splits the array into a sorted prefix and an unsorted suffix. On every pass it scans the whole unsorted suffix to find the smallest value, then swaps that value into the first unsorted slot. The sorted prefix grows by exactly one element per pass.",
      "The key property is that it performs at most `n - 1` swaps in total, no matter what the input looks like. The number of comparisons, however, is always about n^2/2, because finding a minimum requires looking at every remaining element.",
      "With the default input `64, 25, 12, 22, 11`, the first pass finds 11 and swaps it with 64; the second finds 12 and swaps it with 25. Watch `min_idx` in the variable inspector change as smaller values are discovered.",
    ],
    steps: [
      "Set `i = 0` as the boundary between the sorted and unsorted parts.",
      "Assume `arr[i]` is the minimum and remember its index in `min_idx`.",
      "Scan `j` from `i + 1` to the end; whenever `arr[j] < arr[min_idx]`, update `min_idx`.",
      "Swap `arr[i]` with `arr[min_idx]`.",
      "Increase `i` and repeat until only one unsorted element is left.",
    ],
    complexity: [
      { label: 'Best case', value: 'O(n^2)', why: 'Even sorted input needs a full scan to confirm each minimum.' },
      { label: 'Average case', value: 'O(n^2)', why: 'n(n-1)/2 comparisons regardless of order.' },
      { label: 'Worst case', value: 'O(n^2)', why: 'Same comparison count; swaps never exceed n - 1.' },
      { label: 'Extra space', value: 'O(1)', why: 'Only `min_idx` and a temporary for the swap.' },
    ],
    whenToUse: [
      "When writes are expensive compared with reads, for example flash memory or EEPROM, because it does the fewest swaps of the simple sorts.",
      "Small arrays where predictable, input-independent running time is useful.",
      "As a stepping stone to Heap Sort, which is selection sort with a faster way of finding the minimum.",
    ],
    pitfalls: [
      "It is not stable: the long-distance swap can jump an element over an equal one. Sorting `[2a, 2b, 1]` moves `2a` behind `2b`.",
      "Swapping inside the inner loop, every time a smaller value is seen, turns it into a slower, more confusing variant of Bubble Sort.",
      "It never finishes early, so it is a poor choice when the input is often already sorted.",
    ],
  },
  insertionSort: {
    overview: [
      "Insertion Sort builds the sorted result one element at a time, the way most people sort a hand of playing cards. It takes the next element (the `key`), shifts every larger element in the sorted prefix one slot to the right, and drops the key into the gap that opens up.",
      "Because elements are shifted rather than swapped, each step writes only once per moved element. On data that is already nearly sorted, the inner loop stops almost immediately, which is why Insertion Sort is the fastest simple sort in practice and is used inside Tim Sort and Intro Sort for small pieces.",
      "With the default input `12, 11, 13, 5, 6`, notice how 5 has to travel all the way to the front, shifting 13, 12 and 11, while 13 does not move at all.",
    ],
    steps: [
      "Treat `arr[0]` as a sorted prefix of length 1.",
      "Take `key = arr[i]` for the next index `i`.",
      "Walk `j` left from `i - 1` while `arr[j] > key`, copying `arr[j]` into `arr[j + 1]`.",
      "Write `key` into `arr[j + 1]`, the first position where it is not smaller than its left neighbour.",
      "Repeat for every `i` up to `n - 1`.",
    ],
    complexity: [
      { label: 'Best case', value: 'O(n)', why: 'Already-sorted input: every inner loop stops after one comparison.' },
      { label: 'Average case', value: 'O(n^2)', why: 'Each key moves about halfway back through the prefix.' },
      { label: 'Worst case', value: 'O(n^2)', why: 'Reverse-sorted input shifts every key to the front.' },
      { label: 'Extra space', value: 'O(1)', why: 'Only the `key` variable is needed.' },
    ],
    whenToUse: [
      "Small arrays (roughly under 16–32 elements), where its low overhead beats O(n log n) algorithms.",
      "Nearly sorted data, or data that arrives one item at a time and must stay sorted (online sorting).",
      "As the finishing step inside hybrid sorts such as Tim Sort and Intro Sort.",
    ],
    pitfalls: [
      "Using `>=` in the while condition shifts equal elements and breaks stability.",
      "Swapping on every step instead of shifting triples the number of writes for no benefit.",
      "Forgetting the `j >= 0` bound, which reads `arr[-1]` when the key is the smallest so far.",
    ],
  },
  mergeSort: {
    overview: [
      "Merge Sort is the classic divide-and-conquer sort. It splits the array in half, sorts each half recursively, and then merges the two sorted halves into one sorted run. An array of length one is already sorted, which ends the recursion.",
      "All of the real work happens in the merge step. Two pointers walk the left and right halves; at each step the smaller front element is copied to the output. Because each level of recursion touches every element once and there are log2(n) levels, the total cost is O(n log n) for every input.",
      "With the default input `38, 27, 43, 3, 9, 82, 10`, the visualizer first drills down to single elements such as `[38]` and `[27]`, then merges them back up: `[27, 38]`, `[3, 27, 38, 43]`, and finally the full sorted array.",
    ],
    steps: [
      "If the current range has one element or fewer, return — it is sorted.",
      "Find the middle index `m` and recursively sort `l..m` and `m+1..r`.",
      "Copy the two halves into temporary arrays `L` and `R`.",
      "Repeatedly copy the smaller of `L[i]` and `R[j]` back into the array, advancing that pointer.",
      "When one half runs out, copy whatever remains of the other half.",
    ],
    complexity: [
      { label: 'Best case', value: 'O(n log n)', why: 'The split-and-merge structure does not depend on input order.' },
      { label: 'Average case', value: 'O(n log n)', why: 'log2(n) levels, each doing O(n) merge work.' },
      { label: 'Worst case', value: 'O(n log n)', why: 'Guaranteed — no bad pivot problem as in Quick Sort.' },
      { label: 'Extra space', value: 'O(n)', why: 'The temporary arrays used while merging.' },
    ],
    whenToUse: [
      "When you need a guaranteed O(n log n) and a stable sort, e.g. sorting records by a secondary key.",
      "Sorting linked lists, where merging needs no extra array and random access is unavailable.",
      "External sorting of data too large for memory: sort chunks, then merge them from disk.",
    ],
    pitfalls: [
      "Using `<` instead of `<=` when comparing `L[i]` and `R[j]` takes equal elements from the right first and makes the sort unstable.",
      "Computing the middle as `(l + r) / 2` can overflow in fixed-width integer languages; `l + (r - l) / 2` is safe.",
      "Allocating new temporary arrays on every call is a common performance trap; production code allocates one buffer up front.",
    ],
  },
  quickSort: {
    overview: [
      "Quick Sort picks one element as a pivot and partitions the array so that everything smaller than the pivot ends up on its left and everything else on its right. The pivot is then in its final position, and the two sides are sorted recursively.",
      "The version on this page uses the Lomuto partition scheme with the last element as the pivot. Index `i` marks the end of the 'smaller than pivot' region; whenever `arr[j] < pivot`, that region grows by one and `arr[j]` is swapped into it. A final swap places the pivot just after the region.",
      "With the default input `10, 7, 8, 9, 1, 5`, the first pivot is 5: only 1 is smaller, so after partitioning the array becomes `1, 5, 8, 9, 10, 7`, with 5 fixed at index 1.",
    ],
    steps: [
      "Choose the pivot (`arr[high]` here).",
      "Set `i = low - 1`; for each `j` from `low` to `high - 1`, if `arr[j] < pivot`, increment `i` and swap `arr[i]` with `arr[j]`.",
      "Swap the pivot into position `i + 1`; this is its final index.",
      "Recursively sort `low..i` and `i + 2..high`.",
      "Stop when a range has fewer than two elements.",
    ],
    complexity: [
      { label: 'Best case', value: 'O(n log n)', why: 'Each pivot splits its range roughly in half.' },
      { label: 'Average case', value: 'O(n log n)', why: 'Random pivots give balanced-enough splits on average.' },
      { label: 'Worst case', value: 'O(n^2)', why: 'With a last-element pivot, already-sorted input produces splits of size n-1 and 0 every time.' },
      { label: 'Extra space', value: 'O(log n)', why: 'Recursion stack for balanced splits; O(n) in the worst case.' },
    ],
    whenToUse: [
      "General-purpose in-memory sorting of arrays; its tight inner loop and cache-friendly access make it fast in practice.",
      "When stability is not required and extra O(n) memory for Merge Sort is unwanted.",
      "As the main engine of Intro Sort, which adds a fallback for the worst case.",
    ],
    pitfalls: [
      "A fixed first- or last-element pivot degrades to O(n^2) on sorted or reverse-sorted input. Median-of-three or a random pivot fixes this.",
      "Many duplicate keys also hurt Lomuto partitioning; three-way partitioning (Dutch national flag) handles them well.",
      "Recursing on the larger side first can overflow the stack; recurse on the smaller side and loop on the larger one.",
    ],
  },
  heapSort: {
    overview: [
      "Heap Sort first rearranges the array into a max-heap: a complete binary tree stored in the array where every parent is at least as large as its children. For index `i`, the children live at `2i + 1` and `2i + 2`, so no pointers are needed.",
      "Once the heap is built, the largest value is at index 0. Heap Sort swaps it to the end of the array, shrinks the heap by one, and calls `heapify` to sink the new root to its proper level. Repeating this extracts values from largest to smallest, filling the array from the back.",
      "With the default input `12, 11, 13, 5, 6, 7`, building the heap moves 13 to the root. Each extraction then fixes one more value at the end — 13, then 12, then 11 — until the array is sorted.",
    ],
    steps: [
      "Build a max-heap by calling `heapify` on every non-leaf node from `n/2 - 1` down to 0.",
      "Swap the root (the maximum) with the last element of the heap.",
      "Reduce the heap size by one; the swapped-out maximum is now in its final place.",
      "Call `heapify` on the root to restore the heap property.",
      "Repeat until the heap has one element.",
    ],
    complexity: [
      { label: 'Best case', value: 'O(n log n)', why: 'Every extraction sifts a value down up to log n levels.' },
      { label: 'Average case', value: 'O(n log n)', why: 'n extractions at O(log n) each.' },
      { label: 'Worst case', value: 'O(n log n)', why: 'Guaranteed; building the heap itself is only O(n).' },
      { label: 'Extra space', value: 'O(1)', why: 'The heap lives inside the input array.' },
    ],
    whenToUse: [
      "When you need a worst-case O(n log n) sort with no extra memory, e.g. embedded or real-time systems.",
      "As the safety net inside Intro Sort when Quick Sort recursion gets too deep.",
      "When you only need the top k elements: stop after k extractions.",
    ],
    pitfalls: [
      "It is not stable, and its jumps across the array make it noticeably slower than Quick Sort on real hardware because of cache misses.",
      "Off-by-one mistakes in the child formulas (`2i` / `2i + 1` belong to 1-based heaps, not 0-based arrays).",
      "Forgetting to pass the shrinking heap size to `heapify`, which drags already-sorted values back into the heap.",
    ],
  },
  countingSort: {
    overview: [
      "Counting Sort does not compare elements at all. It counts how many times each value occurs, turns those counts into positions, and then places each element directly into its slot in the output array. That lets it beat the O(n log n) limit that applies to comparison sorts.",
      "The version here supports negative numbers by offsetting every value by the minimum (`arr[i] - min`). After counting, a running total (prefix sum) turns `count[v]` into 'how many elements are less than or equal to v', which is exactly the 1-based position of the last v.",
      "Walking the input from right to left while placing elements keeps equal values in their original order, which makes the algorithm stable. That stability is what Radix Sort relies on. With the default input `4, 2, 2, 8, 3, 3, 1` the range is 1..8, so the count array has eight slots.",
    ],
    steps: [
      "Find `min` and `max` and create a `count` array of size `max - min + 1`.",
      "For every element, increment `count[value - min]`.",
      "Convert `count` into prefix sums so each entry holds an end position.",
      "Walk the input backwards; put each value at `output[count[value - min] - 1]` and decrement that count.",
      "Copy `output` back into the original array.",
    ],
    complexity: [
      { label: 'Best case', value: 'O(n + k)', why: 'k is the value range `max - min + 1`; every pass is linear.' },
      { label: 'Average case', value: 'O(n + k)', why: 'No dependence on input order.' },
      { label: 'Worst case', value: 'O(n + k)', why: 'Becomes impractical when k is much larger than n.' },
      { label: 'Extra space', value: 'O(n + k)', why: 'The count array plus the output array.' },
    ],
    whenToUse: [
      "Integers (or keys that map to integers) with a small range, such as ages, grades or byte values.",
      "As the stable per-digit pass inside Radix Sort.",
      "Histogram-style problems where you need the counts anyway.",
    ],
    pitfalls: [
      "Memory explodes when the range is large: sorting two values, 0 and 1,000,000,000, needs a billion counters.",
      "Iterating forwards in the placement loop still sorts correctly but loses stability.",
      "It does not work directly on floating-point or arbitrary objects without a key-to-integer mapping.",
    ],
  },
  radixSort: {
    overview: [
      "Radix Sort sorts integers one digit at a time, starting from the least significant digit (LSD). Each pass is a stable Counting Sort on a single digit, so after the pass for the tens digit, numbers with equal tens digits are still ordered by their units digit from the previous pass.",
      "The number of passes equals the number of digits in the largest value. The loop variable `exp` is 1, 10, 100 and so on, and `Math.floor(arr[i] / exp) % 10` extracts the current digit.",
      "With the default input `170, 45, 75, 90, 802, 24, 2, 66`, the maximum is 802, so there are three passes. After the units pass the order is `170, 90, 802, 2, 24, 45, 75, 66`; after the tens pass it is `802, 2, 24, 45, 66, 170, 75, 90`; the hundreds pass finishes the job.",
    ],
    steps: [
      "Find the maximum value to know how many digits to process.",
      "For `exp = 1, 10, 100, ...` while `max / exp >= 1`:",
      "Count how many numbers have each digit 0–9 at position `exp`.",
      "Turn the counts into prefix sums and place numbers into `output` from right to left (for stability).",
      "Copy `output` back and move to the next digit.",
    ],
    complexity: [
      { label: 'Best case', value: 'O(d · (n + b))', why: 'd digits, n elements, base b = 10 buckets per pass.' },
      { label: 'Average case', value: 'O(d · (n + b))', why: 'Input order does not matter.' },
      { label: 'Worst case', value: 'O(d · (n + b))', why: 'Effectively linear when d is small and fixed.' },
      { label: 'Extra space', value: 'O(n + b)', why: 'Output array plus the 10-slot count array.' },
    ],
    whenToUse: [
      "Large arrays of fixed-width integers, IDs, IP addresses or dates.",
      "Strings of equal length (sort character by character from the right).",
      "When the key length d is small compared with log n.",
    ],
    pitfalls: [
      "The implementation shown assumes non-negative integers; negatives need to be offset or sorted separately.",
      "Using an unstable per-digit sort breaks the algorithm — later passes would scramble earlier ones.",
      "A single very large value increases d, and with it the number of passes, for the whole array.",
    ],
  },
  bucketSort: {
    overview: [
      "Bucket Sort spreads values across a fixed number of buckets according to where they fall in the overall range, sorts each bucket individually, and concatenates the buckets. If values are spread evenly, each bucket holds only a few items and the whole sort runs in near-linear time.",
      "This page's version uses 5 buckets and the index formula `Math.floor(n * (x - min) / (max - min + 1))`. Each bucket is sorted with the built-in sort, which is fine because buckets are expected to be small.",
      "The default input is six decimals between 0.12 and 0.90. Because of the `+ 1` in the formula (which is meant for integers), every value lands in buckets 0–2 and buckets 3–4 stay empty. Watching the `buckets` variable in the dry run makes that uneven spread easy to see.",
    ],
    steps: [
      "Find `min` and `max` of the input.",
      "Create `n` empty buckets.",
      "Put each value into bucket `floor(n * (x - min) / (max - min + 1))`.",
      "Sort each bucket (insertion sort or the built-in sort).",
      "Concatenate the buckets in order.",
    ],
    complexity: [
      { label: 'Best case', value: 'O(n + k)', why: 'Values spread evenly over k buckets, so each bucket is tiny.' },
      { label: 'Average case', value: 'O(n + k)', why: 'Holds for uniformly distributed input.' },
      { label: 'Worst case', value: 'O(n^2)', why: 'All values fall into one bucket and that bucket is sorted with a quadratic sort.' },
      { label: 'Extra space', value: 'O(n + k)', why: 'The buckets hold every element once.' },
    ],
    whenToUse: [
      "Floating-point values that are roughly uniformly distributed, e.g. random numbers in [0, 1).",
      "Data whose distribution you know, so you can size buckets to match it.",
      "Parallel sorting: buckets can be sorted independently on different threads.",
    ],
    pitfalls: [
      "Skewed data breaks the performance guarantee because most items pile into a few buckets.",
      "The `max - min + 1` denominator is right for integers but compresses fractional ranges, as the default example shows; use `(max - min)` with a guard for the maximum value when sorting decimals.",
      "Choosing too few buckets wastes the idea; too many wastes memory.",
    ],
  },
  pigeonholeSort: {
    overview: [
      "Pigeonhole Sort creates one 'hole' for every possible value between the minimum and the maximum, drops each element into the hole for its value, and then walks the holes in order to rebuild the array. It is the simplest distribution sort and a close cousin of Counting Sort.",
      "The difference is that pigeonhole sort stores the elements themselves in the holes, not just counts. That makes it natural for sorting records by an integer key, while Counting Sort is usually explained with plain numbers.",
      "With the default input `8, 3, 2, 7, 4, 6, 8` the range is 2..8, so seven holes are created. Both 8s go into the last hole and come out in the order they went in, so the sort is stable.",
    ],
    steps: [
      "Find `min` and `max` and compute `range = max - min + 1`.",
      "Create `range` empty holes.",
      "Push each element into `holes[value - min]`.",
      "Visit holes from first to last, writing every element back into the array.",
    ],
    complexity: [
      { label: 'Best case', value: 'O(n + N)', why: 'N is the range of key values; each element and each hole is touched once.' },
      { label: 'Average case', value: 'O(n + N)', why: 'Independent of input order.' },
      { label: 'Worst case', value: 'O(n + N)', why: 'Linear, but N can dominate when the range is wide.' },
      { label: 'Extra space', value: 'O(n + N)', why: 'One hole per possible value plus the stored elements.' },
    ],
    whenToUse: [
      "Lists where the number of elements is close to the number of possible key values.",
      "Sorting records by a small integer key, such as day of month or seat number.",
      "Situations that need a very simple, obviously correct linear sort.",
    ],
    pitfalls: [
      "A wide range with few elements wastes memory on empty holes.",
      "Only works for discrete keys; decimals need to be scaled or bucketed first.",
      "Calling `Math.min(...arr)` on very large arrays can exceed the JavaScript argument limit; use a loop instead.",
    ],
  },
  timSort: {
    overview: [
      "Tim Sort is a hybrid of Insertion Sort and Merge Sort, designed by Tim Peters for Python in 2002 and now used by Python, Java (for objects) and many other runtimes. Its idea is that real-world data often contains sorted stretches, so it sorts small chunks quickly and then merges them.",
      "The simplified version on this page splits the array into runs of `RUN = 32` elements, sorts each run with Insertion Sort, and then merges runs of size 32, 64, 128 and so on. Production Tim Sort goes further: it detects naturally occurring runs, reverses descending ones, and uses 'galloping' to speed up merges.",
      "The default input has 13 elements, which is smaller than one run. The dry run therefore shows a single Insertion Sort pass and no merging — exactly what real Tim Sort does for small arrays. Paste in more than 32 numbers to see the merge phase.",
    ],
    steps: [
      "Divide the array into consecutive runs of size `RUN` (the last run may be shorter).",
      "Sort each run with Insertion Sort.",
      "Set `size = RUN` and merge neighbouring runs of length `size` into runs of length `2 * size`.",
      "Double `size` and repeat until one run covers the whole array.",
    ],
    complexity: [
      { label: 'Best case', value: 'O(n)', why: 'Full Tim Sort detects that already-sorted input is one long run.' },
      { label: 'Average case', value: 'O(n log n)', why: 'Insertion sort on fixed-size runs plus log(n/RUN) merge levels.' },
      { label: 'Worst case', value: 'O(n log n)', why: 'Merge structure guarantees the bound.' },
      { label: 'Extra space', value: 'O(n)', why: 'Temporary arrays during merging.' },
    ],
    whenToUse: [
      "General-purpose stable sorting in standard libraries — you are probably already using it via `sorted()` in Python or `Arrays.sort` on objects in Java.",
      "Data with existing order: logs appended in time order, lists that were sorted and then lightly edited.",
      "Whenever stability and a guaranteed O(n log n) are both required.",
    ],
    pitfalls: [
      "The fixed-run version shown here does not get the O(n) best case; that requires natural run detection.",
      "A RUN size that is too large makes the insertion-sort phase quadratic in practice; 32–64 is the usual range.",
      "Merging with `<` instead of `<=` loses stability, the property Tim Sort is chosen for.",
    ],
  },
  introSort: {
    overview: [
      "Intro Sort (introspective sort) starts as Quick Sort but watches its own recursion depth. If the depth passes `2 * floor(log2(n))`, the input is behaving like a Quick Sort worst case, so it switches that range to Heap Sort, which is guaranteed O(n log n). Small ranges, under 16 elements, are finished with Insertion Sort.",
      "This combination gives Quick Sort's speed on typical data, Heap Sort's worst-case guarantee, and Insertion Sort's low overhead on tiny pieces. It is the algorithm behind `std::sort` in most C++ standard libraries and behind .NET's `Array.Sort`.",
      "The default input has 10 elements, below the 16-element threshold, so the dry run goes straight to Insertion Sort — a nice illustration that hybrid sorts often never use their 'main' algorithm on small inputs. Try 20 or more numbers to see partitioning, and a sorted 40-element list to push it toward the heap-sort fallback.",
    ],
    steps: [
      "Compute `maxdepth = 2 * floor(log2(n))`.",
      "If the current range has fewer than 16 elements, sort it with Insertion Sort and return.",
      "If `maxdepth` has reached 0, sort the range with Heap Sort and return.",
      "Otherwise partition around a pivot as in Quick Sort.",
      "Recurse on both sides with `maxdepth - 1`.",
    ],
    complexity: [
      { label: 'Best case', value: 'O(n log n)', why: 'Balanced partitions, as in Quick Sort.' },
      { label: 'Average case', value: 'O(n log n)', why: 'Quick Sort behaviour dominates.' },
      { label: 'Worst case', value: 'O(n log n)', why: 'The depth limit hands bad ranges to Heap Sort.' },
      { label: 'Extra space', value: 'O(log n)', why: 'Recursion depth is capped at 2·log2(n).' },
    ],
    whenToUse: [
      "General-purpose unstable sorting where worst-case guarantees matter, e.g. sorting untrusted input that could be crafted to attack Quick Sort.",
      "Systems code in C and C++ — it is the default choice there.",
      "Any time you would use Quick Sort but cannot rule out adversarial or pre-sorted data.",
    ],
    pitfalls: [
      "It is not stable; use Merge Sort or Tim Sort when equal keys must keep their order.",
      "Getting the depth limit wrong either never triggers the fallback or triggers it too often.",
      "The 16-element cutoff is a tuning constant; benchmarking on your platform may suggest a different value.",
    ],
  },
};
