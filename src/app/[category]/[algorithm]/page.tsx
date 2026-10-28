
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ALGO_CATEGORIES, AlgorithmCategoryKey, AlgorithmKey } from '@/lib/algo-templates';
import AlgorithmClientPage from './algorithm-client-page';
import { AlgorithmGuide } from '@/components/algorithm-guide';
import { WorkedExample } from '@/components/worked-example';
import { Faq } from '@/components/faq';
import { getAlgorithmGuide } from '@/lib/guides';
import { absoluteUrl } from '@/lib/site';

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

  const url = absoluteUrl(`/${categoryKey}/${String(algorithmKey)}`);
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

  const guide = getAlgorithmGuide(categoryKey, String(algorithmKey));

  // The interactive tool is a client component; the explanatory content below it is
  // rendered on the server so it is part of the HTML.
  return (
    <>
      <AlgorithmClientPage
        key={`${categoryKey}/${String(algorithmKey)}`}
        categoryKey={categoryKey}
        algorithmKey={algorithmKey}
        algorithm={algorithm}
        category={category}
      />
      <div className="container mx-auto px-4 pb-8 md:px-6 lg:px-8 flex flex-col gap-8">
        {guide && <AlgorithmGuide algorithmName={algorithm.name} guide={guide} />}
        <WorkedExample
          categoryKey={categoryKey}
          algorithmKey={String(algorithmKey)}
          algorithmName={algorithm.name}
          defaultInput={algorithm.input}
        />
        <Faq algorithm={algorithmKey} category={categoryKey} />
      </div>
    </>
  );
}
