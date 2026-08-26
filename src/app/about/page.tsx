import type { Metadata } from 'next';
import Link from 'next/link';
import { Github, Mail, ArrowLeft } from 'lucide-react';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'About | AlgoViz',
  description: 'Learn about AlgoViz, a free interactive algorithm visualization tool built to help students and developers understand sorting, searching, trees, and data structures.',
  alternates: {
    canonical: 'https://algo-viz-nu.vercel.app/about',
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans text-foreground">
      <div className="container max-w-3xl px-4 md:px-6 py-12 md:py-16 space-y-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" />
          Back to AlgoViz
        </Link>

        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight">About AlgoViz</h1>
          <p className="text-muted-foreground">
            AlgoViz is an interactive algorithm visualization tool designed to help students,
            developers, and computer science enthusiasts learn algorithms step by step.
          </p>
        </div>

        <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
          <p>
            Our platform makes complex sorting algorithms and data structures simple through
            engaging animations and visual explanations. Instead of just reading theory, you can
            see how algorithms work in real time, making it easier to understand and remember.
          </p>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">Why AlgoViz?</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-foreground">🚀 Learn Faster:</strong> Visualize algorithms like Bubble Sort, Merge Sort, Quick Sort, and more.</li>
              <li><strong className="text-foreground">🎯 Interview Prep:</strong> Master algorithm concepts for coding interviews and competitive programming.</li>
              <li><strong className="text-foreground">📚 Study Smarter:</strong> Perfect for computer science students preparing for exams.</li>
              <li><strong className="text-foreground">🧑‍💻 Hands-On Learning:</strong> Interactive experience designed for all skill levels.</li>
            </ul>
          </section>

          <p>
            Whether you're preparing for FAANG interviews, studying in college, or just curious
            about how computers solve problems, AlgoViz bridges the gap between theory and
            practice.
          </p>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">Our Mission</h2>
            <p>
              To democratize algorithm learning by providing a free, accessible, and interactive
              way to explore computer science concepts. AlgoViz is built for learners who want to
              master algorithms visually and strengthen their problem-solving skills.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">Explore More Projects</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><a href="https://mytoolhub.vercel.app" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mytoolhub.vercel.app</a></li>
              <li><a href="https://neon-ime.vercel.app" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">neon-ime.vercel.app</a></li>
              <li><a href="https://atmosphere-iq.vercel.app" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">atmosphere-iq.vercel.app</a></li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">Connect with Us</h2>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:mukeshsingh.negi07@gmail.com" className="hover:underline">mukeshsingh.negi07@gmail.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Github className="h-4 w-4 text-primary" />
                <a href="https://github.com/negirox" target="_blank" rel="noopener noreferrer" className="hover:underline">github.com/negirox</a>
              </li>
              <li><strong className="text-foreground">🧑‍💻 Stack Overflow:</strong> Negi-Rox</li>
              <li><strong className="text-foreground">📦 NuGet Package:</strong> XLExtension</li>
            </ul>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
