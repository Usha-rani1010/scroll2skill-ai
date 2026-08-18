import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-24 rise", className)}>
      <header className="mb-5">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            {eyebrow}
          </p>
        )}
        <h2 className="mt-1 text-2xl font-bold sm:text-3xl">{title}</h2>
        {subtitle && (
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">{subtitle}</p>
        )}
      </header>
      {children}
    </section>
  );
}

export function Panel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("glass p-5 sm:p-6", className)}>{children}</div>;
}

export function Bar({ value, tone = "cyan" }: { value: number; tone?: string }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
      <div
        className={cn(
          "h-full rounded-full transition-[width] duration-700",
          tone === "violet"
            ? "bg-accent"
            : tone === "amber"
              ? "bg-amber"
              : tone === "lime"
                ? "bg-lime"
                : "bg-primary",
        )}
        style={{ width: `${Math.round(value * 100)}%` }}
      />
    </div>
  );
}

export function Metric({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <Panel className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-brand opacity-70" />
      <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-2 text-3xl font-bold text-gradient sm:text-4xl">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </Panel>
  );
}

export function Pill({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "good" | "bad" | "warn";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
        tone === "good" && "border-lime/40 bg-lime/10 text-lime",
        tone === "bad" && "border-destructive/40 bg-destructive/10 text-destructive",
        tone === "warn" && "border-amber/40 bg-amber/10 text-amber",
        tone === "default" && "border-border bg-secondary/60 text-muted-foreground",
      )}
    >
      {children}
    </span>
  );
}

export function Disclaimer({ children }: { children: ReactNode }) {
  return <p className="mt-3 text-xs italic text-muted-foreground">{children}</p>;
}
