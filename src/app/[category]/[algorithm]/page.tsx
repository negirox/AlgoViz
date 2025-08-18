
import { notFound } from 'next/navigation';
import { ALGO_CATEGORIES, AlgorithmCategoryKey, AlgorithmKey } from '@/lib/algo-templates';
import AlgorithmClientPage from './algorithm-client-page';

export default function AlgorithmPage({ params }: { params: { category: AlgorithmCategoryKey, algorithm: AlgorithmKey<any> } }) {
  const { category: categoryKey, algorithm: algorithmKey } = params;

  // Validate params on the server
  const category = ALGO_CATEGORIES[categoryKey];
  const algorithm = category?.algorithms[algorithmKey];

  if (!category || !algorithm) {
    notFound();
  }

  // Pass validated data as props to the client component
  return (
    <AlgorithmClientPage
      categoryKey={categoryKey}
      algorithmKey={algorithmKey}
      algorithm={algorithm}
      category={category}
    />
  );
}
