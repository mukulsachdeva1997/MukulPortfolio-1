import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getProjectBanner } from "@/components/project-banners";

export type ProjectType =
  | "Personal project"
  | "Startup project"
  | "Company project"
  | "University project";

export interface Project {
  id: string;
  title: string;
  filename: string;
  initials: string;
  description: string;
  stack: string[];
  highlights: string[];
  ownership: string;
  impact: string;
  category: ProjectType;
  demoUrl?: string;
  /** optional secondary link, e.g. a thesis PDF, design doc, whitepaper */
  resourceUrl?: string;
  resourceLabel?: string;
}

// Drop a screenshot at client/src/assets/projects/<id>.{png,jpg,jpeg,webp}
// (id matches the `id` field below, e.g. knowyourrights.png) and it appears
// automatically — no code change needed. Projects without a file fall back
// to the gradient/monogram placeholder.
const screenshotModules = import.meta.glob<{ default: string }>(
  "../assets/projects/*.{png,jpg,jpeg,webp}",
  { eager: true }
);

function getScreenshot(id: string): string | undefined {
  for (const path in screenshotModules) {
    const filename = path.split("/").pop()?.replace(/\.[^.]+$/, "");
    if (filename === id) return screenshotModules[path].default;
  }
  return undefined;
}

export const projects: Project[] = [
  {
    id: "knowyourrights",
    title: "KnowYourRights – AI-Powered Legal Rights Guidebook",
    filename: "know-your-rights.tsx",
    initials: "KYR",
    description:
      "Mobile-first legal rights platform helping international students and immigrants in Germany understand visa, housing, work, and consumer-rights scenarios.",
    stack: ["React", "TypeScript", "Vite", "Tailwind", "shadcn/ui", "React Router", "Ollama", "GitHub Actions"],
    highlights: [
      "Built searchable FAQs, topic explainers, bookmarks, Rights Navigator, and official source-backed guidance",
      "Integrated a local Ollama helper to analyze German letters, detect risk levels, and generate English/German summaries",
      "Added report-issue flow and GitHub Actions automation to keep legal content scalable and maintainable",
    ],
    ownership:
      "Frontend architecture, AI document helper, reusable components, content structure, automation, and deployment",
    impact:
      "Made German legal and administrative guidance easier to understand through accessible, privacy-first support",
    category: "Personal project",
    demoUrl: "https://mukulsachdeva1997.github.io/KnowYourRights/",
  },
  {
    id: "tidyteam",
    title: "Tidy Team – Real-Time Household Productivity App",
    filename: "tidy-team.js",
    initials: "TT",
    description:
      "Gamified household chore coordination app for roommates, built as an installable PWA with real-time sync, rotating assignments, and monthly accountability.",
    stack: ["HTML", "CSS", "JavaScript", "Firebase Auth", "Firestore", "Firebase Hosting", "PWA"],
    highlights: [
      "Built real-time chore tracking with Firebase Auth, Firestore sync, invite links, rotations, scoring, and snoozing",
      "Implemented secure Firestore rules, PWA support, light/dark UI, WhatsApp nudges, and monthly reports",
      "Designed playful accountability features including treat penalties, bilingual roasts, and RPS tie-breakers",
    ],
    ownership:
      "Frontend implementation, Firebase setup, Firestore data model, security rules, PWA setup, and documentation",
    impact:
      "Helped roommates coordinate chores, track accountability, and reduce friction in shared households",
    category: "Personal project",
    demoUrl: "https://tidy-team-c729a.web.app",
  },
  {
    id: "thesis",
    title: "Master's Thesis: Open-Source Coopetition Analysis",
    filename: "thesis.py",
    initials: "MT",
    description:
      "Research analytics project analyzing inter-firm collaboration and competitor interaction across firms contributing to the PyTorch open-source ecosystem.",
    stack: ["Python", "GitHub API", "PyDriller", "NetworkX", "Pandas", "Open Source Analytics"],
    highlights: [
      "Built an end-to-end analytics workflow converting Git repository activity into firm-level collaboration networks",
      "Developed reproducible logic for contributor identity resolution, organizational attribution, and repository scope classification",
      "Applied network metrics and firm annotations to analyze collaboration intensity, structural roles, and competitor interaction",
    ],
    ownership:
      "Research design, data mining pipeline, contributor attribution logic, network analysis, and thesis writing",
    impact:
      "Revealed how competing firms collaborate in open-source AI infrastructure, connecting software repository data with strategic ecosystem analysis",
    category: "University project",
    resourceUrl: "/Mukul_Sachdeva_Thesis.pdf",
    resourceLabel: "read thesis",
  },
  {
    id: "iqvia",
    title: "IQVIA Analytics",
    filename: "iqvia.cs",
    initials: "IQ",
    description:
      "Healthcare analytics platform combining .NET REST APIs with React dashboards, giving analysts faster access to the data behind day-to-day reporting decisions.",
    stack: ["C#", ".NET", "MySQL", "React"],
    highlights: [
      "Built .NET REST APIs that expanded the range of data available for reporting",
      "Enhanced React analytics dashboards to help analysts get to insights faster",
      "Streamlined frontend–backend communication to reduce response times and integration friction",
    ],
    ownership: "Backend API integration and frontend UX upgrades",
    impact: "Empowered analysts with faster insights, improving healthcare decision-making speed",
    category: "Company project",
  },
  {
    id: "prioss",
    title: "PriOSS",
    filename: "prioss.ts",
    initials: "PS",
    description:
      "GDPR-by-design privacy platform keeping sensitive data on-device and giving users granular, easy-to-understand consent controls instead of one-size-fits-all banners.",
    stack: ["Angular", "TypeScript", "Python", "SQLite", "GDPR"],
    highlights: [
      "Implemented local-device processing so sensitive personal data never had to leave the user's machine",
      "Built granular, easy-to-understand consent controls that users responded well to in testing",
      "Designed GDPR-compliant UX that balanced regulatory requirements with everyday usability",
    ],
    ownership: "Privacy-first architecture & UX development",
    impact: "Created a scalable compliance-first model, strengthening user trust across industries",
    category: "University project",
    demoUrl: "https://prioss.cs.uni-paderborn.de",
  },
];

const filters: ("All" | ProjectType)[] = [
  "All",
  "Personal project",
  "Company project",
  "University project",
];

function tabLabel(cat: "All" | ProjectType) {
  switch (cat) {
    case "All":
      return "all";
    case "Startup project":
      return "startup";
    case "Company project":
      return "company";
    case "University project":
      return "university";
    case "Personal project":
      return "personal";
  }
}

/** color accents for the modal's category badge */
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

function ProjectVisual({ project, className }: { project: Project; className?: string }) {
  const screenshot = getScreenshot(project.id);

  if (screenshot) {
    return (
      <img
        src={screenshot}
        alt={`${project.title} screenshot`}
        className={cn("w-full object-cover", className)}
        data-testid={`img-project-${project.id}`}
      />
    );
  }

  const Banner = getProjectBanner(project.id);
  if (Banner) {
    return (
      <div data-testid={`img-project-${project.id}`}>
        <Banner className={className} />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-full flex items-center justify-center bg-gradient-to-br from-primary to-secondary",
        className
      )}
      data-testid={`img-project-${project.id}`}
    >
      <span className="font-mono text-2xl font-bold text-white/90 tracking-wide">
        {project.initials}
      </span>
    </div>
  );
}

const MAX_VISIBLE_TAGS = 5;

const SCALE_FALLOFF = 0.22;
const OPACITY_FALLOFF = 0.5;

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<"All" | ProjectType>("All");
  const [openProjectId, setOpenProjectId] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
    containScroll: false,
  });
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reduceMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const filteredProjects = projects.filter(
    (p) => activeFilter === "All" || p.category === activeFilter
  );

  const applyTransforms = useCallback(() => {
    if (!emblaApi) return;
    const root = emblaApi.rootNode();
    const rootRect = root.getBoundingClientRect();
    const center = rootRect.left + rootRect.width / 2;

    slideRefs.current.slice(0, filteredProjects.length).forEach((el) => {
      if (!el) return;
      if (reduceMotion.current) {
        el.style.transform = "";
        el.style.opacity = "";
        el.style.zIndex = "";
        return;
      }
      const rect = el.getBoundingClientRect();
      const slideCenter = rect.left + rect.width / 2;
      const normalized = Math.min(Math.abs(center - slideCenter) / (rootRect.width / 2), 1);
      const scale = 1 - normalized * SCALE_FALLOFF;
      const opacity = 1 - normalized * OPACITY_FALLOFF;
      el.style.transform = `scale(${scale})`;
      el.style.opacity = `${opacity}`;
      el.style.zIndex = `${Math.round((1 - normalized) * 10)}`;
    });
  }, [emblaApi, filteredProjects.length]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    applyTransforms();
    onSelect();
    emblaApi.on("scroll", applyTransforms);
    emblaApi.on("resize", applyTransforms);
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("scroll", applyTransforms);
      emblaApi.off("resize", applyTransforms);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, applyTransforms]);

  useEffect(() => {
    emblaApi?.reInit();
    applyTransforms();
  }, [emblaApi, activeFilter, applyTransforms]);

  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent<{ id: string }>).detail?.id;
      if (!id) return;
      setActiveFilter("All");
      setOpenProjectId(id);
    };
    window.addEventListener("open-project-detail", handler);
    return () => window.removeEventListener("open-project-detail", handler);
  }, []);

  useEffect(() => {
    if (!emblaApi || !openProjectId) return;
    const idx = filteredProjects.findIndex((p) => p.id === openProjectId);
    if (idx >= 0) emblaApi.scrollTo(idx);
  }, [emblaApi, openProjectId, filteredProjects]);

  const openProject = projects.find((p) => p.id === openProjectId) ?? null;

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Featured Projects</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Showcasing end-to-end solutions that solve real-world problems with modern technologies.
          </p>
        </div>

        {/* Category tabs, terminal-editor style */}
        <div className="flex flex-wrap justify-center gap-1 mb-10 font-mono text-sm">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-4 py-2 rounded-t-lg border border-b-0 transition-colors",
                activeFilter === filter
                  ? "bg-card text-foreground border-border"
                  : "bg-muted text-muted-foreground border-transparent hover:text-foreground"
              )}
              data-testid={`filter-${tabLabel(filter)}`}
            >
              {tabLabel(filter)}
            </button>
          ))}
        </div>

        {filteredProjects.length > 0 ? (
          <div className="relative">
            <div className="overflow-hidden py-6 -my-6" ref={emblaRef}>
              <div className="flex">
                {filteredProjects.map((project, i) => (
                  <div
                    key={project.id}
                    className="shrink-0 grow-0 basis-[86%] sm:basis-[62%] lg:basis-[40%] px-3"
                  >
                    {/* Embla's loop engine applies its own transform to the slide
                        element above for wraparound repositioning, so the scale/opacity
                        tween is applied to this inner wrapper instead to avoid clobbering it. */}
                    <div
                      ref={(el) => (slideRefs.current[i] = el)}
                      onClick={() => emblaApi?.scrollTo(i)}
                      className="transition-transform duration-150 ease-out will-change-transform"
                    >
                      <ProjectCard
                        project={project}
                        onViewDetails={() => setOpenProjectId(project.id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant="outline"
              size="icon"
              className="hidden md:inline-flex absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 rounded-full bg-card shadow-md z-20"
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Previous project"
              data-testid="button-carousel-prev"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="hidden md:inline-flex absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 rounded-full bg-card shadow-md z-20"
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Next project"
              data-testid="button-carousel-next"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-4 font-mono">
              {selectedIndex + 1} of {filteredProjects.length}
            </p>
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No projects in this category yet.</p>
        )}
      </div>

      <Dialog open={!!openProject} onOpenChange={(open) => !open && setOpenProjectId(null)}>
        <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
          {openProject && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 flex-wrap pr-6">
                  <DialogTitle className="text-2xl">{openProject.title}</DialogTitle>
                  <span
                    className={cn(
                      "inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-[11px] font-medium whitespace-nowrap border",
                      badgeClasses(openProject.category)
                    )}
                  >
                    {displayCategory(openProject.category)}
                  </span>
                </div>
                <p className="font-mono text-xs text-muted-foreground">{openProject.filename}</p>
              </DialogHeader>

              <ProjectVisual project={openProject} className="h-56 rounded-lg" />

              <div className="flex flex-wrap gap-2 font-mono">
                {openProject.stack.map((tech) => (
                  <span
                    key={tech}
                    className="bg-muted text-foreground px-2 py-1 rounded-md text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <p className="text-muted-foreground">{openProject.description}</p>

              <div className="space-y-3">
                {openProject.highlights.map((highlight, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm">{highlight}</p>
                  </div>
                ))}
              </div>

              <div className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm inline-block w-fit">
                What I owned: {openProject.ownership}
              </div>

              <p className="text-sm text-muted-foreground">{openProject.impact}</p>

              <div className="flex items-center gap-4">
                {openProject.demoUrl && (
                  <a
                    href={openProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm text-secondary hover:underline w-fit"
                  >
                    demo ↗
                  </a>
                )}
                {openProject.resourceUrl && (
                  <a
                    href={openProject.resourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm text-secondary hover:underline w-fit"
                  >
                    {openProject.resourceLabel} ↗
                  </a>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

function ProjectCard({
  project,
  onViewDetails,
}: {
  project: Project;
  onViewDetails: () => void;
}) {
  const visibleTags = project.stack.slice(0, MAX_VISIBLE_TAGS);
  const hiddenCount = project.stack.length - visibleTags.length;

  return (
    <Card
      className="bg-card rounded-2xl shadow-lg hover:shadow-xl transition border border-border overflow-hidden h-[28rem] flex flex-col"
      data-testid={`card-project-${project.id}`}
    >
      {/* Editor-style chrome bar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-muted border-b border-border">
        <span className="w-2 h-2 rounded-full bg-[hsl(0,70%,55%)] opacity-60" />
        <span className="w-2 h-2 rounded-full bg-[hsl(45,90%,55%)] opacity-60" />
        <span className="w-2 h-2 rounded-full bg-[hsl(142,65%,42%)] opacity-60" />
        <span className="ml-1.5 font-mono text-xs text-muted-foreground truncate">
          {project.filename}
        </span>
        <span
          className="ml-auto font-mono text-[10px] uppercase tracking-wide text-muted-foreground flex-shrink-0"
          data-testid={`tag-category-${project.id}`}
        >
          {displayCategory(project.category)}
        </span>
      </div>

      <ProjectVisual project={project} className="h-40" />

      <CardContent className="p-6 flex flex-col gap-3 flex-1 min-h-0">
        <h3
          className="text-xl font-bold leading-snug line-clamp-2"
          data-testid={`text-project-title-${project.id}`}
        >
          {project.title}
        </h3>

        <p
          className="text-muted-foreground text-sm line-clamp-2"
          data-testid={`text-project-description-${project.id}`}
        >
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 font-mono">
          {visibleTags.map((tech) => (
            <span
              key={tech}
              className="bg-muted text-foreground px-2 py-1 rounded-md text-xs"
              data-testid={`tag-tech-${project.id}-${tech}`}
            >
              {tech}
            </span>
          ))}
          {hiddenCount > 0 && (
            <span className="bg-muted text-muted-foreground px-2 py-1 rounded-md text-xs">
              +{hiddenCount}
            </span>
          )}
        </div>

        <div className="mt-auto pt-2 flex items-center justify-between font-mono">
          <button
            onClick={onViewDetails}
            className="text-sm text-secondary hover:underline"
            data-testid={`button-details-${project.id}`}
          >
            › view --details
          </button>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground"
              data-testid={`button-demo-${project.id}`}
            >
              demo ↗
            </a>
          )}
          {project.resourceUrl && (
            <a
              href={project.resourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground"
              data-testid={`button-resource-${project.id}`}
            >
              {project.resourceLabel} ↗
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
