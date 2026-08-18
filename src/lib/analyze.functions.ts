import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { CANDIDATES } from "@/data/candidates";
import { REELS } from "@/data/reels";
import { scenarioById } from "@/data/scenarios";
import { buildUserPrompt, runGeminiAnalysis, runGeminiChat } from "@/lib/gemini.server";
import type { AnalyzeResult } from "@/lib/types";

const analyzeInput = z.object({
  scenarioId: z.string(),
  learningMode: z.string().default("learn"),
  serendipity: z.boolean().default(true),
});

export const analyzeScroll = createServerFn({ method: "POST" })
  .inputValidator((data) => analyzeInput.parse(data))
  .handler(async ({ data }): Promise<AnalyzeResult> => {
    const scenario = scenarioById(data.scenarioId);
    const reels = REELS.filter((r) => scenario.reelIds.includes(r.id));

    try {
      const prompt = buildUserPrompt(
        reels,
        CANDIDATES,
        data.learningMode,
        data.serendipity,
      );
      const { analysis, provider } = await runGeminiAnalysis(prompt);
      return {
        analysis: { ...scenario.demo, ...analysis, source: "gemini" },
        mode: "live",
        provider,
      };
    } catch (error) {
      return {
        analysis: scenario.demo,
        mode: "demo",
        note: error instanceof Error ? error.message : "AI unavailable",
      };
    }
  });

const chatInput = z.object({
  question: z.string().min(1).max(500),
  scenarioId: z.string(),
});

const DEMO_ANSWERS: { match: RegExp; answer: (topic: string) => string }[] = [
  {
    match: /why.*(recommend|this)/i,
    answer: (t) =>
      `Because several Reels pointed to the same underlying interest — ${t} — rather than a single keyword. The recommendation targets that shared theme, prioritising educational value over hype.`,
  },
  {
    match: /interested|think i/i,
    answer: (t) =>
      `The strongest inferred interest is ${t}, supported by watch ratio, replays and saves across multiple Reels. It's a prototype heuristic, not a verified profile.`,
  },
  {
    match: /harder|advanced/i,
    answer: () =>
      `Try "How Caching Makes Apps Feel Instant" (Intermediate) — it builds on the same programming foundations but adds distributed-systems reasoning.`,
  },
  {
    match: /outside|different|surprise/i,
    answer: () =>
      `Outside your usual cluster: "How HTTPS Protects Your Data". Security sits adjacent to development and adds a genuinely new technology area.`,
  },
  {
    match: /downrank|hype/i,
    answer: () =>
      `Content is downranked when it makes unsupported career promises, uses heavy promotional framing or offers little verifiable technical substance — "10 AI Tools That Will Get You a Job" fits all three.`,
  },
];

export const askScroll2Skill = createServerFn({ method: "POST" })
  .inputValidator((data) => chatInput.parse(data))
  .handler(async ({ data }): Promise<{ answer: string; mode: "live" | "demo" }> => {
    const scenario = scenarioById(data.scenarioId);
    try {
      const answer = await runGeminiChat(data.question, scenario.demo);
      return { answer, mode: "live" };
    } catch {
      const topic = scenario.demo.interest_profile[0]?.interest ?? "technology";
      const hit = DEMO_ANSWERS.find((d) => d.match.test(data.question));
      return {
        answer: hit
          ? hit.answer(topic)
          : `In demo mode I can explain the current analysis: the inferred interest is ${topic}, the next best interest is ${scenario.demo.next_best_interest.topic}, and the recommendation is "${scenario.demo.recommendation.recommended_reel}".`,
        mode: "demo",
      };
    }
  });
