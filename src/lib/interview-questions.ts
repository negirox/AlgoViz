
type InterviewQuestion = {
    slug: string;
    title: string;
    company: 'Google' | 'Meta' | 'Amazon' | 'Netflix' | 'Flipkart';
    tags: string[];
    related_algorithms: string[];
    problem: string;
    solution: {
        explanation: string;
        code: string;
    };
};

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
    {
        slug: 'two-sum',
        title: 'Two Sum',
        company: 'Google',
        tags: ['Array', 'Hash Table'],
        related_algorithms: ['hashing', 'linearSearch'],
        problem: `
            <p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.</p>
            <p>You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.</p>
            <p>You can return the answer in any order.</p>
            <p><strong>Example:</strong></p>
            <pre><strong>Input:</strong> nums = [2,7,11,15], target = 9
<strong>Output:</strong> [0,1]
<strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].</pre>
        `,
        solution: {
            explanation: `
                <p>The brute-force approach would be to use two nested loops to check every pair of numbers, which would be O(n²). We can do much better using a hash table (or a JavaScript Map).</p>
                <ol>
                    <li>Create a hash map to store numbers we've seen and their indices.</li>
                    <li>Iterate through the input array <code>nums</code>.</li>
                    <li>For each number <code>num</code>, calculate the required complement: <code>complement = target - num</code>.</li>
                    <li>Check if the <code>complement</code> exists in our hash map.
                        <ul>
                            <li>If it does, we have found our pair. Return the index of the complement from the map and the index of the current number.</li>
                            <li>If it doesn't, add the current number <code>num</code> and its index to the hash map.</li>
                        </ul>
                    </li>
                </ol>
                <p>This approach has a time complexity of O(n) because we iterate through the array once, and each hash map lookup is O(1) on average. The space complexity is O(n) to store the hash map.</p>
            `,
            code: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return []; // Should not be reached based on problem description
}`
        }
    },
    {
        slug: 'merge-sorted-arrays',
        title: 'Merge Sorted Arrays',
        company: 'Meta',
        tags: ['Array', 'Two Pointers', 'Sorting'],
        related_algorithms: ['mergeSort', 'insertionSort'],
        problem: `
            <p>You are given two integer arrays <code>nums1</code> and <code>nums2</code>, sorted in non-decreasing order, and two integers <code>m</code> and <code>n</code>, representing the number of elements in <code>nums1</code> and <code>nums2</code> respectively.</p>
            <p>Merge <code>nums1</code> and <code>nums2</code> into a single array sorted in non-decreasing order.</p>
            <p>The final sorted array should not be returned by the function, but instead be stored inside the array <code>nums1</code>. To accommodate this, <code>nums1</code> has a length of <code>m + n</code>, where the first <code>m</code> elements denote the elements that should be merged, and the last <code>n</code> elements are set to 0 and should be ignored.</p>
        `,
        solution: {
            explanation: `
                <p>A common mistake is to start merging from the beginning of <code>nums1</code>. This would require shifting elements and would be inefficient. The optimal approach is to start merging from the end of the arrays.</p>
                <ol>
                    <li>Initialize three pointers: <code>p1</code> pointing to the last valid element of <code>nums1</code> (at index <code>m-1</code>), <code>p2</code> pointing to the last element of <code>nums2</code> (at index <code>n-1</code>), and <code>p</code> pointing to the very end of the <code>nums1</code> array (at index <code>m+n-1</code>).</li>
                    <li>Use a while loop that continues as long as <code>p2</code> is non-negative (meaning there are still elements in <code>nums2</code> to merge).</li>
                    <li>Inside the loop, compare the elements at <code>nums1[p1]</code> and <code>nums2[p2]</code>.
                        <ul>
                            <li>If <code>p1</code> is valid (>= 0) and <code>nums1[p1]</code> is greater than <code>nums2[p2]</code>, place <code>nums1[p1]</code> at index <code>p</code> and decrement <code>p1</code>.</li>
                            <li>Otherwise, place <code>nums2[p2]</code> at index <code>p</code> and decrement <code>p2</code>.</li>
                        </ul>
                    </li>
                     <li>Decrement the main pointer <code>p</code> in each iteration.</li>
                </ol>
                <p>This approach works because we are filling <code>nums1</code> from the back, so we never overwrite an element in <code>nums1</code> that we still need to compare. The time complexity is O(m+n) and the space complexity is O(1).</p>
            `,
            code: `function merge(nums1, m, nums2, n) {
    let p1 = m - 1;
    let p2 = n - 1;
    let p = m + n - 1;

    while (p2 >= 0) {
        if (p1 >= 0 && nums1[p1] > nums2[p2]) {
            nums1[p] = nums1[p1];
            p1--;
        } else {
            nums1[p] = nums2[p2];
            p2--;
        }
        p--;
    }
}`
        }
    },
    {
        slug: 'valid-parentheses',
        title: 'Valid Parentheses',
        company: 'Amazon',
        tags: ['String', 'Stack'],
        related_algorithms: ['stack'],
        problem: `
            <p>Given a string <code>s</code> containing just the characters <code>'('</code>, <code>')'</code>, <code>'{'</code>, <code>'}'</code>, <code>'['</code> and <code>']'</code>, determine if the input string is valid.</p>
            <p>An input string is valid if:
                <ol>
                    <li>Open brackets must be closed by the same type of brackets.</li>
                    <li>Open brackets must be closed in the correct order.</li>
                    <li>Every close bracket has a corresponding open bracket of the same type.</li>
                </ol>
            </p>
        `,
        solution: {
            explanation: `
                <p>This is a classic problem that can be elegantly solved using a stack data structure.</p>
                <ol>
                    <li>Initialize an empty stack.</li>
                    <li>Create a map to store the relationship between closing and opening brackets, e.g., <code>{ ')': '(', '}': '{', ']': '[' }</code>.</li>
                    <li>Iterate through each character of the input string <code>s</code>.
                        <ul>
                            <li>If the character is an opening bracket (<code>(</code>, <code>{</code>, <code>[</code>), push it onto the stack.</li>
                            <li>If the character is a closing bracket (<code>)</code>, <code>}</code>, <code>]</code>), check the stack. If the stack is empty or if the top element of the stack is not the corresponding opening bracket, the string is invalid. If it matches, pop the stack.</li>
                        </ul>
                    </li>
                    <li>After the loop, if the stack is empty, it means all brackets were correctly matched and closed, so the string is valid. If the stack is not empty, it means there are unclosed opening brackets, so the string is invalid.</li>
                </ol>
                 <p>The time complexity is O(n) because we process each character once. The space complexity is O(n) in the worst case (a string of all opening brackets).</p>
            `,
            code: `function isValid(s) {
    const stack = [];
    const map = {
        ')': '(',
        '}': '{',
        ']': '['
    };

    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        if (map[char]) { // It's a closing bracket
            const topElement = stack.length === 0 ? '#' : stack.pop();
            if (topElement !== map[char]) {
                return false;
            }
        } else { // It's an opening bracket
            stack.push(char);
        }
    }

    return stack.length === 0;
}`
        }
    },
    {
        slug: 'coin-change',
        title: 'Coin Change',
        company: 'Flipkart',
        tags: ['Array', 'Dynamic Programming'],
        related_algorithms: [],
        problem: `
            <p>You are given an integer array <code>coins</code> representing coins of different denominations and an integer <code>amount</code> representing a total amount of money.</p>
            <p>Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return <code>-1</code>.</p>
            <p>You may assume that you have an infinite number of each kind of coin.</p>
             <p><strong>Example:</strong></p>
            <pre><strong>Input:</strong> coins = [1,2,5], amount = 11
<strong>Output:</strong> 3
<strong>Explanation:</strong> 11 = 5 + 5 + 1</pre>
        `,
        solution: {
            explanation: `
                <p>This is a classic dynamic programming problem. We want to find the minimum number of coins for an amount, which can be broken down into subproblems: finding the minimum number of coins for smaller amounts.</p>
                <ol>
                    <li>Create a DP array, <code>dp</code>, of size <code>amount + 1</code>. Initialize all its values to a sentinel value that represents infinity (e.g., <code>amount + 1</code>), which indicates that the amount is not reachable yet. Set <code>dp[0] = 0</code>, because 0 coins are needed to make an amount of 0.</li>
                    <li>Iterate from <code>1</code> to <code>amount</code>. For each amount <code>i</code>, we will try to find the minimum number of coins.</li>
                    <li>Inside this loop, iterate through each <code>coin</code> in our <code>coins</code> array.</li>
                    <li>If a <code>coin</code> is less than or equal to the current amount <code>i</code>, it means we can potentially use this coin. The number of coins needed would be <code>1 + dp[i - coin]</code> (1 for the current coin, plus the minimum coins needed for the remaining amount).</li>
                    <li>We update <code>dp[i]</code> to be the minimum of its current value and the value we just calculated: <code>dp[i] = Math.min(dp[i], 1 + dp[i - coin])</code>.</li>
                    <li>After the loops complete, <code>dp[amount]</code> will hold the minimum number of coins. If its value is still our sentinel value (infinity), it means the amount was not reachable, so we return -1. Otherwise, we return <code>dp[amount]</code>.</li>
                </ol>
                 <p>The time complexity is O(amount * n) where n is the number of coins, because of the nested loops. The space complexity is O(amount) for the DP array.</p>
            `,
            code: `function coinChange(coins, amount) {
    // Create a DP array to store the minimum number of coins for each amount.
    // Initialize with a value larger than any possible answer.
    const dp = new Array(amount + 1).fill(amount + 1);

    // Base case: 0 coins are needed to make an amount of 0.
    dp[0] = 0;

    // Iterate through all amounts from 1 to the target amount.
    for (let i = 1; i <= amount; i++) {
        // For each amount, iterate through all coin denominations.
        for (const coin of coins) {
            // If the coin value is less than or equal to the current amount...
            if (coin <= i) {
                // ...we can potentially use this coin.
                // The number of coins would be 1 (for this coin) + the minimum
                // coins needed for the remaining amount (i - coin).
                dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
            }
        }
    }

    // If dp[amount] is still our sentinel value, it means the amount
    // cannot be made up. Otherwise, it holds the minimum number of coins.
    return dp[amount] > amount ? -1 : dp[amount];
}`
        }
    },
    {
        slug: 'reverse-linked-list',
        title: 'Reverse a Linked List',
        company: 'Netflix',
        tags: ['Linked List', 'Two Pointers'],
        related_algorithms: ['singlyLinkedList'],
        problem: `
            <p>Given the <code>head</code> of a singly linked list, reverse the list, and return the reversed list's head.</p>
            <p><strong>Example:</strong></p>
            <pre><strong>Input:</strong> head = [1,2,3,4,5]
<strong>Output:</strong> [5,4,3,2,1]</pre>
        `,
        solution: {
            explanation: `
                <p>The iterative approach reverses the list in place by walking through it once and flipping each node's <code>next</code> pointer to point backward instead of forward.</p>
                <ol>
                    <li>Keep three pointers: <code>prev</code> (initially <code>null</code>), <code>curr</code> (initially <code>head</code>), and a temporary <code>next</code>.</li>
                    <li>While <code>curr</code> is not <code>null</code>:
                        <ul>
                            <li>Save <code>curr.next</code> into <code>next</code> before you overwrite it.</li>
                            <li>Point <code>curr.next</code> back to <code>prev</code>.</li>
                            <li>Move <code>prev</code> up to <code>curr</code>, and <code>curr</code> up to <code>next</code>.</li>
                        </ul>
                    </li>
                    <li>When the loop ends, <code>curr</code> is <code>null</code> and <code>prev</code> is sitting on the new head — return it.</li>
                </ol>
                <p>This runs in O(n) time with O(1) extra space, since every node is visited exactly once and no new list is allocated.</p>
            `,
            code: `function reverseList(head) {
    let prev = null;
    let curr = head;

    while (curr !== null) {
        const next = curr.next; // save the rest of the list
        curr.next = prev;       // reverse the pointer
        prev = curr;            // advance prev
        curr = next;            // advance curr
    }

    return prev; // prev is now the new head
}`
        }
    },
    {
        slug: 'linked-list-cycle',
        title: 'Linked List Cycle Detection',
        company: 'Google',
        tags: ['Linked List', 'Two Pointers'],
        related_algorithms: ['singlyLinkedList'],
        problem: `
            <p>Given the <code>head</code> of a linked list, determine if the linked list has a cycle in it.</p>
            <p>A cycle exists if some node in the list can be reached again by continuously following the <code>next</code> pointer. Return <code>true</code> if there is a cycle, <code>false</code> otherwise.</p>
        `,
        solution: {
            explanation: `
                <p>This is the classic "tortoise and hare" problem, solved elegantly with <strong>Floyd's Cycle Detection Algorithm</strong> using two pointers moving at different speeds.</p>
                <ol>
                    <li>Initialize a <code>slow</code> pointer and a <code>fast</code> pointer, both starting at <code>head</code>.</li>
                    <li>On each step, move <code>slow</code> forward by one node and <code>fast</code> forward by two nodes.</li>
                    <li>If the list has no cycle, <code>fast</code> (or <code>fast.next</code>) will eventually hit <code>null</code> — return <code>false</code>.</li>
                    <li>If the list does have a cycle, <code>fast</code> will eventually "lap" <code>slow</code> and they will point to the same node — return <code>true</code>.</li>
                </ol>
                <p>Because the gap between the two pointers shrinks by one node every step once both are inside the cycle, they are guaranteed to meet. This runs in O(n) time with O(1) extra space — no visited-set required.</p>
            `,
            code: `function hasCycle(head) {
    let slow = head;
    let fast = head;

    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) {
            return true; // pointers met -> cycle found
        }
    }

    return false; // fast reached the end -> no cycle
}`
        }
    },
    {
        slug: 'kth-largest-element',
        title: 'Kth Largest Element in an Array',
        company: 'Google',
        tags: ['Array', 'Heap', 'Sorting'],
        related_algorithms: ['minHeap', 'quickSort'],
        problem: `
            <p>Given an integer array <code>nums</code> and an integer <code>k</code>, return the <code>k</code>th largest element in the array.</p>
            <p>Note that it is the <code>k</code>th largest element in sorted order, not the <code>k</code>th distinct element.</p>
            <p><strong>Example:</strong></p>
            <pre><strong>Input:</strong> nums = [3,2,1,5,6,4], k = 2
<strong>Output:</strong> 5</pre>
        `,
        solution: {
            explanation: `
                <p>Sorting the whole array and reading off the <code>k</code>th-from-the-end element works in O(n log n), but a <strong>min-heap of size k</strong> does better — O(n log k).</p>
                <ol>
                    <li>Walk through <code>nums</code> and push each value onto a min-heap.</li>
                    <li>Whenever the heap grows past size <code>k</code>, pop its minimum — this discards elements that can't possibly be among the <code>k</code> largest.</li>
                    <li>After processing every element, the heap contains exactly the <code>k</code> largest values, and its root (the minimum of that set) is the answer.</li>
                </ol>
                <p>Because the heap never holds more than <code>k</code> elements, each push/pop is O(log k), giving an overall time complexity of O(n log k) and space complexity of O(k).</p>
            `,
            code: `class MinHeap {
    constructor() { this.data = []; }
    size() { return this.data.length; }
    peek() { return this.data[0]; }

    push(val) {
        this.data.push(val);
        let i = this.data.length - 1;
        while (i > 0) {
            const parent = Math.floor((i - 1) / 2);
            if (this.data[parent] <= this.data[i]) break;
            [this.data[parent], this.data[i]] = [this.data[i], this.data[parent]];
            i = parent;
        }
    }

    pop() {
        const top = this.data[0];
        const last = this.data.pop();
        if (this.data.length > 0) {
            this.data[0] = last;
            let i = 0;
            while (true) {
                const left = 2 * i + 1, right = 2 * i + 2;
                let smallest = i;
                if (left < this.data.length && this.data[left] < this.data[smallest]) smallest = left;
                if (right < this.data.length && this.data[right] < this.data[smallest]) smallest = right;
                if (smallest === i) break;
                [this.data[i], this.data[smallest]] = [this.data[smallest], this.data[i]];
                i = smallest;
            }
        }
        return top;
    }
}

function findKthLargest(nums, k) {
    const heap = new MinHeap();
    for (const num of nums) {
        heap.push(num);
        if (heap.size() > k) {
            heap.pop(); // discard the smallest, keeping only the top k
        }
    }
    return heap.peek();
}`
        }
    },
    {
        slug: 'binary-tree-level-order-traversal',
        title: 'Binary Tree Level Order Traversal',
        company: 'Meta',
        tags: ['Tree', 'BFS', 'Queue'],
        related_algorithms: ['bfsTraversal', 'queue'],
        problem: `
            <p>Given the <code>root</code> of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level), as an array of arrays — one inner array per level.</p>
            <p><strong>Example:</strong></p>
            <pre><strong>Input:</strong> root = [3,9,20,null,null,15,7]
<strong>Output:</strong> [[3],[9,20],[15,7]]</pre>
        `,
        solution: {
            explanation: `
                <p>Level order traversal is a direct application of <strong>Breadth-First Search (BFS)</strong> using a queue, with one extra trick: tracking how many nodes belong to the current level.</p>
                <ol>
                    <li>If <code>root</code> is <code>null</code>, return an empty array immediately.</li>
                    <li>Push <code>root</code> onto a queue.</li>
                    <li>While the queue is not empty:
                        <ul>
                            <li>Record the current queue length as <code>levelSize</code> — this is exactly how many nodes are on the current level.</li>
                            <li>Dequeue <code>levelSize</code> nodes one at a time, collecting their values into a <code>currentLevel</code> array, and enqueue each node's non-null children.</li>
                            <li>Push <code>currentLevel</code> onto the result.</li>
                        </ul>
                    </li>
                </ol>
                <p>Each node is enqueued and dequeued exactly once, giving O(n) time complexity. Space complexity is O(w), where <code>w</code> is the maximum width of the tree (the queue never holds more than one level's worth of nodes at a time).</p>
            `,
            code: `function levelOrder(root) {
    if (!root) return [];

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.value);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        result.push(currentLevel);
    }

    return result;
}`
        }
    },
    {
        slug: 'lru-cache',
        title: 'LRU Cache',
        company: 'Amazon',
        tags: ['Hash Table', 'Doubly Linked List', 'Design'],
        related_algorithms: ['hashing', 'doublyLinkedList'],
        problem: `
            <p>Design a data structure that follows the constraints of a <strong>Least Recently Used (LRU) cache</strong>.</p>
            <p>Implement the <code>LRUCache</code> class:</p>
            <ul>
                <li><code>LRUCache(capacity)</code> initializes the cache with a positive size <code>capacity</code>.</li>
                <li><code>get(key)</code> returns the value of the <code>key</code> if it exists, otherwise <code>-1</code>. Accessing a key counts as a "use".</li>
                <li><code>put(key, value)</code> updates the value of the key if it exists, or adds the key-value pair. If the number of keys exceeds <code>capacity</code>, evict the <strong>least recently used</strong> key.</li>
            </ul>
            <p>Both <code>get</code> and <code>put</code> must run in <strong>O(1)</strong> average time complexity.</p>
        `,
        solution: {
            explanation: `
                <p>The textbook solution combines a <strong>hash map</strong> (for O(1) key lookup) with a <strong>doubly linked list</strong> (for O(1) reordering of recency, since you can unlink and relink a node without shifting anything).</p>
                <ol>
                    <li>The hash map stores <code>key &rarr; node</code>, where each node lives in a doubly linked list ordered from most-recently-used (head) to least-recently-used (tail).</li>
                    <li>On <code>get(key)</code>: if the key exists, unlink its node and re-insert it at the head (marking it as freshly used), then return its value. Otherwise return -1.</li>
                    <li>On <code>put(key, value)</code>: if the key exists, update its value and move it to the head. Otherwise create a new node at the head; if this pushes the cache over capacity, remove the tail node (the least recently used one) from both the list and the map.</li>
                </ol>
                <p>JavaScript's built-in <code>Map</code> actually preserves insertion order and lets you re-insert a key to move it to the "most recent" end, which makes for a much shorter implementation of the same O(1) idea without hand-rolling a linked list:</p>
            `,
            code: `class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map(); // preserves insertion order
    }

    get(key) {
        if (!this.cache.has(key)) return -1;
        const value = this.cache.get(key);
        // Re-insert to mark as most recently used
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }

    put(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        } else if (this.cache.size >= this.capacity) {
            // Map iterates in insertion order, so the first key is the least recently used
            const lruKey = this.cache.keys().next().value;
            this.cache.delete(lruKey);
        }
        this.cache.set(key, value);
    }
}`
        }
    },
    {
        slug: 'search-rotated-sorted-array',
        title: 'Search in Rotated Sorted Array',
        company: 'Flipkart',
        tags: ['Array', 'Binary Search'],
        related_algorithms: ['binarySearch'],
        problem: `
            <p>There is an integer array <code>nums</code> sorted in ascending order (with distinct values), which is possibly rotated at an unknown pivot. Given the array and an integer <code>target</code>, return the index of <code>target</code> if it is in <code>nums</code>, or <code>-1</code> if it is not.</p>
            <p>You must write an algorithm with <strong>O(log n)</strong> runtime complexity.</p>
            <p><strong>Example:</strong></p>
            <pre><strong>Input:</strong> nums = [4,5,6,7,0,1,2], target = 0
<strong>Output:</strong> 4</pre>
        `,
        solution: {
            explanation: `
                <p>A plain Binary Search assumes the whole array is sorted, which isn't true here — but at every step, <strong>at least one half</strong> of the current search range is guaranteed to be sorted. The trick is to detect which half is sorted and check whether the target falls inside it.</p>
                <ol>
                    <li>Use the standard <code>low</code>/<code>high</code>/<code>mid</code> setup from Binary Search.</li>
                    <li>If <code>nums[mid] === target</code>, return <code>mid</code>.</li>
                    <li>Determine which half is sorted by comparing <code>nums[low]</code> and <code>nums[mid]</code>:
                        <ul>
                            <li>If <code>nums[low] <= nums[mid]</code>, the left half is sorted. If <code>target</code> falls within <code>[nums[low], nums[mid])</code>, search left (<code>high = mid - 1</code>); otherwise search right (<code>low = mid + 1</code>).</li>
                            <li>Otherwise the right half is sorted. If <code>target</code> falls within <code>(nums[mid], nums[high]]</code>, search right; otherwise search left.</li>
                        </ul>
                    </li>
                    <li>Repeat until <code>low > high</code>, at which point the target isn't present — return -1.</li>
                </ol>
                <p>Each step still halves the search space, so this remains O(log n) time and O(1) space, just like standard Binary Search.</p>
            `,
            code: `function search(nums, target) {
    let low = 0, high = nums.length - 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (nums[mid] === target) return mid;

        if (nums[low] <= nums[mid]) {
            // Left half [low, mid] is sorted
            if (nums[low] <= target && target < nums[mid]) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        } else {
            // Right half [mid, high] is sorted
            if (nums[mid] < target && target <= nums[high]) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
    }

    return -1;
}`
        }
    }
]
