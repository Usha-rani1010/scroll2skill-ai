import { Heart, Bookmark, Repeat2 } from "lucide-react";
import type { Reel } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Bar } from "./primitives";

export function ReelCard({ reel, compact }: { reel: Reel; compact?: boolean }) {
  return (
    <article className="glass overflow-hidden transition-transform duration-300 hover:-translate-y-1">
      <div
        className={cn(
          "relative flex items-center justify-center bg-gradient-to-br",
          reel.gradient,
          compact ? "h-24" : "h-32",
        )}
      >
        <span className="text-4xl">{reel.icon}</span>
        <span className="absolute right-3 top-3 rounded-full bg-background/70 px-2 py-0.5 text-[10px] uppercase tracking-wider text-foreground">
          {reel.category}
        </span>
      </div>
      <div className="space-y-3 p-4">
        <h3 className="text-sm font-semibold leading-snug">{reel.title}</h3>
        {!compact && (
          <p className="text-xs leading-relaxed text-muted-foreground">
            {reel.description}
          </p>
        )}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] text-muted-foreground">
            <span>Watch ratio</span>
            <span className="text-foreground">{reel.watchRatio}%</span>
          </div>
          <Bar value={reel.watchRatio / 100} />
          <div className="flex justify-between text-[11px] text-muted-foreground">
            <span>Engagement</span>
            <span className="text-foreground">{reel.engagement}%</span>
          </div>
          <Bar value={reel.engagement / 100} tone="violet" />
        </div>
        <div className="flex gap-3 pt-1 text-[11px]">
          <span
            className={cn(
              "inline-flex items-center gap-1",
              reel.liked ? "text-lime" : "text-muted-foreground/50",
            )}
          >
            <Heart className="h-3.5 w-3.5" /> Liked
          </span>
          <span
            className={cn(
              "inline-flex items-center gap-1",
              reel.saved ? "text-primary" : "text-muted-foreground/50",
            )}
          >
            <Bookmark className="h-3.5 w-3.5" /> Saved
          </span>
          <span
            className={cn(
              "inline-flex items-center gap-1",
              reel.replayed ? "text-accent" : "text-muted-foreground/50",
            )}
          >
            <Repeat2 className="h-3.5 w-3.5" /> Replay
          </span>
        </div>
      </div>
    </article>
  );
}
