import { AlgoViz } from '@/components/algo-viz';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/footer';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Github } from 'lucide-react';

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
                        <DialogTitle>About AlgoViz</DialogTitle>
                        <DialogDescription>
                            <div className="space-y-4 mt-4 text-left">
                                <p>
                                    AlgoViz is an interactive educational tool designed to help students, developers, and computer science enthusiasts visualize and understand a wide range of sorting algorithms. Our mission is to make complex algorithms simple and intuitive through step-by-step animations.
                                </p>
                                <p>
                                    Whether you're preparing for a technical interview, studying for an exam, or just curious about how algorithms work, AlgoViz provides a hands-on experience to solidify your knowledge.
                                </p>
                            </div>
                        </DialogDescription>
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
                        <DialogDescription>
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
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com/negirox" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <AlgoViz />
      </main>
      <Footer />
    </div>
  );
}
