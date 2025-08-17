# AlgoViz: Interactive Algorithm Visualization

[![Deploy with Vercel](httpshttps://vercel.com/button)](https://algo-viz-nu.vercel.app/)

**Live Demo: [https://algo-viz-nu.vercel.app/](https://algo-viz-nu.vercel.app/)**

AlgoViz is an interactive web-based tool designed to help students, developers, and computer science enthusiasts learn and understand a wide variety of algorithms through step-by-step visualization. The platform provides a hands-on experience, bridging the gap between abstract theory and practical implementation.

## Features

- **Real-Time Visualization:** Watch algorithms operate on data in real time, with clear highlighting of comparisons, swaps, and state changes.
- **Step-by-Step Controls:** Use the playback controls to play, pause, and step through the algorithm's execution at your own pace.
- **Variable Inspector:** A dedicated panel shows the current state of variables (like `i`, `j`, `pivot`, `low`, `high`, etc.) at each step of the execution.
- **Code Reference:** The corresponding algorithm code is displayed alongside the visualization, with the currently executing line highlighted.
- **Wide Range of Algorithms:**
    - **Sorting Algorithms:** Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, Heap Sort, and more.
    - **Searching Algorithms:** Linear Search, Binary Search, Jump Search, Interpolation Search, and more.
    - **Data Structures:** Hashing (with collision visualization).
    - **Tree Traversals:** In-order traversal visualization.
- **Informative FAQs:** Each algorithm includes a set of frequently asked questions to explain its complexity, use cases, and stability.
- **Responsive Design:** Fully usable on both desktop and mobile devices.

## How to Use

1.  **Select a Category:** Choose from Sorting, Searching, Data Structures, etc.
2.  **Select an Algorithm:** Pick a specific algorithm from the dropdown menu.
3.  **Provide Input:** Enter your own data (e.g., a comma-separated list of numbers) or use the default.
4.  **Visualize:** Click the "Visualize" button to generate the execution trace.
5.  **Control Playback:** Use the controls to step through the visualization and observe the changes in the visualizer and variable inspector.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (with App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Shadcn/ui](https://ui.shadcn.com/)
- **Charts/Visualization:** [Recharts](https://recharts.org/)

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/negirox/AlgoViz/issues).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
