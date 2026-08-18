import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Play, ShieldCheck, Sparkles, Brain } from "lucide-react";
import { KeywordVsAI } from "@/components/s2s/KeywordVsAI";
import { Panel, Pill } from "@/components/s2s/primitives";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Scroll2Skill — Turn your scrolling into your next skill" },
      {
        name: "description",
        content:
          "Scroll2Skill uses AI to infer what you're genuinely curious about from your short-form scroll history and recommends useful technology content.",
      },
      { property: "og:title", content: "Scroll2Skill — Turn your scrolling into your next skill" },
      {
        property: "og:description",
        content:
          "AI that understands what you're curious about — not just what you watched.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const FLOW = ["WATCH", "UNDERSTAND", "INFER", "CONNECT", "RECOMMEND", "DISCOVER"];

function Landing() {
  return (
    <main className="mx-auto max-w-6xl px-5 pb-24 pt-10 sm:pt-16">
      <nav className="mb-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-primary-foreground">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight">Scroll2Skill</span>
        </div>
        <Link
          to="/app"
          search={{ demo: false }}
          className="rounded-xl border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
        >
          Open Dashboard
        </Link>
      </nav>

      <section className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
        <div className="rise">
          <Pill tone="good">🟢 Gemini-powered · 🟡 Demo Mode fallback</Pill>
          <h1 className="mt-5 text-5xl font-extrabold leading-[1.05] sm:text-6xl">
            Your Scroll Has <span className="text-gradient">Potential.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Scroll2Skill uses AI to understand what you're genuinely curious about and
            turns your existing scrolling habits into useful technology discovery.
          </p>
          <p className="mt-3 text-sm font-medium text-primary">
            AI that understands what you're curious about — not just what you watched.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/app"
              search={{ demo: true }}
              className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-primary-foreground glow transition-transform hover:scale-[1.02]"
            >
              <Brain className="h-4 w-4" /> Analyze My Scroll
            </Link>
            <Link
              to="/app"
              search={{ demo: true }}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary/50 px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              <Play className="h-4 w-4" /> Try Demo
            </Link>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">4 Reels</span> → AI Interest →
            Smart Recommendation
          </p>
        </div>

        <Panel className="rise">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
            How it works
          </p>
          <ol className="mt-4 space-y-2">
            {FLOW.map((step, i) => (
              <li key={step}>
                <div className="flex items-center gap-3 rounded-xl border border-border bg-secondary/40 px-4 py-3">
                  <span className="text-xs font-mono text-primary">0{i + 1}</span>
                  <span className="text-sm font-semibold tracking-wide">{step}</span>
                  <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
                </div>
                {i < FLOW.length - 1 && (
                  <div className="mx-auto h-3 w-px bg-border" aria-hidden />
                )}
              </li>
            ))}
          </ol>
        </Panel>
      </section>

      <div className="mt-16">
        <KeywordVsAI />
      </div>

      <section className="mt-14 grid gap-5 md:grid-cols-3">
        {[
          {
            icon: <Brain className="h-5 w-5 text-primary" />,
            title: "Semantic interest inference",
            body: "Relationships between Reels — not keyword counts — drive a latent interest profile.",
          },
          {
            icon: <ShieldCheck className="h-5 w-5 text-lime" />,
            title: "AI Hype Shield",
            body: "Clickbait and unsupported career promises get downranked in favour of real knowledge.",
          },
          {
            icon: <Sparkles className="h-5 w-5 text-accent" />,
            title: "Explainable output",
            body: "Every recommendation shows the interest detected, the evidence and the confidence.",
          },
        ].map((f) => (
          <Panel key={f.title}>
            {f.icon}
            <h3 className="mt-3 text-base font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
          </Panel>
        ))}
      </section>

      <p className="mt-12 text-center text-xs text-muted-foreground">
        Demo Mode: This prototype uses fictional/anonymized Reel interaction data. No real
        social-media account is connected.
      </p>
    </main>
  );
}
