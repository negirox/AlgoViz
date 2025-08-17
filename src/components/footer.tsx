
"use client";

import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex flex-col items-center justify-between gap-4 py-5 md:h-20 md:flex-row md:py-0">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        Copyright &copy; {currentYear} AlgoViz. Built by{' '}
                        <a href="https://github.com/negirox" target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-4">
                            Mukesh Singh Negi
                        </a>
                        .
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                        <a href="https://github.com/negirox/AlgoViz" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                            <Github className="h-5 w-5" />
                        </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                        <a href="https://www.linkedin.com/in/mukesh-singh-negi-98348294/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                            <Linkedin className="h-5 w-5" />
                        </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                        <a href="mailto:mukeshsingh.negi07@gmail.com" aria-label="Email">
                            <Mail className="h-5 w-5" />
                        </a>
                    </Button>
                </div>
            </div>
        </footer>
    );
}
