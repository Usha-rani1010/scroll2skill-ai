import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Panel, Pill } from "./primitives";

const DATA = [
  { stage: "Week 1", Gaming: 80, Programming: 30, AI: 20 },
  { stage: "Week 2", Gaming: 71, Programming: 44, AI: 26 },
  { stage: "Week 3", Gaming: 62, Programming: 58, AI: 33 },
  { stage: "Week 4", Gaming: 52, Programming: 71, AI: 41 },
  { stage: "Now", Gaming: 40, Programming: 85, AI: 52 },
];

export function Evolution() {
  return (
    <Panel>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={DATA} margin={{ top: 10, right: 12, left: -18, bottom: 0 }}>
            <CartesianGrid stroke="var(--color-border)" vertical={false} />
            <XAxis
              dataKey="stage"
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickLine={false}
            />
            <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: "var(--color-popover)",
                border: "1px solid var(--color-border)",
                borderRadius: 12,
                color: "var(--color-foreground)",
              }}
            />
            <Line
              type="monotone"
              dataKey="Gaming"
              stroke="var(--brand-violet)"
              strokeWidth={2.5}
              dot={false}
              animationDuration={1200}
            />
            <Line
              type="monotone"
              dataKey="Programming"
              stroke="var(--brand-cyan)"
              strokeWidth={2.5}
              dot={false}
              animationDuration={1400}
            />
            <Line
              type="monotone"
              dataKey="AI"
              stroke="var(--brand-lime)"
              strokeWidth={2.5}
              dot={false}
              animationDuration={1600}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Pill>Beginning: Gaming 80% · Programming 30% · AI 20%</Pill>
        <Pill>Later: Gaming 40% · Programming 85% · AI 52%</Pill>
        <Pill tone="good">Emerging: Software Engineering</Pill>
      </div>
    </Panel>
  );
}
