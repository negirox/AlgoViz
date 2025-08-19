
import { INTERVIEW_QUESTIONS } from "@/lib/interview-questions";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CodeEditor } from "@/components/code-editor";

export async function generateStaticParams() {
    return INTERVIEW_QUESTIONS.map(q => ({
        slug: q.slug
    }));
}

export default function InterviewQuestionDetailPage({ params }: { params: { slug: string } }) {
    const question = INTERVIEW_QUESTIONS.find(q => q.slug === params.slug);

    if (!question) {
        notFound();
    }

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
                                onCodeChange={() => {}}
                                highlightedLine={undefined}
                                readOnly={true}
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
