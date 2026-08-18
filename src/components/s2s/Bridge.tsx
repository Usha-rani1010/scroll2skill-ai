import { useState } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Panel } from "./primitives";

const NOTES: Record<string, string> = {
  Java: "Where your curiosity started — a language, not the whole picture.",
  Programming: "The general skill underneath the memes: writing and debugging code.",
  DSA: "Data structures and algorithms — the shared language of interviews.",
  "Backend Development": "Turning code into services that other people can call.",
  "Backend": "Turning code into services that other people can call.",
  "System Design": "How large-scale applications are actually structured.",
  Cloud: "Where those systems run, scale and sometimes fall over.",
  Gaming: "The entertainment signal already in your scroll.",
  "Game Development": "The build side of the thing you enjoy watching.",
  "Computer Graphics": "Rendering — the most visual entry point to serious programming.",
  "AI in Games": "Behaviour trees, pathfinding and decision systems.",
  "Machine Learning": "Systems that learn patterns instead of being told rules.",
  Hardware: "The machine your code runs on.",
  "CPU Architecture": "Fetch, decode, execute — why chips are fast.",
  "Operating Systems": "The layer deciding who gets the CPU next.",
  Laptop: "A purchase decision that hides a whole computing stack.",
  "Generative AI": "Models that produce text, code and images.",
  Transformers: "The architecture behind modern language models.",
  MLOps: "Shipping and monitoring models in production.",
  Passwords: "Credentials — the most attacked surface there is.",
  Cybersecurity: "How systems break, and how they are defended.",
  Networking: "How data moves between machines.",
  "Web Security": "Attacks and defences on real applications.",
};

export function Bridge({ steps }: { steps: string[] }) {
  const [active, setActive] = useState(steps[0] ?? "");

  return (
    <Panel>
      <div className="flex flex-col items-stretch gap-2 md:flex-row md:items-center md:justify-between">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center gap-2 md:flex-1 md:flex-col">
            <button
              onClick={() => setActive(step)}
              className={cn(
                "w-full rounded-xl border px-3 py-3 text-center text-sm font-medium transition-all duration-300",
                active === step
                  ? "border-primary/60 bg-primary/12 text-primary glow"
                  : "border-border bg-secondary/40 text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
            >
              {step}
            </button>
            {i < steps.length - 1 && (
              <>
                <ArrowRight className="hidden h-4 w-4 shrink-0 text-muted-foreground md:block md:rotate-0" />
                <ArrowDown className="h-4 w-4 shrink-0 text-muted-foreground md:hidden" />
              </>
            )}
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-xl border border-border bg-secondary/30 p-4">
        <p className="text-sm">
          <span className="font-semibold text-primary">{active}</span> —{" "}
          {NOTES[active] ??
            "A natural next step from the interests inferred in your scroll history."}
        </p>
      </div>
    </Panel>
  );
}
