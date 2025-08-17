
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlgorithmType } from "./algo-viz";
import { FAQ_DATA } from "@/lib/faq-data";

type FaqProps = {
    algorithm: AlgorithmType;
};

export function Faq({ algorithm }: FaqProps) {
    const faqContent = FAQ_DATA[algorithm];

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
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>
    );
}
