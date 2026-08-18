import { useEffect, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Analysis } from "@/lib/types";
import { InterestDNA } from "./InterestDNA";

export function PresentationMode({
  analysis,
  onClose,
}: {
  analysis: Analysis;
  onClose: () => void;
}) {
  const [i, setI] = useState(0);
  const rec = analysis.recommendation;
  const hype =
    analysis.hype_analysis.find((h) => h.status === "downranked") ??
    analysis.hype_analysis[0];

  const slides: ReactNode[] = [
    <Slide key="1" kicker="01 — The Problem" title="Students already spend significant time scrolling.">
      <p className="max-w-2xl text-lg text-muted-foreground">
        We don't try to stop the scroll. We make the next scroll more valuable.
      </p>
    </Slide>,
    <Slide key="2" kicker="02 — The Signals" title="Four Reels. One student.">
      <div className="grid w-full max-w-3xl grid-cols-2 gap-3 md:grid-cols-4">
        {["Java Meme ☕", "Coding Interview 🎤", "SWE Lifestyle 💻", "Laptop Comparison 🖥️"].map(
          (t) => (
            <div
              key={t}
              className="glass px-3 py-6 text-center text-sm font-medium"
            >
              {t}
            </div>
          ),
        )}
      </div>
    </Slide>,
    <Slide key="3" kicker="03 — The Differentiator" title="NOT keyword matching.">
      <div className="grid w-full max-w-3xl gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-destructive/40 bg-destructive/10 p-6 text-center">
          <p className="text-sm uppercase tracking-widest text-destructive">
            ❌ Keyword Matching
          </p>
          <p className="mt-3 text-3xl font-bold">Java</p>
        </div>
        <div className="rounded-2xl border border-lime/40 bg-lime/10 p-6 text-center">
          <p className="text-sm uppercase tracking-widest text-lime">✅ Scroll2Skill</p>
          <p className="mt-3 text-2xl font-bold">Software Engineering / Technology</p>
        </div>
      </div>
    </Slide>,
    <Slide key="4" kicker="04 — Interest DNA" title="Your interests are connected, not isolated.">
      <div className="w-full max-w-5xl">
        <InterestDNA profile={analysis.interest_profile} />
      </div>
    </Slide>,
    <Slide key="5" kicker="05 — Next Best Interest" title={analysis.next_best_interest.topic}>
      <p className="text-xl text-primary">
        Confidence {Math.round(analysis.next_best_interest.confidence * 100)}%
      </p>
      <p className="max-w-2xl text-lg text-muted-foreground">
        {analysis.next_best_interest.reason}
      </p>
    </Slide>,
    <Slide key="6" kicker="06 — Recommendation" title={rec.recommended_reel}>
      <p className="text-lg text-muted-foreground">
        {rec.category} · {rec.difficulty} · Confidence {rec.confidence}
      </p>
      <p className="max-w-2xl text-lg">{rec.why_recommendation}</p>
    </Slide>,
    <Slide key="7" kicker="07 — AI Hype Shield" title={hype?.title ?? "Hype filtered"}>
      <p className="text-3xl font-extrabold text-destructive">DOWNRANKED</p>
      <p className="max-w-2xl text-lg text-muted-foreground">{hype?.reason}</p>
    </Slide>,
    <Slide key="8" kicker="08 — Interest Bridge" title="Where could your curiosity take you?">
      <div className="flex flex-wrap items-center justify-center gap-3">
        {analysis.interest_bridge.map((s, idx) => (
          <span key={s} className="flex items-center gap-3">
            <span className="glass px-4 py-2 text-base font-medium">{s}</span>
            {idx < analysis.interest_bridge.length - 1 && (
              <span className="text-primary">→</span>
            )}
          </span>
        ))}
      </div>
    </Slide>,
    <Slide key="9" kicker="09 — Closing" title="">
      <p className="max-w-3xl text-center text-3xl font-extrabold leading-tight sm:text-5xl">
        WE DON'T STOP THE SCROLL.
        <br />
        <span className="text-gradient">WE MAKE THE NEXT SCROLL MORE VALUABLE.</span>
      </p>
    </Slide>,
  ];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setI((v) => Math.min(v + 1, slides.length - 1));
      if (e.key === "ArrowLeft") setI((v) => Math.max(v - 1, 0));
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, slides.length]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background/98 backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <p className="text-sm font-semibold">
          🎤 Presentation Mode —{" "}
          <span className="text-muted-foreground">
            slide {i + 1} / {slides.length}
          </span>
        </p>
        <button
          onClick={onClose}
          className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-secondary"
        >
          <X className="h-4 w-4" /> Exit
        </button>
      </div>

      <div key={i} className="flex flex-1 items-center justify-center overflow-y-auto px-6 py-8 rise">
        {slides[i]}
      </div>

      <div className="flex items-center justify-center gap-3 border-t border-border px-5 py-4">
        <button
          onClick={() => setI((v) => Math.max(v - 1, 0))}
          className="inline-flex items-center gap-1 rounded-lg border border-border px-4 py-2 text-sm hover:bg-secondary"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </button>
        <div className="flex gap-1.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={`h-2 w-2 rounded-full ${idx === i ? "bg-primary" : "bg-secondary"}`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
        <button
          onClick={() => setI((v) => Math.min(v + 1, slides.length - 1))}
          className="inline-flex items-center gap-1 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          Next <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function Slide({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex w-full flex-col items-center gap-5 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
        {kicker}
      </p>
      {title && (
        <h2 className="max-w-4xl text-3xl font-extrabold sm:text-5xl">{title}</h2>
      )}
      {children}
    </div>
  );
}
