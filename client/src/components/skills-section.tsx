import { Card, CardContent } from "@/components/ui/card";
import { Code, Laptop, Database, Cloud } from "lucide-react";

const skillCategories = [
  {
    title: "Languages",
    icon: Code,
    color: "primary",
    skills: ["JavaScript", "Python", "C#", "PHP", "Java", "C/C++"]
  },
  {
    title: "Web & Frameworks",
    icon: Laptop,
    color: "secondary",
    skills: ["React", "Angular", "FastAPI", ".NET", "Flask", "Bootstrap"]
  },
  {
    title: "Databases",
    icon: Database,
    color: "primary",
    skills: ["MySQL", "XML", "JSON"]
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    color: "secondary",
    skills: ["AWS", "Docker", "GitHub Actions", "Linux"]
  }
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Skills & Technologies</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive toolkit for building modern, scalable web applications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card key={index} className="bg-card rounded-2xl shadow-lg border border-border" data-testid={`card-skill-category-${index}`}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center" data-testid={`text-skill-title-${index}`}>
                    <IconComponent className={`h-5 w-5 mr-3 ${category.color === 'primary' ? 'text-primary' : 'text-secondary'}`} />
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className={`px-3 py-1 rounded-full text-sm ${
                          category.color === 'primary'
                            ? 'bg-primary/10 text-primary'
                            : 'bg-secondary/10 text-secondary'
                        }`}
                        data-testid={`tag-skill-${index}-${skillIndex}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
