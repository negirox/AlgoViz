"use client";

import { Button } from "@/components/ui/button";
import { Play, Pause, StepForward, StepBack, RotateCcw } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type PlaybackControlsProps = {
  onPrev: () => void;
  onNext: () => void;
  onPlayPause: () => void;
  onReset: () => void;
  isPlaying: boolean;
  canStepPrev: boolean;
  canStepNext: boolean;
};

export function PlaybackControls({
  onPrev,
  onNext,
  onPlayPause,
  onReset,
  isPlaying,
  canStepPrev,
  canStepNext,
}: PlaybackControlsProps) {
  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex items-center justify-center gap-2 rounded-lg bg-card/80 p-4 border border-border/40 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={onReset} variant="outline" size="icon" aria-label="Reset Visualization">
              <RotateCcw className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Reset</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={onPrev} variant="outline" size="icon" disabled={!canStepPrev} aria-label="Previous Step">
              <StepBack className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Previous Step</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onPlayPause}
              variant="default"
              size="icon"
              className="bg-primary hover:bg-primary/90 w-12 h-12 rounded-full"
              aria-label={isPlaying ? "Pause Visualization" : "Play Visualization"}
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isPlaying ? "Pause" : "Play"}</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={onNext} variant="outline" size="icon" disabled={!canStepNext} aria-label="Next Step">
              <StepForward className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Next Step</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
