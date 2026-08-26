
import type { Metadata } from 'next';
import { INTERVIEW_QUESTIONS } from "@/lib/interview-questions";
import { ALGO_CATEGORIES } from "@/lib/algo-templates";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CodeEditor } from "@/components/code-editor";

function resolveAlgorithmLink(key: string): { href: string; name: string } | null {
    for (const [categoryKey, category] of Object.entries(ALGO_CATEGORIES)) {
        const algo = (category.algorithms as Record<string, { name: string }>)[key];
        if (algo) {
            return { href: `/${categoryKey}/${key}`, name: algo.name };
        }
    }
    return null;
}

export async function generateStaticParams() {
    return INTERVIEW_QUESTIONS.map(q => ({
        slug: q.slug
    }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const { slug } = await params;
    const question = INTERVIEW_QUESTIONS.find(q => q.slug === slug);

    if (!question) {
        return {};
    }

    const url = `https://algo-viz-nu.vercel.app/interview-questions/${question.slug}`;
    const title = `${question.title} - ${question.company} Interview Question & Solution | AlgoViz`;
    const description = `Solve "${question.title}", a ${question.company} coding interview question (${question.tags.join(', ')}). Includes the full problem statement, a step-by-step solution walkthrough, and working code.`;

    return {
        title,
        description,
        keywords: `${question.title}, ${question.company} interview questions, ${question.tags.join(', ')}, coding interview, algorithm interview question`,
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

export default async function InterviewQuestionDetailPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const question = INTERVIEW_QUESTIONS.find(q => q.slug === slug);

    if (!question) {
        notFound();
    }

    const relatedAlgorithms = question.related_algorithms
        .map(resolveAlgorithmLink)
        .filter((a): a is { href: string; name: string } => a !== null);

    return (
        <div className="container mx-auto p-4 md:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/interview-questions" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
                    <ArrowLeft className="h-4 w-4" />
                    Back to All Questions
                </Link>

                <div className="space-y-8">
                    <Card className="bg-card/50">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-2xl lg:text-3xl">{question.title}</CardTitle>
                                <Badge variant="secondary">{question.company}</Badge>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-2">
                                {question.tags.map(tag => (
                                    <Badge key={tag} variant="outline">{tag}</Badge>
                                ))}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: question.problem }} />
                        </CardContent>
                    </Card>

                    <Card className="bg-card/50">
                        <CardHeader>
                            <CardTitle>Solution Walkthrough</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="prose prose-invert max-w-none mb-6" dangerouslySetInnerHTML={{ __html: question.solution.explanation }} />
                            <CodeEditor
                                code={question.solution.code}
                                highlightedLine={undefined}
                                readOnly={true}
                            />
                        </CardContent>
                    </Card>

                    {relatedAlgorithms.length > 0 && (
                        <Card className="bg-card/50">
                            <CardHeader>
                                <CardTitle className="text-lg">Related Algorithms</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-wrap gap-3">
                                {relatedAlgorithms.map((algo) => (
                                    <Link key={algo.href} href={algo.href}>
                                        <Badge variant="outline" className="hover:border-primary hover:text-primary transition-colors">
                                            {algo.name} &rarr;
                                        </Badge>
                                    </Link>
                                ))}
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
