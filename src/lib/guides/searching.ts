import type { GuideMap } from './types';

export const SEARCHING_GUIDES: GuideMap = {
  linearSearch: {
    overview: [
      "Linear Search checks the elements one by one, from the first to the last, until it finds the target or runs out of elements. It makes no assumptions about the data: the array can be unsorted, contain duplicates, or hold values of any type that supports equality.",
      "Because it may have to look at every element, its running time grows in direct proportion to the size of the array. That sounds slow, but for small arrays it is often the fastest option in practice, since it has no setup cost and walks memory sequentially, which CPUs handle very well.",
      "In the default example the array holds ten values and the target is 16. The search compares 2, 8, 5 and 12 before finding 16 at index 4, so it returns 4 after five comparisons.",
    ],
    steps: [
      "Start at index `i = 0`.",
      "If `arr[i]` equals the target, return `i`.",
      "Otherwise increment `i`.",
      "If `i` reaches the end of the array, return `-1` to signal 'not found'.",
    ],
    complexity: [
      { label: 'Best case', value: 'O(1)', why: 'The target is the first element.' },
      { label: 'Average case', value: 'O(n)', why: 'On average about half the array is scanned.' },
      { label: 'Worst case', value: 'O(n)', why: 'The target is last or missing.' },
      { label: 'Extra space', value: 'O(1)', why: 'Only the loop index.' },
    ],
    whenToUse: [
      "Unsorted data, where sorting first would cost more than the search itself.",
      "Small arrays (tens of elements) and one-off lookups.",
      "Linked lists and streams, where you cannot jump to the middle anyway.",
    ],
    pitfalls: [
      "Repeated linear searches over the same large array add up quickly — build a hash set or sort once instead.",
      "Returning inside the loop on the first mismatch is a classic bug that only checks the first element.",
      "Comparing objects with `===` checks identity, not equal contents.",
    ],
  },
  binarySearch: {
    overview: [
      "Binary Search finds a value in a sorted array by repeatedly halving the range that could contain it. It compares the target with the middle element: if they match, the search is over; if the target is larger, the left half (including the middle) can be thrown away; if smaller, the right half can.",
      "Each comparison removes half of the remaining candidates, so even a billion-element array needs at most about 30 comparisons. The price is the precondition: the array must already be sorted, and the algorithm needs random access to jump straight to the middle.",
      "In the default example the target is 23. The first middle is index 4 (value 16), so the search moves right; the next middle is index 7 (value 56), so it moves left; the third probe lands on index 5, which holds 23.",
    ],
    steps: [
      "Set `low = 0` and `high = n - 1`.",
      "While `low <= high`, compute `mid = floor((low + high) / 2)`.",
      "If `arr[mid] === target`, return `mid`.",
      "If `arr[mid] < target`, set `low = mid + 1`; otherwise set `high = mid - 1`.",
      "If the loop ends, the target is not present; return `-1`.",
    ],
    complexity: [
      { label: 'Best case', value: 'O(1)', why: 'The first middle element is the target.' },
      { label: 'Average case', value: 'O(log n)', why: 'The range halves on every comparison.' },
      { label: 'Worst case', value: 'O(log n)', why: 'At most floor(log2 n) + 1 comparisons.' },
      { label: 'Extra space', value: 'O(1)', why: 'Iterative version; the recursive one uses O(log n) stack.' },
    ],
    whenToUse: [
      "Any repeated lookup in sorted, randomly accessible data.",
      "'Binary search on the answer' problems: finding the smallest value that satisfies a monotonic condition, such as the minimum capacity to ship packages in D days.",
      "Finding insertion points, first/last occurrences, and boundaries (lower_bound / upper_bound).",
    ],
    pitfalls: [
      "`low < high` versus `low <= high` and `mid - 1` versus `mid`: mixing conventions causes infinite loops or skipped elements. Pick one invariant and stick to it.",
      "`(low + high) / 2` overflows in fixed-width integer languages; use `low + (high - low) / 2`.",
      "Running it on unsorted data gives wrong answers silently rather than failing.",
    ],
  },
  jumpSearch: {
    overview: [
      "Jump Search is a middle ground between linear and binary search for sorted arrays. Instead of checking every element, it jumps ahead in blocks of size `√n` until it passes the target, then does a short linear scan backwards inside the last block.",
      "With a block size of `√n` there are at most `√n` jumps and at most `√n` steps in the final scan, so the total is O(√n). It is slower than binary search in theory, but it only ever moves forward through the data, which can matter when stepping backwards is expensive.",
      "The default array is the first 16 Fibonacci numbers and the target is 55, so the block size is 4. The search checks the ends of blocks at indices 3 (value 2), 7 (13) and 11 (89). Since 89 is past the target, it scans forward from index 8 and finds 55 at index 10.",
    ],
    steps: [
      "Set `step = floor(√n)` and `prev = 0`.",
      "While the last element of the current block, `arr[min(step, n) - 1]`, is less than the target, set `prev = step` and advance `step` by `√n`. If `prev >= n`, return -1.",
      "Scan linearly from `prev` while `arr[prev] < target`, stopping at the end of the block.",
      "If `arr[prev]` equals the target, return `prev`; otherwise return -1.",
    ],
    complexity: [
      { label: 'Best case', value: 'O(1)', why: 'The target is in the first block, near its start.' },
      { label: 'Average case', value: 'O(√n)', why: 'About √n/2 jumps plus √n/2 scan steps.' },
      { label: 'Worst case', value: 'O(√n)', why: '√n jumps plus a full √n-element scan.' },
      { label: 'Extra space', value: 'O(1)', why: 'Two indices.' },
    ],
    whenToUse: [
      "Sorted data on media where jumping back is costly, such as tape or some sequential storage.",
      "When you want something faster than linear search but simpler than binary search.",
      "As a building block for block-based indexes, where each block is scanned linearly.",
    ],
    pitfalls: [
      "The block size must be `√n` for the O(√n) bound; a fixed small step makes it linear.",
      "Forgetting `min(step, n)` reads past the end of the array on the final jump.",
      "Like binary search, it requires sorted input.",
    ],
  },
  interpolationSearch: {
    overview: [
      "Interpolation Search improves on binary search when values are spread evenly. Instead of always probing the middle, it estimates where the target should be, in the same way you would open a phone book near the back to look for 'Williams'.",
      "The estimate is `pos = lo + ((hi - lo) / (arr[hi] - arr[lo])) * (x - arr[lo])`, a straight-line interpolation between the two ends of the current range. On uniformly distributed data this lands very close to the target, giving O(log log n) probes on average.",
      "In the default example the range is 10..47 and the target is 18. The first estimate is index 3 (value 16), just short of the target; the next estimate from the narrowed range lands exactly on index 4. Two probes instead of binary search's three or four.",
    ],
    steps: [
      "Set `lo = 0` and `hi = n - 1`.",
      "While `lo <= hi` and the target lies between `arr[lo]` and `arr[hi]`, compute `pos` with the interpolation formula.",
      "If `arr[pos]` equals the target, return `pos`.",
      "If `arr[pos]` is smaller, set `lo = pos + 1`; otherwise set `hi = pos - 1`.",
      "If the loop ends, return -1.",
    ],
    complexity: [
      { label: 'Best case', value: 'O(1)', why: 'The first estimate is exact.' },
      { label: 'Average case', value: 'O(log log n)', why: 'For uniformly distributed keys.' },
      { label: 'Worst case', value: 'O(n)', why: 'Exponentially skewed data makes every estimate move by only one position.' },
      { label: 'Extra space', value: 'O(1)', why: 'Iterative implementation.' },
    ],
    whenToUse: [
      "Large sorted arrays of numbers that are close to uniformly distributed, such as sequential IDs with gaps or timestamps sampled at a steady rate.",
      "When each probe is expensive (for example a disk read), so fewer probes matter more than simple arithmetic.",
    ],
    pitfalls: [
      "Dividing by `arr[hi] - arr[lo]` when they are equal causes division by zero; handle the all-equal range separately.",
      "The range check `arr[lo] <= x <= arr[hi]` is required, or `pos` can fall outside the array.",
      "On skewed data it is slower than plain binary search; measure before choosing it.",
    ],
  },
  exponentialSearch: {
    overview: [
      "Exponential Search, also called galloping or doubling search, first finds a range that must contain the target and then runs binary search inside that range. It checks indices 1, 2, 4, 8, 16, … until it finds an element larger than the target or runs off the end.",
      "Because the range doubles each time, finding it takes O(log i) steps, where `i` is the position of the target. That makes it better than plain binary search when the target is near the start, and it works even when the array length is unknown or unbounded.",
      "In the default example (`2, 3, 4, 10, 40`, target 10), index 0 does not match, so `i` grows 1 → 2 → 4. At index 4 the value 40 is larger than 10, so binary search runs on indices 2..4 and finds 10 at index 3.",
    ],
    steps: [
      "If `arr[0]` is the target, return 0.",
      "Set `i = 1`; while `i < n` and `arr[i] <= target`, double `i`.",
      "Run binary search on the range `floor(i / 2)` .. `min(i, n - 1)`.",
      "Return the binary search result.",
    ],
    complexity: [
      { label: 'Best case', value: 'O(1)', why: 'The target is at index 0.' },
      { label: 'Average case', value: 'O(log i)', why: 'i is the target position; both phases are logarithmic in i.' },
      { label: 'Worst case', value: 'O(log n)', why: 'Target near the end.' },
      { label: 'Extra space', value: 'O(1)', why: 'Iterative binary search phase.' },
    ],
    whenToUse: [
      "Unbounded or very large sorted sequences, such as an infinite stream or an API without a length.",
      "When targets are usually near the beginning.",
      "The galloping step in Tim Sort's merge uses this same idea.",
    ],
    pitfalls: [
      "Starting at `i = 0` means doubling never moves (0 × 2 = 0); start at 1.",
      "The binary-search bounds must be clamped to `n - 1`.",
      "It still requires sorted input.",
    ],
  },
  ternarySearch: {
    overview: [
      "Ternary Search splits the sorted range into three parts using two probes, `mid1` and `mid2`. Depending on how the target compares with these two values, it keeps the left third, the right third, or the middle third.",
      "Although it discards two-thirds of the range per step, it needs up to two comparisons to do so, which makes it slightly slower than binary search for searching sorted arrays. Its real strength is a different problem: finding the maximum or minimum of a unimodal function, where binary search does not apply directly.",
      "In the default example (`1..10`, target 5), the first probes are index 3 (value 4) and index 6 (value 7). Since 5 lies between them, the range narrows to indices 4..5, and the next probe finds 5 at index 4.",
    ],
    steps: [
      "Set `l = 0` and `r = n - 1`.",
      "While `l <= r`, compute `mid1 = l + floor((r - l) / 3)` and `mid2 = r - floor((r - l) / 3)`.",
      "If either probe equals the key, return its index.",
      "If the key is below `arr[mid1]`, search `l..mid1-1`; if above `arr[mid2]`, search `mid2+1..r`; otherwise search `mid1+1..mid2-1`.",
      "If the range becomes empty, return -1.",
    ],
    complexity: [
      { label: 'Best case', value: 'O(1)', why: 'A probe hits the target immediately.' },
      { label: 'Average case', value: 'O(log3 n)', why: 'Two-thirds of the range is discarded per iteration.' },
      { label: 'Worst case', value: 'O(log3 n)', why: 'About 2·log3(n) comparisons, more than binary search\'s log2(n).' },
      { label: 'Extra space', value: 'O(1)', why: 'Iterative implementation.' },
    ],
    whenToUse: [
      "Finding the peak or valley of a unimodal function or array, such as an optimal price or launch angle.",
      "Optimisation over continuous ranges where you can evaluate the function but not its derivative.",
      "Learning: it is a good way to understand why binary search is optimal for sorted lookups.",
    ],
    pitfalls: [
      "Using it for plain sorted lookups is usually a de-optimisation compared with binary search.",
      "On functions with flat regions it cannot tell which side to discard.",
      "For continuous ranges, a fixed iteration count is safer than a floating-point equality check.",
    ],
  },
};
