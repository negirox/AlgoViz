import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { AlgorithmGuide as Guide } from "@/lib/guides";
import { CONTENT_LAST_UPDATED, formatDate } from "@/lib/site";

// Renders `backticked` fragments as inline code.
function RichText({ text }: { text: string }) {
    return (
        <>
            {text.split('`').map((part, i) =>
                i % 2 === 1
                    ? <code key={i} className="font-code text-[0.9em] rounded bg-muted px-1 py-0.5 text-card-foreground">{part}</code>
                    : <span key={i}>{part}</span>
            )}
        </>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="space-y-3">
            <h3 className="text-lg font-semibold text-card-foreground">{title}</h3>
            {children}
        </section>
    );
}

type AlgorithmGuideProps = {
    algorithmName: string;
    guide: Guide;
};

export function AlgorithmGuide({ algorithmName, guide }: AlgorithmGuideProps) {
    return (
        <Card className="w-full bg-card/50">
            <CardHeader>
                <CardTitle>{algorithmName}: How It Works</CardTitle>
                <CardDescription>
                    Last updated {formatDate(CONTENT_LAST_UPDATED)}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 text-muted-foreground leading-relaxed">
                <Section title="Overview">
                    {guide.overview.map((paragraph, i) => <p key={i}><RichText text={paragraph} /></p>)}
                </Section>

                <Section title="Step by step">
                    <ol className="list-decimal pl-6 space-y-2">
                        {guide.steps.map((step, i) => <li key={i}><RichText text={step} /></li>)}
                    </ol>
                </Section>

                <Section title="Complexity">
                    <div className="overflow-x-auto rounded-md border border-border">
                        <table className="w-full text-sm">
                            <thead className="bg-muted/50 text-left text-card-foreground">
                                <tr>
                                    <th className="px-3 py-2 font-semibold">Case</th>
                                    <th className="px-3 py-2 font-semibold">Cost</th>
                                    <th className="px-3 py-2 font-semibold">Why</th>
                                </tr>
                            </thead>
                            <tbody>
                                {guide.complexity.map((row) => (
                                    <tr key={row.label} className="border-t border-border align-top">
                                        <td className="px-3 py-2 whitespace-nowrap">{row.label}</td>
                                        <td className="px-3 py-2 font-code whitespace-nowrap text-card-foreground">{row.value}</td>
                                        <td className="px-3 py-2"><RichText text={row.why} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Section>

                <div className="grid gap-8 md:grid-cols-2">
                    <Section title="When to use it">
                        <ul className="list-disc pl-6 space-y-2">
                            {guide.whenToUse.map((item, i) => <li key={i}><RichText text={item} /></li>)}
                        </ul>
                    </Section>
                    <Section title="Common mistakes">
                        <ul className="list-disc pl-6 space-y-2">
                            {guide.pitfalls.map((item, i) => <li key={i}><RichText text={item} /></li>)}
                        </ul>
                    </Section>
                </div>
            </CardContent>
        </Card>
    );
}
