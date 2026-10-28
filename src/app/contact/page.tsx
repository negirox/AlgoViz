import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Bug, Github, Linkedin, Mail } from 'lucide-react';
import { absoluteUrl, CONTACT_EMAIL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact | AlgoViz',
  description: 'Get in touch with the creator of AlgoViz to report a mistake in an explanation, request an algorithm, or ask a question.',
  alternates: {
    canonical: absoluteUrl('/contact'),
  },
};

export default function ContactPage() {
  return (
      <div className="container max-w-3xl px-4 md:px-6 py-12 md:py-16 space-y-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" />
          Back to AlgoViz
        </Link>

        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight">Contact</h1>
          <p className="text-muted-foreground">
            AlgoViz is built and maintained by Mukesh Singh Negi. Feedback from learners is the main way
            the explanations and visualizations get better, so every message is read.
          </p>
        </div>

        <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">What to get in touch about</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-foreground">A mistake:</strong> a wrong complexity, a step in a dry run that does not match the code, or a broken visualization. Please include the page link and the input you used.</li>
              <li><strong className="text-foreground">A request:</strong> an algorithm, data structure or interview question you would like to see visualized next.</li>
              <li><strong className="text-foreground">A question:</strong> something in an explanation that did not make sense.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">How to reach me</h2>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>Email: <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">{CONTACT_EMAIL}</a></span>
              </li>
              <li className="flex items-center gap-2">
                <Bug className="h-4 w-4 text-primary" />
                <span>Bug reports and feature requests: <a href="https://github.com/negirox/AlgoViz/issues" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">open an issue on GitHub</a></span>
              </li>
              <li className="flex items-center gap-2">
                <Github className="h-4 w-4 text-primary" />
                <span>Source code: <a href="https://github.com/negirox/AlgoViz" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">github.com/negirox/AlgoViz</a></span>
              </li>
              <li className="flex items-center gap-2">
                <Linkedin className="h-4 w-4 text-primary" />
                <span>LinkedIn: <a href="https://www.linkedin.com/in/mukesh-singh-negi-98348294/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mukesh Singh Negi</a></span>
              </li>
            </ul>
          </section>

          <p>
            I usually reply within a few days. For questions about how data is handled on this site, see the{' '}
            <Link href="/privacy-policy" className="text-primary hover:underline">privacy policy</Link>.
          </p>
        </div>
      </div>
  );
}
