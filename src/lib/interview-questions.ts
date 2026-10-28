
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
            <p>A shop is running a promotion: a gift card can be spent on exactly two different items, and the card is only accepted if their prices add up to its value exactly. You are given the item prices as an integer array <code>nums</code> and the card value as <code>target</code>. Return the positions (indices) of the two items whose prices sum to <code>target</code>.</p>
            <p>Each input has exactly one valid pair, and an item cannot be paired with itself. The two indices may be returned in either order.</p>
            <p><strong>Example:</strong></p>
            <pre><strong>Input:</strong> nums = [3, 9, 14, 5, 11], target = 16
<strong>Output:</strong> [3, 4]
<strong>Why:</strong> nums[3] + nums[4] = 5 + 11 = 16. No other pair reaches 16.</pre>
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
            <p>You have two lists of numbers that are each already sorted from smallest to largest, and you want to combine them into one sorted list <em>without allocating a new array</em>.</p>
            <p>The first array, <code>nums1</code>, has room for both lists: its first <code>m</code> slots hold real values and its last <code>n</code> slots are placeholders filled with 0. The second array, <code>nums2</code>, holds <code>n</code> values. Rearrange <code>nums1</code> in place so that it contains all <code>m + n</code> values in sorted order. Nothing needs to be returned.</p>
            <p><strong>Example:</strong></p>
            <pre><strong>Input:</strong> nums1 = [1, 4, 7, 0, 0], m = 3, nums2 = [2, 8], n = 2
<strong>Result:</strong> nums1 becomes [1, 2, 4, 7, 8]</pre>
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
            <p>Imagine you are building the part of a code editor that flags unbalanced brackets. You receive a string <code>s</code> made up only of the characters <code>( ) [ ] { }</code> and must decide whether it is balanced.</p>
            <p>A string is balanced when:</p>
            <ol>
                <li>every opening bracket is closed by a bracket of the same kind,</li>
                <li>brackets close in the reverse order they were opened (the most recent opener closes first), and</li>
                <li>no closing bracket appears without a matching opener before it.</li>
            </ol>
            <p><strong>Examples:</strong></p>
            <pre><strong>Input:</strong> s = "{[()]}"   <strong>Output:</strong> true
<strong>Input:</strong> s = "([)]"     <strong>Output:</strong> false  (the ")" arrives while "[" is still open)
<strong>Input:</strong> s = "(("       <strong>Output:</strong> false  (two openers are never closed)</pre>
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
            <p>A vending machine has to give change using as few coins as possible. The available coin values are given as an array <code>coins</code>, and the machine has an unlimited supply of each. Given the change due, <code>amount</code>, return the smallest number of coins that add up to it exactly. If no combination works, return <code>-1</code>.</p>
            <p><strong>Examples:</strong></p>
            <pre><strong>Input:</strong> coins = [1, 3, 4], amount = 6
<strong>Output:</strong> 2
<strong>Why:</strong> 3 + 3 = 6. Always grabbing the biggest coin first gives 4 + 1 + 1, which uses three coins, so a greedy approach fails here.

<strong>Input:</strong> coins = [5, 10], amount = 3
<strong>Output:</strong> -1</pre>
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
            <p>You are given the <code>head</code> of a singly linked list. Reverse the direction of every <code>next</code> pointer so that the old last node becomes the new head, then return that new head. An empty list stays empty.</p>
            <p><strong>Example:</strong></p>
            <pre><strong>Input:</strong>  7 -> 3 -> 9 -> 1
<strong>Output:</strong> 1 -> 9 -> 3 -> 7</pre>
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
            <p>A linked list is supposed to end with a node whose <code>next</code> pointer is <code>null</code>. A bug elsewhere in the program may have pointed some node's <code>next</code> back to an earlier node, creating a loop. Given the <code>head</code>, return <code>true</code> if following <code>next</code> pointers would go round forever, or <code>false</code> if the list reaches its end.</p>
            <p>Try to solve it using only a constant amount of extra memory.</p>
            <p><strong>Examples:</strong></p>
            <pre><strong>Input:</strong>  1 -> 2 -> 3 -> 4, where node 4 points back to node 2
<strong>Output:</strong> true

<strong>Input:</strong>  1 -> 2 -> 3 -> null
<strong>Output:</strong> false</pre>
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
            <p>You are given an unsorted integer array <code>nums</code> and a number <code>k</code>. Return the value that would be at position <code>k</code> if the array were sorted from largest to smallest (position 1 is the maximum). Duplicates count as separate entries.</p>
            <p><strong>Example:</strong></p>
            <pre><strong>Input:</strong> nums = [9, 4, 7, 4, 1], k = 3
<strong>Output:</strong> 4
<strong>Why:</strong> In descending order the array is 9, 7, 4, 4, 1, and the third value is 4. With k = 4 the answer is also 4, because the duplicate counts.</pre>
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
            <p>Given the <code>root</code> of a binary tree, list the node values one level at a time, from the top of the tree to the bottom, and from left to right within each level. Return a list of lists with one inner list per level.</p>
            <p><strong>Example:</strong> the root is 8; its children are 4 and 12; 4 has a single left child 2; 12 has children 10 and 14.</p>
            <pre><strong>Output:</strong> [[8], [4, 12], [2, 10, 14]]</pre>
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
            <p>Build a fixed-size cache that, when it is full and a new key arrives, throws out the entry that has gone <strong>unused for the longest time</strong> (Least Recently Used, or LRU).</p>
            <p>Implement an <code>LRUCache</code> class with:</p>
            <ul>
                <li><code>LRUCache(capacity)</code> — creates an empty cache that can hold <code>capacity</code> keys.</li>
                <li><code>get(key)</code> — returns the stored value, or <code>-1</code> if the key is missing. A successful read counts as using the key.</li>
                <li><code>put(key, value)</code> — inserts or updates the key and counts as using it. If this pushes the cache over capacity, remove the least recently used key.</li>
            </ul>
            <p>Both operations should take <strong>O(1)</strong> time on average.</p>
            <p><strong>Example</strong> (capacity 2):</p>
            <pre>put(1, 10); put(2, 20)
get(1)     -> 10   (key 1 is now the most recently used)
put(3, 30)         (cache is full, so key 2 is evicted)
get(2)     -> -1
get(3)     -> 30</pre>
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
            <p>A sorted array of distinct integers has been <em>rotated</em>: some number of elements were taken from the front and moved, in order, to the back. For example, <code>[10, 20, 30, 40, 50]</code> rotated by three becomes <code>[40, 50, 10, 20, 30]</code>. You do not know how far it was rotated.</p>
            <p>Given the rotated array <code>nums</code> and a <code>target</code>, return the index of <code>target</code>, or <code>-1</code> if it is not present. Your solution must run in <strong>O(log n)</strong> time, so a linear scan is not allowed.</p>
            <p><strong>Examples:</strong></p>
            <pre><strong>Input:</strong> nums = [40, 50, 10, 20, 30], target = 20   <strong>Output:</strong> 3
<strong>Input:</strong> nums = [40, 50, 10, 20, 30], target = 35   <strong>Output:</strong> -1</pre>
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
    },
    {
        slug: 'maximum-subarray',
        title: 'Maximum Subarray',
        company: 'Amazon',
        tags: ['Array', 'Dynamic Programming'],
        related_algorithms: [],
        problem: `
            <p>You are given a trader's daily profit and loss as an integer array <code>nums</code> (negative numbers are losing days). Find the best possible total over any run of <em>consecutive</em> days — at least one day long — and return that total.</p>
            <p><strong>Examples:</strong></p>
            <pre><strong>Input:</strong> nums = [3, -4, 5, -1, 2, -6, 1]
<strong>Output:</strong> 6
<strong>Why:</strong> Days 3 to 5 give 5 + (-1) + 2 = 6. Including day 1 would add 3 but also the -4 loss.

<strong>Input:</strong> nums = [-3, -1, -2]
<strong>Output:</strong> -1   (when every day loses money, the best run is the single smallest loss)</pre>
        `,
        solution: {
            explanation: `
                <p>This is solved with <strong>Kadane's Algorithm</strong>, a classic dynamic programming pattern: at every index, decide whether to extend the previous subarray or start a brand new one from the current element.</p>
                <ol>
                    <li>Keep two running values: <code>currentSum</code> (the best sum of a subarray ending exactly at the current index) and <code>maxSum</code> (the best sum seen anywhere so far).</li>
                    <li>Initialize both to <code>nums[0]</code>.</li>
                    <li>For every subsequent element <code>num</code>: set <code>currentSum = Math.max(num, currentSum + num)</code>. This is the key decision — if extending the running subarray would make things worse than starting fresh at <code>num</code>, start fresh.</li>
                    <li>Update <code>maxSum = Math.max(maxSum, currentSum)</code> after every step.</li>
                    <li>Return <code>maxSum</code> once the array is exhausted.</li>
                </ol>
                <p>Because each element is visited exactly once with constant work per element, this runs in O(n) time and O(1) space — a huge improvement over the naive O(n²) approach of checking every subarray.</p>
            `,
            code: `function maxSubArray(nums) {
    let currentSum = nums[0];
    let maxSum = nums[0];

    for (let i = 1; i < nums.length; i++) {
        // Either extend the previous subarray, or start a new one at nums[i]
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }

    return maxSum;
}`
        }
    },
    {
        slug: 'group-anagrams',
        title: 'Group Anagrams',
        company: 'Meta',
        tags: ['Array', 'String', 'Hash Table'],
        related_algorithms: ['hashing'],
        problem: `
            <p>Two words are <strong>anagrams</strong> when one can be made by rearranging all the letters of the other — for example "listen" and "silent". Given an array of lowercase words <code>strs</code>, put words that are anagrams of each other into the same group and return the list of groups. Neither the groups nor the words inside them need to be in any particular order.</p>
            <p><strong>Example:</strong></p>
            <pre><strong>Input:</strong> strs = ["listen", "rat", "silent", "dog", "tar", "enlist", "art"]
<strong>Output:</strong> [["listen", "silent", "enlist"], ["rat", "tar", "art"], ["dog"]]</pre>
        `,
        solution: {
            explanation: `
                <p>Two strings are anagrams of each other if and only if they produce the <strong>same string once sorted</strong>. That gives us a natural hash key: sort each word's letters, and group every original word under that sorted key.</p>
                <ol>
                    <li>Create a hash map from <code>sortedKey &rarr; list of original words</code>.</li>
                    <li>For each word in <code>strs</code>, split it into characters, sort them, and join them back into a string — this is the canonical key for its anagram group.</li>
                    <li>Push the original word onto the map entry for that key (creating the entry if it doesn't exist yet).</li>
                    <li>Once every word has been processed, the map's values are exactly the grouped anagrams — return them as an array of arrays.</li>
                </ol>
                <p>Sorting each word of length <code>k</code> costs O(k log k), so for <code>n</code> words the total time complexity is O(n &middot; k log k). Space complexity is O(n &middot; k) to store all the words in the map.</p>
            `,
            code: `function groupAnagrams(strs) {
    const map = new Map();

    for (const word of strs) {
        // Sorting the letters gives a canonical key shared by all anagrams
        const key = word.split('').sort().join('');

        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key).push(word);
    }

    return Array.from(map.values());
}`
        }
    },
    {
        slug: 'climbing-stairs',
        title: 'Climbing Stairs',
        company: 'Google',
        tags: ['Dynamic Programming', 'Math'],
        related_algorithms: [],
        problem: `
            <p>A staircase has <code>n</code> steps. With each move you can climb either one step or two steps. How many different sequences of moves take you from the bottom to exactly the top step?</p>
            <p><strong>Example:</strong></p>
            <pre><strong>Input:</strong> n = 5
<strong>Output:</strong> 8
<strong>Why:</strong> Counting up from the bottom: n = 1 has 1 way, n = 2 has 2, n = 3 has 3, n = 4 has 5, and n = 5 has 8. Each answer is the sum of the previous two, because the last move was either a single step or a double step.</pre>
        `,
        solution: {
            explanation: `
                <p>The number of ways to reach step <code>n</code> is the sum of the ways to reach step <code>n-1</code> (then take one final 1-step) and step <code>n-2</code> (then take one final 2-step). That recurrence is exactly the <strong>Fibonacci sequence</strong>.</p>
                <ol>
                    <li>Handle the base cases directly: there's 1 way to reach step 1, and 2 ways to reach step 2.</li>
                    <li>Instead of recursing naively (which recomputes the same subproblems exponentially many times), iterate from step 3 up to <code>n</code>, tracking only the previous two results.</li>
                    <li>At each step, the current count is the sum of the previous two counts. Shift the "previous two" window forward by one.</li>
                    <li>After the loop, the current count is the answer for <code>n</code>.</li>
                </ol>
                <p>Because we only keep two rolling variables instead of a full DP array, this runs in O(n) time and O(1) space — a bottom-up rewrite of what would otherwise be an O(2&#8319;) naive recursive solution.</p>
            `,
            code: `function climbStairs(n) {
    if (n <= 2) return n;

    let prev2 = 1; // ways to reach step (i - 2)
    let prev1 = 2; // ways to reach step (i - 1)

    for (let i = 3; i <= n; i++) {
        const current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
}`
        }
    },
    {
        slug: 'merge-intervals',
        title: 'Merge Intervals',
        company: 'Netflix',
        tags: ['Array', 'Sorting'],
        related_algorithms: ['mergeSort'],
        problem: `
            <p>A calendar stores meetings as <code>[start, end]</code> pairs in no particular order. Combine every group of meetings that overlap into one block, and return the resulting blocks sorted by start time. Meetings that merely touch — one ends exactly when the next begins — also count as overlapping.</p>
            <p><strong>Example:</strong></p>
            <pre><strong>Input:</strong> intervals = [[9, 11], [1, 4], [3, 5], [11, 12]]
<strong>Output:</strong> [[1, 5], [9, 12]]
<strong>Why:</strong> [1, 4] and [3, 5] overlap and become [1, 5]; [9, 11] and [11, 12] touch at 11 and become [9, 12].</pre>
        `,
        solution: {
            explanation: `
                <p>Overlaps are only easy to detect once the intervals are in a predictable order — so the first move is always to <strong>sort by start time</strong>. After that, a single linear pass can merge everything.</p>
                <ol>
                    <li>Sort <code>intervals</code> in ascending order by their start value.</li>
                    <li>Initialize the result with the first interval.</li>
                    <li>For each subsequent interval, compare it against the <em>last</em> interval already placed in the result:
                        <ul>
                            <li>If the current interval's start is less than or equal to that last interval's end, they overlap — extend the last interval's end to the maximum of the two ends.</li>
                            <li>Otherwise, there's a gap — push the current interval onto the result as a new, separate interval.</li>
                        </ul>
                    </li>
                </ol>
                <p>The sort dominates the cost at O(n log n); the merge pass itself is a single O(n) sweep. Overall time complexity is O(n log n), with O(n) space for the result (or O(log n) to O(n) depending on the sort's implementation).</p>
            `,
            code: `function merge(intervals) {
    if (intervals.length <= 1) return intervals;

    // Sort by start time so overlaps are always adjacent
    intervals.sort((a, b) => a[0] - b[0]);

    const result = [intervals[0]];

    for (let i = 1; i < intervals.length; i++) {
        const current = intervals[i];
        const last = result[result.length - 1];

        if (current[0] <= last[1]) {
            // Overlaps with the last merged interval — extend it
            last[1] = Math.max(last[1], current[1]);
        } else {
            // No overlap — it's a new interval
            result.push(current);
        }
    }

    return result;
}`
        }
    },
    {
        slug: 'longest-substring-without-repeating-characters',
        title: 'Longest Substring Without Repeating Characters',
        company: 'Meta',
        tags: ['String', 'Sliding Window', 'Hash Table'],
        related_algorithms: ['hashing'],
        problem: `
            <p>Given a string <code>s</code>, return the length of the longest stretch of <em>consecutive</em> characters in which no character appears twice.</p>
            <p><strong>Examples:</strong></p>
            <pre><strong>Input:</strong> s = "dvdfa"   <strong>Output:</strong> 4   (the stretch "vdfa")
<strong>Input:</strong> s = "aaaa"    <strong>Output:</strong> 1
<strong>Input:</strong> s = ""        <strong>Output:</strong> 0</pre>
        `,
        solution: {
            explanation: `
                <p>This is the classic <strong>sliding window</strong> pattern combined with a hash map for O(1) duplicate checks. The window represents the current substring under consideration; it only ever grows from the right and shrinks from the left, never resetting from scratch.</p>
                <ol>
                    <li>Use a hash map to record the most recent index at which each character was seen.</li>
                    <li>Keep a <code>left</code> pointer marking the start of the current window (initially 0), and track the best length seen so far.</li>
                    <li>Move a <code>right</code> pointer across the string. For each character:
                        <ul>
                            <li>If it was seen before <em>and</em> that occurrence is inside the current window (its stored index is <code>&gt;= left</code>), jump <code>left</code> to just past that occurrence — this removes the duplicate from the window.</li>
                            <li>Update the character's stored index to the current <code>right</code>.</li>
                            <li>Update the best length using the current window size <code>right - left + 1</code>.</li>
                        </ul>
                    </li>
                </ol>
                <p>Because <code>left</code> only ever moves forward, each character is visited a bounded number of times, giving O(n) time complexity. Space complexity is O(min(n, charset size)) for the hash map.</p>
            `,
            code: `function lengthOfLongestSubstring(s) {
    const lastSeen = new Map();
    let left = 0;
    let maxLength = 0;

    for (let right = 0; right < s.length; right++) {
        const char = s[right];

        if (lastSeen.has(char) && lastSeen.get(char) >= left) {
            // Duplicate found inside the current window — shrink from the left
            left = lastSeen.get(char) + 1;
        }

        lastSeen.set(char, right);
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}`
        }
    },
    {
        slug: 'top-k-frequent-elements',
        title: 'Top K Frequent Elements',
        company: 'Flipkart',
        tags: ['Array', 'Hash Table', 'Heap'],
        related_algorithms: ['minHeap', 'hashing'],
        problem: `
            <p>Given an integer array <code>nums</code> and a number <code>k</code>, return the <code>k</code> values that occur most often. You can return them in any order, and you may assume the answer is unique (there is no tie at the cut-off).</p>
            <p><strong>Example:</strong></p>
            <pre><strong>Input:</strong> nums = [4, 4, 6, 6, 6, 1, 4, 6, 2], k = 2
<strong>Output:</strong> [6, 4]
<strong>Why:</strong> 6 appears four times and 4 appears three times; 1 and 2 appear once each.</pre>
        `,
        solution: {
            explanation: `
                <p>This combines a frequency count with a bounded min-heap, the same "keep only the top k" pattern used in the Kth Largest Element problem.</p>
                <ol>
                    <li>Build a hash map counting how many times each number appears in <code>nums</code>.</li>
                    <li>Push <code>[count, number]</code> pairs from the map onto a min-heap ordered by <code>count</code>.</li>
                    <li>Whenever the heap grows past size <code>k</code>, pop its minimum — this discards the least frequent candidates first, so only the <code>k</code> most frequent numbers can survive.</li>
                    <li>Once every distinct number has been processed, the heap contains exactly the <code>k</code> most frequent elements. Extract their values.</li>
                </ol>
                <p>Counting takes O(n). With <code>d</code> distinct numbers, maintaining a heap bounded at size <code>k</code> costs O(d log k). This beats sorting all distinct counts (O(d log d)) whenever <code>k</code> is small relative to <code>d</code>.</p>
            `,
            code: `class MinHeap {
    constructor() { this.data = []; }
    size() { return this.data.length; }

    push(pair) { // pair = [count, value]
        this.data.push(pair);
        let i = this.data.length - 1;
        while (i > 0) {
            const parent = Math.floor((i - 1) / 2);
            if (this.data[parent][0] <= this.data[i][0]) break;
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
                const l = 2 * i + 1, r = 2 * i + 2;
                let smallest = i;
                if (l < this.data.length && this.data[l][0] < this.data[smallest][0]) smallest = l;
                if (r < this.data.length && this.data[r][0] < this.data[smallest][0]) smallest = r;
                if (smallest === i) break;
                [this.data[i], this.data[smallest]] = [this.data[smallest], this.data[i]];
                i = smallest;
            }
        }
        return top;
    }
}

function topKFrequent(nums, k) {
    const counts = new Map();
    for (const num of nums) {
        counts.set(num, (counts.get(num) || 0) + 1);
    }

    const heap = new MinHeap();
    for (const [value, count] of counts) {
        heap.push([count, value]);
        if (heap.size() > k) {
            heap.pop(); // discard the least frequent so far
        }
    }

    return heap.data.map(([count, value]) => value);
}`
        }
    }
]
