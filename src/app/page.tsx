
import { AlgorithmShowcase } from '@/components/algorithm-showcase';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/footer';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Github, BookCopy, BookOpenCheck } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4 md:px-6">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <h1 className="text-xl font-bold font-headline text-primary">AlgoViz</h1>
          </Link>
          <nav className="flex flex-wrap items-center justify-end gap-x-1 gap-y-1 sm:gap-x-4">
             <Link href="/interview-questions" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                Interview Questions
              </Link>
            <Link href="/complexity-cheat-sheet" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                Big-O Cheat Sheet
            </Link>
            <Link href="/about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                About
            </Link>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="link" className="text-sm font-medium text-muted-foreground">Resources</Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Popular Coding Websites & Learning Resources</DialogTitle>
                        <div className="text-sm text-muted-foreground">
                            <div className="space-y-4 mt-4 text-left text-sm max-h-[60vh] overflow-y-auto pr-4">
                                <ul className="list-disc pl-5 space-y-3">
                                    <li>
                                        <a href="https://www.codecademy.com/" target="_blank" rel="noopener noreferrer" className="font-bold text-primary hover:underline">Codecademy:</a> Offers interactive, hands-on lessons for various programming languages and web development technologies.
                                    </li>
                                    <li>
                                        <a href="https://www.freecodecamp.org/" target="_blank" rel="noopener noreferrer" className="font-bold text-primary hover:underline">freeCodeCamp:</a> Provides a comprehensive curriculum focused on web development, including projects and certifications.
                                    </li>
                                     <li>
                                        <a href="https://www.w3schools.com/" target="_blank" rel="noopener noreferrer" className="font-bold text-primary hover:underline">W3Schools:</a> A widely used reference site for web technologies like HTML, CSS, JavaScript, and SQL, with tutorials and examples.
                                    </li>
                                    <li>
                                        <a href="https://www.geeksforgeeks.org/" target="_blank" rel="noopener noreferrer" className="font-bold text-primary hover:underline">GeeksforGeeks:</a> A comprehensive platform with tutorials, articles, coding challenges, and interview preparation resources for various programming concepts and data structures.
                                    </li>
                                    <li>
                                        <a href="https://www.hackerrank.com/" target="_blank" rel="noopener noreferrer" className="font-bold text-primary hover:underline">HackerRank:</a> Focuses on coding challenges and competitions, allowing users to practice and improve their algorithmic problem-solving skills.
                                    </li>
                                    <li>
                                        <a href="https://leetcode.com/" target="_blank" rel="noopener noreferrer" className="font-bold text-primary hover:underline">LeetCode:</a> Specializes in coding interview preparation, offering a vast collection of algorithm and data structure problems commonly asked in technical interviews.
                                    </li>
                                    <li>
                                        <a href="https://www.codewars.com/" target="_blank" rel="noopener noreferrer" className="font-bold text-primary hover:underline">Codewars:</a> A gamified platform where users solve coding "katas" (challenges) in various programming languages, earning ranks and improving their skills.
                                    </li>
                                    <li>
                                        <a href="https://www.coursera.org/" target="_blank" rel="noopener noreferrer" className="font-bold text-primary hover:underline">Coursera</a> / <a href="https://www.udemy.com/" target="_blank" rel="noopener noreferrer" className="font-bold text-primary hover:underline">Udemy</a> / <a href="https://www.edx.org/" target="_blank" rel="noopener noreferrer" className="font-bold text-primary hover:underline">edX:</a> Offer a wide array of online courses, including many on programming and computer science, often from universities and industry experts.
                                    </li>
                                    <li>
                                        <a href="https://www.theodinproject.com/" target="_blank" rel="noopener noreferrer" className="font-bold text-primary hover:underline">The Odin Project:</a> A free, open-source curriculum for learning web development from scratch, emphasizing practical projects.
                                    </li>
                                    <li>
                                        <a href="https://www.khanacademy.org/computing/computer-programming" target="_blank" rel="noopener noreferrer" className="font-bold text-primary hover:underline">Khan Academy:</a> Provides free educational content, including introductory courses on computer programming and related topics.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <Link href="/privacy-policy" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                Privacy
            </Link>
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
          </nav>
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
                                <BookOpenCheck className="h-5 w-5 text-primary" />
                                <span>Practice with real interview questions from top companies.</span>
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
                      src="https://images.unsplash.com/photo-1544256718-3bcf237f3974?q=80&w=2071&auto=format&fit=crop"
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

    