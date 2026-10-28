import type { GuideMap } from './types';

export const DATA_STRUCTURE_GUIDES: GuideMap = {
  hashing: {
    overview: [
      "A hash table stores key-value pairs in an array of buckets. A hash function turns each key into a bucket index, so a lookup can jump straight to the right bucket instead of searching the whole collection. When two keys land in the same bucket — a collision — this implementation uses separate chaining: each bucket holds a small list of entries.",
      "The hash function here is `hash = (hash + charCode(key[i]) * i) % 10`, with 10 buckets. It is deliberately simple so you can check it by hand, but it has a flaw worth noticing: the first character is multiplied by `i = 0`, so it never affects the result. 'cat' and 'bat' always land in the same bucket.",
      "The default input inserts 15 fruits into 10 buckets, a load factor of 1.5, which guarantees collisions. In the dry run you can see six of them; bucket 8 ends up holding grape, peach and kiwi. Looking up 'grape' hashes to bucket 8 and finds it as the first entry in that chain.",
    ],
    steps: [
      "Compute `index = hash(key)`.",
      "To insert: if the key already exists in `table[index]`, update its value; otherwise append the pair to that bucket's list.",
      "To look up: compute the same index and scan that bucket's list for the key.",
      "To delete: find the entry in its bucket and remove it from the list.",
      "In production, resize (rehash into a larger table) when the load factor passes a threshold such as 0.75.",
    ],
    complexity: [
      { label: 'Insert / lookup / delete (average)', value: 'O(1)', why: 'With a good hash and a bounded load factor, chains stay short.' },
      { label: 'Insert / lookup / delete (worst)', value: 'O(n)', why: 'If every key collides, one bucket holds everything.' },
      { label: 'Resize', value: 'O(n)', why: 'Occasional; amortised O(1) per insert when the table doubles.' },
      { label: 'Space', value: 'O(n + m)', why: 'n entries plus m buckets.' },
    ],
    whenToUse: [
      "Fast membership tests and lookups: caches, symbol tables, de-duplication, counting frequencies.",
      "Many interview problems (Two Sum, Group Anagrams, LRU Cache) reduce to the right hash map.",
      "Joining or indexing data by a key when you never need it in sorted order.",
    ],
    pitfalls: [
      "Weak hash functions, like the one shown, cluster keys and destroy the O(1) average.",
      "Not resizing: a fixed 10-bucket table with 1,000 keys behaves like ten linked lists.",
      "Using mutable objects as keys and then changing them, so their hash no longer matches their bucket.",
    ],
  },
  stack: {
    overview: [
      "A stack is a Last-In, First-Out (LIFO) collection: the last item pushed is the first one popped, like a stack of plates. All operations happen at one end, called the top, which is why push, pop and peek are all O(1).",
      "Stacks are everywhere once you start looking. Your program's call stack stores function frames this way; the undo button keeps a stack of edits; the back button keeps a stack of pages; and many algorithms, from depth-first search to bracket matching, use a stack to remember where to return to.",
      "The default commands push 10, 20 and 30, pop (removing 30), push 40, then pop twice (removing 40 and then 20). Only 10 remains, at the bottom. Each pop always takes whatever was added most recently.",
    ],
    steps: [
      "`push(x)`: place x on top of the stack.",
      "`pop()`: remove and return the top element; signal an error (underflow) if the stack is empty.",
      "`peek()`: return the top element without removing it.",
      "`isEmpty()`: check whether the stack has no elements.",
    ],
    complexity: [
      { label: 'Push', value: 'O(1)', why: 'Amortised O(1) for a dynamic array; strict O(1) for a linked list.' },
      { label: 'Pop / peek', value: 'O(1)', why: 'Only the top is touched.' },
      { label: 'Search', value: 'O(n)', why: 'A stack is not designed for searching.' },
      { label: 'Space', value: 'O(n)', why: 'One slot per element.' },
    ],
    whenToUse: [
      "Matching brackets, tags or parentheses (see the Valid Parentheses interview question).",
      "Undo/redo, browser history, and backtracking algorithms.",
      "Evaluating postfix expressions and converting infix to postfix.",
      "Iterative depth-first search and replacing recursion when the call stack is too small.",
    ],
    pitfalls: [
      "Popping from an empty stack — always check `isEmpty()` or handle `undefined`.",
      "Using `shift`/`unshift` on a JavaScript array as the stack end; that is O(n). Use `push`/`pop`.",
      "Unbounded recursion is a hidden stack overflow; deep inputs need an explicit stack.",
    ],
  },
  queue: {
    overview: [
      "A queue is a First-In, First-Out (FIFO) collection: items are added at the rear and removed from the front, like a line at a ticket counter. The first item to arrive is always the first to be served.",
      "Queues model anything that should be handled in arrival order: print jobs, network packets, requests to a web server, or messages between services. They are also the engine of breadth-first search, where the queue guarantees nodes are explored level by level.",
      "The default commands enqueue 10 and 20, dequeue (removing 10, the oldest), enqueue 30 and 40, then dequeue again (removing 20). The final queue is `[30, 40]`, with 30 at the front.",
    ],
    steps: [
      "`enqueue(x)`: add x at the rear.",
      "`dequeue()`: remove and return the front element; handle the empty case.",
      "`peek()`: look at the front element without removing it.",
      "`isEmpty()` / `size()`: check how many elements are waiting.",
    ],
    complexity: [
      { label: 'Enqueue', value: 'O(1)', why: 'Append at the rear.' },
      { label: 'Dequeue', value: 'O(1)', why: 'With a linked list, circular buffer or head index; O(n) with `Array.shift()`.' },
      { label: 'Peek', value: 'O(1)', why: 'Read the front element.' },
      { label: 'Space', value: 'O(n)', why: 'One slot per element.' },
    ],
    whenToUse: [
      "Breadth-first search and shortest paths in unweighted graphs.",
      "Task scheduling and job processing in arrival order.",
      "Buffers between a producer and a consumer running at different speeds.",
    ],
    pitfalls: [
      "Implementing dequeue with `Array.shift()` in JavaScript moves every element, making it O(n).",
      "A naive array queue that only moves the front index forward wastes the space behind it — the circular queue fixes this.",
      "Forgetting the empty-queue check on dequeue.",
    ],
  },
  deque: {
    overview: [
      "A deque (pronounced 'deck', short for double-ended queue) allows insertion and removal at both the front and the rear. It generalises both the stack (use one end) and the queue (add at one end, remove at the other).",
      "Deques shine in sliding-window problems. To find the maximum of every window of size k, keep a deque of indices whose values are in decreasing order: drop indices from the front when they leave the window, and drop smaller values from the rear when a larger one arrives. Each index enters and leaves at most once, so the whole scan is O(n).",
      "The default commands add 10 and 20 at the rear, add 5 at the front (giving `[5, 10, 20]`), remove from the rear (20) and remove from the front (5). Only 10 remains.",
    ],
    steps: [
      "`addFront(x)` / `addRear(x)`: insert at either end.",
      "`removeFront()` / `removeRear()`: remove from either end, handling the empty case.",
      "`peekFront()` / `peekRear()`: read either end without removing.",
    ],
    complexity: [
      { label: 'Add / remove at either end', value: 'O(1)', why: 'With a doubly linked list or circular buffer.' },
      { label: 'Access by index', value: 'O(1) or O(n)', why: 'O(1) for array-backed deques, O(n) for linked ones.' },
      { label: 'Space', value: 'O(n)', why: 'One slot per element.' },
    ],
    whenToUse: [
      "Sliding window maximum/minimum problems.",
      "Palindrome checks: compare and remove from both ends.",
      "Work-stealing schedulers, where a thread takes work from its own end and others steal from the opposite end.",
      "Undo histories with a size limit: drop the oldest entry from the front.",
    ],
    pitfalls: [
      "The visualizer uses `unshift` for `addFront`, which is O(n) on a JavaScript array; a real deque uses a circular buffer.",
      "Mixing up which end is the 'front' between functions.",
      "Not checking for emptiness before removing from either end.",
    ],
  },
  singlyLinkedList: {
    overview: [
      "A singly linked list is a chain of nodes, each holding a value and a pointer to the next node. The list keeps a reference to the first node, the head, and the last node points to null. Unlike an array, the nodes do not need to be next to each other in memory.",
      "That layout makes inserting or removing a node O(1) once you have a reference to its predecessor — you only change a pointer — but reaching the k-th element requires walking k links from the head. There is no random access.",
      "The default commands insert 10, 20 and 5 at the end, delete 20 (by pointing 10's `next` directly at 5), then insert 15. The final list is `10 -> 5 -> 15`.",
    ],
    steps: [
      "Insert at the end: walk to the last node (or keep a tail pointer) and set its `next` to the new node.",
      "Insert at the head: set the new node's `next` to the current head, then make it the head.",
      "Delete a value: walk with a `prev` pointer until `current` holds the value, then set `prev.next = current.next`.",
      "Traverse: start at the head and follow `next` until null.",
    ],
    complexity: [
      { label: 'Access / search', value: 'O(n)', why: 'Must walk from the head.' },
      { label: 'Insert / delete at head', value: 'O(1)', why: 'Only the head pointer changes.' },
      { label: 'Insert at tail', value: 'O(n) or O(1)', why: 'O(1) if a tail pointer is maintained.' },
      { label: 'Delete by value', value: 'O(n)', why: 'Finding the node dominates; unlinking is O(1).' },
    ],
    whenToUse: [
      "Frequent insertions and deletions at the front, such as a simple stack.",
      "Building blocks for hash table chains, adjacency lists and free lists in memory allocators.",
      "Interview classics: reversing a list, detecting cycles, merging sorted lists, finding the middle.",
    ],
    pitfalls: [
      "Deleting the head is a special case; a dummy (sentinel) head node removes it.",
      "Losing the rest of the list by overwriting `next` before saving it, especially when reversing.",
      "Forgetting to update the tail pointer when the last node is deleted.",
    ],
  },
  doublyLinkedList: {
    overview: [
      "A doubly linked list gives each node two pointers: `next` to the following node and `prev` to the previous one. The list usually tracks both the head and the tail. The extra pointer costs memory but allows walking in both directions and removing a node in O(1) when you already hold a reference to it.",
      "That O(1) removal is what makes it the standard companion of a hash map in an LRU cache: the map finds the node instantly, and the doubly linked list moves it to the front or evicts the tail without searching.",
      "The default commands insert 10, 20 and 30, then delete 20. Deleting a middle node updates two pointers: `10.next` now points to 30 and `30.prev` points back to 10. The list ends as `10 <-> 30` with head 10 and tail 30.",
    ],
    steps: [
      "Insert at the end: set `newNode.prev = tail`, `tail.next = newNode`, then `tail = newNode`.",
      "Delete a node: set `node.prev.next = node.next` and `node.next.prev = node.prev`.",
      "If the deleted node was the head or tail, move that pointer as well.",
      "Traverse forwards from the head with `next`, or backwards from the tail with `prev`.",
    ],
    complexity: [
      { label: 'Access / search', value: 'O(n)', why: 'Still sequential, although you can start from either end.' },
      { label: 'Insert / delete at either end', value: 'O(1)', why: 'Head and tail pointers are kept.' },
      { label: 'Delete a known node', value: 'O(1)', why: 'Both neighbours are reachable directly.' },
      { label: 'Space', value: 'O(n)', why: 'Two pointers per node.' },
    ],
    whenToUse: [
      "LRU and LFU caches (paired with a hash map).",
      "Browser history or editors that need both back and forward navigation.",
      "Implementing a deque.",
    ],
    pitfalls: [
      "Updating `next` but forgetting `prev` (or the reverse) corrupts backward traversal in ways that are hard to spot.",
      "Edge cases: deleting the only node must set both head and tail to null.",
      "Sentinel head and tail nodes remove most of these special cases and are worth using.",
    ],
  },
  circularLinkedList: {
    overview: [
      "A circular linked list is a linked list whose last node points back to the first instead of to null. There is no natural end: starting from any node and following `next` will eventually bring you back to where you began.",
      "This makes it a natural fit for anything that cycles: round-robin CPU scheduling, players taking turns in a game, or a playlist on repeat. Keeping a pointer to the tail is a useful trick, because `tail.next` is the head, so both ends are reachable in O(1).",
      "The default commands insert 10, 20, 30 and 40 at the end. After each insertion, the new last node's `next` is pointed back at 10, closing the loop. The final structure is `10 -> 20 -> 30 -> 40 -> (back to 10)`.",
    ],
    steps: [
      "Insert into an empty list: the new node becomes the head and points to itself.",
      "Insert at the end: walk until `current.next === head`, set `current.next = newNode` and `newNode.next = head`.",
      "Traverse: start at the head and stop when you arrive back at the head, not when you hit null.",
      "Delete: unlink as in a singly linked list, taking care when the head itself is removed.",
    ],
    complexity: [
      { label: 'Access / search', value: 'O(n)', why: 'Sequential traversal.' },
      { label: 'Insert at end', value: 'O(n) or O(1)', why: 'O(1) if you keep a tail pointer.' },
      { label: 'Insert at head', value: 'O(1) with tail pointer', why: 'Insert after the tail and update `tail.next`.' },
      { label: 'Space', value: 'O(n)', why: 'One pointer per node.' },
    ],
    whenToUse: [
      "Round-robin scheduling and turn-based games.",
      "Circular buffers and repeating playlists.",
      "The Josephus problem and other 'go around the circle' puzzles.",
    ],
    pitfalls: [
      "A traversal loop that waits for null never ends — always stop when you return to the start.",
      "Deleting the head requires updating the last node's `next` as well.",
      "Single-node lists point to themselves; check that case explicitly.",
    ],
  },
  circularQueue: {
    overview: [
      "A circular queue, or ring buffer, is a fixed-size queue whose array wraps around: when the rear reaches the last slot, the next element goes into slot 0 if it is free. Two indices, `front` and `rear`, move forward with modulo arithmetic, so no elements ever need to be shifted.",
      "This solves the main weakness of a simple array queue, where dequeued slots at the start are wasted. It is the structure behind keyboard buffers, audio and network buffers, and producer-consumer queues in operating systems, because it never allocates memory after creation.",
      "The visualizer uses a capacity of 5. The default commands enqueue 10, 20 and 30, dequeue once, enqueue 40 and 50 (filling slots 3 and 4), dequeue twice, and finally enqueue 60. Because slots 0 and 1 are free again, `rear` wraps to index 0 and 60 is stored there.",
    ],
    steps: [
      "The queue is full when `(rear + 1) % size === front`.",
      "Enqueue: if not full, set `front = 0` when the queue was empty, then `rear = (rear + 1) % size` and store the value.",
      "The queue is empty when `front === -1`.",
      "Dequeue: read `queue[front]`; if `front === rear`, reset both to -1, otherwise `front = (front + 1) % size`.",
    ],
    complexity: [
      { label: 'Enqueue', value: 'O(1)', why: 'Index arithmetic only.' },
      { label: 'Dequeue', value: 'O(1)', why: 'No shifting of elements.' },
      { label: 'Peek / isFull / isEmpty', value: 'O(1)', why: 'Simple comparisons.' },
      { label: 'Space', value: 'O(k)', why: 'Fixed capacity k, allocated once.' },
    ],
    whenToUse: [
      "Fixed-size buffers for streaming data: audio, video, network packets, logs.",
      "Producer-consumer pipelines in embedded systems where dynamic allocation is avoided.",
      "Keeping the last k items, such as a moving average or recent-events history.",
    ],
    pitfalls: [
      "Telling full from empty: with `front`/`rear` alone both can look like `front === rear`; use -1 for empty (as here), a separate count, or leave one slot unused.",
      "Forgetting `% size` when advancing an index runs off the end of the array.",
      "A fixed capacity means enqueue can fail — decide whether to reject, overwrite the oldest item, or block.",
    ],
  },
};
