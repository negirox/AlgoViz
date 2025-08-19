
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlgorithmCategoryKey, AlgorithmKey } from "@/lib/algo-templates";
import { FAQ_DATA } from "@/lib/faq-data.tsx";
import { INTERVIEW_QUESTIONS } from "@/lib/interview-questions";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type FaqProps = {
    category: AlgorithmCategoryKey;
    algorithm: AlgorithmKey<any>;
};

export function Faq({ category, algorithm }: FaqProps) {
    const faqCategory = FAQ_DATA[category];
    const relatedQuestions = INTERVIEW_QUESTIONS.filter(q => q.related_algorithms.includes(algorithm as any));

    if (!faqCategory) return null;

    const faqContent = faqCategory.algorithms[algorithm as keyof typeof faqCategory.algorithms];

    if (!faqContent) {
        return null;
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="bg-card/50 lg:col-span-2">
                <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                    <CardDescription>About {faqContent.title}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        {faqContent.faqs.map((faq, index) => (
                            <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger>{faq.question}</AccordionTrigger>
                                <AccordionContent>
                                    <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>

            {relatedQuestions.length > 0 && (
                <Card className="bg-card/50">
                    <CardHeader>
                        <CardTitle>Related Interview Questions</CardTitle>
                        <CardDescription>Practice with real problems</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {relatedQuestions.map(q => (
                             <Link href={`/interview-questions/${q.slug}`} key={q.slug} className="group">
                                <div className="block p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                                    <h4 className="font-semibold text-card-foreground group-hover:text-primary">{q.title}</h4>
                                    <p className="text-sm text-muted-foreground mt-1">From: {q.company}</p>
                                    <div className="flex items-center justify-end text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                        View Question <ArrowRight className="h-4 w-4 ml-1" />
                                    </div>
                                </div>
                             </Link>
                        ))}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
