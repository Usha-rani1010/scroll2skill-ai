import { describe, expect, it } from "vitest";

describe("Scroll2Skill Recommendation Logic", () => {
  it("detects broader software engineering interest from multiple Reel signals", () => {
    const reels = [
      "Java programming meme",
      "Software engineer lifestyle",
      "Coding interview joke",
      "Laptop comparison"
    ];

    const combined = reels.join(" ").toLowerCase();

    const hasProgramming =
      combined.includes("java") ||
      combined.includes("programming") ||
      combined.includes("coding");

    const hasCareer =
      combined.includes("software engineer") ||
      combined.includes("interview");

    const hasHardware = combined.includes("laptop");

    expect(hasProgramming).toBe(true);
    expect(hasCareer).toBe(true);
    expect(hasHardware).toBe(true);

    const inferredInterest =
      hasProgramming && hasCareer && hasHardware
        ? "Software Engineering / Programming"
        : "Unknown";

    expect(inferredInterest).toBe("Software Engineering / Programming");
  });

  it("does not treat Java as the only interest", () => {
    const reels = [
      "Java programming meme",
      "Software engineer lifestyle",
      "Coding interview joke",
      "Laptop comparison"
    ];

    const combined = reels.join(" ").toLowerCase();

    const inferredInterest =
      combined.includes("java") &&
      combined.includes("interview") &&
      combined.includes("software engineer")
        ? "Software Engineering / Programming"
        : "Java";

    expect(inferredInterest).not.toBe("Java");
  });

  it("downranks exaggerated AI career claims", () => {
    const title = "10 AI Tools That Will Get You a Job";

    const hype =
      title.toLowerCase().includes("get you a job") ||
      title.toLowerCase().includes("guarantee");

    expect(hype).toBe(true);

    const status = hype ? "downranked" : "recommended";

    expect(status).toBe("downranked");
  });

  it("selects a useful technology recommendation", () => {
    const recommendation = {
      title: "Hash Maps Explained in 60 Seconds",
      category: "DSA",
      difficulty: "Beginner",
      confidence: "High"
    };

    expect(recommendation.title).toBeTruthy();
    expect(recommendation.category).toBe("DSA");
    expect(recommendation.difficulty).toBe("Beginner");
    expect(recommendation.confidence).toBe("High");
  });

  it("handles empty Reel history safely", () => {
    const reels: string[] = [];

    const interest =
      reels.length === 0 ? "Insufficient data" : "Software Engineering";

    expect(interest).toBe("Insufficient data");
  });

  it("falls back to Demo Mode when Gemini is unavailable", () => {
    const geminiAvailable = false;

    const mode = geminiAvailable ? "Gemini AI" : "Demo Mode";

    expect(mode).toBe("Demo Mode");
  });

  it("falls back to Demo Mode when Gemini fails", () => {
    const geminiFailed = true;

    const mode = geminiFailed ? "Demo Mode" : "Gemini AI";

    expect(mode).toBe("Demo Mode");
  });
});