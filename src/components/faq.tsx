
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlgorithmCategoryKey, AlgorithmKey } from "@/lib/algo-templates";
import { FAQ_DATA } from "@/lib/faq-data.tsx";

type FaqProps = {
    category: AlgorithmCategoryKey;
    algorithm: AlgorithmKey<any>;
};

export function Faq({ category, algorithm }: FaqProps) {
    const faqCategory = FAQ_DATA[category];
    if (!faqCategory) return null;

    const faqContent = faqCategory.algorithms[algorithm as keyof typeof faqCategory.algorithms];

    if (!faqContent) {
        return null;
    }

    return (
        <Card className="bg-card/50">
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
    );
}

    