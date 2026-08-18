import { useCallback, useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Presentation, RefreshCw, Sparkles } from "lucide-react";
import { REELS } from "@/data/reels";
import { SCENARIOS, scenarioById } from "@/data/scenarios";
import { CANDIDATES } from "@/data/candidates";
import { analyzeScroll } from "@/lib/analyze.functions";
import { rankCandidates } from "@/lib/ranking";
import type { Analysis, LearningMode } from "@/lib/types";
import { Bar, Disclaimer, Metric, Panel, Pill, Section } from "@/components/s2s/primitives";
import { ReelCard } from "@/components/s2s/ReelCard";
import { InterestDNA } from "@/components/s2s/InterestDNA";
import { Bridge } from "@/components/s2s/Bridge";
import { HypeShield } from "@/components/s2s/HypeShield";
import { ScrollSkill } from "@/components/s2s/ScrollSkill";
import { Evolution } from "@/components/s2s/Evolution";
import { RecommendationCard } from "@/components/s2s/RecommendationCard";
import { KeywordVsAI } from "@/components/s2s/KeywordVsAI";
import { AskChat } from "@/components/s2s/AskChat";
import { LearningModeSelector } from "@/components/s2s/LearningModeSelector";
import { PresentationMode } from "@/components/s2s/PresentationMode";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "Scroll Intelligence Dashboard — Scroll2Skill" },
      {
        name: "description",
        content:
          "AI interest inference, Interest DNA, smart technology recommendations and hype filtering from a fictional short-form scroll history.",
      },
      { property: "og:title", content: "Scroll Intelligence Dashboard — Scroll2Skill" },
      {
        property: "og:description",
        content: "See how AI infers latent interests from a scroll history and recommends useful tech content.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AppPage,
});

const NAV = [
  ["dashboard", "Dashboard"],
  ["history", "Reel History"],
  ["analysis", "AI Interest Analysis"],
  ["dna", "Interest DNA"],
  ["recommendation", "Smart Recommendation"],
  ["bridge", "Interest Bridge"],
  ["next", "Next Best Interest"],
  ["gap", "Exploration Gap"],
  ["hype", "AI Hype Shield"],
  ["score", "Scroll → Skill"],
  ["entertainment", "Entertainment → Learning"],
  ["serendipity", "Serendipity Mode"],
  ["learning", "Learning Mode"],
  ["evolution", "Interest Evolution"],
  ["scenarios", "Demo Scenarios"],
  ["chat", "Ask Scroll2Skill"],
] as const;

function AppPage() {
  const analyze = useServerFn(analyzeScroll);
  const [scenarioId, setScenarioId] = useState("software-engineering");
  const [mode, setMode] = useState<LearningMode>("learn");
  const [serendipity, setSerendipity] = useState(true);
  const [analysis, setAnalysis] = useState<Analysis>(
    scenarioById("software-engineering").demo,
  );
  const [status, setStatus] = useState<"loading" | "live" | "demo">("loading");
  const [provider, setProvider] = useState<string>("");
  const [presenting, setPresenting] = useState(false);

  const scenario = scenarioById(scenarioId);
  const reels = REELS.filter((r) => scenario.reelIds.includes(r.id));

  const run = useCallback(
    async (id: string, learningMode: LearningMode, serendipityOn: boolean) => {
      setStatus("loading");
      setAnalysis(scenarioById(id).demo);
      try {
        const res = await analyze({
          data: { scenarioId: id, learningMode, serendipity: serendipityOn },
        });
        setAnalysis(res.analysis);
        setStatus(res.mode === "live" ? "live" : "demo");
        setProvider(res.provider ?? "");
      } catch {
        setAnalysis(scenarioById(id).demo);
        setStatus("demo");
      }
    },
    [analyze],
  );

  useEffect(() => {
    void run(scenarioId, mode, serendipity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenarioId]);

  const ranked = rankCandidates(CANDIDATES, analysis, mode, serendipity).slice(0, 6);
  const top = analysis.interest_profile[0];
  const gap = analysis.exploration_gap ?? scenario.demo.exploration_gap ?? [];
  const skill = analysis.scroll_skill ?? scenario.demo.scroll_skill!;
  const seren = analysis.serendipity ?? scenario.demo.serendipity!;
  const avgWatch = Math.round(
    reels.reduce((a, r) => a + r.watchRatio, 0) / Math.max(reels.length, 1),
  );

  return (
    <div className="mx-auto flex max-w-[1400px] gap-8 px-5 py-8">
      {presenting && (
        <PresentationMode analysis={analysis} onClose={() => setPresenting(false)} />
      )}

      <aside className="sticky top-8 hidden h-[calc(100vh-4rem)] w-56 shrink-0 flex-col overflow-y-auto xl:flex">
        <Link to="/" className="mb-6 flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="font-bold">Scroll2Skill</span>
        </Link>
        <nav className="space-y-1 text-sm">
          {NAV.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="block rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </nav>
      </aside>

      <main className="min-w-0 flex-1 space-y-14">
        {/* Top bar */}
        <div className="glass flex flex-wrap items-center gap-3 p-4">
          <Link to="/" className="text-sm font-bold xl:hidden">
            Scroll2Skill
          </Link>
          {status === "loading" ? (
            <Pill>
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> Analyzing…
            </Pill>
          ) : status === "live" ? (
            <Pill tone="good">🟢 Gemini AI Connected{provider ? ` · ${provider}` : ""}</Pill>
          ) : (
            <Pill tone="warn">🟡 Demo Mode — precomputed results</Pill>
          )}

          <select
            value={scenarioId}
            onChange={(e) => setScenarioId(e.target.value)}
            className="rounded-xl border border-input bg-secondary/60 px-3 py-2 text-sm outline-none"
            aria-label="Demo Scenario"
          >
            {SCENARIOS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => void run(scenarioId, mode, serendipity)}
            className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm hover:bg-secondary"
          >
            <RefreshCw className="h-4 w-4" /> Re-analyze
          </button>

          <button
            onClick={() => setPresenting(true)}
            className="ml-auto inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            <Presentation className="h-4 w-4" /> 🎤 Presentation Mode
          </button>
        </div>

        <p className="rounded-xl border border-border bg-secondary/30 px-4 py-3 text-xs text-muted-foreground">
          Demo Mode: This prototype uses fictional/anonymized Reel interaction data. No real
          social-media account is connected.
        </p>

        {/* Dashboard */}
        <Section
          id="dashboard"
          eyebrow="Dashboard"
          title="Your Scroll Intelligence"
          subtitle="Inferred from your fictional Reel interaction history — watch ratio, likes, saves, replays and the relationships between clips."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="Reels Analyzed" value="8" hint={`${reels.length} in this scenario`} />
            <Metric label="Technology Relevance" value={`${skill.technology}%`} />
            <Metric label="Learning Potential" value={`${skill.learning}%`} />
            <Metric
              label="AI Confidence"
              value={`${Math.round((top?.score ?? 0.91) * 100)}%`}
              hint={`Avg watch ratio ${avgWatch}%`}
            />
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
            <Panel>
              <h3 className="mb-4 text-base font-semibold">Top Interests</h3>
              <div className="space-y-3">
                {analysis.interest_profile.slice(0, 6).map((p, i) => (
                  <div key={p.interest} className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span>{p.interest}</span>
                      <span className="font-semibold text-primary">
                        {Math.round(p.score * 100)}%
                      </span>
                    </div>
                    <Bar value={p.score} tone={i % 2 ? "violet" : "cyan"} />
                  </div>
                ))}
              </div>
            </Panel>
            <Panel className="glow">
              <h3 className="text-base font-semibold">🔮 Your Next Best Interest</h3>
              <p className="mt-4 text-3xl font-bold text-gradient">
                {analysis.next_best_interest.topic}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Confidence {Math.round(analysis.next_best_interest.confidence * 100)}%
              </p>
              <Bar value={analysis.next_best_interest.confidence} />
              <p className="mt-4 text-sm leading-relaxed">
                {analysis.next_best_interest.reason}
              </p>
            </Panel>
          </div>
        </Section>

        {/* Reel history */}
        <Section
          id="history"
          eyebrow="Reel History"
          title="What you scrolled"
          subtitle="Fictional, anonymized interaction data used for this prototype."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {reels.map((r) => (
              <ReelCard key={r.id} reel={r} />
            ))}
          </div>
          <h3 className="mb-3 mt-8 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Full session library
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {REELS.slice(0, 8)
              .filter((r) => !scenario.reelIds.includes(r.id))
              .map((r) => (
                <ReelCard key={r.id} reel={r} compact />
              ))}
          </div>
        </Section>

        {/* Analysis / differentiator */}
        <Section
          id="analysis"
          eyebrow="AI Interest Analysis"
          title="From isolated clips to a latent interest"
          subtitle="The model reads topics, context, repeated concepts and engagement together — never a single keyword."
        >
          <KeywordVsAI />
        </Section>

        {/* Interest DNA */}
        <Section
          id="dna"
          eyebrow="Interest DNA"
          title="🧠 Interest DNA"
          subtitle="Each interest is supported by evidence taken from the Reels you engaged with."
        >
          <InterestDNA profile={analysis.interest_profile} />
        </Section>

        {/* Recommendation */}
        <Section
          id="recommendation"
          eyebrow="Smart Recommendation"
          title="The next Reel worth your attention"
          subtitle="Prototype ranking: 40% semantic interest match, 20% topic relevance, 15% educational value, 15% engagement potential, 10% novelty — minus hype and repetition penalties."
        >
          <RecommendationCard rec={analysis.recommendation} />
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ranked.map((c) => (
              <Panel key={c.id} className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <Pill>{c.category}</Pill>
                  <span className="text-xs text-primary">
                    match {Math.round(c.score * 100)}
                  </span>
                </div>
                <h4 className="text-sm font-semibold">{c.title}</h4>
                <p className="text-xs text-muted-foreground">{c.description}</p>
                <Bar value={c.score} tone="lime" />
                <p className="text-[11px] text-muted-foreground">
                  {c.difficulty} · educational {Math.round(c.educationalValue * 100)}% ·
                  hype {Math.round(c.hypeLevel * 100)}%
                </p>
              </Panel>
            ))}
          </div>
          <Disclaimer>
            These are prototype heuristics and are not presented as scientifically
            validated.
          </Disclaimer>
        </Section>

        {/* Bridge */}
        <Section
          id="bridge"
          eyebrow="Interest Bridge"
          title="🔗 Where Could Your Curiosity Take You?"
          subtitle="Click any node to see how it connects to the rest of your path."
        >
          <Bridge steps={analysis.interest_bridge} />
        </Section>

        {/* Next best */}
        <Section
          id="next"
          eyebrow="Next Best Interest"
          title="🔮 Your Next Best Interest"
        >
          <div className="grid gap-5 md:grid-cols-3">
            <Panel>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Current
              </p>
              <p className="mt-2 text-xl font-bold">{top?.interest}</p>
            </Panel>
            <Panel className="glow border-primary/40">
              <p className="text-xs uppercase tracking-widest text-primary">Next</p>
              <p className="mt-2 text-xl font-bold text-gradient">
                {analysis.next_best_interest.topic}
              </p>
            </Panel>
            <Panel>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Confidence
              </p>
              <p className="mt-2 text-xl font-bold">
                {Math.round(analysis.next_best_interest.confidence * 100)}%
              </p>
            </Panel>
          </div>
          <Panel className="mt-4 text-sm">{analysis.next_best_interest.reason}</Panel>
        </Section>

        {/* Exploration gap */}
        <Section
          id="gap"
          eyebrow="Exploration Gap"
          title="🔍 Explore Your Blind Spots"
          subtitle="Topics you haven't explored much based on your current Reel history."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Panel>
              <h3 className="mb-3 text-sm font-semibold text-lime">Strong signals</h3>
              <div className="space-y-3">
                {analysis.interest_profile.slice(0, 3).map((p) => (
                  <div key={p.interest} className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span>{p.interest}</span>
                      <span>{Math.round(p.score * 100)}%</span>
                    </div>
                    <Bar value={p.score} tone="lime" />
                  </div>
                ))}
              </div>
            </Panel>
            <Panel>
              <h3 className="mb-3 text-sm font-semibold text-amber">Less explored</h3>
              <div className="space-y-3">
                {gap.map((g) => (
                  <div key={g.topic} className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span>{g.topic}</span>
                      <span>{Math.round(g.score * 100)}%</span>
                    </div>
                    <Bar value={g.score} tone="amber" />
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm">
                Suggested starting point:{" "}
                <span className="font-semibold text-primary">
                  {gap[0]?.topic ?? "System Design"} Basics for Beginners
                </span>
              </p>
            </Panel>
          </div>
        </Section>

        {/* Hype shield */}
        <Section
          id="hype"
          eyebrow="AI Hype Shield"
          title="🛡️ AI Hype Shield"
          subtitle="Content that promises outcomes instead of teaching something gets pushed down."
        >
          <HypeShield verdicts={analysis.hype_analysis} />
        </Section>

        {/* Scroll skill */}
        <Section id="score" eyebrow="Scroll → Skill" title="📈 Scroll → Skill Score">
          <ScrollSkill data={skill} />
        </Section>

        {/* Entertainment bridge */}
        <Section
          id="entertainment"
          eyebrow="Entertainment → Learning"
          title="🎮 Entertainment → Learning"
          subtitle="Entertainment isn't the enemy — it's the entry point."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <ChainCard
              chain={["Gaming", "Game Development", "Computer Graphics", "AI in Games", "Machine Learning"]}
              rec="How Game AI Makes NPCs Behave"
            />
            <ChainCard
              chain={["Laptop", "Hardware", "CPU Architecture", "Operating Systems", "Cloud"]}
              rec="How CPUs Actually Execute Instructions"
            />
          </div>
        </Section>

        {/* Serendipity */}
        <Section
          id="serendipity"
          eyebrow="Serendipity Mode"
          title="🎲 Smart Discovery"
          subtitle="Not every recommendation should be identical to what you already watch."
        >
          <Panel className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold">Serendipity Mode</p>
                <p className="text-xs text-muted-foreground">
                  80% relevant content · 20% useful unexpected discovery
                </p>
              </div>
              <button
                onClick={() => {
                  const next = !serendipity;
                  setSerendipity(next);
                  void run(scenarioId, mode, next);
                }}
                className={`relative h-7 w-14 rounded-full transition-colors ${serendipity ? "bg-primary" : "bg-secondary"}`}
                aria-pressed={serendipity}
                aria-label="Toggle serendipity mode"
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-background transition-all ${serendipity ? "left-8" : "left-1"}`}
                />
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <InfoBox label="Current interest" value={top?.interest ?? ""} />
              <InfoBox label="Expected" value={seren.expected} />
              <InfoBox label="Discovery" value={seren.discovery} highlight />
            </div>
            <p className="text-sm text-muted-foreground">{seren.reason}</p>
          </Panel>
        </Section>

        {/* Learning mode */}
        <Section
          id="learning"
          eyebrow="Learning Mode"
          title="What do you want from your next scroll?"
          subtitle="Recommendations re-rank instantly based on your intent."
        >
          <LearningModeSelector
            value={mode}
            onChange={(m) => {
              setMode(m);
              void run(scenarioId, m, serendipity);
            }}
          />
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {rankCandidates(CANDIDATES, analysis, mode, serendipity)
              .slice(0, 3)
              .map((c) => (
                <Panel key={c.id}>
                  <Pill>{c.category}</Pill>
                  <h4 className="mt-2 text-sm font-semibold">{c.title}</h4>
                  <p className="mt-1 text-xs text-muted-foreground">{c.description}</p>
                </Panel>
              ))}
          </div>
        </Section>

        {/* Evolution */}
        <Section
          id="evolution"
          eyebrow="Interest Evolution"
          title="📊 How Your Interests Evolve"
          subtitle="A simulated timeline showing entertainment signals giving way to technical curiosity."
        >
          <Evolution />
        </Section>

        {/* Scenarios */}
        <Section
          id="scenarios"
          eyebrow="Demo Scenarios"
          title="Switch the student"
          subtitle="Each scenario reruns the full inference pipeline on a different Reel set."
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SCENARIOS.map((s) => (
              <button
                key={s.id}
                onClick={() => setScenarioId(s.id)}
                className={`glass p-5 text-left transition-all hover:-translate-y-0.5 ${s.id === scenarioId ? "border-primary/60 glow" : ""}`}
              >
                <p className="text-sm font-semibold">{s.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.description}</p>
                <p className="mt-3 text-xs text-primary">
                  → {s.demo.recommendation.recommended_reel}
                </p>
              </button>
            ))}
          </div>
        </Section>

        {/* Chat */}
        <Section
          id="chat"
          eyebrow="Optional AI Chat"
          title="Ask Scroll2Skill"
          subtitle="Interrogate the analysis. Falls back to demo answers when the AI is unavailable."
        >
          <AskChat scenarioId={scenarioId} />
        </Section>

        <footer className="border-t border-border pt-6 text-xs text-muted-foreground">
          Scroll2Skill — prototype built for a college hackathon. Fictional data, prototype
          heuristics, no scientific validation claimed.
        </footer>
      </main>
    </div>
  );
}

function InfoBox({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-3 ${highlight ? "border-accent/50 bg-accent/10" : "border-border bg-secondary/40"}`}
    >
      <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}

function ChainCard({ chain, rec }: { chain: string[]; rec: string }) {
  return (
    <Panel>
      <ol className="space-y-2">
        {chain.map((c, i) => (
          <li key={c}>
            <div className="rounded-lg border border-border bg-secondary/40 px-3 py-2 text-sm">
              {c}
            </div>
            {i < chain.length - 1 && <div className="mx-auto h-3 w-px bg-border" />}
          </li>
        ))}
      </ol>
      <p className="mt-4 text-sm">
        Recommendation: <span className="font-semibold text-primary">{rec}</span>
      </p>
    </Panel>
  );
}
