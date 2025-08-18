

import { ALGO_CATEGORIES } from "./algo-templates";

type FaqItem = {
    question: string;
    answer: string;
};

type FaqContent = {
    title: string;
    faqs: FaqItem[];
};

type FaqData = {
    [CategoryKey in keyof typeof ALGO_CATEGORIES]?: {
        algorithms: {
            [AlgoKey in keyof (typeof ALGO_CATEGORIES)[CategoryKey]['algorithms']]?: FaqContent;
        };
    };
};

export const FAQ_DATA: FaqData = {
    sorting: {
        algorithms: {
            bubbleSort: {
                title: "Bubble Sort",
                faqs: [
                    {
                        question: "What is Bubble Sort?",
                        answer: "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted."
                    },
                    {
                        question: "What is the time complexity of Bubble Sort?",
                        answer: "The time complexity of Bubble Sort is O(n^2) in the average and worst cases, where n is the number of items being sorted. In the best case (if the array is already sorted), it can be O(n) with an optimized implementation."
                    },
                    {
                        question: "Is Bubble Sort a stable sorting algorithm?",
                        answer: "Yes, Bubble Sort is a stable sorting algorithm. This means that if two elements have the same value, their relative order will be preserved after sorting."
                    },
                    {
                        question: "When is it practical to use Bubble Sort?",
                        answer: "Due to its simplicity, Bubble Sort is often used as a teaching tool. However, its O(n^2) complexity makes it impractical for most real-world applications, especially for large datasets. It can be useful for small, nearly-sorted lists."
                    },
                    {
                        question: "What is the space complexity of Bubble Sort?",
                        answer: "The space complexity is O(1) because it is an in-place sorting algorithm, meaning it doesn't require extra memory proportional to the input size."
                    },
                    {
                        question: "How can you optimize Bubble Sort?",
                        answer: "A common optimization is to introduce a flag that checks if any swaps were made during a pass. If a full pass is completed with no swaps, the array is already sorted, and the algorithm can terminate early. This improves the best-case time complexity to O(n)."
                    },
                    {
                        question: "Is Bubble Sort an adaptive sorting algorithm?",
                        answer: "The standard version is not adaptive, but the optimized version with the flag is. An adaptive algorithm's performance improves if the input is already partially sorted."
                    },
                    {
                        question: "What is the difference between Bubble Sort and Selection Sort?",
                        answer: "Both have an O(n^2) time complexity, but their swap patterns differ. Bubble Sort performs many swaps, exchanging adjacent elements. Selection Sort finds the minimum element and performs only one swap per pass, making it more efficient in terms of writes to memory."
                    },
                    {
                        question: "Can Bubble Sort be implemented recursively?",
                        answer: "Yes, Bubble Sort can be implemented recursively. The recursive function would perform one pass of bubbling the largest element to the end and then call itself for the remaining n-1 elements."
                    },
                    {
                        question: "Why is it called 'Bubble' Sort?",
                        answer: "It's called Bubble Sort because with each pass, the largest unsorted element 'bubbles up' to its correct position at the end of the array, similar to how a bubble rises to the surface of water."
                    },
                     {
                        question: "Where can I learn more?",
                        answer: `You can find a more detailed explanation on <a href='https://www.geeksforgeeks.org/bubble-sort/' target='_blank' rel='noopener noreferrer' class='text-primary hover:underline'>GeeksforGeeks</a>.`
                    }
                ]
            },
            selectionSort: {
                title: "Selection Sort",
                faqs: [
                    {
                        question: "How does Selection Sort work?",
                        answer: "Selection Sort divides the input list into two parts: a sorted sublist which is built up from left to right, and a sublist of unsorted items. The algorithm proceeds by finding the smallest element in the unsorted sublist and swapping it with the leftmost unsorted element, moving the sorted sublist boundary one element to the right."
                    },
                    {
                        question: "What is the time and space complexity of Selection Sort?",
                        answer: "Selection Sort has a time complexity of O(n^2) in all cases (best, average, and worst) because it always makes n-1 passes and scans the remaining array in each pass. The space complexity is O(1) as it's an in-place sort."
                    },
                    {
                        question: "Is Selection Sort stable?",
                        answer: "The standard implementation of Selection Sort is not stable. It can change the relative order of elements with equal values because it might swap a minimum element with the first element of the unsorted part, jumping over an identical element."
                    },
                    {
                        question: "What is a major advantage of Selection Sort?",
                        answer: "Its primary advantage is that it minimizes the number of swaps, performing at most n-1 swaps. This is beneficial in scenarios where writing to memory is a costly operation."
                    },
                    {
                        question: "How does Selection Sort compare to Insertion Sort?",
                        answer: "Both are O(n^2) algorithms. Selection Sort consistently performs the same number of comparisons, whereas Insertion Sort performs fewer comparisons if the array is partially sorted. However, Selection Sort makes fewer swaps."
                    },
                    {
                        question: "Is Selection Sort adaptive?",
                        answer: "No, Selection Sort is not an adaptive algorithm. Its runtime doesn't change based on whether the input array is presorted or not; it will always perform the same number of comparisons."
                    },
                    {
                        question: "Can Selection Sort be used on linked lists?",
                        answer: "It's possible, but highly inefficient. Finding the minimum element in a linked list requires a full traversal, and swapping nodes is more complex than swapping array elements, negating its main advantage of minimal swaps."
                    },
                    {
                        question: "Does the size of the data values affect Selection Sort's performance?",
                        answer: "No, the performance of Selection Sort depends only on the number of elements in the list, not on the values of the elements themselves."
                    },
                    {
                        question: "What is a 'double-ended' Selection Sort?",
                        answer: "This is a variation where each pass finds both the minimum and maximum elements in the unsorted part and places them at the beginning and end, respectively. It can slightly reduce the number of passes but doesn't change the overall O(n^2) complexity."
                    },
                    {
                        question: "Why might you choose Selection Sort for a small dataset?",
                        answer: "For very small datasets, its simplicity and lack of recursion make it easy to implement and debug. While other algorithms are faster for larger sets, the performance difference is negligible for tiny arrays."
                    },
                    {
                        question: "Where can I learn more?",
                        answer: `You can find a more detailed explanation on <a href='https://www.geeksforgeeks.org/selection-sort/' target='_blank' rel='noopener noreferrer' class='text-primary hover:underline'>GeeksforGeeks</a>.`
                    }
                ]
            },
            insertionSort: {
                title: "Insertion Sort",
                faqs: [
                    {
                        question: "What is Insertion Sort?",
                        answer: "Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time. It iterates through an input array and for each element, it finds its correct position in the already-sorted part of the array and inserts it there."
                    },
                    {
                        question: "What is the time complexity of Insertion Sort?",
                        answer: "The worst-case and average-case time complexity is O(n^2). However, its best-case time complexity, when the array is already sorted, is O(n), making it very efficient for nearly-sorted data."
                    },
                    {
                        question: "Is Insertion Sort an in-place, stable algorithm?",
                        answer: "Yes, Insertion Sort is both an in-place algorithm (requiring only O(1) additional memory) and a stable sorting algorithm (it preserves the relative order of equal elements)."
                    },
                    {
                        question: "Why is Insertion Sort considered an 'online' algorithm?",
                        answer: "An online algorithm can process its input piece-by-piece in a serial fashion. Insertion sort can sort a list as it receives it, making it suitable for situations where data arrives over time."
                    },
                    {
                        question: "How does Insertion Sort's performance compare to more advanced algorithms like Quick Sort?",
                        answer: "For large, random datasets, Insertion Sort is significantly slower due to its O(n^2) complexity. However, for small arrays, its low overhead makes it faster. This is why hybrid algorithms like Tim Sort and IntroSort use it for small partitions."
                    },
                    {
                        question: "What is a binary Insertion Sort?",
                        answer: "A binary Insertion Sort is an optimization where binary search is used to find the correct position to insert the current element in the sorted part of the array. This reduces the number of comparisons from O(n) to O(log n) per insertion, but the number of swaps remains O(n) in the worst case, so the overall complexity is still O(n^2)."
                    },
                    {
                        question: "When would you choose Insertion Sort over Bubble Sort?",
                        answer: "Almost always. Insertion Sort is generally more efficient than Bubble Sort. It performs fewer comparisons on average and is particularly fast on data that is already substantially sorted."
                    },
                    {
                        question: "Can you describe the movement of data in Insertion Sort?",
                        answer: "The algorithm maintains a sorted sub-array at the beginning. It takes the first element of the unsorted part and 'inserts' it into the sorted sub-array by shifting all larger elements one position to the right until the correct spot is found."
                    },
                    {
                        question: "Is Insertion Sort a divide-and-conquer algorithm?",
                        answer: "No, it is not. It uses an incremental approach, building up a sorted list one element at a time, rather than dividing the problem into smaller subproblems like Merge Sort or Quick Sort."
                    },
                    {
                        question: "How does Insertion Sort handle duplicate keys?",
                        answer: "As a stable sort, if it encounters an element that is equal to one already in the sorted portion, it will insert the new element after the existing one, preserving their original order."
                    },
                    {
                        question: "Where can I learn more?",
                        answer: `You can find a more detailed explanation on <a href='https://www.geeksforgeeks.org/insertion-sort/' target='_blank' rel='noopener noreferrer' class='text-primary hover:underline'>GeeksforGeeks</a>.`
                    }
                ]
            },
            mergeSort: {
                title: "Merge Sort",
                faqs: [
                    {
                        question: "How does Merge Sort work?",
                        answer: "Merge Sort is a classic divide-and-conquer algorithm. It works by recursively dividing the unsorted list into n sublists, each containing one element. Then, it repeatedly merges these sublists to produce new sorted sublists until there is only one sublist remaining, which is the final sorted list."
                    },
                    {
                        question: "What is the time complexity of Merge Sort?",
                        answer: "Merge Sort has a consistent time complexity of O(n log n) in all cases—best, average, and worst. This reliability is one of its main strengths."
                    },
                    {
                        question: "What is the space complexity of Merge Sort?",
                        answer: "The typical implementation of Merge Sort has a space complexity of O(n) because it requires an auxiliary array of the same size as the input to store the merged results during the merging phase."
                    },
                    {
                        question: "Is Merge Sort a stable algorithm?",
                        answer: "Yes, Merge Sort is a stable sorting algorithm. During the merge step, if two elements are equal, the element from the left sub-array is placed first, preserving the original relative order."
                    },
                    {
                        question: "Is Merge Sort an external sorting algorithm?",
                        answer: "Yes, Merge Sort is highly effective for external sorting, where the data to be sorted is too large to fit into memory. Its sequential access pattern (reading and writing large blocks of data) is ideal for working with slower media like hard drives."
                    },
                    {
                        question: "What is the 'merge' step in Merge Sort?",
                        answer: "The merge step is the core of the algorithm. It takes two sorted sub-arrays and combines them into a single sorted array. It does this by iterating through both sub-arrays with two pointers, and at each step, it copies the smaller of the two elements into the result array."
                    },
                    {
                        question: "Can Merge Sort be done in-place?",
                        answer: "While it's theoretically possible to perform an in-place merge, it is extremely complex and not practical, as it would lose the simplicity and efficiency of the standard algorithm. Therefore, almost all practical implementations use O(n) extra space."
                    },
                    {
                        question: "How does Merge Sort compare to Quick Sort?",
                        answer: "Merge Sort has a better worst-case time complexity (O(n log n) vs Quick Sort's O(n^2)), is stable, and is better for external sorting. However, Quick Sort is often faster in practice for in-memory arrays due to lower constant factors and better cache performance."
                    },
                    {
                        question: "What is a bottom-up Merge Sort?",
                        answer: "A bottom-up (or iterative) Merge Sort avoids recursion. It starts by merging pairs of single elements, then merges pairs of 2-element runs, then 4-element runs, and so on, until the entire array is sorted. It achieves the same O(n log n) time complexity."
                    },
                    {
                        question: "Is Merge Sort a comparison-based sort?",
                        answer: "Yes, Merge Sort is a comparison-based sorting algorithm because it relies on comparing elements to determine their order during the merge step."
                    },
                    {
                        question: "Where can I learn more?",
                        answer: `You can find a more detailed explanation on <a href='https://www.geeksforgeeks.org/merge-sort/' target='_blank' rel='noopener noreferrer' class='text-primary hover:underline'>GeeksforGeeks</a>.`
                    }
                ]
            },
            quickSort: {
                title: "Quick Sort",
                faqs: [
                    {
                        question: "What is Quick Sort?",
                        answer: "Quick Sort is a highly efficient, comparison-based, divide-and-conquer sorting algorithm. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively."
                    },
                    {
                        question: "What is the time complexity of Quick Sort?",
                        answer: "The average-case time complexity is an excellent O(n log n). However, its worst-case time complexity is O(n^2), which occurs if the pivot selection consistently leads to unbalanced partitions (e.g., always picking the smallest or largest element)."
                    },
                    {
                        question: "Is Quick Sort an in-place algorithm?",
                        answer: "Yes, Quick Sort is typically implemented as an in-place algorithm. It doesn't need an auxiliary array for the data, but it does require O(log n) space on average for the recursion stack."
                    },
                    {
                        question: "Is Quick Sort stable?",
                        answer: "No, the standard implementation of Quick Sort is not stable. The partitioning step can change the relative order of elements with equal values as it swaps elements across the pivot."
                    },
                    {
                        question: "How does the choice of pivot affect performance?",
                        answer: "Pivot selection is critical. A good pivot (one that is close to the median) results in balanced partitions and O(n log n) performance. A bad pivot results in unbalanced partitions and degrades performance towards O(n^2)."
                    },
                    {
                        question: "What are common pivot selection strategies?",
                        answer: "Common strategies include: 1) Always picking the first or last element (simple but vulnerable to worst-case scenarios). 2) Picking a random element (generally safe). 3) Using the 'median-of-three' method, which takes the median of the first, middle, and last elements to avoid worst-case on sorted/reverse-sorted data."
                    },
                    {
                        question: "What is the Lomuto partition scheme?",
                        answer: "The Lomuto partition scheme, which is visualized here, typically chooses the last element as the pivot. It maintains an index for the boundary of the 'less than pivot' section and swaps elements into place. It's simple to implement but can be less efficient than other schemes like Hoare's."
                    },
                    {
                        question: "When would you not use Quick Sort?",
                        answer: "You might avoid Quick Sort in applications where a worst-case guarantee of O(n log n) is required. It's also not stable, so if preserving the order of equal elements is important, Merge Sort would be a better choice."
                    },
                    {
                        question: "What is a dual-pivot Quick Sort?",
                        answer: "This is a variation that uses two pivots to partition the array into three sub-arrays: elements less than the first pivot, elements between the pivots, and elements greater than the second pivot. This can be faster in practice and is used in Java's standard library."
                    },
                    {
                        question: "Can Quick Sort be implemented iteratively?",
                        answer: "Yes, Quick Sort can be implemented iteratively using an explicit stack to manage the sub-array boundaries. This avoids deep recursion and potential stack overflow errors for very large arrays."
                    },
                    {
                        question: "Where can I learn more?",
                        answer: `You can find a more detailed explanation on <a href='https://www.geeksforgeeks.org/quick-sort/' target='_blank' rel='noopener noreferrer' class='text-primary hover:underline'>GeeksforGeeks</a>.`
                    }
                ]
            },
            heapSort: {
                title: "Heap Sort",
                faqs: [
                    {
                        question: "What is Heap Sort?",
                        answer: "Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. It divides the input into a sorted and an unsorted region, and it iteratively shrinks the unsorted region by extracting the largest element from it and inserting it into the sorted region."
                    },
                    {
                        question: "How does Heap Sort build the initial heap?",
                        answer: "It starts from the last non-leaf node of the tree (at index n/2 - 1) and calls a 'heapify' function on each node up to the root. The heapify function ensures that the subtree rooted at a given node maintains the max-heap property."
                    },
                    {
                        question: "What is the time complexity of Heap Sort?",
                        answer: "Heap Sort has a reliable time complexity of O(n log n) for all cases (best, average, and worst). Building the initial heap takes O(n), and each of the n extractions takes O(log n)."
                    },
                    {
                        question: "What is the space complexity of Heap Sort?",
                        answer: "Heap Sort is an in-place algorithm with a space complexity of O(1). It sorts the array by rearranging elements within the array itself."
                    },
                    {
                        question: "Is Heap Sort stable?",
                        answer: "No, Heap Sort is not a stable algorithm. The process of heapifying and swapping elements can change the relative order of items with equal values."
                    },
                    {
                        question: "What is a 'heapify' operation?",
                        answer: "Heapify (also known as 'sift-down' or 'max-heapify') is the process of restoring the heap property at a single node. It assumes the subtrees of the node are already heaps. It compares the node with its children and swaps with the larger child if necessary, then recursively calls itself on the affected subtree."
                    },
                    {
                        question: "How does Heap Sort compare to Quick Sort?",
                        answer: "Heap Sort has a better worst-case time complexity (O(n log n)) than Quick Sort (O(n^2)). However, Quick Sort is often faster in practice due to better cache locality and fewer comparisons on average."
                    },
                    {
                        question: "Is Heap Sort a good choice for sorting linked lists?",
                        answer: "No, Heap Sort relies heavily on random access to elements (e.g., finding a parent or child at `arr[i]` and `arr[2i+1]`), which is very inefficient in a linked list. It is best suited for arrays."
                    },
                    {
                        question: "What is the main sorting logic after the heap is built?",
                        answer: "After the max-heap is built, the largest element is always at the root (index 0). The algorithm swaps the root with the last element of the heap, effectively moving the largest element to its final sorted position. It then reduces the heap's size by one and calls 'heapify' on the new root to restore the heap property."
                    },
                    {
                        question: "What are the main use cases for Heap Sort?",
                        answer: "Heap Sort is useful when a guaranteed O(n log n) worst-case performance is needed and when space is limited (since it's in-place). It is also the underlying algorithm for a Priority Queue data structure."
                    },
                    {
                        question: "Where can I learn more?",
                        answer: `You can find a more detailed explanation on <a href='https://www.geeksforgeeks.org/heap-sort/' target='_blank' rel='noopener noreferrer' class='text-primary hover:underline'>GeeksforGeeks</a>.`
                    }
                ]
            },
            countingSort: {
                title: "Counting Sort",
                faqs: [
                    {
                        question: "What is Counting Sort?",
                        answer: "Counting Sort is a non-comparison based integer sorting algorithm. It operates by counting the number of occurrences of each distinct element in the input array and uses arithmetic on these counts to determine the final position of each element."
                    },
                    {
                        question: "What is the time complexity of Counting Sort?",
                        answer: "The time complexity is O(n + k), where n is the number of elements in the input array and k is the range of the integer values (max - min + 1). It is extremely fast if the range k is not significantly larger than n."
                    },
                    {
                        question: "What are the limitations of Counting Sort?",
                        answer: "Its main limitation is that it's only efficient for integers with a relatively small range. If the range (k) is very large (e.g., sorting 32-bit integers), the algorithm becomes impractical due to the large size of the counting array needed. It also doesn't work for non-integer types like floats or strings."
                    },
                    {
                        question: "Is Counting Sort stable?",
                        answer: "Yes, when implemented correctly, Counting Sort is a stable algorithm. This property is crucial for its use as a subroutine in Radix Sort. Stability is achieved by processing the input array from end to beginning when placing elements into the output array."
                    },
                    {
                        question: "How does Counting Sort use its 'count' array?",
                        answer: "First, the count array stores the frequency of each element. Then, it's modified so that each index stores the cumulative count (the sum of all previous counts). This cumulative count directly tells you the final position of each element in the sorted output array."
                    },
                    {
                        question: "Why is Counting Sort not a comparison-based sort?",
                        answer: "It does not compare elements against each other. Instead, it uses the element values themselves as indices into an array to count them, which is why it can break the Ω(n log n) lower bound for comparison sorts."
                    },
                    {
                        question: "What is the space complexity of Counting Sort?",
                        answer: "The space complexity is O(k) to store the count array. This can be a major drawback if k is large."
                    },
                    {
                        question: "How would you handle negative numbers in Counting Sort?",
                        answer: "To handle negative numbers, you can offset the values by the minimum value in the array. When indexing the `count` array, you would use `arr[i] - min`, and when placing elements in the output, you would add `min` back."
                    },
                    {
                        question: "Is Counting Sort an in-place algorithm?",
                        answer: "No, it is not. It requires an auxiliary `count` array of size k and an `output` array of size n, so it is not an in-place sorting algorithm."
                    },
                    {
                        question: "When is Counting Sort better than Quick Sort?",
                        answer: "Counting Sort is better than Quick Sort when the data is a set of integers within a small, known range. In this scenario, its O(n + k) performance will be significantly faster than Quick Sort's O(n log n)."
                    },
                    {
                        question: "Where can I learn more?",
                        answer: `You can find a more detailed explanation on <a href='https://www.geeksforgeeks.org/counting-sort/' target='_blank' rel='noopener noreferrer' class='text-primary hover:underline'>GeeksforGeeks</a>.`
                    }
                ]
            },
            radixSort: {
                title: "Radix Sort",
                faqs: [
                    {
                        question: "What is Radix Sort?",
                        answer: "Radix Sort is a non-comparison based integer sorting algorithm. It sorts numbers by processing individual digits, grouping them by the value of each digit at each position, from least significant to most significant (or vice-versa)."
                    },
                    {
                        question: "How does Radix Sort work?",
                        answer: "It uses a stable sorting algorithm, like Counting Sort, as a subroutine. It sorts the entire list of numbers based on the 1's place, then re-sorts the entire list based on the 10's place, and so on, until all digits have been processed. The stability of the underlying sort is crucial to preserve the order from previous passes."
                    },
                    {
                        question: "What is the time complexity of Radix Sort?",
                        answer: "The time complexity is O(d * (n + k)), where 'd' is the number of digits in the largest number, 'n' is the number of elements, and 'k' is the base of the number system (e.g., 10 for decimal, 256 for bytes). For a fixed number of digits, this is effectively a linear time algorithm."
                    },
                    {
                        question: "What is the space complexity of Radix Sort?",
                        answer: "The space complexity is determined by the underlying stable sort. If using Counting Sort, the space complexity is O(n + k)."
                    },
                    {
                        question: "What does 'LSD' vs 'MSD' Radix Sort mean?",
                        answer: "'LSD' (Least Significant Digit) Radix Sort starts sorting from the rightmost digit and moves left. It is simpler to implement and iterative. 'MSD' (Most Significant Digit) starts from the leftmost digit and moves right, using recursion to sort buckets of numbers that have the same leading digits. LSD is more common."
                    },
                    {
                        question: "Can Radix Sort be used for strings?",
                        answer: "Yes, Radix Sort is very effective for sorting strings. In this case, the 'digits' are the characters of the string, and the sorting is done character by character, usually with a base of 256 (for ASCII characters)."
                    },
                    {
                        question: "Is Radix Sort a comparison-based sort?",
                        answer: "No, it is not. It sorts by grouping elements by their digits, not by comparing them to each other, allowing it to achieve a runtime faster than O(n log n) in certain conditions."
                    },
                    {
                        question: "How does Radix Sort handle numbers with different lengths?",
                        answer: "LSD Radix Sort handles this naturally. Numbers with fewer digits are treated as if they have leading zeros. For example, when sorting by the 100s place, a number like '45' is treated as '045'."
                    },
                    {
                        question: "Why must the subroutine for Radix Sort be stable?",
                        answer: "Stability is essential. For example, after sorting by the 1's place, '25' comes before '32'. When sorting by the 10's place, if the sort is not stable, the relative order of '25' and '32' is not guaranteed to be maintained when they are grouped into buckets for '2' and '3', which would corrupt the final result."
                    },
                    {
                        question: "Is Radix Sort an in-place algorithm?",
                        answer: "No, because it relies on a subroutine like Counting Sort which requires auxiliary space, Radix Sort is not an in-place algorithm."
                    },
                    {
                        question: "Where can I learn more?",
                        answer: `You can find a more detailed explanation on <a href='https://www.geeksforgeeks.org/radix-sort/' target='_blank' rel='noopener noreferrer' class='text-primary hover:underline'>GeeksforGeeks</a>.`
                    }
                ]
            },
            bucketSort: {
                title: "Bucket Sort",
                faqs: [
                    {
                        question: "What is Bucket Sort?",
                        answer: "Bucket Sort, or bin sort, is a sorting algorithm that works by distributing the elements of an array into a number of buckets (or 'bins'). Each bucket is then sorted individually, either using a different sorting algorithm, or by recursively applying the bucket sort algorithm."
                    },
                    {
                        question: "What is the performance of Bucket Sort?",
                        answer: "The average-case time complexity is O(n + k), where n is the number of elements and k is the number of buckets, assuming the input is uniformly distributed. The worst-case time complexity is O(n^2) if all elements fall into a single bucket and a slow sorting algorithm is used on that bucket."
                    },
                    {
                        question: "When should Bucket Sort be used?",
                        answer: "Bucket Sort is most effective when the input data is uniformly distributed over a range. This ensures that elements are spread out evenly across the buckets, leading to optimal performance and avoiding the worst-case scenario."
                    },
                    {
                        question: "Is Bucket Sort stable?",
                        answer: "Yes, Bucket Sort can be implemented as a stable algorithm if the sorting algorithm used to sort the individual buckets is also stable (like Insertion Sort or Merge Sort)."
                    },
                    {
                        question: "What is the space complexity of Bucket Sort?",
                        answer: "The space complexity is O(n + k) in the worst case, where n is the number of elements and k is the number of buckets, to store the buckets and the elements within them."
                    },
                    {
                        question: "How do you determine the number of buckets?",
                        answer: "The number of buckets (k) is a parameter that can be tuned. A common choice is to have k be approximately equal to the number of elements (n). The performance depends on having a good distribution function that maps items to buckets."
                    },
                    {
                        question: "What algorithm is typically used to sort the buckets?",
                        answer: "Insertion Sort is a common choice for sorting the individual buckets because it is very efficient for small lists, and the buckets are expected to be small if the data is uniformly distributed."
                    },
                    {
                        question: "Can Bucket Sort handle negative numbers?",
                        answer: "Yes, the distribution function just needs to be designed to handle the range of numbers, including negatives. For example, it would map the minimum value to the first bucket and the maximum value to the last."
                    },
                    {
                        question: "How is Bucket Sort different from Radix Sort?",
                        answer: "Bucket Sort distributes elements into buckets based on their value range, while Radix Sort distributes elements into buckets based on their digits. Bucket sort is often used for floating-point numbers, while Radix sort is for integers or strings."
                    },
                    {
                        question: "Is Bucket Sort a comparison-based sort?",
                        answer: "It's a mix. The distribution of elements into buckets is not comparison-based. However, the sorting of the individual buckets usually uses a comparison-based sort. Its overall efficiency comes from reducing the number of comparisons by partitioning the data first."
                    },
                    {
                        question: "Where can I learn more?",
                        answer: `You can find a more detailed explanation on <a href='https://www.geeksforgeeks.org/bucket-sort/' target='_blank' rel='noopener noreferrer' class='text-primary hover:underline'>GeeksforGeeks</a>.`
                    }
                ]
            },
            pigeonholeSort: {
                title: "Pigeonhole Sort",
                faqs: [
                    {
                        question: "What is Pigeonhole Sort?",
                        answer: "Pigeonhole Sort is a sorting algorithm that is suitable for sorting lists of elements where the number of elements (n) and the number of possible key values (N) are approximately the same. It requires knowing the range of the input values."
                    },
                    {
                        question: "How does Pigeonhole Sort work?",
                        answer: "First, it finds the minimum and maximum values to determine the range. Then, it creates an array of 'pigeonholes' (like buckets), one for each value in the range. It iterates through the input array, placing each element into its corresponding pigeonhole. Finally, it iterates through the pigeonholes in order, putting the elements back into the original array in sorted order."
                    },
                    {
                        question: "What is its time complexity?",
                        answer: "The time complexity is O(n + N), where n is the number of elements and N is the range of possible key values (max - min + 1). It is extremely efficient if the range N is close to n."
                    },
                    {
                        question: "What is the main limitation of Pigeonhole Sort?",
                        answer: "Its primary limitation is that it's only efficient if the range of values is small and known. If the range is very large compared to the number of elements (e.g., sorting a few 64-bit integers), it becomes highly impractical due to the massive space requirement for the pigeonholes."
                    },
                    {
                        question: "How is it related to Counting Sort?",
                        answer: "Pigeonhole Sort and Counting Sort are very similar. One can think of Counting Sort as a variation where instead of storing the list of elements in each pigeonhole, we only store the count of elements. Pigeonhole Sort is simpler but can use more space if there are duplicate elements."
                    },
                    {
                        question: "What is the space complexity?",
                        answer: "The space complexity is O(n + N) to store the pigeonholes and the elements within them. This makes it unsuitable for data with a large range."
                    },
                    {
                        question: "Is Pigeonhole Sort a stable algorithm?",
                        answer: "Yes, it is stable because it processes elements in their original order and places them into the pigeonholes, and then iterates through the pigeonholes in order, The order of equal elements is preserved."
                    },
                    {
                        question: "Can Pigeonhole Sort be used for floating-point numbers?",
                        answer: "No, it is not suitable for floating-point numbers because they are not discrete. The algorithm requires a finite number of pigeonholes corresponding to a finite number of integer keys."
                    },
                    {
                        question: "Is this an in-place sorting algorithm?",
                        answer: "No, it is not in-place because it requires an auxiliary array of pigeonholes that can be quite large."
                    },
                    {
                        question: "Why isn't Pigeonhole Sort used more commonly?",
                        answer: "It's not a general-purpose sorting algorithm. Its strict requirement of having n ≈ N makes its use cases very specific and rare in practice compared to algorithms like Quick Sort or Merge Sort."
                    },
                    {
                        question: "Where can I learn more?",
                        answer: `You can find a more detailed explanation on <a href='https://www.geeksforgeeks.org/pigeonhole-sort/' target='_blank' rel='noopener noreferrer' class='text-primary hover:underline'>GeeksforGeeks</a>.`
                    }
                ]
            },
            timSort: {
                title: "Tim Sort",
                faqs: [
                    {
                        question: "What is Tim Sort?",
                        answer: "Tim Sort is a highly efficient, adaptive, and stable hybrid sorting algorithm, derived from Merge Sort and Insertion Sort. It is designed to perform well on many kinds of real-world data. It is the standard sorting algorithm in Python and Java (for objects)."
                    },
                    {
                        question: "How does Tim Sort work?",
                        answer: "It works by finding 'natural runs' (contiguous sorted subsequences) in the data. For runs that are smaller than a certain threshold (minrun), it uses Insertion Sort to extend them. Then, it merges these sorted runs using a highly optimized Merge Sort, which employs techniques like 'galloping' to speed up the merge process."
                    },
                    {
                        question: "What is the time complexity of Tim Sort?",
                        answer: "Tim Sort has a best-case time complexity of O(n) when the input is already sorted. Its average and worst-case time complexity are both O(n log n), making it very efficient and reliable."
                    },
                    {
                        question: "Why is Tim Sort so popular in practice?",
                        answer: "It's highly efficient because it's adaptive. It takes advantage of the fact that real-world data is often partially sorted with existing 'runs'. Its use of Insertion Sort for small segments and its intelligent merging strategy make it faster than a pure Merge Sort for most practical datasets."
                    },
                    {
                        question: "What is a 'minrun' in Tim Sort?",
                        answer: "A 'minrun' is a minimum size for a 'run' (a sorted subsequence). In TimSort, if a natural run is shorter than the minrun, it's extended using Insertion Sort until it reaches that minimum size. This helps to ensure that the later merging process is balanced and efficient. The minrun size is calculated based on the size of the total array, typically between 32 and 65."
                    },
                    {
                        question: "What is 'galloping' in Tim Sort's merge step?",
                        answer: "Galloping is an optimization used during the merge step. When data from one run is consistently winning against the other, the algorithm enters 'galloping mode'. It uses an exponential search (gallop) to quickly find where the next element from the other run should be placed, skipping over large chunks of data."
                    },
                    {
                        question: "Is Tim Sort an in-place algorithm?",
                        answer: "It is not strictly in-place. It aims to be space-efficient. For the merge step, it requires temporary storage. The size of this temporary space is at most N/2 in the worst case, but often much smaller (e.g., the size of the smaller run being merged)."
                    },
                    {
                        question: "Why does Tim Sort use Insertion Sort?",
                        answer: "Insertion Sort is used because it is extremely fast for small arrays (due to low overhead) and for arrays that are nearly sorted. Both of these conditions are frequently met by the 'runs' that Tim Sort processes."
                    },
                    {
                        question: "How does Tim Sort maintain stability?",
                        answer: "It maintains stability because both of its component algorithms, Insertion Sort and its specific implementation of Merge Sort, are stable. During the merge, if elements are equal, the element from the run that appeared first in the original array is always chosen first."
                    },
                    {
                        question: "Can Tim Sort's performance degrade?",
                        answer: "Unlike Quick Sort, Tim Sort does not have a common worst-case input that degrades its performance to O(n^2). Its performance is consistently O(n log n) due to its merge-based strategy. The main performance variations come from how much existing order it can exploit in the input data."
                    },
                    {
                        question: "Where can I learn more?",
                        answer: `You can find a more detailed explanation on <a href='https://www.geeksforgeeks.org/timsort/' target='_blank' rel='noopener noreferrer' class='text-primary hover:underline'>GeeksforGeeks</a>.`
                    }
                ]
            },
            introSort: {
                title: "IntroSort (Introspective Sort)",
                faqs: [
                    {
                        question: "What is IntroSort?",
                        answer: "IntroSort (Introspective Sort) is a hybrid sorting algorithm that provides both fast average performance and an optimal O(n log n) worst-case performance. It starts with Quick Sort but switches to Heap Sort when the recursion depth exceeds a certain level, and finally switches to Insertion Sort for very small partitions."
                    },
                    {
                        question: "Why does IntroSort switch algorithms?",
                        answer: "It switches algorithms to combine their strengths and mitigate their weaknesses. It uses Quick Sort for its excellent average-case speed. It switches to Heap Sort to avoid Quick Sort's O(n^2) worst-case scenario. It uses Insertion Sort for small partitions because its low overhead makes it faster for tiny arrays."
                    },
                    {
                        question: "What is the time complexity of IntroSort?",
                        answer: "The time complexity is O(n log n) in all cases (best, average, and worst). This makes it a very reliable and high-performance general-purpose sorting algorithm, and it is the default sorting algorithm in many C++ standard libraries."
                    },
                    {
                        question: "Is IntroSort stable?",
                        answer: "No, because its primary component, Quick Sort, and its fallback, Heap Sort, are not stable algorithms, IntroSort is also not stable. It does not preserve the relative order of equal elements."
                    },
                    {
                        question: "What triggers the switch to Heap Sort?",
                        answer: "The switch to Heap Sort is triggered when the recursion depth of Quick Sort reaches a certain limit. This limit is typically set to 2 * log2(n). This 'introspection' prevents the Quick Sort part of the algorithm from degrading to its O(n^2) worst-case performance on pathological inputs."
                    },
                    {
                        question: "What triggers the switch to Insertion Sort?",
                        answer: "IntroSort switches to Insertion Sort when the size of the partition to be sorted becomes very small (e.g., 16 elements or fewer). For such small arrays, the overhead of recursion in Quick Sort or Heap Sort is higher than the straightforward loops of Insertion Sort."
                    },
                    {
                        question: "What is the space complexity of IntroSort?",
                        answer: "The space complexity is O(log n) due to the recursion stack depth required by Quick Sort and Heap Sort."
                    },
                    {
                        question: "How does IntroSort compare to Tim Sort?",
                        answer: "Both are advanced hybrid sorts. IntroSort is generally faster on average for random data but is not stable. Tim Sort is stable and is exceptionally fast on data with pre-existing sorted runs, which is common in real-world scenarios. The choice depends on whether stability is required and the expected nature of the data."
                    },
                    {
                        question: "Is IntroSort an in-place sort?",
                        answer: "Yes, it is considered an in-place sorting algorithm as it does not require auxiliary storage proportional to the input size, only the O(log n) space for the recursion stack."
                    },
                    {
                        question: "Why is it called 'Introspective' Sort?",
                        answer: "It is named 'Introspective' because the algorithm 'watches' its own performance during the Quick Sort phase. If the recursion becomes too deep (an indicator of a potential worst-case scenario), it reflects on this and switches its strategy to Heap Sort to guarantee O(n log n) performance."
                    },
                    {
                        question: "Where can I learn more?",
                        answer: `You can find a more detailed explanation on <a href='https://www.geeksforgeeks.org/introsort-or-introspective-sort/' target='_blank' rel='noopener noreferrer' class='text-primary hover:underline'>GeeksforGeeks</a>.`
                    }
                ]
            }
        }
    },
    searching: {
        algorithms: {
            linearSearch: {
                title: "Linear Search",
                faqs: [
                    {
                        question: "What is Linear Search?",
                        answer: "Linear Search is the most basic search algorithm. It sequentially checks each element of a list until a match is found or the whole list has been searched. It is simple to implement but often inefficient for large datasets."
                    },
                    {
                        question: "What is the time complexity of Linear Search?",
                        answer: "The time complexity is O(n) in the worst and average cases, as it may need to check every element. The best-case complexity is O(1), which occurs if the target element is the first one in the list."
                    },
                    {
                        question: "What is the space complexity of Linear Search?",
                        answer: "The space complexity is O(1) because it operates directly on the input list without requiring any additional memory proportional to the input size."
                    },
                    {
                        question: "Does Linear Search require the array to be sorted?",
                        answer: "No, a major advantage of Linear Search is that it does not require the data to be sorted. It can be used on any sequence of elements, regardless of their order."
                    },
                    {
                        question: "How does Linear Search compare to Binary Search?",
                        answer: "Linear Search is simpler but slower (O(n)) than Binary Search (O(log n)). However, Binary Search has a strict requirement that the array must be sorted, whereas Linear Search does not. For unsorted or very small arrays, Linear Search is often the more practical choice."
                    },
                    {
                        question: "Can Linear Search be improved?",
                        answer: "For unsorted data, it cannot be fundamentally improved. However, if the same elements are searched for frequently, you can use a technique like 'move-to-front', where a found item is moved to the beginning of the list to speed up subsequent searches for that same item."
                    },
                    {
                        question: "Is Linear Search a good choice for linked lists?",
                        answer: "Yes, Linear Search is the standard way to search a linked list, as linked lists do not support the random access required by more advanced algorithms like Binary Search. The time complexity remains O(n)."
                    },
                    {
                        question: "How do you handle a 'not found' scenario?",
                        answer: "If the algorithm iterates through the entire list without finding the target element, it concludes that the element is not present. It typically signals this by returning a special value like -1, null, or false."
                    },
                    {
                        question: "Can you implement Linear Search recursively?",
                        answer: "Yes, it can be implemented recursively. A recursive function would check the current element, and if it's not a match, it would call itself on the rest of the list. However, the iterative approach is generally preferred as it is more space-efficient."
                    },
                    {
                        question: "What is a sentinel Linear Search?",
                        answer: "A sentinel Linear Search is a small optimization where the target element is added to the end of the list (as a 'sentinel'). This removes the need to check for the end of the array in each iteration of the loop, slightly reducing the number of comparisons per loop, although the overall complexity remains O(n)."
                    },
                    {
                        question: "Where can I learn more?",
                        answer: `You can find a more detailed explanation on <a href='https://www.geeksforgeeks.org/linear-search/' target='_blank' rel='noopener noreferrer' class='text-primary hover:underline'>GeeksforGeeks</a>.`
                    }
                ]
            },
            binarySearch: {
                title: "Binary Search",
                faqs: [
                    {
                        question: "What is Binary Search?",
                        answer: "Binary Search is a highly efficient searching algorithm that works on sorted arrays. It operates by repeatedly dividing the search interval in half. If the value of the search key is less than the item in the middle of the interval, it narrows the interval to the lower half. Otherwise, it narrows it to the upper half."
                    },
                    {
                        question: "What is the main prerequisite for Binary Search?",
                        answer: "The single most important prerequisite for Binary Search is that the array or list must be sorted. If the data is not sorted, the algorithm will not work correctly."
                    },
                    {
                        question: "What is the time complexity of Binary Search?",
                        answer: "The time complexity is O(log n). With each comparison, the algorithm eliminates half of the remaining elements, which makes it extremely fast for large datasets."
                    },
                    {
                        question: "What is the space complexity of Binary Search?",
                        answer: "The iterative version of Binary Search has a space complexity of O(1) (in-place). The recursive version has a space complexity of O(log n) due to the recursion call stack."
                    },
                    {
                        question: "How does Binary Search handle an element that is not in the array?",
                        answer: "The search continues until the search interval is empty (i.e., when the `low` pointer crosses the `high` pointer). At this point, the algorithm terminates and typically returns a special value, like -1 or null, to indicate that the element was not found."
                    },
                    {
                        question: "Can Binary Search be used on a linked list?",
                        answer: "No, it is not efficient for standard linked lists. Binary Search relies on direct, O(1) random access to the middle element, but in a linked list, finding the middle element takes O(n) time. This negates the O(log n) advantage."
                    },
                    {
                        question: "What happens if there are duplicate elements in the array?",
                        answer: "A standard Binary Search will find *an* occurrence of the target element, but it doesn't guarantee which one (e.g., the first or the last). Modified versions are needed to find the first or last occurrence of a duplicate element."
                    },
                    {
                        question: "Describe the iterative vs. recursive approach.",
                        answer: "The iterative approach uses a `while` loop to manage the `low` and `high` pointers, which is generally more space-efficient and avoids potential stack overflow. The recursive approach defines a function that calls itself with the updated `low` or `high` boundaries, which can be more intuitive to read but uses more memory on the stack."
                    },
                    {
                        question: "What is an 'interpolation search' and how does it compare?",
                        answer: "Interpolation search is a variation that, instead of always checking the middle element, makes an educated guess about where the target might be, based on its value relative to the start and end values. It can be faster (O(log log n)) for uniformly distributed data but degrades to O(n) for non-uniform data."
                    },
                    {
                        question: "When would you prefer a linear search over a binary search?",
                        answer: "You would use a linear search if the data is unsorted, as sorting it first would take O(n log n) time, which is slower than a simple O(n) linear scan. Linear search is also preferable for very small arrays where its simplicity and good cache performance might make it faster in practice."
                    },
                    {
                        question: "Where can I learn more?",
                        answer: `You can find a more detailed explanation on <a href='https://www.geeksforgeeks.org/binary-search/' target='_blank' rel='noopener noreferrer' class='text-primary hover:underline'>GeeksforGeeks</a>.`
                    }
                ]
            },
            jumpSearch: {
                title: "Jump Search",
                faqs: [
                    { question: "What is Jump Search?", answer: "Jump Search is a searching algorithm for sorted arrays. The basic idea is to check fewer elements than linear search by jumping ahead by fixed steps and then doing a linear search in the identified block." },
                    { question: "How does Jump Search work?", answer: "It works by jumping ahead by a fixed step size (typically √n). It compares the element at the jumped position. If it's smaller than the target, it jumps again. If it's larger, it performs a linear search in the block between the previous and current jump positions." },
                    { question: "What is the optimal jump size?", answer: "The optimal jump size is √n, where n is the number of elements in the array. This provides the best worst-case performance." },
                    { question: "What is the time complexity of Jump Search?", answer: "The time complexity is O(√n). In the worst case, we perform n/√n jumps and then √n comparisons for the linear search, making it √n + √n = 2√n operations." },
                    { question: "When is Jump Search better than Binary Search?", answer: "Binary Search is generally better (O(log n) vs O(√n)). However, Jump Search can be advantageous when jumping back is expensive. In some systems, memory access patterns might favor jumping forward only." },
                    { question: "Does Jump Search require a sorted array?", answer: "Yes, just like Binary Search, Jump Search requires the array to be sorted." },
                    { question: "What is the space complexity of Jump Search?", answer: "The space complexity is O(1) because it operates in-place on the given array." },
                    { question: "How does it compare to Linear Search?", answer: "It is much faster than Linear Search (O(√n) vs O(n)) for large arrays." },
                    { question: "Can Jump Search be used for linked lists?", answer: "It's not practical for standard linked lists due to the lack of random access needed to perform the 'jumps' efficiently." },
                    { question: "What happens if the element is not found?", answer: "If the linear search phase completes without finding the element, or if the initial jumps go past the end of the array without finding a block that could contain the element, it is concluded that the element is not present." },
                    {
                        question: "Where can I learn more?",
                        answer: `You can find a more detailed explanation on <a href='https://www.geeksforgeeks.org/jump-search/' target='_blank' rel='noopener noreferrer' class='text-primary hover:underline'>GeeksforGeeks</a>.`
                    }
                ]
            },
            interpolationSearch: {
                title: "Interpolation Search",
                faqs: [
                    { question: "What is Interpolation Search?", answer: "Interpolation Search is an improvement over Binary Search for instances where the values in a sorted array are uniformly distributed. It estimates the position of the target value rather than always checking the middle." },
                    { question: "How does the position probing work?", answer: "It uses an interpolation formula to guess the position. The formula is `pos = low + ((x - arr[low]) * (high - low)) / (arr[high] - arr[low])`. This estimates where the target `x` would be, assuming a linear distribution of values between `arr[low]` and `arr[high]`." },
                    { question: "What is the time complexity of Interpolation Search?", answer: "For a uniformly distributed array, the average time complexity is O(log log n), which is faster than Binary Search. However, the worst-case complexity is O(n), which occurs with non-uniform data (e.g., exponentially increasing values)." },
                    { question: "What is the main requirement for using Interpolation Search?", answer: "The array must be sorted, and the values should be uniformly distributed for the algorithm to be efficient." },
                    { question: "What is the space complexity?", answer: "The space complexity is O(1) for the iterative version." },
                    { question: "Why is it called 'Interpolation' Search?", answer: "The name comes from the term 'interpolation,' which is a method of constructing new data points within the range of a discrete set of known data points. The algorithm estimates the position of the key by interpolating its value." },
                    { question: "When would Binary Search be preferred over Interpolation Search?", answer: "Binary Search is preferred when the data is not uniformly distributed or when the distribution is unknown. Its O(log n) performance is guaranteed, whereas Interpolation Search can degrade to O(n)." },
                    { question: "Can it handle non-integer data types?", answer: "The interpolation formula relies on arithmetic operations, so it's primarily designed for numeric data types that can be operated on in this way." },
                    { question: "How does it compare to Jump Search?", answer: "For uniformly distributed data, Interpolation Search is much faster. However, Jump Search has a more reliable O(√n) worst-case performance, which is better than Interpolation Search's O(n) worst case." },
                    { question: "Is it difficult to implement?", answer: "The logic is similar to Binary Search, but involves a more complex calculation for the probe position, which can be prone to implementation errors like division by zero if not handled carefully." },
                    {
                        question: "Where can I learn more?",
                        answer: `You can find a more detailed explanation on <a href='https://www.geeksforgeeks.org/interpolation-search/' target='_blank' rel='noopener noreferrer' class='text-primary hover:underline'>GeeksforGeeks</a>.`
                    }
                ]
            },
            exponentialSearch: {
                title: "Exponential Search",
                faqs: [
                    { question: "What is Exponential Search?", answer: "Exponential Search is an algorithm used to find an element in a sorted, unbounded or infinite array. It can also be more efficient than Binary Search on bounded arrays when the target element is near the beginning." },
                    { question: "How does Exponential Search work?", answer: "It works in two steps. First, it finds a range where the element could be present. It starts with a sub-array of size 1, compares the last element with the target, and then doubles the sub-array size until the last element is greater than the target. Second, it performs a Binary Search within that final identified range." },
                    { question: "What is the time complexity?", answer: "The time complexity is O(log n). Finding the range takes O(log i) where i is the index of the target element, and the subsequent binary search takes O(log i). In the worst case, i can be n, so the complexity is O(log n)." },
                    { question: "Why is it useful for unbounded arrays?", answer: "It's useful for unbounded (or infinite) arrays because it doesn't need to know the size of the array to start. It finds a suitable range first and then performs a bounded binary search." },
                    { question: "What is the space complexity?", answer: "If the final binary search is iterative, the space complexity is O(1). If it's recursive, it's O(log n) for the call stack." },
                    { question: "When is it faster than Binary Search on a bounded array?", answer: "It can be faster if the target element is located near the beginning of the array. Binary Search always starts at the middle, while Exponential Search starts its range-finding at the beginning, so it can find a small range and finish its binary search much faster." },
                    { question: "Is a sorted array required?", answer: "Yes, the array must be sorted for both the range-finding step and the final binary search to work correctly." },
                    { question: "How does it differ from Interpolation Search?", answer: "Exponential Search's strategy is based on finding a range by doubling, while Interpolation Search's strategy is based on probing a likely position using a formula. Exponential Search does not require uniformly distributed data." },
                    { question: "Can it be implemented without recursion?", answer: "Yes, the final binary search step can be implemented iteratively to avoid recursion and reduce space complexity." },
                    { question: "What is another name for Exponential Search?", answer: "It is also sometimes known as Galloping Search or Doubling Search." },
                    {
                        question: "Where can I learn more?",
                        answer: `You can find a more detailed explanation on <a href='https://www.geeksforgeeks.org/exponential-search/' target='_blank' rel='noopener noreferrer' class='text-primary hover:underline'>GeeksforGeeks</a>.`
                    }
                ]
            },
            ternarySearch: {
                title: "Ternary Search",
                faqs: [
                    { question: "What is Ternary Search?", answer: "Ternary Search is a divide-and-conquer search algorithm that finds an element in a sorted array by repeatedly dividing the search space into three parts instead of two." },
                    { question: "How does Ternary Search work?", answer: "It calculates two middle points, `mid1` and `mid2`, which divide the array into three equal parts. It then compares the target with the elements at `mid1` and `mid2` to decide which of the three sub-arrays to continue searching in." },
                    { question: "What is its primary use case?", answer: "While it can be used on sorted arrays, its most common application is to find the minimum or maximum of a unimodal function (a function that strictly increases and then strictly decreases, or vice versa)." },
                    { question: "What is the time complexity of Ternary Search?", answer: "The time complexity is O(log3 n). While the base of the logarithm is larger than in Binary Search (log2 n), this does not represent a significant performance improvement. In fact, it is often slower." },
                    { question: "Why is Ternary Search often slower than Binary Search?", answer: "Although the number of recursive calls is smaller (log3 n vs log2 n), Ternary Search requires two comparisons per iteration, while Binary Search only needs one. The extra comparison per step makes it less efficient than Binary Search for array searching." },
                    { question: "What is the space complexity?", answer: "The space complexity is O(1) for the iterative version and O(log n) for the recursive version." },
                    { question: "Does the array need to be sorted?", answer: "Yes, for finding an element in an array, the array must be sorted." },
                    { question: "How does it compare to Jump Search?", answer: "Binary Search is almost always better than both, but comparing the two, their performance depends on the array size and data distribution. Jump Search's O(√n) is generally worse than Ternary Search's O(log3 n)." },
                    { question: "When should one absolutely use Ternary Search?", answer: "The main practical application is for finding the extremum (min/max) of a unimodal function, where you cannot simply check the middle and decide which half to discard. In this scenario, it is a very effective algorithm." },
                    { question: "How many comparisons are made in the worst case per iteration?", answer: "In the worst case, two comparisons are made: one against `ar[mid1]` and another against `ar[mid2]`." },
                    {
                        question: "Where can I learn more?",
                        answer: `You can find a more detailed explanation on <a href='https://www.geeksforgeeks.org/ternary-search/' target='_blank' rel='noopener noreferrer' class='text-primary hover:underline'>GeeksforGeeks</a>.`
                    }
                ]
            }
        }
    },
    tree: {
        algorithms: {
            inOrderTraversal: {
                title: "In-order Traversal",
                faqs: [
                    {
                        question: "What is Tree Traversal?",
                        answer: "Tree traversal (also known as tree search) is a form of graph traversal and refers to the process of visiting (checking and/or updating) each node in a tree data structure, exactly once. Such traversals are classified by the order in which the nodes are visited."
                    },
                    {
                        question: "What is In-order Traversal?",
                        answer: "In-order traversal is a depth-first traversal method for binary trees. The order is: traverse the Left subtree, visit the Root, then traverse the Right subtree. For a Binary Search Tree, an in-order traversal visits the nodes in ascending sorted order, which is a key property."
                    },
                    {
                        question: "What is the difference between Breadth-First Search (BFS) and Depth-First Search (DFS)?",
                        answer: "Breadth-First Search (BFS) explores neighbor nodes first, level by level. It uses a queue to keep track of nodes to visit. Depth-First Search (DFS), which includes in-order, pre-order, and post-order, explores as far as possible along each branch before backtracking."
                    },
                    {
                        question: "What is the time complexity for In-order traversal?",
                        answer: "The time complexity is O(n), where n is the number of nodes in the tree, because every node is visited exactly once."
                    },
                    {
                        question: "What is the space complexity for In-order traversal?",
                        answer: "The space complexity is O(h), where h is the height of the tree. This is due to the space required for the recursion stack. In the worst case (a skewed tree), this can be O(n), and in the best case (a balanced tree), it is O(log n)."
                    },
                    {
                        question: "Can In-order traversal be done iteratively?",
                        answer: "Yes, an iterative version can be implemented using an explicit stack. The process involves pushing nodes onto the stack as you go left, and then popping a node, visiting it, and moving to its right child."
                    },
                    {
                        question: "Where can I learn more?",
                        answer: `You can find a more detailed explanation on <a href='https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/' target='_blank' rel='noopener noreferrer' class='text-primary hover:underline'>GeeksforGeeks</a>.`
                    }
                ]
            },
             preOrderTraversal: {
                title: "Pre-order Traversal",
                faqs: [
                    {
                        question: "What is Pre-order Traversal?",
                        answer: "Pre-order traversal is a depth-first traversal method for trees. The order of visiting nodes is: Root, Left subtree, Right subtree. It's often used to create a copy of a tree or to get a prefix expression of an expression tree."
                    },
                    {
                        question: "How does Pre-order traversal work?",
                        answer: "Starting from the root, the algorithm first visits the current node (e.g., prints its value or adds it to a list). Then, it recursively calls itself on the left child, and after the entire left subtree is traversed, it recursively calls itself on the right child."
                    },
                    {
                        question: "What is a key use case for Pre-order traversal?",
                        answer: "It is used to create a copy of a tree. By inserting nodes in pre-order sequence, you can replicate the exact structure of the original tree. It is also used to get a prefix expression from an expression tree (e.g., `+ A B`)."
                    },
                    {
                        question: "Where can I learn more?",
                        answer: `You can find a more detailed explanation on <a href='https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/' target='_blank' rel='noopener noreferrer' class='text-primary hover:underline'>GeeksforGeeks</a>.`
                    }
                ]
            },
            postOrderTraversal: {
                title: "Post-order Traversal",
                faqs: [
                    {
                        question: "What is Post-order Traversal?",
                        answer: "Post-order traversal is a depth-first traversal method for trees. The order of visiting nodes is: Left subtree, Right subtree, Root. Its most common use case is for deleting nodes from a tree."
                    },
                    {
                        question: "How does Post-order traversal work?",
                        answer: "The algorithm recursively traverses the left subtree, then recursively traverses the right subtree, and only after both subtrees are fully explored does it visit the current node."
                    },
                    {
                        question: "Why is Post-order traversal used for deleting a tree?",
                        answer: "To delete a tree, you must delete its children before you can delete the node itself. Post-order traversal ensures that a node is processed only after its children have been processed, making it perfect for this task."
                    },
                    {
                        question: "Where can I learn more?",
                        answer: `You can find a more detailed explanation on <a href='https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/' target='_blank' rel='noopener noreferrer' class='text-primary hover:underline'>GeeksforGeeks</a>.`
                    }
                ]
            },
            bfsTraversal: {
                title: "Breadth-First Search (BFS)",
                faqs: [
                    {
                        question: "What is Breadth-First Search (BFS)?",
                        answer: "BFS is a graph traversal algorithm that explores neighbor nodes first, before moving to the next level neighbors. It starts at a source node and explores all of its neighbors at the present depth prior to moving on to the nodes at the next depth level. It uses a queue to keep track of the next location to visit."
                    },
                    {
                        question: "How does BFS work?",
                        answer: "BFS starts with a source node, adds it to a queue, and marks it as visited. Then, it enters a loop that continues as long as the queue is not empty. In each iteration, it dequeues a node, visits it, and enqueues all of its unvisited neighbors. This process guarantees that nodes are visited level by level."
                    },
                    {
                        question: "What is the time complexity of BFS?",
                        answer: "The time complexity is O(V + E), where V is the number of vertices (nodes) and E is the number of edges. Every vertex and every edge is explored exactly once."
                    },
                    {
                        question: "What is the space complexity of BFS?",
                        answer: "The space complexity is O(W), where W is the maximum width of the tree or graph. In the worst-case scenario (a complete binary tree), the last level can contain up to n/2 nodes, so the space can be proportional to the number of nodes."
                    },
                    {
                        question: "What is the primary use case for BFS?",
                        answer: "The most well-known application of BFS is to find the shortest path between two nodes in an unweighted graph. Because it explores level by level, the first time it reaches a target node, it is guaranteed to have found a shortest path."
                    },
                    {
                        question: "How does BFS compare to Depth-First Search (DFS)?",
                        answer: "BFS explores level by level (horizontally), while DFS explores branch by branch (vertically). BFS is better for finding the shortest path in unweighted graphs, while DFS is often used for cycle detection, pathfinding in mazes, and topological sorting."
                    },
                    {
                        question: "Can BFS be implemented recursively?",
                        answer: "While technically possible, it's very unnatural and inefficient. BFS is fundamentally an iterative algorithm that relies on a queue data structure to manage the order of visitation. The iterative approach is standard practice."
                    },
                    {
                        question: "Where can I learn more?",
                        answer: `You can find a more detailed explanation on <a href='https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/' target='_blank' rel='noopener noreferrer' class='text-primary hover:underline'>GeeksforGeeks</a>.`
                    }
                ]
            },
            bestFirstSearch: {
                title: "Best-First Search",
                faqs: [
                    {
                        question: "What is Best-First Search?",
                        answer: "Best-First Search is a graph traversal algorithm that explores a graph by expanding the most promising node chosen according to a specified evaluation function or heuristic. It is considered a 'greedy' algorithm because it always chooses the path that appears best at the moment."
                    },
                    {
                        question: "How does Best-First Search work?",
                        answer: "It uses a priority queue to store the frontier (or open list) of nodes to visit. The priority of each node is determined by a heuristic function. The algorithm repeatedly extracts the highest-priority node from the queue, checks if it's the goal, and if not, expands its neighbors, adding them to the priority queue."
                    },
                    {
                        question: "What is a 'heuristic' in this context?",
                        answer: "A heuristic is a function that estimates the 'cost' or 'promise' of a node. It's an educated guess to guide the search towards the goal. For example, in a map, the heuristic might be the straight-line distance to the destination."
                    },
                    {
                        question: "Is Best-First Search optimal?",
                        answer: "No, a simple greedy Best-First Search is not optimal. It can be deceived by a low-cost path that leads to a dead end, ignoring a slightly higher-cost path that could be a better overall solution. It does not guarantee the shortest path."
                    },
                    {
                        question: "How is it different from Dijkstra's and A* Search?",
                        answer: "Dijkstra's algorithm always expands the node with the lowest actual path cost from the start, making it optimal. A* Search is a type of Best-First Search that combines Dijkstra's (actual cost) with a heuristic (estimated cost to goal), making it both optimal and efficient. Greedy Best-First Search only uses the heuristic."
                    },
                    {
                        question: "What is the time complexity of Best-First Search?",
                        answer: "The time complexity is typically O(E + V log V) where V is vertices and E is edges, when implemented with a priority queue. In the worst case, it can explore all nodes."
                    },
                    {
                        question: "What is the space complexity?",
                        answer: "The space complexity is O(V) to store the nodes in the priority queue and the visited set."
                    },
                    {
                        question: "What data structures are needed?",
                        answer: "The core data structures are a priority queue to manage the open list of nodes to visit and a hash set or boolean array to keep track of the closed (visited) list to avoid cycles."
                    },
                    {
                        question: "Where can I learn more?",
                        answer: `You can find a more detailed explanation on <a href='https://www.geeksforgeeks.org/best-first-search-greedy-search/' target='_blank' rel='noopener noreferrer' class='text-primary hover:underline'>GeeksforGeeks</a>.`
                    }
                ]
            },
            binarySearchTree: {
                title: "Binary Search Tree (BST)",
                faqs: [
                    {
                        question: "What is a Binary Search Tree (BST)?",
                        answer: "A Binary Search Tree is a node-based binary tree data structure which has the following properties: The left subtree of a node contains only nodes with keys lesser than the node's key. The right subtree of a node contains only nodes with keys greater than the node's key. Both the left and right subtrees must also be binary search trees."
                    },
                    {
                        question: "What is the time complexity for search, insert, and delete in a BST?",
                        answer: "For a balanced BST, the time complexity for search, insert, and delete operations is O(log n) on average. In the worst-case scenario (an unbalanced tree resembling a linked list), the complexity becomes O(n)."
                    },
                    {
                        question: "What causes a BST to become unbalanced?",
                        answer: "A BST becomes unbalanced if the input data is inserted in a sorted or nearly sorted order. This leads to a degenerate tree where each node has only one child, effectively turning it into a linked list."
                    },
                    {
                        question: "How can you traverse a BST to get elements in sorted order?",
                        answer: "An in-order traversal (Left, Root, Right) of a BST will visit the nodes in ascending order of their keys."
                    },
                    {
                        question: "What is the difference between a BST and a regular Binary Tree?",
                        answer: "A Binary Tree is a tree where each node has at most two children. A BST is a special type of Binary Tree that imposes the specific ordering property on its nodes (left child < root < right child), which allows for efficient searching."
                    },
                    {
                        question: "How do you find the minimum and maximum value in a BST?",
                        answer: "To find the minimum value, you traverse as far left as possible from the root. The leftmost node is the minimum. To find the maximum value, you traverse as far right as possible; the rightmost node is the maximum."
                    },
                    {
                        question: "What is the space complexity of a BST?",
                        answer: "The space complexity is O(n) to store the n nodes in the tree. The recursive operations (like search or insert) also take O(h) space on the call stack, where h is the height of the tree (which is O(log n) for a balanced tree and O(n) for an unbalanced one)."
                    },
                    {
                        question: "How does the deletion of a node with two children work in a BST?",
                        answer: "To delete a node with two children, you replace the node's value with its in-order successor (the smallest node in its right subtree) or its in-order predecessor (the largest node in its left subtree). Then, you recursively delete the successor/predecessor node, which will have at most one child."
                    },
                    {
                        question: "Are BSTs stable for sorting?",
                        answer: "If you build a BST and then perform an in-order traversal, the sorting is not stable. The tree structure does not inherently preserve the original order of equal elements."
                    },
                    {
                        question: "What are self-balancing BSTs?",
                        answer: "Self-balancing BSTs, such as AVL trees or Red-Black trees, are special types of BSTs that automatically perform rotations to keep their height as close to O(log n) as possible, thus guaranteeing O(log n) performance for all operations."
                    },
                    {
                        question: "Where can I learn more?",
                        answer: `You can find a more detailed explanation on <a href='https://www.geeksforgeeks.org/binary-search-tree-data-structure/' target='_blank' rel='noopener noreferrer' class='text-primary hover:underline'>GeeksforGeeks</a>.`
                    }
                ]
            },
            avlTree: {
                title: "AVL Tree",
                faqs: [
                    {
                        question: "What is an AVL Tree?",
                        answer: "An AVL Tree is a self-balancing Binary Search Tree (BST). It maintains a 'balance factor' for each node, which is the difference between the heights of its left and right subtrees. The tree is considered balanced if every node's balance factor is -1, 0, or 1."
                    },
                    {
                        question: "How does an AVL Tree maintain its balance?",
                        answer: "After an insertion or deletion, the tree checks the balance factors of its nodes along the path back to the root. If a node becomes unbalanced (balance factor of -2 or 2), the tree performs one or more 'rotations' to restore the balance property."
                    },
                    {
                        question: "What is a 'rotation' in an AVL Tree?",
                        answer: "A rotation is a local transformation of a subtree that rearranges nodes to decrease the tree's height and restore balance, while still preserving the BST property. The two basic types are Left Rotation and Right Rotation."
                    },
                    {
                        question: "What is the time complexity of operations in an AVL Tree?",
                        answer: "The time complexity for search, insertion, and deletion is always O(log n) in the worst case. The self-balancing property guarantees that the tree's height never exceeds a certain limit, preventing the O(n) worst-case scenario of a standard BST."
                    },
                    {
                        question: "What are the four cases of unbalance that require rotations?",
                        answer: "The four cases are: 1) Left-Left (requires a single right rotation). 2) Right-Right (requires a single left rotation). 3) Left-Right (requires a left rotation followed by a right rotation). 4) Right-Left (requires a right rotation followed by a left rotation)."
                    },
                    {
                        question: "How does an AVL Tree compare to a Red-Black Tree?",
                        answer: "AVL trees are more strictly balanced than Red-Black trees. This means lookups in an AVL tree are slightly faster on average. However, this strictness requires more rotations during insertion and deletion, making Red-Black trees faster for write-heavy applications."
                    },
                    {
                        question: "What is the space complexity of an AVL Tree?",
                        answer: "The space complexity is O(n) to store the nodes. Each node also requires a small amount of extra space to store its height or balance factor."
                    },
                    {
                        question: "Is building an AVL Tree from a sorted list of n items efficient?",
                        answer: "If you insert items one by one from a sorted list, the tree will perform many rotations. A more efficient way to build an AVL tree from a sorted list is to recursively build it from the middle element, which takes O(n) time."
                    },
                    {
                        question: "Are AVL trees used often in practice?",
                        answer: "They are used in scenarios where lookups are much more frequent than insertions and deletions, and where a guaranteed O(log n) search time is critical. However, in many standard library implementations (like C++ STL maps), Red-Black trees are preferred due to their better insertion/deletion performance."
                    },
                    {
                        question: "What is the 'balance factor'?",
                        answer: "The balance factor of a node is calculated as `height(left subtree) - height(right subtree)`. This value must be in the range [-1, 1] for the tree to be considered balanced."
                    },
                    {
                        question: "Where can I learn more?",
                        answer: `You can find a more detailed explanation on <a href='https://www.geeksforgeeks.org/avl-tree-set-1-insertion/' target='_blank' rel='noopener noreferrer' class='text-primary hover:underline'>GeeksforGeeks</a>.`
                    }
                ]
            }
        }
    },
    'data-structures': {
        algorithms: {
            hashing: {
                title: "Hashing",
                faqs: [
                    {
                        question: "What is Hashing?",
                        answer: "Hashing is a technique used to map data of an arbitrary size to a fixed-size value, called a hash code or hash value. This is done using a hash function. It's fundamental to hash tables (hash maps), a data structure used for fast data retrieval."
                    },
                    {
                        question: "What is a Hash Table?",
                        answer: "A Hash Table is a data structure that implements an associative array abstract data type, a structure that can map keys to values. A hash table uses a hash function to compute an index, also called a hash code, into an array of buckets or slots, from which the desired value can be found."
                    },
                    {
                        question: "What is a hash function and what makes a good one?",
                        answer: "A hash function is an algorithm that takes an input (or 'key') and returns a fixed-size string of bytes, which is the hash value. A good hash function should be: 1) Fast to compute. 2) Deterministic (the same input always produces the same output). 3) It should minimize collisions by distributing keys uniformly across the buckets."
                    },
                    {
                        question: "What is a collision in a hash table?",
                        answer: "A collision occurs when two different keys hash to the same index in the array. Since two values cannot be stored in the same slot, collision resolution strategies are needed."
                    },
                    {
                        question: "How can collisions be handled?",
                        answer: "The two most common methods are: 1) Separate Chaining, where each bucket is the head of a linked list, and all keys that hash to that bucket are stored in the list. 2) Open Addressing, where if a collision occurs, the algorithm probes for the next empty slot in the array (e.g., linear probing, quadratic probing)."
                    },
                    {
                        question: "What is the time complexity of search, insert, and delete in a hash table?",
                        answer: "On average, the time complexity is O(1), assuming a good hash function and minimal collisions. In the worst case (where all keys hash to the same bucket), the complexity degrades to O(n), as it becomes equivalent to a linear search through a linked list."
                    },
                    {
                        question: "What is the 'load factor' of a hash table?",
                        answer: "The load factor (α) is the ratio of the number of stored elements to the number of buckets in the hash table (α = n/k). It's a measure of how full the hash table is. A higher load factor increases the probability of collisions. To maintain performance, a hash table is often resized when the load factor exceeds a certain threshold (e.g., 0.7)."
                    },
                    {
                        question: "When would you use a hash table?",
                        answer: "Hash tables are ideal when you need fast lookups, insertions, and deletions. They are used to implement caches, dictionaries (maps), and sets. For example, counting the frequency of words in a document or checking for the presence of an item in a collection."
                    },
                    {
                        question: "What are some real-world applications of hashing?",
                        answer: "Beyond hash tables, hashing is crucial for cryptography (e.g., storing password hashes instead of plain text), data integrity checks (e.g., checksums for file downloads), and building data structures like Bloom filters."
                    },
                    {
                        question: "Can a hash table store duplicate keys?",
                        answer: "A standard hash map or dictionary cannot store duplicate keys, as each key must uniquely map to a value. If you try to insert a key that already exists, you will typically overwrite the existing value. To store multiple values for one key, you would need a 'multimap', where each bucket can hold multiple values (e.g., in a list)."
                    },
                    {
                        question: "Where can I learn more?",
                        answer: `You can find a more detailed explanation on <a href='https://www.geeksforgeeks.org/hashing-data-structure/' target='_blank' rel='noopener noreferrer' class='text-primary hover:underline'>GeeksforGeeks</a>.`
                    }
                ]
            }
        }
    }
};

    