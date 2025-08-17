
"use client";

import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex flex-col items-center justify-between gap-4 py-5 md:h-20 md:flex-row md:py-0">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        Copyright &copy; {currentYear} AlgoViz. All Rights Reserved.
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <a href="https://github.com/negirox" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                            <Github className="h-5 w-5" />
                        </a>
                    </Button>
                </div>
            </div>
        </footer>
    );
}
