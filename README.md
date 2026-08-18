# Scroll Smart

Build a complete hackathon-ready web application called:

# Scroll2Skill

### Turn your scrolling into your next skill.

IMPORTANT:

I have only about 3 hours to complete this college hackathon project.

Build a polished, functional MVP quickly. Prioritize the core experience and working demo over complex infrastructure.

==================================================

PROJECT PROBLEM

==================================================

Students spend significant time scrolling short-form content such as Reels and Shorts. Much of it may be harmless entertainment but provides little educational or career value.

The goal is NOT to stop students from using social media.

The goal is to make their existing scrolling more useful.

Scroll2Skill analyzes the Reels a student interacts with, understands the topic, context and apparent interest, infers the student's broader underlying interests, and recommends engaging technology-related content that matches those interests.

IMPORTANT:

DO NOT use simple keyword matching.

The system must understand relationships between multiple Reels.

Example:

Student watches:

1. Java programming meme

2. Software engineer lifestyle Reel

3. Coding interview joke

4. Laptop comparison

A weak recommendation system would infer:

"Java"

and recommend another Java Reel.

Scroll2Skill should infer:

"Software Engineering / Programming / Technology"

and recommend something useful such as:

"Hash Maps Explained in 60 Seconds"

This semantic/generalized interest inference is the main innovation of the project.

==================================================

TECHNOLOGY STACK

==================================================

Build using:

- React

- TypeScript

- Tailwind CSS

- Modern responsive UI

- Gemini API for AI reasoning

- Secure server-side/API integration for Gemini

- Local JSON/mock data for the hackathon MVP

Use Google Gemini as the reasoning layer.

IMPORTANT:

Use the environment variable:

GEMINI_API_KEY

Never expose the Gemini API key in client-side code.

If Gemini is unavailable, the application MUST automatically use Demo Mode with precomputed results.

The application must remain fully usable without a live API connection.

Do NOT build:

- Instagram authentication

- Instagram scraping

- Real social media integration

- Complex database

- User registration

- Payment system

- Machine learning training pipeline

==================================================

BRANDING

==================================================

Product name:

Scroll2Skill

Tagline:

"Turn your scrolling into your next skill."

Secondary tagline:

"AI that understands what you're curious about — not just what you watched."

Create a premium AI startup/hackathon design.

Use:

- Dark modern interface

- Technology-inspired visual style

- Subtle gradients

- Glassmorphism cards

- Smooth animations

- Modern typography

- Clean spacing

- High contrast

- Professional dashboard

- Responsive layout

Avoid excessive animations or unnecessary complexity.

==================================================

MAIN DIFFERENTIATOR

==================================================

Make this visually prominent:

"NOT KEYWORD MATCHING."

Then show:

Java

+

Coding Interview

+

Developer Lifestyle

+

Laptop

↓

AI understands the context

↓

Software Engineering

↓

Useful technology recommendation

This should be the central visual story of the website.

==================================================

PAGES / SECTIONS

==================================================

Create:

1. Landing Page

2. Dashboard

3. Reel History

4. AI Interest Analysis

5. Interest DNA

6. Smart Recommendation

7. Interest Bridge

8. Next Best Interest

9. Exploration Gap

10. AI Hype Shield

11. Scroll → Skill Score

12. Serendipity Mode

13. Learning Mode

14. Interest Evolution

15. Demo Scenarios

16. Presentation Mode

Use smooth navigation between sections.

==================================================

LANDING PAGE

==================================================

Hero:

"Your Scroll Has Potential."

Subtitle:

"Scroll2Skill uses AI to understand what you're genuinely curious about and turns your existing scrolling habits into useful technology discovery."

Primary button:

"Analyze My Scroll"

Secondary button:

"Try Demo"

Hero visual:

WATCH

↓

UNDERSTAND

↓

INFER

↓

CONNECT

↓

RECOMMEND

↓

DISCOVER

Also display:

"4 Reels → AI Interest → Smart Recommendation"

==================================================

DASHBOARD

==================================================

Title:

"Your Scroll Intelligence"

Display:

Reels Analyzed:

8

Technology Relevance:

82%

Learning Potential:

78%

AI Confidence:

91%

Use attractive metric cards.

Then show:

"Top Interests"

Software Engineering — 91%

Programming — 87%

Technical Interviews — 78%

Hardware — 55%

AI — 48%

Then:

"Your Next Best Interest"

System Design

Confidence:

74%

Explanation:

"Your interest in programming, interviews and software engineering suggests that system design is a natural adjacent topic to explore."

==================================================

FICTIONAL REEL DATA

==================================================

Create 8 fictional/anonymized Reels.

Do NOT use copyrighted Instagram content.

Use generated thumbnails, icons, gradients, or abstract visuals.

REEL 01

Title:

"Java Developer Problems 😂"

Description:

"A programmer jokes about NullPointerException and debugging Java code."

Category:

Programming

Watch Ratio:

94%

Engagement:

92%

Liked:

true

Saved:

false

Replayed:

true

REEL 02

Title:

"A Day in the Life of a Software Engineer"

Description:

"A developer shows coding, debugging, meetings and working on a software project."

Category:

Career

Watch Ratio:

91%

Engagement:

88%

Liked:

true

Saved:

true

Replayed:

false

REEL 03

Title:

"When the Coding Interview Goes Wrong 😂"

Description:

"A humorous programming interview scenario."

Category:

Career

Watch Ratio:

97%

Engagement:

94%

Liked:

true

Saved:

false

Replayed:

true

REEL 04

Title:

"Laptop Comparison: MacBook vs Gaming Laptop"

Description:

"Comparison of laptops for programming, development and everyday computing."

Category:

Hardware

Watch Ratio:

84%

Engagement:

81%

Liked:

true

Saved:

false

Replayed:

false

REEL 05

Title:

"Top Gaming Moments"

Description:

"Funny moments from a multiplayer game."

Category:

Gaming

Watch Ratio:

93%

Engagement:

90%

Liked:

true

Saved:

false

Replayed:

true

REEL 06

Title:

"How Generative AI Works"

Description:

"A short educational explanation of how large language models generate text."

Category:

AI

Watch Ratio:

82%

Engagement:

78%

Liked:

false

Saved:

true

Replayed:

false

REEL 07

Title:

"10 AI Tools That Will Get You a Job"

Description:

"A highly promotional Reel claiming that ten AI tools can guarantee career success."

Category:

Career

Watch Ratio:

89%

Engagement:

86%

Liked:

true

Saved:

false

Replayed:

false

REEL 08

Title:

"New Processor Technology Explained"

Description:

"A short technology news Reel explaining improvements in modern processors."

Category:

Technology

Watch Ratio:

76%

Engagement:

72%

Liked:

false

Saved:

true

Replayed:

false

==================================================

AI INTEREST INFERENCE

==================================================

Implement Gemini-powered semantic analysis.

The AI should consider:

- Topic

- Context

- Relationships between Reels

- Repeated concepts

- Watch ratio

- Likes

- Saves

- Replays

- Educational value

- Career relevance

- Technology relevance

- Apparent interest

Do NOT simply count keywords.

The AI should infer broader latent interests.

Example:

Java meme

+

Coding interview

+

Software engineer lifestyle

+

Laptop comparison

↓

Software Engineering / Programming / Technology

NOT:

Java

Create an interest profile such as:

Software Engineering — 91%

Programming — 87%

Technical Interviews — 78%

DSA — 76%

Hardware — 55%

AI — 48%

The actual scores should be generated by Gemini in live mode.

==================================================

GEMINI PROMPT

==================================================

Create a secure server-side Gemini API function.

Use a system prompt similar to:

"You are an AI technology-interest recommendation analyst.

Analyze multiple short-form video interactions.

Do not infer interests from isolated keywords.

Infer latent interests by considering:

- topics

- context

- relationships between videos

- repeated concepts

- user engagement

- watch ratio

- likes

- saves

- replays

Generalize narrow signals into broader meaningful interests.

For example:

Java meme + coding interview + software engineer lifestyle

should indicate Software Engineering / Programming rather than only Java.

Recommend technology content that is useful, engaging and relevant.

Do not recommend content solely because it contains the same keyword.

Avoid:

- unsupported career promises

- clickbait

- excessive hype

- repetitive recommendations

- low educational value

Prefer:

- useful technical knowledge

- accurate educational content

- career-relevant technology content

- adjacent topic discovery

Return valid JSON only."

==================================================

GEMINI JSON OUTPUT

==================================================

Gemini should return:

{

  "interest_profile": [

    {

      "interest": "Software Engineering",

      "score": 0.91,

      "evidence": [

        "Programming meme",

        "Software engineer lifestyle",

        "Coding interview content"

      ]

    }

  ],

  "next_best_interest": {

    "topic": "System Design",

    "confidence": 0.74,

    "reason": "..."

  },

  "recommendation": {

    "current_reel": "...",

    "interest_detected": "...",

    "why": "...",

    "recommended_reel": "...",

    "category": "...",

    "why_recommendation": "...",

    "difficulty": "...",

    "confidence": "High"

  },

  "hype_analysis": [

    {

      "title": "...",

      "status": "downranked",

      "reason": "..."

    }

  ],

  "interest_bridge": [

    "Programming",

    "DSA",

    "Backend Development",

    "System Design",

    "Cloud"

  ]

}

Handle malformed API responses gracefully.

==================================================

REQUIRED RECOMMENDATION OUTPUT

==================================================

Display this exact structure:

CURRENT REEL:

[reference]

INTEREST DETECTED:

[topic / interest]

WHY:

[evidence from content]

RECOMMENDED TECH REEL:

[topic/title]

CATEGORY:

[AI / DSA / Java / HLD / Cybersecurity / Cloud / Hardware / Career / Other]

WHY THIS RECOMMENDATION:

[connection to interest]

DIFFICULTY:

[Beginner / Intermediate / Advanced]

CONFIDENCE:

[High / Medium / Low]

==================================================

SMART RECOMMENDATION ENGINE

==================================================

Create 15-20 fictional technology recommendation candidates.

Categories:

- AI

- DSA

- Java

- HLD

- Cybersecurity

- Cloud

- Hardware

- Career

- Programming

- Backend

- Other

Each candidate should contain:

- title

- description

- category

- difficulty

- topics

- educational value

- engagement potential

- hype level

Use this prototype ranking:

40% semantic interest match

20% topic relevance

15% educational value

15% engagement potential

10% novelty

Subtract:

- hype penalty

- repetition penalty

These are prototype heuristics and should not be presented as scientifically validated.

==================================================

INTEREST DNA

==================================================

Create a visually impressive:

"🧠 Interest DNA"

Use a connected-node visualization or radar-style visualization.

Example:

Software Engineering — 91%

Connected:

Programming — 87%

Technical Interviews — 78%

DSA — 76%

Hardware — 55%

AI — 48%

Show:

"Your interests are connected, not isolated."

==================================================

INTEREST BRIDGE

==================================================

Create:

"🔗 Interest Bridge"

Show:

Java

↓

Programming

↓

DSA

↓

Backend Development

↓

System Design

↓

Cloud

Title:

"Where Could Your Curiosity Take You?"

Allow the user to click nodes.

==================================================

NEXT BEST INTEREST

==================================================

Create:

"🔮 Your Next Best Interest"

For the main demo:

Current:

Software Engineering

Next:

System Design

Confidence:

74%

Reason:

"System design connects your existing interest in programming and software engineering with how large-scale applications are built."

==================================================

EXPLORATION GAP

==================================================

Create:

"🔍 Explore Your Blind Spots"

IMPORTANT:

Do not claim the user definitely lacks knowledge.

Say:

"Topics you haven't explored much based on your current Reel history."

Example:

Strong signals:

Programming — 90%

DSA — 76%

Less explored:

System Design — 18%

Cloud — 12%

Cybersecurity — 9%

Recommendation:

"System Design Basics for Beginners"

==================================================

AI HYPE SHIELD

==================================================

Create a prominent:

"🛡️ AI Hype Shield"

Example:

"10 AI Tools That Will Get You a Job"

Status:

DOWNRANKED

Reasons:

- Unsupported career promise

- High hype

- Low evidence

- Promotional framing

Alternative:

"How AI Coding Assistants Actually Work"

Status:

RECOMMENDED

Reason:

"Provides useful technical knowledge without making unrealistic career promises."

==================================================

SCROLL → SKILL

==================================================

Create:

"📈 Scroll → Skill"

Show:

Entertainment:

40%

Technology:

82%

Career:

71%

Learning:

79%

Overall:

78 / 100

Label:

"Prototype Learning Potential"

Add small disclaimer:

"This is an experimental indicator based on content categories and engagement signals, not a scientific measurement."

==================================================

ENTERTAINMENT → LEARNING BRIDGE

==================================================

Create:

"🎮 Entertainment → Learning"

Example:

Gaming

↓

Game Development

↓

Computer Graphics

↓

AI in Games

↓

Machine Learning

Recommendation:

"How Game AI Makes NPCs Behave"

Another:

Laptop

↓

Hardware

↓

CPU Architecture

↓

Operating Systems

↓

Cloud

Recommendation:

"How CPUs Actually Execute Instructions"

==================================================

SERENDIPITY MODE

==================================================

Create:

"🎲 Smart Discovery"

Default:

ON

Explain:

"Not every recommendation should be identical to what you already watch."

Use:

80% relevant content

20% useful unexpected discovery

Example:

Current interest:

Software Engineering

Expected:

DSA

Discovery:

Cybersecurity

Reason:

"Cybersecurity connects naturally with software development and may introduce a new technology area."

==================================================

LEARNING MODE

==================================================

Create selector:

"What do you want from your next scroll?"

Options:

🔥 Just Interesting

🧠 Learn Something

💼 Career Focused

💻 Coding Focused

🤖 AI Focused

🎲 Surprise Me

Change recommendations based on selected mode.

==================================================

INTEREST EVOLUTION

==================================================

Create:

"📊 How Your Interests Evolve"

Beginning:

Gaming — 80%

Programming — 30%

AI — 20%

Later:

Gaming — 40%

Programming — 85%

AI — 52%

Emerging:

Software Engineering

Show an animated timeline/chart.

==================================================

DEMO SCENARIOS

==================================================

Create a dropdown:

"Demo Scenario"

Options:

1. Software Engineering

2. AI Enthusiast

3. Hardware & Gadgets

4. Cybersecurity

5. Mixed Entertainment + Technology

Default:

Software Engineering

==================================================

SOFTWARE ENGINEERING DEMO

==================================================

Use:

Java Meme

Software Engineer Lifestyle

Coding Interview Joke

Laptop Comparison

Expected AI result:

Software Engineering — 91%

Programming — 87%

Technical Interviews — 78%

Hardware — 55%

Recommendation:

"Hash Maps Explained in 60 Seconds"

Category:

DSA

Difficulty:

Beginner

Confidence:

High

==================================================

AI ENTHUSIAST DEMO

==================================================

Use:

Generative AI Reel

AI News

AI Meme

AI Hardware

Infer:

Artificial Intelligence / Machine Learning

Recommend:

"How Transformers Work in 60 Seconds"

Avoid:

"10 AI Tools That Will Get You a Job"

because of hype.

==================================================

HARDWARE DEMO

==================================================

Use:

Laptop comparison

Processor news

GPU comparison

Gaming hardware

Infer:

Computer Hardware / Computing

Recommend:

"How CPUs and GPUs Work Together"

==================================================

CYBERSECURITY DEMO

==================================================

Use:

Cybersecurity meme

Password security

Ethical hacking educational Reel

Technology news

Infer:

Cybersecurity

Recommend:

"How HTTPS Protects Your Data"

==================================================

PRESENTATION MODE

==================================================

Create a button:

"🎤 Presentation Mode"

When activated, show only the most important elements in a polished presentation layout.

Presentation sequence:

1. Problem

"Students already spend significant time scrolling."

2. Four Reels

Java Meme

Coding Interview

Software Engineer Lifestyle

Laptop Comparison

3. Show:

❌ Keyword Matching:

Java

✅ Scroll2Skill:

Software Engineering / Technology

4. Show Interest DNA

5. Show:

"Next Best Interest:

System Design"

6. Show:

"Recommended:

Hash Maps Explained in 60 Seconds"

7. Show:

"AI Hype Shield:

10 AI Tools That Will Get You a Job → DOWNRANKED"

8. Show:

"Interest Bridge:

Software Engineering → DSA → Backend → System Design → Cloud"

9. Finish with:

"WE DON'T STOP THE SCROLL.

WE MAKE THE NEXT SCROLL MORE VALUABLE."

==================================================

OPTIONAL AI CHAT

==================================================

If time permits, create:

"Ask Scroll2Skill"

Example questions:

"Why did you recommend this?"

"What does the AI think I'm interested in?"

"Give me a harder recommendation."

"Recommend something outside my interests."

"Why was this content downranked?"

If Gemini is unavailable, provide demo responses.

==================================================

PRIVACY

==================================================

Display:

"Demo Mode: This prototype uses fictional/anonymized Reel interaction data. No real social-media account is connected."

Do not request sensitive information.

==================================================

ERROR HANDLING

==================================================

If Gemini fails:

- Do not crash

- Show "🟡 Demo Mode"

- Use precomputed results

- Keep all major UI functionality working

If Gemini succeeds:

Show:

"🟢 Gemini AI Connected"

==================================================

IMPORTANT SECURITY

==================================================

Never put the Gemini API key directly into frontend code.

Use:

GEMINI_API_KEY

through a secure server-side function/API route.

Never expose secrets in:

- React components

- browser JavaScript

- public configuration

- GitHub

==================================================

RESPONSIVE DESIGN

==================================================

Support:

- Desktop

- Laptop

- Tablet

- Mobile

Prioritize desktop presentation quality.

==================================================

CODE QUALITY

==================================================

Use reusable components.

Separate:

- UI components

- Data

- Demo scenarios

- Recommendation logic

- Gemini service/API

- Types/interfaces

Keep the code clean and understandable.

Do not create unnecessary infrastructure.

==================================================

IMPORTANT DEMO REQUIREMENT

==================================================

The main Software Engineering scenario MUST work immediately.

When I click:

"Try Demo"

the website should automatically show:

Java meme

+

Software engineer lifestyle

+

Coding interview joke

+

Laptop comparison

↓

AI inference:

Software Engineering / Programming

↓

Interest DNA

↓

Recommended:

"Hash Maps Explained in 60 Seconds"

↓

Hype Shield:

"10 AI Tools That Will Get You a Job"

DOWNRANKED

↓

Interest Bridge:

Programming

→ DSA

→ Backend

→ System Design

→ Cloud

==================================================

FINAL REQUIREMENT

==================================================

Do not just describe the application.

Actually build the complete working website.

Prioritize:

1. Working demo

2. AI interest inference

3. Smart recommendation

4. Explainability

5. Hype filtering

6. Excellent visual design

7. Presentation Mode

8. Demo fallback

Make every important button functional.

Do not use lorem ipsum.

Do not leave major sections empty.

Do not claim the AI is scientifically proven.

Make this look like a serious AI hackathon product.

After building the first version, verify that the main Software Engineering demo works from start to finish.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://scroll2skill-ai.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b80fb639-bbfc-4cc1-badd-9f0c5e50bdb7).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
