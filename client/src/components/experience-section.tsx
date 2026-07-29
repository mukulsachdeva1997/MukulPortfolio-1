import { cn } from "@/lib/utils";

interface Job {
  role: string;
  company: string;
  location: string;
  period: string;
  color: "primary" | "secondary";
  stack: string[];
  highlights: string[];
  reference?: {
    quote: string;
    author: string;
    title: string;
  };
}

const experience: Job[] = [
  {
    role: "Full Stack Developer",
    company: "Lasken GmbH",
    location: "Paderborn, Germany",
    period: "Dec 2024 – May 2025",
    color: "primary" as const,
    stack: ["React", "Angular", "Python Flask", "C# .NET", "MySQL", "Docker", "AWS"],
    highlights: [
      "Delivered a client engagement for IQVIA's data-driven analytics platform — built and maintained custom REST API endpoints in C# and .NET, using GitHub Copilot to keep implementation fast and consistent.",
      "Improved React-based analytics dashboards and frontend-backend communication, speeding up feature delivery and response times.",
      "Built responsive React and Angular interfaces and supported deployment workflows with GitHub, Docker, and AWS.",
    ],
    reference: {
      quote:
        "He consistently showed a proactive approach to problem-solving, was quick to grasp complex tasks, and often went beyond his scope to ensure project success.",
      author: "Dirk Schmitfranz",
      title: "Former CTO, Lasken GmbH",
    },
  },
  {
    role: "Software Engineer Intern",
    company: "ANSH InfoTech",
    location: "Ludhiana, Punjab, India",
    period: "Jun 2020 – Dec 2021",
    color: "secondary" as const,
    stack: ["HTML", "CSS", "JavaScript", "Bootstrap", "PHP", "MySQL", "Python", "Machine Learning", "SQL"],
    highlights: [
      "Completed hands-on industrial training spanning web development and data science, building practical software and machine learning prototypes from scratch.",
      "Built a full restaurant ordering website end-to-end — from UI to database — using HTML, CSS, JavaScript, Bootstrap, PHP, and MySQL.",
    ],
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Experience</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional roles where I've shipped production code across the stack.
          </p>
        </div>

        <div className="max-w-3xl mx-auto relative pl-8">
          {/* connecting track with a soft pulse continuously traveling down it */}
          <div className="absolute left-[3px] top-2.5 bottom-2.5 w-0.5 bg-border rounded-full overflow-hidden">
            <div
              className="absolute -left-[3px] w-2 h-[70px] rounded-sm animate-exp-travel"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, var(--primary), var(--secondary), transparent)",
              }}
            />
          </div>

          {experience.map((job, index) => (
            <div
              key={index}
              className={cn("relative", index < experience.length - 1 && "mb-10")}
              data-testid={`card-experience-${index}`}
            >
              <div
                className={cn(
                  "absolute -left-8 top-1.5 w-3.5 h-3.5 rounded-full bg-card border-2 z-10",
                  "after:content-[''] after:absolute after:-inset-1.5 after:rounded-full after:border after:animate-exp-ripple",
                  job.color === "primary"
                    ? "border-primary after:border-primary"
                    : "border-secondary after:border-secondary",
                  index === 1 && "after:[animation-delay:0.9s]"
                )}
              />

              <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
                  <h3 className="text-xl sm:text-2xl font-bold" data-testid={`text-experience-role-${index}`}>
                    {job.role}
                  </h3>
                  <span
                    className="font-mono text-xs text-muted-foreground whitespace-nowrap"
                    data-testid={`text-experience-period-${index}`}
                  >
                    {job.period}
                  </span>
                </div>
                <p
                  className={cn("text-lg mb-1", job.color === "primary" ? "text-primary" : "text-secondary")}
                  data-testid={`text-experience-company-${index}`}
                >
                  {job.company}
                </p>
                <p className="text-sm text-muted-foreground mb-5">{job.location}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {job.stack.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="font-mono text-xs bg-muted text-foreground px-2.5 py-1 rounded-full"
                      data-testid={`tag-experience-stack-${index}-${techIndex}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <ul className="space-y-2">
                  {job.highlights.map((highlight, highlightIndex) => (
                    <li key={highlightIndex} className="flex gap-2 leading-relaxed">
                      <span
                        className={cn(
                          "font-bold flex-shrink-0",
                          job.color === "primary" ? "text-primary" : "text-secondary"
                        )}
                      >
                        ›
                      </span>
                      <span data-testid={`text-experience-highlight-${index}-${highlightIndex}`}>
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>

                {job.reference && (
                  <blockquote
                    className="mt-5 pt-5 border-t border-border"
                    data-testid={`quote-experience-reference-${index}`}
                  >
                    <p className="italic text-muted-foreground leading-relaxed">
                      "{job.reference.quote}"
                    </p>
                    <footer className="mt-2 text-sm">
                      <span className="font-medium">{job.reference.author}</span>
                      <span className="text-muted-foreground"> · {job.reference.title}</span>
                    </footer>
                  </blockquote>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
