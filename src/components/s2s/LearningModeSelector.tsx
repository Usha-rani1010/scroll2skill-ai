import type { LearningMode } from "@/lib/types";
import { cn } from "@/lib/utils";

export const MODES: { id: LearningMode; label: string }[] = [
  { id: "interesting", label: "🔥 Just Interesting" },
  { id: "learn", label: "🧠 Learn Something" },
  { id: "career", label: "💼 Career Focused" },
  { id: "coding", label: "💻 Coding Focused" },
  { id: "ai", label: "🤖 AI Focused" },
  { id: "surprise", label: "🎲 Surprise Me" },
];

export function LearningModeSelector({
  value,
  onChange,
}: {
  value: LearningMode;
  onChange: (m: LearningMode) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {MODES.map((m) => (
        <button
          key={m.id}
          onClick={() => onChange(m.id)}
          className={cn(
            "rounded-xl border px-4 py-2.5 text-sm font-medium transition-all",
            value === m.id
              ? "border-primary/60 bg-primary/12 text-primary"
              : "border-border bg-secondary/40 text-muted-foreground hover:text-foreground",
          )}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}
