import { Bar, Disclaimer, Panel } from "./primitives";

const LABELS: { key: string; label: string; tone: string }[] = [
  { key: "entertainment", label: "Entertainment", tone: "violet" },
  { key: "technology", label: "Technology", tone: "cyan" },
  { key: "career", label: "Career", tone: "amber" },
  { key: "learning", label: "Learning", tone: "lime" },
];

export function ScrollSkill({
  data,
}: {
  data: {
    entertainment: number;
    technology: number;
    career: number;
    learning: number;
    overall: number;
  };
}) {
  const record = data as unknown as Record<string, number>;
  return (
    <div className="grid gap-5 md:grid-cols-[1fr_280px]">
      <Panel className="space-y-4">
        {LABELS.map((l) => (
          <div key={l.key} className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{l.label}</span>
              <span className="font-semibold">{record[l.key]}%</span>
            </div>
            <Bar value={(record[l.key] ?? 0) / 100} tone={l.tone} />
          </div>
        ))}
        <Disclaimer>
          This is an experimental indicator based on content categories and engagement
          signals, not a scientific measurement.
        </Disclaimer>
      </Panel>
      <Panel className="flex flex-col items-center justify-center text-center">
        <div
          className="relative grid h-40 w-40 place-items-center rounded-full"
          style={{
            background: `conic-gradient(var(--brand-cyan) ${data.overall * 3.6}deg, color-mix(in oklab, var(--secondary) 90%, transparent) 0deg)`,
          }}
        >
          <div className="grid h-32 w-32 place-items-center rounded-full bg-card">
            <div>
              <p className="text-3xl font-bold text-gradient">{data.overall}</p>
              <p className="text-xs text-muted-foreground">/ 100</p>
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm font-semibold">Prototype Learning Potential</p>
      </Panel>
    </div>
  );
}
