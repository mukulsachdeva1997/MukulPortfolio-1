import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Github, Lock } from "lucide-react";

const projects = [
  {
    title: "DailiQ E-commerce",
    description: "Custom Shopify e-commerce integration with seamless middleware architecture.",
    stack: ["Next.js", "FastAPI", "Shopify API", "AWS"],
    highlights: [
      "Built custom FastAPI middleware for GraphQL query validation and proxying",
      "Implemented dynamic routing in Next.js with optimized data fetching",
      "Achieved faster integrations and cleaner separation of concerns"
    ],
    ownership: "Full-stack development",
    links: {
      live: "#",
      github: "#"
    }
  },
  {
    title: "IQVIA Analytics",
    description: "Custom feature development for healthcare analytics platform.",
    stack: ["C#", ".NET", "React", "Healthcare"],
    highlights: [
      "Designed REST endpoints in .NET for new data features",
      "Enhanced React UX and data visualization components",
      "Improved FE-BE communication and reduced response times"
    ],
    ownership: "Backend APIs & Frontend UX",
    links: {
      private: true
    }
  },
  {
    title: "PriOSS",
    description: "Privacy-first data management platform with GDPR-by-design architecture.",
    stack: ["Angular", "TypeScript", "Python", "GDPR"],
    highlights: [
      "Implemented local-device processing for enhanced privacy",
      "Built granular user data control and visualization",
      "Created transparent UX for multi-service data management"
    ],
    ownership: "Privacy architecture & UX",
    links: {
      live: "#",
      github: "#"
    }
  }
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Featured Projects</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Showcasing end-to-end solutions that solve real problems with modern technology stacks.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="bg-card rounded-2xl shadow-lg hover-lift border border-border" data-testid={`card-project-${index}`}>
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-bold" data-testid={`text-project-title-${index}`}>{project.title}</h3>
                    <div className="flex space-x-2">
                      {project.links.private ? (
                        <div className="text-muted-foreground">
                          <Lock className="h-4 w-4" />
                        </div>
                      ) : (
                        <>
                          {project.links.live && (
                            <a
                              href={project.links.live}
                              className="text-primary hover:text-primary/80 transition-colors"
                              aria-label="View live demo"
                              data-testid={`link-project-live-${index}`}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                          {project.links.github && (
                            <a
                              href={project.links.github}
                              className="text-muted-foreground hover:text-foreground transition-colors"
                              aria-label="View source code"
                              data-testid={`link-project-github-${index}`}
                            >
                              <Github className="h-4 w-4" />
                            </a>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.stack.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                        data-testid={`tag-tech-${index}-${techIndex}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-muted-foreground mb-6" data-testid={`text-project-description-${index}`}>
                  {project.description}
                </p>

                <div className="space-y-3 mb-6">
                  {project.highlights.map((highlight, highlightIndex) => (
                    <div key={highlightIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm" data-testid={`text-project-highlight-${index}-${highlightIndex}`}>
                        {highlight}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm inline-block" data-testid={`tag-ownership-${index}`}>
                  What I owned: {project.ownership}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
