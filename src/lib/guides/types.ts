// Long-form, hand-written explanation shown on each algorithm page.
// Text is plain; wrap identifiers in backticks to render them as inline code.
export type AlgorithmGuide = {
  // "How it works" paragraphs, written for someone seeing the algorithm for the first time.
  overview: string[];
  // The procedure as an ordered list of steps.
  steps: string[];
  // One row per case or operation: e.g. { label: 'Worst case', value: 'O(n^2)', why: '...' }.
  complexity: { label: string; value: string; why: string }[];
  whenToUse: string[];
  pitfalls: string[];
};

export type GuideMap = Record<string, AlgorithmGuide>;
