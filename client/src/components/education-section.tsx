import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, University } from "lucide-react";

const education = [
  {
    degree: "M.Sc. Computer Science",
    institution: "Universität Paderborn",
    period: "Apr 2022 – Present",
    icon: GraduationCap,
    color: "primary",
    seminars: [
      "Novel Approaches of Requirements Elicitation, Reuse and Evolution",
      "Advancements in Parallelising Static Program Analyses: A Comprehensive Overview"
    ]
  },
  {
    degree: "B.Tech Computer Science",
    institution: "GNDEC, Ludhiana",
    period: "Aug 2016 – Apr 2020 • Final Grade: 2.34",
    icon: University,
    color: "secondary",
    projects: [
      { type: "Major", name: "Profanity Spotting System" },
      { type: "Minors", name: "Disease Prediction System, Restaurant Management System" }
    ]
  }
];

export function EducationSection() {
  return (
    <section id="education" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Education</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Academic foundation in computer science with specialized focus on modern development practices.
          </p>
        </div>

        <div className="space-y-8">
          {education.map((edu, index) => {
            const IconComponent = edu.icon;
            return (
              <Card key={index} className="bg-card rounded-2xl shadow-lg border border-border" data-testid={`card-education-${index}`}>
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-2" data-testid={`text-education-degree-${index}`}>
                        {edu.degree}
                      </h3>
                      <p className="text-xl text-primary mb-2" data-testid={`text-education-institution-${index}`}>
                        {edu.institution}
                      </p>
                      <p className="text-muted-foreground" data-testid={`text-education-period-${index}`}>
                        {edu.period}
                      </p>
                    </div>
                    <div className="mt-4 lg:mt-0">
                      <IconComponent className={`h-10 w-10 ${edu.color === 'primary' ? 'text-primary' : 'text-secondary'}`} />
                    </div>
                  </div>

                  <div className="space-y-3">
                    {edu.seminars && (
                      <>
                        <h4 className="font-semibold text-lg">Key Seminars:</h4>
                        {edu.seminars.map((seminar, seminarIndex) => (
                          <div key={seminarIndex} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            <p data-testid={`text-education-seminar-${index}-${seminarIndex}`}>
                              "{seminar}"
                            </p>
                          </div>
                        ))}
                      </>
                    )}

                    {edu.projects && (
                      <>
                        <h4 className="font-semibold text-lg">Major Projects:</h4>
                        {edu.projects.map((project, projectIndex) => (
                          <div key={projectIndex} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                            <p data-testid={`text-education-project-${index}-${projectIndex}`}>
                              <strong>{project.type}:</strong> {project.name}
                            </p>
                          </div>
                        ))}
                      </>
                    )}
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
