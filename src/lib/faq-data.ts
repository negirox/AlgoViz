
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
                    }
                ]
            },
            selectionSort: {
                title: "Selection Sort",
                faqs: [
                    {
                        question: "How does Selection Sort work?",
                        answer: "Selection Sort divides the input list into two parts: a sorted sublist of items which is built up from left to right at the front (left) of the list, and a sublist of the remaining unsorted items. Initially, the sorted sublist is empty and the unsorted sublist is the entire input list. The algorithm proceeds by finding the smallest (or largest, depending on sorting order) element in the unsorted sublist, exchanging (swapping) it with the leftmost unsorted element, and moving the sublist boundaries one element to the right."
                    },
                    {
                        question: "What is the time and space complexity of Selection Sort?",
                        answer: "Selection Sort has a time complexity of O(n^2) in all cases (best, average, and worst). The space complexity is O(1) as it sorts the list in-place."
                    },
                    {
                        question: "Is Selection Sort stable?",
                        answer: "No, the standard implementation of Selection Sort is not stable. It can change the relative order of elements with equal values. For example, sorting an array like [ (5, 'a'), (5, 'b'), 2 ] could result in the 'b' instance of 5 coming before the 'a' instance."
                    },
                    {
                        question: "What is a major advantage of Selection Sort?",
                        answer: "Its main advantage is that it performs a minimal number of swaps (at most n-1). This can be important if writing to memory is a very expensive operation."
                    },
                    {
                        question: "How does Selection Sort compare to Bubble Sort?",
                        answer: "Both have an O(n^2) time complexity, but Selection Sort almost always outperforms Bubble Sort because it makes fewer swaps. While Bubble Sort makes O(n^2) swaps in the worst case, Selection Sort makes only O(n) swaps."
                    }
                ]
            },
            insertionSort: {
                title: "Insertion Sort",
                faqs: [
                    {
                        question: "What is Insertion Sort?",
                        answer: "Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time. It iterates through an input array and removes one element per iteration, finds the place the element belongs in the array, and then places it there."
                    },
                    {
                        question: "What is the time complexity of Insertion Sort?",
                        answer: "The worst-case and average-case time complexity is O(n^2). The best-case time complexity, when the array is already sorted, is O(n)."
                    },
                    {
                        question: "Is Insertion Sort efficient for large datasets?",
                        answer: "No, due to its O(n^2) complexity, it's not efficient for large datasets. However, it is one of the fastest algorithms for sorting small arrays and is highly efficient for lists that are already substantially sorted."
                    },
                    {
                        question: "Is Insertion Sort an in-place, stable algorithm?",
                        answer: "Yes, Insertion Sort is an in-place algorithm (it only requires a constant amount O(1) of extra memory space) and it is also a stable sorting algorithm."
                    },
                    {
                        question: "Why is Insertion Sort considered an 'online' algorithm?",
                        answer: "An online algorithm is one that can process its input piece-by-piece in a serial fashion. Insertion sort can sort a list as it receives it, making it suitable for situations where data arrives over time."
                    }
                ]
            },
            mergeSort: {
                title: "Merge Sort",
                faqs: [
                    {
                        question: "How does Merge Sort work?",
                        answer: "Merge Sort is a divide-and-conquer algorithm. It works by recursively dividing the unsorted list into n sublists, each containing one element. Then, it repeatedly merges sublists to produce new sorted sublists until there is only one sublist remaining, which will be the sorted list."
                    },
                    {
                        question: "What is the time complexity of Merge Sort?",
                        answer: "Merge Sort has a time complexity of O(n log n) in all cases—best, average, and worst. This makes it a very efficient and reliable sorting algorithm."
                    },
                    {
                        question: "What is the space complexity of Merge Sort?",
                        answer: "The space complexity of Merge Sort is O(n) because it requires an auxiliary array of the same size as the input array to store the merged results."
                    },
                    {
                        question: "Is Merge Sort a stable algorithm?",
                        answer: "Yes, Merge Sort is a stable sorting algorithm. It preserves the relative order of equal elements, which is an important property for many applications."
                    },
                    {
                        question: "Is Merge Sort an external sort?",
                        answer: "Yes, Merge Sort is often used for external sorting, where the data to be sorted is too large to fit into memory. Its sequential access pattern makes it ideal for reading and writing large chunks of data from external storage like a hard drive."
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
                        answer: "The average-case time complexity is O(n log n), which is why it's so popular. However, the worst-case time complexity is O(n^2), which can occur if the pivot selection is poor (e.g., always picking the smallest or largest element)."
                    },
                    {
                        question: "Is Quick Sort an in-place algorithm?",
                        answer: "Yes, Quick Sort is typically implemented as an in-place sorting algorithm, meaning it requires O(log n) to O(n) space for the recursion stack, but not for storing the data itself."
                    },
                    {
                        question: "Is Quick Sort stable?",
                        answer: "No, the standard implementation of Quick Sort is not stable. The partitioning step can change the relative order of equal elements."
                    },
                    {
                        question: "How can the worst-case scenario be avoided?",
                        answer: "The worst-case can be avoided by using a good pivot selection strategy. Common strategies include picking a random element, using the 'median-of-three' method, or using an algorithm like IntroSort which switches to HeapSort if recursion gets too deep."
                    }
                ]
            },
            heapSort: {
                title: "Heap Sort",
                faqs: [
                    {
                        question: "What is Heap Sort?",
                        answer: "Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. It first builds a max-heap from the input data. Then, it repeatedly swaps the root (the largest element) with the last element of the heap, reduces the heap size by one, and heapifies the root to maintain the heap property."
                    },
                    {
                        question: "What is the time complexity of Heap Sort?",
                        answer: "Heap Sort has a time complexity of O(n log n) for all cases (best, average, and worst), making it very consistent."
                    },
                    {
                        question: "What is the space complexity of Heap Sort?",
                        answer: "Heap Sort is an in-place algorithm with a space complexity of O(1). It does not require extra memory proportional to the input size."
                    },
                    {
                        question: "Is Heap Sort stable?",
                        answer: "No, Heap Sort is not a stable algorithm because the heapifying process can change the relative order of equal elements."
                    },
                    {
                        question: "What is a 'heap' in this context?",
                        answer: "A heap is a specialized tree-based data structure that satisfies the heap property: in a max-heap, for any given node C, if P is a parent node of C, then the value of P is greater than or equal to the value of C. In a min-heap, the value of P is less than or equal to the value of C."
                    }
                ]
            },
            countingSort: {
                title: "Counting Sort",
                faqs: [
                    {
                        question: "What is Counting Sort?",
                        answer: "Counting Sort is a non-comparison based sorting algorithm that operates by counting the number of objects that have each distinct key value. It then uses arithmetic on these counts to determine the positions of each key value in the output sequence."
                    },
                    {
                        question: "What is the time complexity of Counting Sort?",
                        answer: "The time complexity is O(n + k), where n is the number of elements and k is the range of the input values (max - min). It's very efficient when k is not significantly larger than n."
                    },
                    {
                        question: "What are the limitations of Counting Sort?",
                        answer: "Counting Sort is only effective when the range of input values (k) is relatively small. If the range is very large, the algorithm becomes inefficient in both time and space. It is also restricted to sorting integers."
                    },
                    {
                        question: "Is Counting Sort stable?",
                        answer: "Yes, Counting Sort can be implemented as a stable sort, which is a key advantage and allows it to be used as a subroutine in Radix Sort."
                    },
                    {
                        question: "Is Counting Sort a comparison-based sort?",
                        answer: "No, it is not. It sorts elements by counting their occurrences and calculating their positions, rather than by comparing elements to each other. This is why it can achieve a linear time complexity under the right conditions."
                    }
                ]
            },
            radixSort: {
                title: "Radix Sort",
                faqs: [
                    {
                        question: "What is Radix Sort?",
                        answer: "Radix Sort is a non-comparison based sorting algorithm that sorts integers by processing individual digits. It sorts the numbers digit by digit, from the least significant digit to the most significant digit (or vice versa)."
                    },
                    {
                        question: "How does Radix Sort work?",
                        answer: "It uses a stable sorting algorithm, like Counting Sort, as a subroutine to sort the elements based on each digit's value. It processes all numbers for the 1's place, then the 10's place, then the 100's place, and so on, until all digits have been considered."
                    },
                    {
                        question: "What is the time complexity of Radix Sort?",
                        answer: "The time complexity is O(d * (n + k)), where d is the number of digits in the maximum number, n is the number of elements, and k is the base of the number system (e.g., 10 for decimal). For a fixed number of digits, this is effectively linear."
                    },
                    {
                        question: "When is Radix Sort a good choice?",
                        answer: "Radix Sort is excellent for sorting large lists of integers (or strings). It can be faster than comparison-based sorts like Quick Sort or Merge Sort if the keys have a limited number of digits."
                    },
                    {
                        question: "What does 'LSD' vs 'MSD' Radix Sort mean?",
                        answer: "'LSD' (Least Significant Digit) Radix Sort starts sorting from the rightmost digit and moves left. 'MSD' (Most Significant Digit) starts from the leftmost digit and moves right, typically using recursion. The implementation here is an LSD Radix Sort."
                    }
                ]
            },
            bucketSort: {
                title: "Bucket Sort",
                faqs: [
                    {
                        question: "What is Bucket Sort?",
                        answer: "Bucket Sort, or bin sort, is a sorting algorithm that works by distributing the elements of an array into a number of buckets. Each bucket is then sorted individually, either using a different sorting algorithm, or by recursively applying the bucket sort algorithm."
                    },
                    {
                        question: "What is the performance of Bucket Sort?",
                        answer: "The average-case time complexity is O(n + k), where n is the number of elements and k is the number of buckets, assuming the input is uniformly distributed. The worst-case time complexity is O(n^2) if all elements fall into a single bucket."
                    },
                    {
                        question: "When should Bucket Sort be used?",
                        answer: "Bucket Sort is most effective when the input data is uniformly distributed over a range. This ensures that elements are spread out evenly across the buckets, leading to optimal performance."
                    },
                    {
                        question: "Is Bucket Sort stable?",
                        answer: "Yes, Bucket Sort can be implemented as a stable algorithm if the sorting algorithm used to sort the individual buckets is also stable (like Insertion Sort)."
                    },
                    {
                        question: "What is the difference between Bucket Sort and Counting Sort?",
                        answer: "Counting Sort is a specific type of Bucket Sort. In Bucket Sort, each bucket can hold more than one element and is sorted separately. In Counting Sort, each 'bucket' corresponds to a single value and just holds a count of that value's occurrences."
                    }
                ]
            },
            pigeonholeSort: {
                title: "Pigeonhole Sort",
                faqs: [
                    {
                        question: "What is Pigeonhole Sort?",
                        answer: "Pigeonhole Sort is a sorting algorithm that is suitable for sorting lists of elements where the number of elements (n) and the number of possible key values (N) are approximately the same. It works by creating a number of 'pigeonholes' (like buckets) for each possible value in the range of the input data."
                    },
                    {
                        question: "How does Pigeonhole Sort work?",
                        answer: "First, it finds the minimum and maximum values to determine the range. Then, it creates an array of pigeonholes, one for each value in the range. It iterates through the input array, placing each element into its corresponding pigeonhole. Finally, it iterates through the pigeonholes in order, putting the elements back into the original array in sorted order."
                    },
                    {
                        question: "What is its time complexity?",
                        answer: "The time complexity is O(n + N), where n is the number of elements and N is the range of possible key values. It is very efficient if the range N is close to n."
                    },
                    {
                        question: "What is the main limitation of Pigeonhole Sort?",
                        answer: "Its primary limitation is that it's only efficient if the range of values is small. If the range is very large compared to the number of elements, it becomes highly inefficient in terms of space and time."
                    },
                    {
                        question: "How is it related to Counting Sort?",
                        answer: "Pigeonhole sort and Counting sort are very similar. One can think of Counting sort as a variation of Pigeonhole sort where instead of storing the list of elements in each pigeonhole, we store only the count of elements."
                    }
                ]
            },
            timSort: {
                title: "Tim Sort",
                faqs: [
                    {
                        question: "What is Tim Sort?",
                        answer: "Tim Sort is a hybrid, stable sorting algorithm, derived from Merge Sort and Insertion Sort. It is designed to perform well on many kinds of real-world data. It was invented by Tim Peters in 2002 and is the standard sorting algorithm in Python, Java, and Android."
                    },
                    {
                        question: "How does Tim Sort work?",
                        answer: "It works by finding 'natural runs' (contiguous sorted subsequences) in the data. For runs that are smaller than a certain threshold (minrun), it uses Insertion Sort to extend them. Then, it merges these sorted runs using a modified Merge Sort, with several optimizations to improve efficiency and maintain stability."
                    },
                    {
                        question: "What is the time complexity of Tim Sort?",
                        answer: "Tim Sort has a best-case time complexity of O(n) and an average and worst-case time complexity of O(n log n)."
                    },
                    {
                        question: "Why is Tim Sort so popular in practice?",
                        answer: "It's highly efficient because it's adaptive. It takes advantage of the fact that real-world data is often partially sorted. Its use of Insertion Sort for small runs and its intelligent merging strategy make it faster than a pure Merge Sort for most practical datasets."
                    },
                    {
                        question: "What is a 'minrun'?",
                        answer: "A 'minrun' is a minimum size for a 'run' (a sorted subsequence). In TimSort, if a natural run is shorter than the minrun, it's extended using insertion sort until it reaches that minimum size. This helps to ensure that merging is efficient later on. The minrun size is calculated based on the size of the total array."
                    }
                ]
            },
            introSort: {
                title: "IntroSort (Introspective Sort)",
                faqs: [
                    {
                        question: "What is IntroSort?",
                        answer: "IntroSort is a hybrid sorting algorithm that provides both fast average performance and O(n log n) worst-case performance. It starts with Quick Sort but switches to Heap Sort when the recursion depth exceeds a certain level, and switches to Insertion Sort for small partitions."
                    },
                    {
                        question: "Why does IntroSort switch algorithms?",
                        answer: "It switches algorithms to overcome the weaknesses of each individual one. It uses Quick Sort for its excellent average-case speed. It switches to Heap Sort to avoid Quick Sort's O(n^2) worst-case scenario. It uses Insertion Sort for small partitions because it's very fast for small numbers of elements and has low overhead."
                    },
                    {
                        question: "What is the time complexity of IntroSort?",
                        answer: "The time complexity is O(n log n) in all cases (best, average, and worst), making it a very reliable and high-performance general-purpose sorting algorithm."
                    },
                    {
                        question: "Is IntroSort stable?",
                        answer: "No, because its primary component, Quick Sort, is not stable, IntroSort is also not a stable algorithm."
                    },
                    {
                        question: "What triggers the switch to Heap Sort?",
                        answer: "The switch to Heap Sort is triggered when the recursion depth of Quick Sort reaches a certain limit. This limit is typically set to 2 * log2(n). This 'introspection' prevents the Quick Sort part of the algorithm from degrading to its O(n^2) worst-case performance on pathological inputs."
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
                        question: "What are common traversal methods?",
                        answer: "Common methods for trees are in-order (left, root, right), pre-order (root, left, right), and post-order (left, right, root) for binary trees. For general graphs, Breadth-First Search (BFS) and Depth-First Search (DFS) are the most common."
                    },
                    {
                        question: "What is the difference between BFS and DFS?",
                        answer: "Breadth-First Search (BFS) explores the neighbor nodes first, before moving to the next level neighbors. It uses a queue. Depth-First Search (DFS) explores as far as possible along each branch before backtracking. It uses a stack (often the call stack via recursion)."
                    },
                    {
                        question: "When would you use one over the other?",
                        answer: "Use BFS to find the shortest path between two nodes in an unweighted graph. Use DFS if you need to check for the existence of a path, or to explore all parts of a graph or tree (e.g., in a maze-solving problem)."
                    }
                ]
            }
        }
    }
};
