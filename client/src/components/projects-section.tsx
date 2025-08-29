import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "DailiQ E-commerce",
    description: "Scalable Shopify integration powering modern e-commerce.",
    stack: ["Next.js", "FastAPI", "Shopify API", "AWS"],
    highlights: [
      "Engineered FastAPI middleware to validate GraphQL queries, reducing integration errors by ~40%",
      "Optimized dynamic routing and data fetching in Next.js, cutting load times by ~30%",
      "Designed modular FE–BE–Shopify architecture, accelerating feature rollout by 25%",
    ],
    ownership: "Full-stack development — API design, performance tuning, and UI delivery",
    impact: "Delivered a faster checkout experience that improved conversions and reduced dev friction",
  },
  {
    title: "IQVIA Analytics",
    description: "Data-driven healthcare insights through advanced analytics features.",
    stack: ["C#", ".NET", "React"],
    highlights: [
      "Built .NET REST APIs enabling richer reporting, expanding analytical datasets by 20%",
      "Enhanced React dashboards, reducing analyst time-to-insight by ~35%",
      "Streamlined FE–BE communication, lowering API latency by ~200ms",
    ],
    ownership: "Backend API integration and frontend UX upgrades",
    impact: "Empowered analysts with faster insights, improving healthcare decision-making speed",
  },
  {
    title: "PriOSS",
    description: "GDPR-by-design privacy platform enabling user trust.",
    stack: ["Angular", "TypeScript", "Python", "GDPR"],
    highlights: [
      "Implemented local-device processing, eliminating 100% of sensitive cloud workflows",
      "Built granular user consent controls, boosting adoption with ~45% positive feedback",
      "Designed GDPR-compliant UX balancing regulations with usability",
    ],
    ownership: "Privacy-first architecture & UX development",
    impact: "Created a scalable compliance-first model, strengthening user trust across industries",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Featured Projects</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Showcasing end-to-end solutions that solve real-world problems with modern technologies.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: any; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      className="bg-card rounded-2xl shadow-lg hover:shadow-xl transition border border-border"
      data-testid={`card-project-${index}`}
    >
      <CardContent className="p-8 flex flex-col justify-between h-full">
        <div>
          <h3
            className="text-2xl font-bold mb-3"
            data-testid={`text-project-title-${index}`}
          >
            {project.title}
          </h3>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.stack.map((tech: string, techIndex: number) => (
              <span
                key={techIndex}
                className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                data-testid={`tag-tech-${index}-${techIndex}`}
              >
                {tech}
              </span>
            ))}
          </div>

          <p
            className="text-muted-foreground mb-6"
            data-testid={`text-project-description-${index}`}
          >
            {project.description}
          </p>

          <div className="space-y-3 mb-6">
            {(expanded ? project.highlights : project.highlights.slice(0, 2)).map(
              (highlight: string, highlightIndex: number) => (
                <div
                  key={highlightIndex}
                  className="flex items-start space-x-3"
                >
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                  <p
                    className="text-sm"
                    data-testid={`text-project-highlight-${index}-${highlightIndex}`}
                  >
                    {highlight}
                  </p>
                </div>
              )
            )}
          </div>

          <div
            className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm inline-block mb-4"
            data-testid={`tag-ownership-${index}`}
          >
            What I owned: {project.ownership}
          </div>

          {expanded && (
            <p className="text-sm text-muted-foreground mb-4">{project.impact}</p>
          )}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="mt-4 self-start"
        >
          {expanded ? "Show Less" : "Read More"}
        </Button>
      </CardContent>
    </Card>
  );
}