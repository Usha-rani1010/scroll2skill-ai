import { Sparkles } from "lucide-react";
import type { Recommendation } from "@/lib/types";
import { Panel, Pill } from "./primitives";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 border-t border-border py-3 sm:grid-cols-[200px_1fr] sm:gap-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
        {label}
      </p>
      <p className="text-sm leading-relaxed text-foreground">{value}</p>
    </div>
  );
}

export function RecommendationCard({ rec }: { rec: Recommendation }) {
  return (
    <Panel className="glow">
      <div className="flex items-center gap-2 pb-3">
        <Sparkles className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Smart Recommendation</h3>
        <div className="ml-auto flex gap-2">
          <Pill tone="warn">{rec.difficulty}</Pill>
          <Pill tone="good">Confidence: {rec.confidence}</Pill>
        </div>
      </div>
      <Row label="Current Reel" value={rec.current_reel} />
      <Row label="Interest Detected" value={rec.interest_detected} />
      <Row label="Why" value={rec.why} />
      <Row label="Recommended Tech Reel" value={rec.recommended_reel} />
      <Row label="Category" value={rec.category} />
      <Row label="Why This Recommendation" value={rec.why_recommendation} />
      <Row label="Difficulty" value={rec.difficulty} />
      <Row label="Confidence" value={rec.confidence} />
    </Panel>
  );
}
