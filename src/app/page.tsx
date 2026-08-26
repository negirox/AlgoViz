
import { AlgorithmShowcase } from '@/components/algorithm-showcase';
import { BookOpenCheck } from 'lucide-react';
import { CheckCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col bg-background font-sans text-foreground">
        <section className="py-12 md:py-20 lg:py-24 bg-background/50">
            <div className="container px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                    <div className="space-y-4">
                        <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                            Interactive Learning
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Understand Algorithms, Don't Just Memorize Them
                        </h2>
                        <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            AlgoViz brings complex computer science algorithms to life. Move beyond static code and see exactly how data is sorted, searched, and structured with step-by-step, interactive visualizations.
                        </p>
                         <p className="max-w-[600px] text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                            AlgoViz is an interactive web-based tool designed to help students, developers, and computer science enthusiasts learn and understand a wide variety of algorithms through step-by-step visualization. The platform provides a hands-on experience, bridging the gap between abstract theory and practical implementation.
                        </p>
                        <ul className="grid gap-2 text-md text-muted-foreground">
                            <li className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-primary" />
                                <span>Visualize sorting, searching, trees, and more.</span>
                            </li>
                             <li className="flex items-center gap-2">
                                <BookOpenCheck className="h-5 w-5 text-primary" />
                                <span>Practice with real interview questions from top companies.</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-primary" />
                                <span>Control the execution speed with playback controls.</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-primary" />
                                <span>Inspect variables at every step to deepen understanding.</span>
                            </li>
                        </ul>
                    </div>
                    <img
                      data-ai-hint="abstract algorithm"
                      src="https://images.unsplash.com/photo-1544256718-3bcf237f3974?q=80&w=2071&auto=format&fit=crop"
                      width="600"
                      height="400"
                      alt="Algorithm Visualization"
                      className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                    />
                </div>
            </div>
        </section>
        <AlgorithmShowcase />
    </div>
  );
}

    