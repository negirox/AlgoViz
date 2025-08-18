
import { AlgorithmShowcase } from '@/components/algorithm-showcase';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/footer';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Github } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CheckCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4 md:px-6">
          <h1 className="text-xl font-bold font-headline text-primary">AlgoViz</h1>
          <div className="flex items-center gap-4">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="link" className="text-sm font-medium text-muted-foreground">About Us</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>About Us – AlgoViz</DialogTitle>
                        <div className="text-sm text-muted-foreground">
                            <div className="space-y-4 mt-4 text-left max-h-[400px] overflow-y-auto pr-4">
                                <p>
                                    AlgoViz is an interactive algorithm visualization tool designed to help students, developers, and computer science enthusiasts learn algorithms step by step.
                                </p>
                                <p>
                                    Our platform makes complex sorting algorithms and data structures simple through engaging animations and visual explanations. Instead of just reading theory, you can see how algorithms work in real time, making it easier to understand and remember.
                                </p>
                                <h3 className="font-bold">Why AlgoViz?</h3>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li><strong>🚀 Learn Faster:</strong> Visualize algorithms like Bubble Sort, Merge Sort, Quick Sort, and more.</li>
                                    <li><strong>🎯 Interview Prep:</strong> Master algorithm concepts for coding interviews and competitive programming.</li>
                                    <li><strong>📚 Study Smarter:</strong> Perfect for computer science students preparing for exams.</li>
                                    <li><strong>🧑‍💻 Hands-On Learning:</strong> Interactive experience designed for all skill levels.</li>
                                </ul>
                                <p>
                                    Whether you’re preparing for FAANG interviews, studying in college, or just curious about how computers solve problems, AlgoViz bridges the gap between theory and practice.
                                </p>
                                <h3 className="font-bold">Explore More Projects</h3>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li><a href="https://mytoolhub.vercel.app" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mytoolhub.vercel.app</a></li>
                                    <li><a href="https://neon-ime.vercel.app" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">neon-ime.vercel.app</a></li>
                                    <li><a href="https://atmosphere-iq.vercel.app" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">atmosphere-iq.vercel.app</a></li>
                                </ul>
                                <h3 className="font-bold">Our Mission</h3>
                                <p>
                                    To democratize algorithm learning by providing a free, accessible, and interactive way to explore computer science concepts. AlgoViz is built for learners who want to master algorithms visually and strengthen their problem-solving skills.
                                </p>
                                <h3 className="font-bold">Connect with Us</h3>
                                <ul className="list-disc pl-5 space-y-2">
                                  <li><strong>📧 Email:</strong> mukeshsingh.negi07@gmail.com</li>
                                  <li><strong>💻 GitHub:</strong> <a href="https://github.com/negirox" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">github.com/negirox</a></li>
                                  <li><strong>🧑‍💻 Stack Overflow:</strong> Negi-Rox</li>
                                  <li><strong>📦 NuGet Package:</strong> XLExtension</li>
                                </ul>
                            </div>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="link" className="text-sm font-medium text-muted-foreground">Privacy Policy</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Privacy Policy</DialogTitle>
                        <div className="text-sm text-muted-foreground">
                            <div className="space-y-4 mt-4 text-left text-sm max-h-[400px] overflow-y-auto pr-4">
                                <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
                                <p>
                                    AlgoViz ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we handle information when you use our website.
                                </p>
                                <h3 className="font-bold">Information We Don't Collect</h3>
                                <p>
                                    We do not collect any personally identifiable information (PII) from our users. The application runs entirely on the client-side (in your browser).
                                </p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>We do not use cookies for tracking.</li>
                                    <li>We do not require you to create an account.</li>
                                    <li>The algorithms you visualize and the inputs you provide are processed locally in your browser and are never sent to our servers.</li>
                                </ul>
                                <h3 className="font-bold">Data You Provide</h3>
                                <p>
                                    Any data you enter into the input fields for visualization purposes is processed locally and is not stored, transmitted, or shared.
                                </p>
                                <h3 className="font-bold">Changes to This Policy</h3>
                                <p>
                                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                                </p>
                                <h3 className="font-bold">Contact Us</h3>
                                <p>
                                    If you have any questions about this Privacy Policy, please contact us through our GitHub page.
                                </p>
                            </div>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" asChild>
                    <a href="https://github.com/negirox/AlgoViz" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View on GitHub</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-20 lg:py-24 bg-background/50">
            <div className="container px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                    <div className="space-y-4">
                        <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                            Interactive Learning
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Understand Algorithms, Don't Just Memorize Them
                        </h2>
                        <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            AlgoViz brings complex computer science algorithms to life. Move beyond static code and see exactly how data is sorted, searched, and structured with step-by-step, interactive visualizations.
                        </p>
                         <p className="max-w-[600px] text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                            AlgoViz is an interactive web-based tool designed to help students, developers, and computer science enthusiasts learn and understand a wide variety of algorithms through step-by-step visualization. The platform provides a hands-on experience, bridging the gap between abstract theory and practical implementation.
                        </p>
                        <ul className="grid gap-2 text-md text-muted-foreground">
                            <li className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-primary" />
                                <span>Visualize sorting, searching, trees, and more.</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-primary" />
                                <span>Control the execution speed with playback controls.</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-primary" />
                                <span>Inspect variables at every step to deepen understanding.</span>
                            </li>
                        </ul>
                    </div>
                    <img
                      data-ai-hint="abstract algorithm"
                      src="https://placehold.co/600x400.png"
                      width="600"
                      height="400"
                      alt="Algorithm Visualization"
                      className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                    />
                </div>
            </div>
        </section>
        <AlgorithmShowcase />
      </main>
      <Footer />
    </div>
  );
}

    