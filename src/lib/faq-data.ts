
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
    [CategoryKey in keyof typeof ALGO_CATEGORIES]: {
        algorithms: {
            [AlgoKey in keyof (typeof ALGO_CATEGORIES)[CategoryKey]['algorithms']]: FaqContent;
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
                        answer: "Yes, it is stable because it processes elements in their original order and places them into the pigeonholes, and then iterates through the pigeonholes in order. The order of equal elements is preserved."
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
                    }
                ]
            }
        }
    },
    tree: {
        algorithms: {
            tree: {
                title: "Tree / Graph Traversal",
                faqs: [
                    {
                        question: "What is Tree Traversal?",
                        answer: "Tree traversal (also known as tree search) is a form of graph traversal and refers to the process of visiting (checking and/or updating) each node in a tree data structure, exactly once. Such traversals are classified by the order in which the nodes are visited."
                    },
                    {
                        question: "What are common traversal methods for binary trees?",
                        answer: "The three most common methods for binary trees are: In-order (Left, Root, Right), Pre-order (Root, Left, Right), and Post-order (Left, Right, Root). For a Binary Search Tree, an in-order traversal visits the nodes in ascending sorted order."
                    },
                    {
                        question: "What is the difference between Breadth-First Search (BFS) and Depth-First Search (DFS)?",
                        answer: "Breadth-First Search (BFS) explores neighbor nodes first, level by level. It uses a queue to keep track of nodes to visit. Depth-First Search (DFS) explores as far as possible along each branch before backtracking. It typically uses a stack (often the implicit call stack via recursion)."
                    },
                    {
                        question: "When would you use BFS over DFS?",
                        answer: "Use BFS when you need to find the shortest path between two nodes in an unweighted graph. It's also useful for finding all nodes within a certain distance from a source node, like finding all friends of a friend on a social network."
                    },
                    {
                        question: "When would you use DFS over BFS?",
                        answer: "Use DFS when you need to check for the existence of a path, detect cycles in a graph, or explore all parts of a graph (e.g., in a maze-solving problem or topological sorting). It generally uses less memory than BFS on wide graphs."
                    },
                    {
                        question: "What is the time complexity for BFS and DFS on a graph?",
                        answer: "The time complexity for both BFS and DFS is O(V + E), where V is the number of vertices (nodes) and E is the number of edges. This is because every vertex and every edge will be visited exactly once."
                    },
                    {
                        question: "What is the space complexity for BFS and DFS?",
                        answer: "The space complexity for BFS is O(W), where W is the maximum width of the graph, as the queue can store all nodes at the widest level. The space complexity for DFS is O(H), where H is the maximum height (or depth) of the graph, due to the recursion stack."
                    },
                    {
                        question: "How can you detect a cycle in a directed graph using DFS?",
                        answer: "You can detect a cycle by keeping track of the nodes currently in the recursion stack for the DFS traversal. If you encounter a node that is already in the current recursion stack, you have found a back edge, which indicates a cycle."
                    },
                    {
                        question: "What is topological sorting, and how is it related to DFS?",
                        answer: "Topological sorting is a linear ordering of the vertices of a Directed Acyclic Graph (DAG) such that for every directed edge from vertex u to vertex v, u comes before v in the ordering. It can be implemented using a modified DFS. After a node has been fully explored (all its neighbors visited), it is added to the front of a list."
                    },
                    {
                        question: "What is a trivial use case for a post-order traversal?",
                        answer: "A classic use case for post-order traversal is to delete all nodes in a tree. You must delete the children (left and right) before you can delete the parent node itself. Post-order traversal (Left, Right, Root) ensures this correct order of operations."
                    }
                ]
            }
        }
    }
};

    