import { Card, CardContent } from "@/components/ui/card";

const experiences = [
  {
    title: "Full-Stack Developer",
    company: "Lasken GmbH",
    period: "Dec 2024 – May 2025",
    technologies: ["React", "Angular", "Python", "C#", "AWS"],
    highlights: [
      "Developed React/Angular front-ends with performance tuning and responsive UI/UX",
      "Built custom APIs in Python (Flask) and C# (.NET) with MySQL integration",
      "Collaborated cross-functionally using GitHub, Docker, AWS for secure delivery"
    ]
  },
  {
    title: "Data Science Training",
    company: "Industrial Training",
    period: "Jun 2019 – Dec 2019",
    technologies: ["Python", "Machine Learning", "Healthcare"],
    highlights: [
      "Built predictive disease diagnosis models in Python for early detection from symptoms"
    ]
  },
  {
    title: "Web Development Training",
    company: "Industrial Training", 
    period: "Jun 2018 – Jul 2018",
    technologies: ["HTML/CSS", "JavaScript", "PHP", "MySQL"],
    highlights: [
      "Developed full restaurant website with menu and online ordering system using HTML/CSS/JS/Bootstrap + PHP/MySQL/JSON"
    ]
  }
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Experience</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Building solutions across the full stack with focus on performance, security, and collaboration.
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <Card key={index} className="bg-card rounded-2xl shadow-lg border border-border" data-testid={`card-experience-${index}`}>
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2" data-testid={`text-experience-title-${index}`}>
                      {experience.title}
                    </h3>
                    <p className="text-xl text-primary mb-2" data-testid={`text-experience-company-${index}`}>
                      {experience.company}
                    </p>
                    <p className="text-muted-foreground" data-testid={`text-experience-period-${index}`}>
                      {experience.period}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4 lg:mt-0">
                    {experience.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                        data-testid={`tag-experience-tech-${index}-${techIndex}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  {experience.highlights.map((highlight, highlightIndex) => (
                    <div key={highlightIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p data-testid={`text-experience-highlight-${index}-${highlightIndex}`}>
                        {highlight}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
