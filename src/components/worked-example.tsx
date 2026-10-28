import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buildTrace, splitDefaultInput, type TraceStep } from "@/lib/trace-generators";

const MAX_ROWS = 40;

// Keys that mark a step where something meaningful happens (a decision, an action or a result),
// as opposed to bookkeeping steps that only re-print loop variables.
const EVENT_KEYS = ['comparison', 'condition', 'action', 'status', 'return value'];

type WorkedExampleProps = {
    categoryKey: string;
    algorithmKey: string;
    algorithmName: string;
    defaultInput: string;
};

function isNumberArray(data: unknown): data is number[] {
    return Array.isArray(data) && data.every((v) => typeof v === 'number');
}

function formatValue(value: unknown): string {
    if (value === null || value === undefined) return 'null';
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
}

function describeStep(step: TraceStep, showsArray: boolean): string {
    return Object.entries(step.variables)
        // The array column already shows the array, so skip the duplicate variable.
        .filter(([key]) => !(showsArray && key === 'arr'))
        .map(([key, value]) => `${key} = ${formatValue(value)}`)
        .join(', ');
}

function selectRows(trace: TraceStep[]): { step: TraceStep; index: number }[] {
    const rows: { step: TraceStep; index: number }[] = [];
    let previousData = '';
    trace.forEach((step, index) => {
        const data = JSON.stringify(step.data);
        const isEvent = EVENT_KEYS.some((key) => key in step.variables) || Object.keys(step.variables).some((key) => key.startsWith('final'));
        const dataChanged = index > 0 && data !== previousData;
        if (index === 0 || isEvent || dataChanged) rows.push({ step, index });
        previousData = data;
    });
    return rows;
}

export function WorkedExample({ categoryKey, algorithmKey, algorithmName, defaultInput }: WorkedExampleProps) {
    const { inputStr, targetStr } = splitDefaultInput(categoryKey, algorithmKey, defaultInput);

    let trace: TraceStep[] | null = null;
    try {
        trace = buildTrace(categoryKey, algorithmKey, inputStr, targetStr, 'grape');
    } catch {
        trace = null;
    }
    if (!trace || trace.length === 0) return null;

    const showsArray = trace.some((step) => isNumberArray(step.data) && step.data.length > 0);
    const rows = selectRows(trace);
    const visibleRows = rows.slice(0, MAX_ROWS);
    const lastStep = trace[trace.length - 1];
    const isJsonInput = inputStr.trim().startsWith('{');

    return (
        <Card className="w-full bg-card/50">
            <CardHeader>
                <CardTitle>Worked Example: {algorithmName} Dry Run</CardTitle>
                <CardDescription>
                    Generated from the same trace that drives the visualizer above, using the default input.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">
                    A dry run is the best way to check your understanding of {algorithmName}: follow each row, predict
                    the next one, and compare. The run below takes <strong>{trace.length} steps</strong> in total.
                    {rows.length < trace.length && ' Steps that only re-print loop counters are left out so the decisions stand out.'}
                    {' '}The <em>Line</em> column refers to the line numbers in the code listing above.
                </p>
                <dl className="grid gap-2 sm:grid-cols-[auto_1fr] sm:gap-x-4 text-sm">
                    <dt className="font-semibold text-card-foreground">Input</dt>
                    <dd className="font-code break-all">{isJsonInput ? 'Binary tree (see the input box above)' : inputStr}</dd>
                    {targetStr && (
                        <>
                            <dt className="font-semibold text-card-foreground">Target</dt>
                            <dd className="font-code">{targetStr}</dd>
                        </>
                    )}
                    {categoryKey === 'data-structures' && algorithmKey === 'hashing' && (
                        <>
                            <dt className="font-semibold text-card-foreground">Lookup key</dt>
                            <dd className="font-code">grape</dd>
                        </>
                    )}
                    <dt className="font-semibold text-card-foreground">Result</dt>
                    <dd className="font-code break-all">{describeStep(lastStep, false)}</dd>
                </dl>
                <div className="overflow-x-auto rounded-md border border-border">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/50 text-left text-card-foreground">
                            <tr>
                                <th className="px-3 py-2 font-semibold">Step</th>
                                <th className="px-3 py-2 font-semibold">Line</th>
                                {showsArray && <th className="px-3 py-2 font-semibold">Array</th>}
                                <th className="px-3 py-2 font-semibold">What happens</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleRows.map(({ step, index }) => (
                                <tr key={index} className="border-t border-border align-top">
                                    <td className="px-3 py-2 tabular-nums">{index + 1}</td>
                                    <td className="px-3 py-2 tabular-nums">{step.line}</td>
                                    {showsArray && (
                                        <td className="px-3 py-2 font-code whitespace-nowrap">
                                            {isNumberArray(step.data) ? `[${step.data.join(', ')}]` : ''}
                                        </td>
                                    )}
                                    <td className="px-3 py-2 font-code break-words">{describeStep(step, showsArray)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {rows.length > visibleRows.length && (
                    <p className="text-sm">
                        The remaining {rows.length - visibleRows.length} key steps follow the same pattern. Press play in
                        the visualizer to watch every step through to the result.
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
