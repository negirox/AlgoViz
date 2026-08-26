
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ALGO_CATEGORIES, AlgorithmCategoryKey, AlgorithmKey } from '@/lib/algo-templates';
import AlgorithmClientPage from './algorithm-client-page';

type AlgorithmPageParams = { category: AlgorithmCategoryKey, algorithm: AlgorithmKey<any> };

export async function generateStaticParams() {
  return Object.entries(ALGO_CATEGORIES).flatMap(([categoryKey, category]) =>
    Object.keys(category.algorithms).map((algorithm) => ({
      category: categoryKey,
      algorithm,
    }))
  );
}

export async function generateMetadata({ params }: { params: AlgorithmPageParams }): Promise<Metadata> {
  const { category: categoryKey, algorithm: algorithmKey } = await params;
  const category = ALGO_CATEGORIES[categoryKey];
  const algorithm = category?.algorithms[algorithmKey];

  if (!category || !algorithm) {
    return {};
  }

  const url = `https://algo-viz-nu.vercel.app/${categoryKey}/${String(algorithmKey)}`;
  const title = `${algorithm.name} Visualizer: Step-by-Step Animation & Complexity | AlgoViz`;
  const description = `${algorithm.description} Time complexity ${algorithm.timeComplexity}, space complexity ${algorithm.spaceComplexity}. Run ${algorithm.name} step by step with an interactive visualizer, code trace, and variable inspector.`;

  return {
    title,
    description,
    keywords: `${algorithm.name}, ${algorithm.name} algorithm, ${algorithm.name} visualization, ${algorithm.name} time complexity, ${category.name} algorithms, ${algorithm.name} example, learn ${algorithm.name}`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function AlgorithmPage({ params }: { params: AlgorithmPageParams }) {
  const { category: categoryKey, algorithm: algorithmKey } = await params;

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
