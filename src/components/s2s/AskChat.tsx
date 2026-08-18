import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Send, Bot } from "lucide-react";
import { askScroll2Skill } from "@/lib/analyze.functions";
import { Panel, Pill } from "./primitives";

const SUGGESTIONS = [
  "Why did you recommend this?",
  "What does the AI think I'm interested in?",
  "Give me a harder recommendation.",
  "Recommend something outside my interests.",
  "Why was this content downranked?",
];

export function AskChat({ scenarioId }: { scenarioId: string }) {
  const ask = useServerFn(askScroll2Skill);
  const [messages, setMessages] = useState<{ role: "you" | "ai"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);

  async function send(question: string) {
    if (!question.trim() || busy) return;
    setMessages((m) => [...m, { role: "you", text: question }]);
    setInput("");
    setBusy(true);
    try {
      const res = await ask({ data: { question, scenarioId } });
      setMessages((m) => [...m, { role: "ai", text: res.answer }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "ai", text: "Demo mode: the analysis above is precomputed for this scenario." },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Panel className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => void send(s)}
            className="rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
          >
            {s}
          </button>
        ))}
      </div>

      <div className="max-h-80 space-y-3 overflow-y-auto">
        {messages.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Ask why a recommendation was made, or why something was downranked.
          </p>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={
              m.role === "you"
                ? "ml-auto max-w-[85%] rounded-xl bg-primary/15 px-3 py-2 text-sm"
                : "max-w-[90%] rounded-xl border border-border bg-secondary/40 px-3 py-2 text-sm"
            }
          >
            {m.role === "ai" && (
              <Bot className="mb-1 inline h-4 w-4 text-primary" aria-hidden />
            )}{" "}
            {m.text}
          </div>
        ))}
        {busy && <Pill>Thinking…</Pill>}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void send(input);
        }}
        className="flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Scroll2Skill…"
          className="flex-1 rounded-xl border border-input bg-secondary/40 px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/60"
        />
        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-50"
        >
          <Send className="h-4 w-4" /> Ask
        </button>
      </form>
    </Panel>
  );
}
