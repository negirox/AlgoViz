
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
    }
]
