import type { Analysis, Candidate, LearningMode } from "./types";

/**
 * Prototype ranking heuristic (NOT scientifically validated):
 * 40% semantic interest match, 20% topic relevance, 15% educational value,
 * 15% engagement potential, 10% novelty — minus hype and repetition penalties.
 */
export interface ScoredCandidate extends Candidate {
  score: number;
  breakdown: {
    semantic: number;
    topic: number;
    educational: number;
    engagement: number;
    novelty: number;
    hypePenalty: number;
    repetitionPenalty: number;
  };
}

const MODE_CATEGORIES: Record<LearningMode, string[]> = {
  interesting: ["Programming", "Hardware", "AI"],
  learn: ["DSA", "HLD", "AI", "Hardware", "Cybersecurity"],
  career: ["Career", "HLD", "DSA"],
  coding: ["Java", "Programming", "DSA", "Backend"],
  ai: ["AI"],
  surprise: [],
};

const norm = (s: string) => s.toLowerCase().replace(/[^a-z]/g, "");

function semanticMatch(candidate: Candidate, analysis: Analysis) {
  let best = 0;
  for (const interest of analysis.interest_profile) {
    const i = norm(interest.interest);
    for (const topic of [...candidate.topics, candidate.category]) {
      const t = norm(topic);
      if (!t) continue;
      const overlap = t === i ? 1 : t.includes(i) || i.includes(t) ? 0.72 : 0;
      best = Math.max(best, overlap * interest.score);
    }
  }
  return best;
}

export function rankCandidates(
  candidates: Candidate[],
  analysis: Analysis,
  mode: LearningMode,
  serendipity: boolean,
): ScoredCandidate[] {
  const seen = new Set(
    [analysis.recommendation?.recommended_reel ?? ""].map((t) => norm(t)),
  );
  const bridge = analysis.interest_bridge.map(norm);
  const modeCats = MODE_CATEGORIES[mode] ?? [];

  const scored = candidates.map((c) => {
    const semantic = semanticMatch(c, analysis);
    const topic = bridge.some((b) =>
      [...c.topics, c.category].some((t) => norm(t).includes(b) || b.includes(norm(t))),
    )
      ? 1
      : 0.35;
    const novelty = semantic < 0.5 ? 1 : 1 - semantic * 0.6;
    const hypePenalty = c.hypeLevel * 0.45;
    const repetitionPenalty = seen.has(norm(c.title)) ? 0.25 : 0;
    const modeBoost = modeCats.includes(c.category) ? 0.12 : 0;
    const serendipityBoost = serendipity && semantic < 0.55 && c.hypeLevel < 0.2 ? 0.08 : 0;

    const score =
      0.4 * semantic +
      0.2 * topic +
      0.15 * c.educationalValue +
      0.15 * c.engagementPotential +
      0.1 * novelty -
      hypePenalty -
      repetitionPenalty +
      modeBoost +
      serendipityBoost;

    return {
      ...c,
      score: Math.max(0, Math.min(1, score)),
      breakdown: {
        semantic,
        topic,
        educational: c.educationalValue,
        engagement: c.engagementPotential,
        novelty,
        hypePenalty,
        repetitionPenalty,
      },
    };
  });

  return scored.sort((a, b) => b.score - a.score);
}
