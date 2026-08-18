export interface Reel {
  id: string;
  title: string;
  description: string;
  category: string;
  watchRatio: number;
  engagement: number;
  liked: boolean;
  saved: boolean;
  replayed: boolean;
  gradient: string;
  icon: string;
}

export interface InterestNode {
  interest: string;
  score: number;
  evidence: string[];
}

export interface NextBestInterest {
  topic: string;
  confidence: number;
  reason: string;
}

export interface Recommendation {
  current_reel: string;
  interest_detected: string;
  why: string;
  recommended_reel: string;
  category: string;
  why_recommendation: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | string;
  confidence: "High" | "Medium" | "Low" | string;
}

export interface HypeVerdict {
  title: string;
  status: "downranked" | "recommended" | string;
  reason: string;
}

export interface Analysis {
  interest_profile: InterestNode[];
  next_best_interest: NextBestInterest;
  recommendation: Recommendation;
  hype_analysis: HypeVerdict[];
  interest_bridge: string[];
  exploration_gap?: { topic: string; score: number }[];
  scroll_skill?: {
    entertainment: number;
    technology: number;
    career: number;
    learning: number;
    overall: number;
  };
  serendipity?: { expected: string; discovery: string; reason: string };
  source?: "gemini" | "demo";
}

export interface AnalyzeResult {
  analysis: Analysis;
  mode: "live" | "demo";
  provider?: string;
  note?: string;
}

export interface Candidate {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  topics: string[];
  educationalValue: number;
  engagementPotential: number;
  hypeLevel: number;
}

export type LearningMode =
  | "interesting"
  | "learn"
  | "career"
  | "coding"
  | "ai"
  | "surprise";

export interface Scenario {
  id: string;
  name: string;
  description: string;
  reelIds: string[];
  demo: Analysis;
}
