import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ProjectType =
  | "Personal project"
  | "Startup project"
  | "Company project"
  | "University project";

const projects = [
  {
    title: "DailiQ E-commerce",
    description: "Scalable Shopify integration powering modern e-commerce.",
    stack: ["Next.js", "FastAPI", "Shopify API", "PostgreSQL", "AWS"],
    highlights: [
      "Engineered FastAPI middleware to validate GraphQL queries, reducing integration errors by ~40%",
      "Optimized dynamic routing and data fetching in Next.js, cutting load times by ~30%",
      "Designed modular FE–BE–Shopify architecture, accelerating feature rollout by 25%",
    ],
    ownership:
      "Full-stack development — API design, performance tuning, and UI delivery",
    impact:
      "Delivered a faster checkout experience that improved conversions and reduced dev friction",
    category: "Personal project" as ProjectType, // ✅ per your mapping
  },
  {
    title: "IQVIA Analytics",
    description:
      "Data-driven healthcare insights through advanced analytics features.",
    stack: ["C#", ".NET","MySQL", "React"],
    highlights: [
      "Built .NET REST APIs enabling richer reporting, expanding analytical datasets by 20%",
      "Enhanced React dashboards, reducing analyst time-to-insight by ~35%",
      "Streamlined FE–BE communication, lowering API latency by ~200ms",
    ],
    ownership: "Backend API integration and frontend UX upgrades",
    impact:
      "Empowered analysts with faster insights, improving healthcare decision-making speed",
    category: "Company project" as ProjectType,
  },
  {
    title: "PriOSS",
    description: "GDPR-by-design privacy platform enabling user trust.",
    stack: ["Angular", "TypeScript", "Python", "SQLite", "GDPR"],
    highlights: [
      "Implemented local-device processing, eliminating 100% of sensitive cloud workflows",
      "Built granular user consent controls, boosting adoption with ~45% positive feedback",
      "Designed GDPR-compliant UX balancing regulations with usability",
    ],
    ownership: "Privacy-first architecture & UX development",
    impact:
      "Created a scalable compliance-first model, strengthening user trust across industries",
    category: "University project" as ProjectType,
  },
  {
    title: "Civic Guidebook (KnowYourRights)",
    description:
      "Mobile-first legal rights guide helping students and immigrants in Germany understand their everyday rights.",
    stack: ["React", "TypeScript", "Vite", "Tailwind", "shadcn/ui", "React Router"],
    highlights: [
      "Designed searchable FAQs and topic explorers covering housing, work, health, and police rights",
      "Built responsive step-by-step explainers with dual legal vs practical guidance for better accessibility",
      "Structured content into reusable data-driven FAQs and explainer modules, making it easy to scale and maintain across multiple legal topics",
    ],
    ownership:
      "Frontend architecture, reusable component system, data modeling for FAQs/Explainers, deployment pipeline",
    impact:
      "Enabled newcomers to quickly access trusted information on German rights, boosting user confidence and accessibility",
    category: "Personal project" as ProjectType,
    demoUrl: "https://mukulsachdeva1997.github.io/KnowYourRights/", 
  }
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

/** compact label for the corner badge */
function displayCategory(cat: ProjectType) {
  switch (cat) {
    case "Startup project":
      return "Startup";
    case "Company project":
      return "Company";
    case "University project":
      return "University";
    case "Personal project":
      return "Personal";
  }
}

/** color accents for the badge (text + border) */
function badgeClasses(type: ProjectType) {
  switch (type) {
    case "Personal project":
      return "text-purple-500 border-purple-400/40";
    case "Startup project":
      return "text-amber-600 border-amber-500/30";
    case "Company project":
      return "text-blue-600 border-blue-500/30";
    case "University project":
      return "text-emerald-600 border-emerald-500/30";
    default:
      return "text-muted-foreground border-border";
  }
}

function ProjectCard({ project, index }: { project: any; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      className="relative bg-card rounded-2xl shadow-lg hover:shadow-xl transition border border-border"
      data-testid={`card-project-${index}`}
    >
      {/* Top-right corner badge */}
      {project.category && (
        <span
          className={`absolute top-4 right-4 inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-[11px] font-medium whitespace-nowrap
            backdrop-blur-sm bg-background/60 border ${badgeClasses(
              project.category as ProjectType
            )}`}
          data-testid={`tag-category-${index}`}
        >
          {displayCategory(project.category as ProjectType)}
        </span>
      )}

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
                <div key={highlightIndex} className="flex items-start space-x-3">
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

        {/* Footer actions: show View Demo only if demoUrl exists (only for the new project) */}
        <div className="mt-4 flex items-center gap-3">
          {project.demoUrl && (
            <Button
              asChild
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`button-demo-${index}`}
              >
                View Demo
              </a>
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show Less" : "Read More"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}