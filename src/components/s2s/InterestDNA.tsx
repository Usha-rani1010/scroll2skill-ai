import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import type { InterestNode } from "@/lib/types";
import { Bar, Panel } from "./primitives";

export function InterestDNA({ profile }: { profile: InterestNode[] }) {
  const data = profile.slice(0, 6).map((p) => ({
    subject: p.interest,
    value: Math.round(p.score * 100),
  }));

  return (
    <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
      <Panel className="relative">
        <div className="h-[330px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data} outerRadius="72%">
              <PolarGrid stroke="var(--color-border)" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
              />
              <Radar
                dataKey="value"
                stroke="var(--brand-cyan)"
                fill="var(--brand-violet)"
                fillOpacity={0.35}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-center text-sm font-medium text-primary">
          Your interests are connected, not isolated.
        </p>
      </Panel>
      <Panel className="space-y-4">
        {profile.slice(0, 6).map((p, i) => (
          <div key={p.interest} className="space-y-1.5">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-sm font-semibold">
                {i === 0 ? "🧬 " : ""}
                {p.interest}
              </span>
              <span className="text-sm text-primary">{Math.round(p.score * 100)}%</span>
            </div>
            <Bar value={p.score} tone={i % 2 ? "violet" : "cyan"} />
            {p.evidence.length > 0 && (
              <p className="text-[11px] leading-relaxed text-muted-foreground">
                Evidence: {p.evidence.join(" · ")}
              </p>
            )}
          </div>
        ))}
      </Panel>
    </div>
  );
}
