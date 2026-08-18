import type { Analysis, Candidate, Reel } from "./types";

export const SYSTEM_PROMPT = `You are an AI technology-interest recommendation analyst.
Analyze multiple short-form video interactions.
Do not infer interests from isolated keywords.
Infer latent interests by considering: topics, context, relationships between videos, repeated concepts, user engagement, watch ratio, likes, saves, replays.
Generalize narrow signals into broader meaningful interests.
For example: Java meme + coding interview + software engineer lifestyle should indicate Software Engineering / Programming rather than only Java.
Recommend technology content that is useful, engaging and relevant.
Do not recommend content solely because it contains the same keyword.
Avoid: unsupported career promises, clickbait, excessive hype, repetitive recommendations, low educational value.
Prefer: useful technical knowledge, accurate educational content, career-relevant technology content, adjacent topic discovery.
Return valid JSON only.`;

const RESPONSE_SHAPE = `Return ONLY JSON with this exact shape:
{
  "interest_profile": [{"interest": string, "score": number (0-1), "evidence": [string, ...]}],
  "next_best_interest": {"topic": string, "confidence": number (0-1), "reason": string},
  "recommendation": {"current_reel": string, "interest_detected": string, "why": string, "recommended_reel": string, "category": string, "why_recommendation": string, "difficulty": "Beginner"|"Intermediate"|"Advanced", "confidence": "High"|"Medium"|"Low"},
  "hype_analysis": [{"title": string, "status": "downranked"|"recommended", "reason": string}],
  "interest_bridge": [string, ...],
  "exploration_gap": [{"topic": string, "score": number (0-1)}],
  "scroll_skill": {"entertainment": number, "technology": number, "career": number, "learning": number, "overall": number},
  "serendipity": {"expected": string, "discovery": string, "reason": string}
}
Give 5-6 interests, 5 bridge steps, 3 exploration gaps, 2 hype verdicts.`;

const MODE_HINT: Record<string, string> = {
  interesting: "The user wants entertaining but still technology-relevant content.",
  learn: "The user wants to learn something concrete and educational.",
  career: "The user wants career-relevant technology content (without hype).",
  coding: "The user wants hands-on coding / programming content.",
  ai: "The user wants AI and machine learning content.",
  surprise: "The user wants an unexpected but genuinely useful adjacent discovery.",
};

export function buildUserPrompt(
  reels: Reel[],
  candidates: Candidate[],
  learningMode: string,
  serendipity: boolean,
) {
  return `Reel interaction history (JSON):
${JSON.stringify(
  reels.map((r) => ({
    title: r.title,
    description: r.description,
    category: r.category,
    watch_ratio: r.watchRatio,
    engagement: r.engagement,
    liked: r.liked,
    saved: r.saved,
    replayed: r.replayed,
  })),
  null,
  1,
)}

Recommendation candidates (choose the recommended_reel from these titles):
${JSON.stringify(
  candidates.map((c) => ({
    title: c.title,
    category: c.category,
    difficulty: c.difficulty,
    topics: c.topics,
    educational_value: c.educationalValue,
    engagement_potential: c.engagementPotential,
    hype_level: c.hypeLevel,
  })),
  null,
  1,
)}

Learning mode: ${MODE_HINT[learningMode] ?? MODE_HINT["learn"]}
Serendipity mode: ${serendipity ? "ON — 80% relevant, 20% useful unexpected discovery." : "OFF — stay closely relevant."}

${RESPONSE_SHAPE}`;
}

function extractJson(text: string): unknown {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const raw = (fenced?.[1] ?? text) as string;
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("No JSON object in model response");
  return JSON.parse(raw.slice(start, end + 1));
}

export function validateAnalysis(value: unknown): Analysis {
  const a = value as Analysis;
  if (
    !a ||
    !Array.isArray(a.interest_profile) ||
    a.interest_profile.length === 0 ||
    !a.recommendation ||
    !a.next_best_interest ||
    !Array.isArray(a.interest_bridge)
  ) {
    throw new Error("Malformed analysis payload");
  }
  a.interest_profile = a.interest_profile.map((i) => ({
    interest: String(i.interest),
    score: Math.max(0, Math.min(1, Number(i.score) || 0)),
    evidence: Array.isArray(i.evidence) ? i.evidence.map(String) : [],
  }));
  if (!Array.isArray(a.hype_analysis)) a.hype_analysis = [];
  a.source = "gemini";
  return a;
}

async function callDirectGemini(apiKey: string, userPrompt: string): Promise<string> {
  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [{ role: "user", parts: [{ text: userPrompt }] }],
        generationConfig: { responseMimeType: "application/json", temperature: 0.7 },
      }),
    },
  );
  if (!res.ok) throw new Error(`Gemini API error ${res.status}`);
  const json = (await res.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Empty Gemini response");
  return text;
}

async function callGatewayGemini(apiKey: string, userPrompt: string): Promise<string> {
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Lovable-API-Key": apiKey,
      "X-Lovable-AIG-SDK": "fetch",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
    }),
  });
  if (!res.ok) throw new Error(`AI gateway error ${res.status}`);
  const json = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const text = json.choices?.[0]?.message?.content;
  if (!text) throw new Error("Empty gateway response");
  return text;
}

export async function runGeminiAnalysis(
  userPrompt: string,
): Promise<{ analysis: Analysis; provider: string }> {
  const direct = process.env["GEMINI_API_KEY"];
  const gateway = process.env["LOVABLE_API_KEY"];

  if (direct) {
    const text = await callDirectGemini(direct, userPrompt);
    return { analysis: validateAnalysis(extractJson(text)), provider: "Gemini (direct)" };
  }
  if (gateway) {
    const text = await callGatewayGemini(gateway, userPrompt);
    return {
      analysis: validateAnalysis(extractJson(text)),
      provider: "Gemini 2.5 Flash",
    };
  }
  throw new Error("No Gemini credentials configured");
}

export async function runGeminiChat(
  question: string,
  analysis: Analysis,
): Promise<string> {
  const direct = process.env["GEMINI_API_KEY"];
  const gateway = process.env["LOVABLE_API_KEY"];
  const prompt = `Current analysis JSON:
${JSON.stringify(analysis)}

The student asks: "${question}"
Answer in 2-4 short sentences, grounded strictly in the analysis above. Be honest that this is a prototype heuristic, never promise careers or outcomes. Plain text only, no JSON, no markdown.`;

  if (direct) {
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": direct },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [{ role: "user", parts: [{ text: prompt }] }],
        }),
      },
    );
    if (!res.ok) throw new Error(`Gemini API error ${res.status}`);
    const json = (await res.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
    };
    const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error("Empty Gemini response");
    return text.trim();
  }
  if (gateway) {
    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": gateway,
        "X-Lovable-AIG-SDK": "fetch",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: prompt },
        ],
      }),
    });
    if (!res.ok) throw new Error(`AI gateway error ${res.status}`);
    const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const text = json.choices?.[0]?.message?.content;
    if (!text) throw new Error("Empty gateway response");
    return text.trim();
  }
  throw new Error("No Gemini credentials configured");
}
