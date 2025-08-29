import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, ChevronDown } from "lucide-react";

export function HeroSection() {
  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {/* Statistics */}
            <div className="text-sm text-muted-foreground space-y-2">
              <div className="flex items-center space-x-8">
                <div data-testid="stat-projects">
                  <span className="text-2xl font-bold text-primary">5+</span>
                  <p className="text-xs">Projects completed</p>
                </div>
                <div data-testid="stat-technologies">
                  <span className="text-2xl font-bold text-secondary">8+</span>
                  <p className="text-xs">Technologies mastered</p>
                </div>
              </div>
            </div>

            {/* Main heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold">
                Hello
                <span className="block text-2xl lg:text-3xl font-normal text-muted-foreground mt-2">
                  — It's Mukul, a full-stack developer
                </span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                I design and ship reliable, performant web apps end-to-end—from crisp UIs to robust APIs—using React/Angular, FastAPI/.NET, and AWS.
              </p>
            </div>

            {/* Contact chips */}
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:mukulsachdeva1997@gmail.com"
                className="inline-flex items-center space-x-2 bg-muted hover:bg-accent px-4 py-2 rounded-full text-sm transition-colors duration-200"
                data-testid="chip-email"
              >
                <Mail className="h-4 w-4 text-primary" />
                <span>mukulsachdeva1997@gmail.com</span>
              </a>
              <a
                href="tel:+4917682407998"
                className="inline-flex items-center space-x-2 bg-muted hover:bg-accent px-4 py-2 rounded-full text-sm transition-colors duration-200"
                data-testid="chip-phone"
              >
                <Phone className="h-4 w-4 text-primary" />
                <span>+49 176 8240 7998</span>
              </a>
              <div className="inline-flex items-center space-x-2 bg-muted px-4 py-2 rounded-full text-sm" data-testid="chip-location">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Paderborn, Germany</span>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4">
              <Button
                variant="outline"
                asChild
                className="px-8 py-3 rounded-lg font-medium"
                data-testid="button-download-cv"
              >
                <a href="/mukul-sachdeva-cv.pdf" download>
                  Download CV
                </a>
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleScrollToSection("contact")}
                className="text-primary hover:text-primary/80 px-8 py-3 font-medium transition-colors duration-200"
                data-testid="button-contact"
              >
                Contact Me
              </Button>
            </div>

            <div className="text-sm text-muted-foreground flex items-center space-x-2">
              <p>Scroll down</p>
              <ChevronDown className="h-4 w-4 animate-bounce" />
            </div>
          </div>

          {/* Professional photo */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800"
                alt="Mukul Sachdeva - Full-Stack Developer"
                className="w-80 h-80 lg:w-96 lg:h-96 object-cover rounded-2xl shadow-2xl animate-float"
                data-testid="img-profile"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary/20 to-secondary/20"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
