import type { Scenario } from "@/lib/types";

export const SCENARIOS: Scenario[] = [
  {
    id: "software-engineering",
    name: "1. Software Engineering",
    description: "Java meme, engineer lifestyle, coding interview joke, laptop comparison",
    reelIds: ["r01", "r02", "r03", "r04"],
    demo: {
      source: "demo",
      interest_profile: [
        {
          interest: "Software Engineering",
          score: 0.91,
          evidence: [
            "Programming meme replayed and liked",
            "Software engineer lifestyle Reel saved",
            "Coding interview content watched to 97%",
          ],
        },
        {
          interest: "Programming",
          score: 0.87,
          evidence: ["Java debugging humour", "Development workflow content"],
        },
        {
          interest: "Technical Interviews",
          score: 0.78,
          evidence: ["Coding interview Reel replayed", "Career-framed engineering content"],
        },
        {
          interest: "DSA",
          score: 0.76,
          evidence: ["Interview preparation signals", "Problem-solving framing"],
        },
        {
          interest: "Hardware",
          score: 0.55,
          evidence: ["Laptop comparison watched at 84%"],
        },
        {
          interest: "AI",
          score: 0.48,
          evidence: ["Adjacent technology curiosity across the session"],
        },
      ],
      next_best_interest: {
        topic: "System Design",
        confidence: 0.74,
        reason:
          "System design connects your existing interest in programming and software engineering with how large-scale applications are built.",
      },
      recommendation: {
        current_reel: "When the Coding Interview Goes Wrong 😂",
        interest_detected: "Software Engineering / Programming",
        why: "Four Reels point to the same underlying world: writing code, debugging it, interviewing for it and choosing hardware to do it on — not to Java alone.",
        recommended_reel: "Hash Maps Explained in 60 Seconds",
        category: "DSA",
        why_recommendation:
          "Hash maps sit exactly where your interview curiosity meets everyday programming — the single highest-leverage data structure to understand next.",
        difficulty: "Beginner",
        confidence: "High",
      },
      hype_analysis: [
        {
          title: "10 AI Tools That Will Get You a Job",
          status: "downranked",
          reason:
            "Unsupported career promise, high hype, low evidence and promotional framing.",
        },
        {
          title: "How AI Coding Assistants Actually Work",
          status: "recommended",
          reason:
            "Provides useful technical knowledge without making unrealistic career promises.",
        },
      ],
      interest_bridge: [
        "Java",
        "Programming",
        "DSA",
        "Backend Development",
        "System Design",
        "Cloud",
      ],
      exploration_gap: [
        { topic: "System Design", score: 0.18 },
        { topic: "Cloud", score: 0.12 },
        { topic: "Cybersecurity", score: 0.09 },
      ],
      scroll_skill: {
        entertainment: 40,
        technology: 82,
        career: 71,
        learning: 79,
        overall: 78,
      },
      serendipity: {
        expected: "DSA",
        discovery: "Cybersecurity",
        reason:
          "Cybersecurity connects naturally with software development and may introduce a new technology area.",
      },
    },
  },
  {
    id: "ai-enthusiast",
    name: "2. AI Enthusiast",
    description: "Generative AI explainer, AI news, AI meme, AI hardware",
    reelIds: ["r06", "r09", "r10", "r11"],
    demo: {
      source: "demo",
      interest_profile: [
        {
          interest: "Artificial Intelligence",
          score: 0.93,
          evidence: ["Generative AI explainer saved", "AI news watched at 88%", "AI humour replayed"],
        },
        {
          interest: "Machine Learning",
          score: 0.85,
          evidence: ["Model behaviour content", "Training hardware curiosity"],
        },
        {
          interest: "AI Infrastructure",
          score: 0.72,
          evidence: ["GPU / accelerator Reel saved"],
        },
        { interest: "Programming", score: 0.61, evidence: ["Technical explainer preference"] },
        { interest: "Hardware", score: 0.58, evidence: ["Training hardware Reel saved"] },
      ],
      next_best_interest: {
        topic: "Model Evaluation",
        confidence: 0.71,
        reason:
          "You keep saving explainers about how models behave — evaluating outputs is the natural next layer beyond how they are built.",
      },
      recommendation: {
        current_reel: "How Generative AI Works",
        interest_detected: "Artificial Intelligence / Machine Learning",
        why: "You save explainers rather than hype, and your AI humour and AI news signals reinforce the same underlying curiosity about how models work.",
        recommended_reel: "How Transformers Work in 60 Seconds",
        category: "AI",
        why_recommendation:
          "It is the mechanism behind every Reel you engaged with, explained at the depth you already tolerate.",
        difficulty: "Intermediate",
        confidence: "High",
      },
      hype_analysis: [
        {
          title: "10 AI Tools That Will Get You a Job",
          status: "downranked",
          reason: "Guaranteed-job claim with no evidence; keyword-adjacent but low value.",
        },
        {
          title: "Why LLMs Hallucinate",
          status: "recommended",
          reason: "Explains a real limitation instead of selling an outcome.",
        },
      ],
      interest_bridge: [
        "Generative AI",
        "Machine Learning",
        "Transformers",
        "MLOps",
        "Cloud",
      ],
      exploration_gap: [
        { topic: "DSA", score: 0.21 },
        { topic: "System Design", score: 0.16 },
        { topic: "Cybersecurity", score: 0.11 },
      ],
      scroll_skill: {
        entertainment: 34,
        technology: 88,
        career: 52,
        learning: 84,
        overall: 81,
      },
      serendipity: {
        expected: "Transformers",
        discovery: "GPU Architecture",
        reason: "Understanding the hardware explains why models are shaped the way they are.",
      },
    },
  },
  {
    id: "hardware",
    name: "3. Hardware & Gadgets",
    description: "Laptop comparison, processor news, GPU comparison, gaming rig",
    reelIds: ["r04", "r08", "r12", "r13"],
    demo: {
      source: "demo",
      interest_profile: [
        {
          interest: "Computer Hardware",
          score: 0.92,
          evidence: ["Laptop, GPU and build Reels all engaged", "Processor news saved"],
        },
        { interest: "Computing Fundamentals", score: 0.79, evidence: ["Processor explainer saved"] },
        { interest: "Gaming", score: 0.66, evidence: ["Gaming rig build watched at 92%"] },
        { interest: "Programming", score: 0.5, evidence: ["Development-focused laptop framing"] },
        { interest: "AI", score: 0.44, evidence: ["GPU content overlaps with AI acceleration"] },
      ],
      next_best_interest: {
        topic: "Operating Systems",
        confidence: 0.7,
        reason:
          "You care about what silicon does; operating systems are the layer that decides how that silicon is actually used.",
      },
      recommendation: {
        current_reel: "New Processor Technology Explained",
        interest_detected: "Computer Hardware / Computing",
        why: "Four hardware Reels with saves on the explainers signals interest in how machines work, not just which one to buy.",
        recommended_reel: "How CPUs and GPUs Work Together",
        category: "Hardware",
        why_recommendation:
          "It converts spec-sheet comparisons into an understanding of why the specs matter.",
        difficulty: "Beginner",
        confidence: "High",
      },
      hype_analysis: [
        {
          title: "This One Laptop Will 10x Your Productivity",
          status: "downranked",
          reason: "Product hype with an unmeasurable claim and no technical content.",
        },
        {
          title: "How CPUs Actually Execute Instructions",
          status: "recommended",
          reason: "Concrete mechanism, no purchase pressure.",
        },
      ],
      interest_bridge: ["Laptop", "Hardware", "CPU Architecture", "Operating Systems", "Cloud"],
      exploration_gap: [
        { topic: "Backend Development", score: 0.14 },
        { topic: "Cybersecurity", score: 0.1 },
        { topic: "DSA", score: 0.08 },
      ],
      scroll_skill: {
        entertainment: 46,
        technology: 84,
        career: 40,
        learning: 72,
        overall: 71,
      },
      serendipity: {
        expected: "CPU Architecture",
        discovery: "Operating Systems",
        reason: "Scheduling and memory management is where hardware curiosity becomes software skill.",
      },
    },
  },
  {
    id: "cybersecurity",
    name: "4. Cybersecurity",
    description: "Password meme, password security, ethical hacking, tech news",
    reelIds: ["r14", "r15", "r16", "r08"],
    demo: {
      source: "demo",
      interest_profile: [
        {
          interest: "Cybersecurity",
          score: 0.9,
          evidence: ["Password meme replayed", "Password manager explainer saved", "Ethical hacking Reel saved"],
        },
        { interest: "Applied Cryptography", score: 0.74, evidence: ["Hashing and salting content"] },
        { interest: "Networking", score: 0.63, evidence: ["Security-in-transit adjacency"] },
        { interest: "Programming", score: 0.55, evidence: ["Bug bounty and code-level content"] },
        { interest: "Technology News", score: 0.47, evidence: ["Processor news watched"] },
      ],
      next_best_interest: {
        topic: "Web Application Security",
        confidence: 0.72,
        reason:
          "Your interest in credentials and responsible disclosure points directly at how real applications get attacked and defended.",
      },
      recommendation: {
        current_reel: "Ethical Hacking: Finding a Bug Legally",
        interest_detected: "Cybersecurity",
        why: "Humour, an explainer and an ethics-focused Reel all cluster on the same theme — you are curious about how systems break, responsibly.",
        recommended_reel: "How HTTPS Protects Your Data",
        category: "Cybersecurity",
        why_recommendation:
          "It explains the protection layer you rely on every day and sets up everything else in web security.",
        difficulty: "Beginner",
        confidence: "High",
      },
      hype_analysis: [
        {
          title: "Become an Ethical Hacker in 7 Days",
          status: "downranked",
          reason: "Unrealistic timeline promise; classic clickbait framing.",
        },
        {
          title: "SQL Injection Demonstrated Safely",
          status: "recommended",
          reason: "Teaches a real vulnerability class with defensive framing.",
        },
      ],
      interest_bridge: ["Passwords", "Cybersecurity", "Networking", "Web Security", "Cloud"],
      exploration_gap: [
        { topic: "System Design", score: 0.15 },
        { topic: "DSA", score: 0.12 },
        { topic: "AI", score: 0.1 },
      ],
      scroll_skill: {
        entertainment: 38,
        technology: 83,
        career: 58,
        learning: 80,
        overall: 77,
      },
      serendipity: {
        expected: "Web Security",
        discovery: "Backend Development",
        reason: "Most vulnerabilities live in backend code — building it makes you better at breaking it.",
      },
    },
  },
  {
    id: "mixed",
    name: "5. Mixed Entertainment + Technology",
    description: "Gaming moments, Java meme, generative AI, hype career Reel",
    reelIds: ["r05", "r01", "r06", "r07"],
    demo: {
      source: "demo",
      interest_profile: [
        { interest: "Technology Curiosity", score: 0.76, evidence: ["AI explainer saved", "Programming humour replayed"] },
        { interest: "Gaming", score: 0.72, evidence: ["Gaming Reel replayed and liked"] },
        { interest: "Programming", score: 0.68, evidence: ["Java debugging meme replayed"] },
        { interest: "AI", score: 0.61, evidence: ["Generative AI explainer saved"] },
        { interest: "Career", score: 0.44, evidence: ["Career Reel engaged, though promotional"] },
      ],
      next_best_interest: {
        topic: "Game Development",
        confidence: 0.69,
        reason:
          "Game development is the bridge between the entertainment you already enjoy and the programming signals showing up in your scroll.",
      },
      recommendation: {
        current_reel: "Top Gaming Moments",
        interest_detected: "Entertainment with an emerging technology signal",
        why: "Your entertainment is gaming, but your saves are technical — the overlap is how games are actually built.",
        recommended_reel: "How Game AI Makes NPCs Behave",
        category: "Programming",
        why_recommendation:
          "It keeps the gaming context you enjoy while introducing state machines and pathfinding.",
        difficulty: "Beginner",
        confidence: "Medium",
      },
      hype_analysis: [
        {
          title: "10 AI Tools That Will Get You a Job",
          status: "downranked",
          reason: "Unsupported career promise, high hype, low evidence, promotional framing.",
        },
        {
          title: "How AI Coding Assistants Actually Work",
          status: "recommended",
          reason: "Same topic area, real explanation, no guarantees.",
        },
      ],
      interest_bridge: ["Gaming", "Game Development", "Computer Graphics", "AI in Games", "Machine Learning"],
      exploration_gap: [
        { topic: "DSA", score: 0.17 },
        { topic: "Backend Development", score: 0.13 },
        { topic: "Cloud", score: 0.08 },
      ],
      scroll_skill: {
        entertainment: 64,
        technology: 61,
        career: 48,
        learning: 58,
        overall: 62,
      },
      serendipity: {
        expected: "Game Development",
        discovery: "Computer Graphics",
        reason: "Rendering is the most visual entry point into serious programming.",
      },
    },
  },
];

export const scenarioById = (id: string) =>
  SCENARIOS.find((s) => s.id === id) ?? SCENARIOS[0];
