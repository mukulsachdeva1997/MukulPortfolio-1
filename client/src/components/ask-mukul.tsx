import { useEffect, useRef, useState } from "react";
import profilePhoto from "@/assets/profile.jpg";
import { cn } from "@/lib/utils";

interface QA {
  key: string;
  label: string;
  q: string;
  a: string;
}

const QUESTIONS: QA[] = [
  {
    key: "proud",
    label: "proudest --project",
    q: "which project are you most proud of?",
    a: "KnowYourRights, without question. I moved to Germany as an international student and spent hours decoding bureaucratic letters I didn't fully understand, so I built the tool I wished I'd had. I integrated a local AI model to explain official documents in plain English or German, which meant learning to ground an LLM in real legal content instead of letting it improvise. I'm proud of it not because it's the most complex thing I've built, but because it solves a problem I actually lived through.",
  },
  {
    key: "stack",
    label: "tech --stack",
    q: "what's your tech stack?",
    a: "React and Angular on the frontend, FastAPI and .NET on the backend, AWS and Docker for shipping it. But honestly the stack matters less to me than the habit behind it: I try to own a feature end-to-end, UI through deploy, because half-finished ownership is where most bugs and miscommunication creep in.",
  },
  {
    key: "hire",
    label: "why --hire-me",
    q: "why should we hire you?",
    a: "Because I don't just make things work, I make them work for the right reasons. My GDPR-focused project taught me to think about data and privacy before writing a single line of UI, and that instinct, build it right the first time, carries into everything else I ship. I'd rather hand you something maintainable than something fast that breaks in six months.",
  },
  {
    key: "experience",
    label: "overall --experience",
    q: "what's your overall work experience like?",
    a: "Short on paper: one client engagement at Lasken working on IQVIA's platform, and one internship before that. Beyond that, the Projects section above is really the fuller picture: four builds I made in my own time, without a deadline forcing any of them. I'd rather you weigh that than the number of years on a timeline.",
  },
  {
    key: "chance",
    label: "why --take-a-chance",
    q: "why should someone take a chance on you?",
    a: "My resume is short: one client engagement, one internship. But everything else here was built on my own time, without anyone assigning it: the AI integration, the privacy engineering, this portfolio itself. Give me a real problem to work on, and I'd bring the same care to it that I brought to those. That's the honest answer, not a sales pitch.",
  },
  {
    key: "ai",
    label: "ai --experience",
    q: "do you have real AI/LLM experience?",
    a: "Yes, and not just prompting one. In KnowYourRights I run a local Ollama model that reads a legal letter and has to reliably extract a risk level and a plain-language summary. The real work wasn't the demo, it was grounding the model so it explains a document instead of improvising legal advice. That guardrail-building is the part of AI engineering I actually find interesting.",
  },
  {
    key: "privacy",
    label: "privacy --mindset",
    q: "why do you care so much about privacy?",
    a: "It goes back to PriOSS, a GDPR-by-design platform where the rule was simple: sensitive data never leaves the user's device. Building that changed how I approach every project since: I ask what data a feature actually needs before I ask how to build it, which usually means there's less to leak and less to maintain later.",
  },
  {
    key: "tidyteam",
    label: "tidy-team --story",
    q: "what's the story behind Tidy Team?",
    a: "It started as roommates arguing about whose turn it was to do the dishes. I built a real-time chore app with Firebase so assignments rotate automatically and nobody has to remember or argue. It's the smallest project here by scope, but it taught me the most about designing for people who won't read instructions: the UI has to make the right thing the obvious thing.",
  },
  {
    key: "education",
    label: "education --background",
    q: "what's your educational background?",
    a: "I'm finishing an M.Sc. in Computer Science at Universität Paderborn, after a B.Tech from GNDEC in India. The two felt genuinely different: India gave me the fundamentals, Germany pushed me toward research-style thinking, which is exactly what shaped my thesis on open-source collaboration in the PyTorch ecosystem.",
  },
  {
    key: "fun",
    label: "fun --fact",
    q: "anything fun about you outside of code?",
    a: "I trade keyboards for mountain trails most weekends. Trekking is basically how I debug my own head. I also sketch, lift, and have organized blood donation camps back home. None of it is code, and that's exactly why it works.",
  },
  {
    key: "webdev",
    label: "why --web-dev",
    q: "why web development specifically?",
    a: "I've been sketching since I was a kid, landscapes, faces, whatever was in front of me, and building a website scratches the exact same itch: you start with a blank canvas and slowly bring a composition to life. The difference is a webpage talks back. It resizes, it responds to a click, it has to work for someone who isn't me. That pull between how something looks and how it behaves is what took me toward the web instead of, say, pure backend work where nothing is ever visual.",
  },
  {
    key: "artcode",
    label: "art --meets-code",
    q: "how does your art connect to your coding?",
    a: "Sketching taught me to think in composition before I ever thought in components: where the eye lands first, how much empty space a page needs before it feels cluttered, why some layouts feel calm and others feel noisy. Every time I lay out a screen, I'm making the same calls I'd make on a blank page: balance, hierarchy, restraint. Code just lets me keep making those calls with a medium that moves and reaches more people than a drawing pinned to my wall ever could.",
  },
];

const GREETING_Q = "whoami";
const GREETING_A = "Hey, glad you're here. Pick a question below and I'll tell you more than the resume does.";
const TYPE_INTERVAL_MS = 16;
const THINK_DELAY_MS = 400;

export function AskMukul() {
  const [open, setOpen] = useState(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [displayedQ, setDisplayedQ] = useState(GREETING_Q);
  const [displayedText, setDisplayedText] = useState(GREETING_A);
  const [status, setStatus] = useState<"idle" | "thinking" | "answering">("idle");

  const panelRef = useRef<HTMLDivElement>(null);
  const typingInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const thinkTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    return () => {
      if (typingInterval.current) clearInterval(typingInterval.current);
      if (thinkTimeout.current) clearTimeout(thinkTimeout.current);
    };
  }, []);

  function ask(qa: QA) {
    if (typingInterval.current) clearInterval(typingInterval.current);
    if (thinkTimeout.current) clearTimeout(thinkTimeout.current);

    setActiveKey(qa.key);
    setDisplayedQ(qa.q);
    setDisplayedText("");
    setStatus("thinking");

    thinkTimeout.current = setTimeout(() => {
      setStatus("answering");
      let i = 0;
      typingInterval.current = setInterval(() => {
        i++;
        setDisplayedText(qa.a.slice(0, i));
        if (i >= qa.a.length) {
          if (typingInterval.current) clearInterval(typingInterval.current);
          setStatus("idle");
        }
      }, TYPE_INTERVAL_MS);
    }, THINK_DELAY_MS);
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-40 flex items-center gap-2.5 bg-card border border-border rounded-full pl-1.5 pr-4 py-1.5 shadow-lg hover:-translate-y-0.5 transition-transform"
        aria-label="Ask Mukul a question"
        data-testid="button-ask-mukul-fab"
      >
        <span className="relative w-9 h-9 flex-shrink-0">
          <img
            src={profilePhoto}
            alt=""
            className="w-9 h-9 rounded-full object-cover object-top"
          />
          <span className="absolute -inset-1 rounded-full border-2 border-secondary animate-ask-ring-pulse" />
        </span>
        <span className="font-mono text-sm">
          ask<span className="text-secondary">Mukul</span>()
        </span>
      </button>
    );
  }

  return (
    <div
      ref={panelRef}
      className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-40 w-[380px] max-w-[calc(100vw-2rem)] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      role="dialog"
      aria-label="Ask Mukul"
      data-testid="panel-ask-mukul"
    >
      <div className="flex items-center gap-2 px-4 py-2.5 bg-muted border-b border-border">
        <span className="w-2 h-2 rounded-full bg-[hsl(0,70%,55%)] opacity-60" />
        <span className="w-2 h-2 rounded-full bg-[hsl(45,90%,55%)] opacity-60" />
        <span className="w-2 h-2 rounded-full bg-[hsl(142,65%,42%)] opacity-60" />
        <span className="ml-1.5 font-mono text-xs text-muted-foreground">ask-mukul.ts</span>
        <button
          onClick={() => setOpen(false)}
          className="ml-auto text-muted-foreground hover:text-foreground"
          aria-label="Close"
          data-testid="button-ask-mukul-close"
        >
          ✕
        </button>
      </div>

      <div className="p-5 flex flex-col gap-4">
        <div className="flex items-center gap-3.5">
          <span className="relative w-14 h-14 flex-shrink-0">
            <span
              className={cn(
                "absolute -inset-1 rounded-full bg-[conic-gradient(from_0deg,var(--primary),var(--secondary),var(--primary))] animate-ring-spin",
                status === "answering" && "[animation-duration:1.1s]"
              )}
            />
            <img
              src={profilePhoto}
              alt="Mukul Sachdeva"
              className="relative z-10 w-14 h-14 rounded-full object-cover object-top border-2 border-card"
            />
          </span>
          <div className="flex flex-col gap-0.5">
            <span className="font-bold text-sm">
              ask<span className="text-secondary">Mukul</span>()
            </span>
            <span className="font-mono text-xs text-secondary" data-testid="text-ask-mukul-status">
              {status === "thinking" && "thinking…"}
              {status === "answering" && "answering"}
              {status === "idle" && "idle · tap a question"}
            </span>
          </div>
          <div
            className={cn(
              "ml-auto flex items-end gap-[3px] h-5 transition-opacity",
              status === "answering" ? "opacity-100" : "opacity-0"
            )}
          >
            {[0, 150, 300, 450].map((delay) => (
              <span
                key={delay}
                className="w-[3px] bg-secondary rounded-sm animate-eq-bar"
                style={{ animationDelay: `${delay}ms` }}
              />
            ))}
          </div>
        </div>

        <div className="bg-muted border border-border rounded-lg px-4 py-3.5 font-mono text-[13px] leading-relaxed min-h-[96px] max-h-40 overflow-y-auto">
          <span className="text-muted-foreground block mb-1.5">
            <span className="text-secondary">$ </span>
            {displayedQ}
          </span>
          <span data-testid="text-ask-mukul-response">{displayedText}</span>
          <span className="inline-block w-1.5 h-[1em] bg-secondary align-text-bottom ml-0.5 animate-cursor-blink" />
        </div>

        <div className="flex flex-wrap gap-2">
          {QUESTIONS.map((qa) => (
            <button
              key={qa.key}
              onClick={() => ask(qa)}
              className={cn(
                "font-mono text-xs px-3 py-1.5 rounded-full border transition-colors",
                activeKey === qa.key
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground border-border hover:border-primary hover:text-primary"
              )}
              data-testid={`chip-ask-mukul-${qa.key}`}
            >
              {qa.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
