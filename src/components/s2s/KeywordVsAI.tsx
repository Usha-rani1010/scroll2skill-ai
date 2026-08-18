import { ArrowDown, X, Check } from "lucide-react";
import { Panel } from "./primitives";

const SIGNALS = ["Java", "Coding Interview", "Developer Lifestyle", "Laptop"];

export function KeywordVsAI() {
  return (
    <Panel className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
      <h3 className="text-center text-2xl font-extrabold tracking-tight sm:text-3xl">
        <span className="text-gradient">NOT KEYWORD MATCHING.</span>
      </h3>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        {SIGNALS.map((s, i) => (
          <span key={s} className="flex items-center gap-2">
            <span className="rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm">
              {s}
            </span>
            {i < SIGNALS.length - 1 && <span className="text-muted-foreground">+</span>}
          </span>
        ))}
      </div>

      <Step label="AI understands the context" />
      <div className="mx-auto max-w-xl rounded-xl border border-primary/40 bg-primary/10 px-4 py-3 text-center text-lg font-bold text-primary">
        Software Engineering
      </div>
      <Step label="Useful technology recommendation" />
      <div className="mx-auto max-w-xl rounded-xl border border-lime/40 bg-lime/10 px-4 py-3 text-center text-base font-semibold text-lime">
        “Hash Maps Explained in 60 Seconds”
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-destructive/35 bg-destructive/5 p-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-destructive">
            <X className="h-4 w-4" /> Keyword Matching
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Sees the word “Java” → recommends another Java meme. Narrow, repetitive, no
            new value.
          </p>
        </div>
        <div className="rounded-xl border border-lime/35 bg-lime/5 p-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-lime">
            <Check className="h-4 w-4" /> Scroll2Skill
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Reads the relationships between four Reels → infers Software Engineering /
            Technology → recommends the concept that actually moves you forward.
          </p>
        </div>
      </div>
    </Panel>
  );
}

function Step({ label }: { label: string }) {
  return (
    <div className="my-4 flex flex-col items-center gap-1">
      <ArrowDown className="h-5 w-5 text-primary" />
      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      <ArrowDown className="h-5 w-5 text-primary" />
    </div>
  );
}
