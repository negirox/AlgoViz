import type { GuideMap } from './types';

export const TREE_GUIDES: GuideMap = {
  minHeap: {
    overview: [
      "A min-heap is a complete binary tree in which every parent is smaller than or equal to its children, so the smallest value is always at the root. 'Complete' means every level is full except possibly the last, which fills from left to right. That shape lets the tree live in a plain array: the children of index `i` are at `2i + 1` and `2i + 2`, and its parent is at `floor((i - 1) / 2)`.",
      "Building a heap from an arbitrary array is done bottom-up: call `heapify` (sift-down) on every non-leaf node, from the last one back to the root. Surprisingly, this takes only O(n) time, because most nodes are near the bottom and sink only a short distance.",
      "With the default input `10, 20, 15, 30, 40, 5, 50, 1`, building the heap pulls 1 up to the root through swaps with 30, 20 and 10, and 5 rises above 15. The visualizer then demonstrates `extractMin`: it removes 1, moves the last element (30) to the root, and sinks it back down until the heap property holds again.",
    ],
    steps: [
      "To build: for `i` from `floor(n / 2) - 1` down to 0, call `heapify(arr, n, i)`.",
      "`heapify` compares a node with its children and swaps it with the smaller child if that child is smaller, then repeats from the child's position.",
      "To extract the minimum: save `arr[0]`, move the last element to index 0, shrink the heap, and `heapify` from the root.",
      "To insert (not shown): append the value and sift it up while it is smaller than its parent.",
    ],
    complexity: [
      { label: 'Build heap', value: 'O(n)', why: 'Sum of node heights is linear, even though each heapify can be O(log n).' },
      { label: 'Get minimum', value: 'O(1)', why: 'It is always at index 0.' },
      { label: 'Extract min / insert', value: 'O(log n)', why: 'One path from root to leaf or leaf to root.' },
      { label: 'Space', value: 'O(n)', why: 'The array itself; no pointers needed.' },
    ],
    whenToUse: [
      "Priority queues: task schedulers, event simulation, and Dijkstra's and Prim's algorithms.",
      "Streaming 'top k' problems — keep a min-heap of size k to track the k largest items seen so far.",
      "Merging k sorted lists by repeatedly taking the smallest head.",
    ],
    pitfalls: [
      "A heap is not sorted: only the root is guaranteed to be the minimum. Searching for an arbitrary value is still O(n).",
      "Building a heap by inserting elements one at a time is O(n log n); bottom-up heapify is O(n).",
      "Using 1-based child formulas (`2i`, `2i + 1`) on a 0-based array.",
    ],
  },
  inOrderTraversal: {
    overview: [
      "In-order traversal visits a binary tree in the order left subtree, then the node itself, then the right subtree. It is a depth-first traversal: it goes as far left as possible before visiting anything, then works its way back up.",
      "Its most important property is that, on a binary search tree, it visits keys in ascending order. That makes it the standard way to print a BST in sorted order, to check whether a tree is a valid BST, or to find the k-th smallest element.",
      "The default tree has 10 at the root, 5 and 15 as its children, and 2, 7, 12 and 18 as leaves. In-order traversal visits `2, 5, 7, 10, 12, 15, 18` — sorted, because the default tree is a valid BST.",
    ],
    steps: [
      "If the current node is null, return.",
      "Recursively traverse the left subtree.",
      "Visit the current node (record or print its value).",
      "Recursively traverse the right subtree.",
    ],
    complexity: [
      { label: 'Time', value: 'O(n)', why: 'Every node is visited exactly once.' },
      { label: 'Space (balanced tree)', value: 'O(log n)', why: 'The recursion stack holds one frame per level.' },
      { label: 'Space (skewed tree)', value: 'O(n)', why: 'A tree shaped like a linked list is n levels deep.' },
    ],
    whenToUse: [
      "Getting the keys of a BST in sorted order.",
      "Validating a BST: the in-order sequence must be strictly increasing.",
      "Finding the k-th smallest element, or the in-order successor of a node.",
    ],
    pitfalls: [
      "Very deep trees can overflow the call stack; an iterative version with an explicit stack avoids this.",
      "In-order alone cannot reconstruct a tree; you need it together with pre-order or post-order.",
      "On a tree that is not a BST, the output is not sorted — it simply reflects the tree's shape.",
    ],
  },
  preOrderTraversal: {
    overview: [
      "Pre-order traversal visits the current node first, then its left subtree, then its right subtree. Because each parent is visited before any of its descendants, the output describes the tree from the top down.",
      "That top-down order is exactly what you need to copy or serialise a tree: if you write nodes in pre-order (including markers for null children), you can rebuild the identical tree by reading them back in the same order. File-system listings and expression trees printed in prefix (Polish) notation follow the same pattern.",
      "On the default tree (root 10, children 5 and 15, leaves 2, 7, 12, 18), pre-order visits `10, 5, 2, 7, 15, 12, 18`. Notice that the root always comes first and that the whole left branch is finished before 15 is visited.",
    ],
    steps: [
      "If the current node is null, return.",
      "Visit the current node.",
      "Recursively traverse the left subtree.",
      "Recursively traverse the right subtree.",
    ],
    complexity: [
      { label: 'Time', value: 'O(n)', why: 'Each node is visited once.' },
      { label: 'Space (balanced tree)', value: 'O(log n)', why: 'Recursion depth equals tree height.' },
      { label: 'Space (skewed tree)', value: 'O(n)', why: 'Height can be n.' },
    ],
    whenToUse: [
      "Cloning or serialising a tree so it can be rebuilt later.",
      "Printing hierarchical data such as folders or an organisation chart with indentation.",
      "Converting an expression tree to prefix notation.",
    ],
    pitfalls: [
      "In an iterative version with a stack, push the right child before the left so the left is processed first.",
      "Serialising without null markers loses information — different trees can produce the same sequence.",
      "Deep recursion on skewed trees can overflow the stack.",
    ],
  },
  postOrderTraversal: {
    overview: [
      "Post-order traversal visits the left subtree, then the right subtree, and only then the node itself. Every node is processed after all of its descendants, so information flows from the leaves up to the root.",
      "That bottom-up order is what you need when a parent depends on results from its children: computing the height or size of a tree, evaluating an arithmetic expression tree, or freeing memory (you must delete the children before the parent that points to them).",
      "On the default tree, post-order visits `2, 7, 5, 12, 18, 15, 10`. The root, 10, comes last, and each subtree root (5 and 15) appears right after its own children.",
    ],
    steps: [
      "If the current node is null, return.",
      "Recursively traverse the left subtree.",
      "Recursively traverse the right subtree.",
      "Visit the current node.",
    ],
    complexity: [
      { label: 'Time', value: 'O(n)', why: 'Each node is visited once.' },
      { label: 'Space (balanced tree)', value: 'O(log n)', why: 'Recursion depth equals tree height.' },
      { label: 'Space (skewed tree)', value: 'O(n)', why: 'Height can be n.' },
    ],
    whenToUse: [
      "Deleting or freeing a tree safely.",
      "Evaluating expression trees (it produces postfix / Reverse Polish notation).",
      "Any 'combine the children's answers' computation: height, subtree sums, diameter, checking balance.",
    ],
    pitfalls: [
      "The iterative version is the trickiest of the three depth-first traversals; a common trick is to do a modified pre-order (node, right, left) and reverse the result.",
      "Mixing up post-order with reverse pre-order: they are not the same sequence.",
      "Deep recursion can overflow the call stack on skewed trees.",
    ],
  },
  bfsTraversal: {
    overview: [
      "Breadth-first search (BFS), also called level-order traversal on trees, visits every node on one level before moving to the next. It uses a queue: take the node at the front, visit it, and add its children to the back. Because the queue is first-in, first-out, nodes come out in exactly the order of their distance from the root.",
      "That distance-ordering property is why BFS finds shortest paths in unweighted graphs: the first time it reaches a node, it has used the fewest possible edges. On trees, it is the natural way to print level by level or find the minimum depth.",
      "On the default tree, BFS visits `10, 5, 15, 2, 7, 12, 18`. The `queue` variable in the dry run shows how 5 and 15 are queued while 10 is processed, and how the grandchildren join behind them.",
    ],
    steps: [
      "Put the root in a queue.",
      "While the queue is not empty, remove the node at the front and visit it.",
      "Add its left child, then its right child, to the back of the queue if they exist.",
      "Repeat until the queue is empty.",
    ],
    complexity: [
      { label: 'Time', value: 'O(n)', why: 'Each node is enqueued and dequeued once. For graphs: O(V + E).' },
      { label: 'Space', value: 'O(w)', why: 'w is the maximum width of the tree; up to about n/2 in a complete tree.' },
    ],
    whenToUse: [
      "Shortest path in unweighted graphs or grids (mazes, word ladders, knight moves).",
      "Level-order problems: printing a tree by levels, finding the right-side view, or the minimum depth.",
      "Finding everything within k steps, such as friends-of-friends in a social network.",
    ],
    pitfalls: [
      "Using `Array.shift()` as the dequeue in JavaScript is O(n) per call; for large inputs use an index pointer or a real queue.",
      "On graphs, mark nodes as visited when they are enqueued, not when they are dequeued, or the same node can be queued many times.",
      "BFS can use a lot of memory on wide trees, where depth-first traversal would be cheaper.",
    ],
  },
  bestFirstSearch: {
    overview: [
      "Best-first search is a family of graph searches that always expands the most promising node next, according to a heuristic score. It keeps the frontier in a priority queue rather than a plain queue (BFS) or stack (DFS). Greedy best-first search and A* are the best-known members.",
      "In this visualizer the heuristic is simply the node's value: the smallest value in the priority queue is expanded first. That keeps the example easy to follow; in a real application the score would be something like the straight-line distance to the goal.",
      "The default tree is not a BST (5 has children 18 and 2), and the target is 2. Starting at 10, the search queues 5 and 15, expands 5 because it has the lower score, queues 18 and 2, and then expands 2 — the target — after visiting only three nodes. The path is `10 -> 5 -> 2`.",
    ],
    steps: [
      "Put the start node in a priority queue.",
      "While the queue is not empty, remove the node with the best (lowest) score.",
      "If it is the target, stop.",
      "Mark it visited and add its unvisited neighbours (children) to the priority queue.",
      "If the queue empties, the target is unreachable.",
    ],
    complexity: [
      { label: 'Time (worst)', value: 'O(b^d)', why: 'b is the branching factor and d the depth; a poor heuristic can explore everything.' },
      { label: 'Time (good heuristic)', value: 'Close to O(d)', why: 'A heuristic that points toward the goal expands only nodes on the path.' },
      { label: 'Space', value: 'O(b^d)', why: 'The priority queue can hold the whole frontier.' },
    ],
    whenToUse: [
      "Path-finding in games and maps, where a distance estimate to the goal is available.",
      "Puzzle solving (8-puzzle, route planning) where exploring every state is too slow.",
      "As a stepping stone to A*, which adds the cost so far to the heuristic and becomes optimal.",
    ],
    pitfalls: [
      "Greedy best-first search is not guaranteed to find the shortest path; it can be lured down a path that looks good locally.",
      "Without a visited set, graphs with cycles can make it loop forever.",
      "Re-sorting an array on every step, as this demo does for clarity, is O(n log n) per step; real code uses a binary heap.",
    ],
  },
  binarySearchTree: {
    overview: [
      "A binary search tree (BST) keeps the rule 'left subtree < node < right subtree' at every node. That rule lets you search like binary search: compare with the current node and go left or right, discarding a whole subtree each time.",
      "Inserting follows the same path a search would take and attaches the new value as a leaf where the search falls off the tree. The shape of the tree therefore depends entirely on the order of insertions. Random orders give a height of about log n; sorted orders give a single long chain.",
      "The default input `8, 3, 10, 1, 6, 14, 4, 7, 13` builds the textbook example tree: 8 at the root, 3 and 10 below it, then 1, 6 and 14, and finally 4, 7 and 13. Reading it in-order gives `1, 3, 4, 6, 7, 8, 10, 13, 14`.",
    ],
    steps: [
      "To insert, start at the root. If the tree is empty, the new value becomes the root.",
      "If the value is smaller than the current node, go left; otherwise go right.",
      "When the chosen child is null, attach the new node there.",
      "To search, follow the same comparisons and stop when you find the value or reach null.",
    ],
    complexity: [
      { label: 'Search / insert (average)', value: 'O(log n)', why: 'Random insertion order keeps the height logarithmic.' },
      { label: 'Search / insert (worst)', value: 'O(n)', why: 'Sorted insertions create a chain of height n.' },
      { label: 'In-order traversal', value: 'O(n)', why: 'Produces the keys in sorted order.' },
      { label: 'Space', value: 'O(n)', why: 'One node per key.' },
    ],
    whenToUse: [
      "Ordered sets and maps where you need sorted iteration, range queries, or floor/ceiling lookups.",
      "As the foundation for self-balancing trees (AVL, red-black) used by `TreeMap` and `std::map`.",
      "Interview problems on validation, lowest common ancestor, and k-th smallest element.",
    ],
    pitfalls: [
      "Inserting already-sorted data degrades it to a linked list; use a balanced tree when order is not random.",
      "Validating a BST by checking only each node against its direct children misses violations deeper down; pass min/max bounds instead.",
      "Decide how to handle duplicates (reject, count, or always go right) before you write the code.",
    ],
  },
  avlTree: {
    overview: [
      "An AVL tree is a self-balancing binary search tree, named after its inventors Adelson-Velsky and Landis (1962). After every insertion it checks each node on the path back to the root, and if the heights of a node's two subtrees differ by more than one, it repairs that node with a rotation.",
      "There are four imbalance cases. Left-Left and Right-Right are fixed with a single right or left rotation. Left-Right and Right-Left need a double rotation: first rotate the child, then the node. Rotations only rearrange a few pointers, so they cost O(1), and the height of the tree stays at most about 1.44 log2(n).",
      "The default input `10, 20, 30, 40, 50, 25` exercises several cases. Inserting 30 makes 10 right-heavy, so the tree left-rotates around 10 and 20 becomes the root. Inserting 50 triggers another left rotation at 30. Finally, 25 causes a Right-Left case at 20: a right rotation around 40, then a left rotation around 20, leaving 30 as the new root.",
    ],
    steps: [
      "Insert the value as in an ordinary BST.",
      "Walking back up, update each node's height as `1 + max(height(left), height(right))`.",
      "Compute the balance factor `height(left) - height(right)`.",
      "If it is above 1 or below -1, identify the case (LL, RR, LR, RL) and apply the matching single or double rotation.",
      "Continue up to the root.",
    ],
    complexity: [
      { label: 'Search', value: 'O(log n)', why: 'Height is always logarithmic.' },
      { label: 'Insert', value: 'O(log n)', why: 'One root-to-leaf path plus at most two rotations.' },
      { label: 'Delete', value: 'O(log n)', why: 'May need a rotation at each level on the way up.' },
      { label: 'Space', value: 'O(n)', why: 'One node per key plus a height field.' },
    ],
    whenToUse: [
      "Read-heavy ordered maps where lookups dominate, since AVL trees are more strictly balanced than red-black trees.",
      "Any time a plain BST could receive sorted or adversarial input.",
      "In-memory indexes that need guaranteed O(log n) lookups.",
    ],
    pitfalls: [
      "Forgetting to update heights after a rotation leaves wrong balance factors that cause later rotations to go wrong.",
      "Mixing up the LR and RL cases: check the sign of the child's balance factor, not just the parent's.",
      "Rotations must reattach the rotated subtree to the parent (or update the root), or nodes are lost.",
    ],
  },
};
