
import { INTERVIEW_QUESTIONS } from "@/lib/interview-questions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, BrainCircuit } from "lucide-react";

export default function InterviewQuestionsPage() {
    const questionsByCompany = INTERVIEW_QUESTIONS.reduce((acc, q) => {
        if (!acc[q.company]) {
            acc[q.company] = [];
        }
        acc[q.company].push(q);
        return acc;
    }, {} as Record<string, typeof INTERVIEW_QUESTIONS>);

    return (
        <div className="container mx-auto p-4 md:p-6 lg:p-8">
            <div className="text-center mb-12">
                <BrainCircuit className="mx-auto h-16 w-16 text-primary mb-4" />
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Interview Questions</h1>
                <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl/relaxed mt-4">
                    Sharpen your skills with a curated collection of algorithm and data structure problems from top tech companies.
                </p>
            </div>

            <div className="grid gap-12">
                {Object.entries(questionsByCompany).map(([company, questions]) => (
                    <div key={company}>
                        <h2 className="text-2xl font-bold mb-6 text-primary">{company}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {questions.map((q) => (
                                <Link href={`/interview-questions/${q.slug}`} key={q.slug} className="group">
                                    <Card className="bg-card/50 hover:bg-card hover:border-primary transition-all duration-200 h-full flex flex-col">
                                        <CardHeader>
                                            <CardTitle className="text-lg">{q.title}</CardTitle>
                                            <CardDescription>
                                                Tags: {q.tags.join(', ')}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="flex-grow flex items-end justify-between">
                                            <p className="text-sm text-muted-foreground">View Problem</p>
                                            <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
