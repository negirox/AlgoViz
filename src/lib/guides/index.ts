import { SORTING_GUIDES } from './sorting';
import { SEARCHING_GUIDES } from './searching';
import { TREE_GUIDES } from './tree';
import { DATA_STRUCTURE_GUIDES } from './data-structures';
import type { AlgorithmGuide } from './types';

export type { AlgorithmGuide } from './types';

const GUIDES: Record<string, Record<string, AlgorithmGuide>> = {
  sorting: SORTING_GUIDES,
  searching: SEARCHING_GUIDES,
  tree: TREE_GUIDES,
  'data-structures': DATA_STRUCTURE_GUIDES,
};

export function getAlgorithmGuide(categoryKey: string, algorithmKey: string): AlgorithmGuide | undefined {
  return GUIDES[categoryKey]?.[algorithmKey];
}
