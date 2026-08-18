import { ShieldCheck, ShieldAlert } from "lucide-react";
import type { HypeVerdict } from "@/lib/types";
import { Panel, Pill } from "./primitives";

export function HypeShield({ verdicts }: { verdicts: HypeVerdict[] }) {
  const items =
    verdicts.length > 0
      ? verdicts
      : [
          {
            title: "10 AI Tools That Will Get You a Job",
            status: "downranked",
            reason: "Unsupported career promise, high hype, low evidence.",
          },
        ];

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {items.map((v) => {
        const bad = v.status === "downranked";
        return (
          <Panel
            key={v.title}
            className={
              bad ? "border-destructive/35 bg-destructive/5" : "border-lime/30 bg-lime/5"
            }
          >
            <div className="flex items-start gap-3">
              {bad ? (
                <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
              ) : (
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-lime" />
              )}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold">{v.title}</h3>
                <Pill tone={bad ? "bad" : "good"}>
                  {bad ? "DOWNRANKED" : "RECOMMENDED"}
                </Pill>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {v.reason}
                </p>
                {bad && (
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• Unsupported career promise</li>
                    <li>• High hype</li>
                    <li>• Low evidence</li>
                    <li>• Promotional framing</li>
                  </ul>
                )}
              </div>
            </div>
          </Panel>
        );
      })}
    </div>
  );
}
