import { Card, CardContent } from "@/components/ui/card";
import { Globe, Heart, Dumbbell, Mountain, PenTool } from "lucide-react";

const languages = [
  { name: "English", flag: "🇺🇸", level: "C1" },
  { name: "German", flag: "🇩🇪", level: "A2" }
];

const interests = [
  { name: "Fitness", icon: Dumbbell, color: "text-primary" },
  { name: "Trekking", icon: Mountain, color: "text-secondary" },
  { name: "Sketching", icon: PenTool, color: "text-primary" }
];

const volunteeringActivities = [
  { icon: "🩸", activity: "Led blood donation camps in local communities" },
  { icon: "👥", activity: "Organized sanitary workshops for children" }
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Passionate about crafting digital experiences that make a difference.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed" data-testid="text-about-intro">
              I'm a full-stack developer who thrives at the intersection of front-end craft and backend architecture. 
              My expertise spans from creating intuitive user interfaces to designing robust APIs and managing complex data integrations.
            </p>

            <p className="text-lg leading-relaxed" data-testid="text-about-philosophy">
              With a privacy-aware mindset shaped by my work on GDPR-compliant systems, I believe in building technology 
              that respects user privacy while delivering exceptional experiences. I approach every project with attention 
              to performance, security, and maintainability.
            </p>

            <Card className="bg-card rounded-lg border border-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Beyond Code</h3>
                <div className="flex flex-wrap gap-4">
                  {interests.map((interest, index) => {
                    const IconComponent = interest.icon;
                    return (
                      <div key={index} className="flex items-center space-x-2" data-testid={`chip-interest-${index}`}>
                        <IconComponent className={`h-4 w-4 ${interest.color}`} />
                        <span>{interest.name}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Languages & Volunteering */}
          <div className="space-y-8">
            {/* Languages */}
            <Card className="bg-card rounded-2xl shadow-lg border border-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Globe className="h-5 w-5 text-primary mr-3" />
                  Languages
                </h3>
                <div className="space-y-4">
                  {languages.map((language, index) => (
                    <div key={index} className="flex items-center justify-between" data-testid={`item-language-${index}`}>
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl" role="img" aria-label={`${language.name} flag`}>
                          {language.flag}
                        </span>
                        <span className="font-medium">{language.name}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        language.level === 'C1' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'
                      }`}>
                        {language.level}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Volunteering */}
            <Card className="bg-card rounded-2xl shadow-lg border border-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Heart className="h-5 w-5 text-secondary mr-3" />
                  Volunteering
                </h3>
                <div className="space-y-3">
                  <p className="text-muted-foreground" data-testid="text-volunteering-period">2017 – 2022</p>
                  <div className="space-y-2">
                    {volunteeringActivities.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3" data-testid={`item-volunteering-${index}`}>
                        <span className="text-secondary text-lg" role="img" aria-hidden="true">
                          {activity.icon}
                        </span>
                        <p>{activity.activity}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
