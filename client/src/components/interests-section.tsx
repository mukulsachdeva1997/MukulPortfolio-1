import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Heart, Mountain, Dumbbell, PenTool } from "lucide-react";
import { cn } from "@/lib/utils";

// Drop a photo at client/src/assets/interests/<id>.{png,jpg,jpeg,webp}
// (id matches the `id` field below, e.g. trekking.jpg) and it appears
// automatically — no code change needed. Interests without a file fall
// back to a gradient + icon placeholder.
const photoModules = import.meta.glob<{ default: string }>(
  "../assets/interests/*.{png,jpg,jpeg,webp}",
  { eager: true }
);

function getPhoto(id: string): string | undefined {
  for (const path in photoModules) {
    const filename = path.split("/").pop()?.replace(/\.[^.]+$/, "");
    if (filename === id) return photoModules[path].default;
  }
  return undefined;
}

const interests = [
  {
    id: "trekking",
    title: "Mountain Trekking",
    description: "Exploring nature trails and mountain paths",
    icon: Mountain,
    frameHeight: "h-[380px] lg:h-[640px]",
    objectPosition: "65% 25%",
  },
  {
    id: "fitness",
    title: "Fitness & Training",
    description: "Staying active through regular workouts and strength training",
    icon: Dumbbell,
    frameHeight: "h-[480px] lg:h-[640px]",
    objectPosition: "center 55%",
  },
  {
    id: "sketching",
    title: "Sketching & Art",
    description: "Creating artistic sketches and drawings in spare time",
    icon: PenTool,
    // this is a tall portrait photo, so cover-cropping it at the default
    // frame height clips the top and bottom — a taller frame needs less
    // crop to fill, so more of it shows while still filling edge to edge
    frameHeight: "h-[480px] lg:h-[640px]",
    objectPosition: "center 80%",
  },
];

export function InterestsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = interests[currentIndex];
  const currentPhoto = getPhoto(current.id);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === interests.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? interests.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section id="interests" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 flex items-center justify-center">
            <Heart className="h-8 w-8 text-secondary mr-4" />
            My Interests
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Beyond coding, I explore various activities that keep me inspired and balanced.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
              {/* Main Carousel Image */}
              <div
                className={cn(
                  "relative overflow-hidden transition-all duration-500 ease-in-out",
                  current.frameHeight ?? "h-96 lg:h-[500px]"
                )}
              >
                {currentPhoto ? (
                  <img
                    src={currentPhoto}
                    alt={current.title}
                    style={current.objectPosition ? { objectPosition: current.objectPosition } : undefined}
                    className="w-full h-full object-cover transition-opacity duration-500"
                    data-testid={`img-interest-${currentIndex}`}
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-secondary"
                    data-testid={`img-interest-${currentIndex}`}
                  >
                    <current.icon className="h-24 w-24 text-white/90" strokeWidth={1.25} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pl-[0px] pr-[0px]" />

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-2xl lg:text-3xl font-bold mb-2" data-testid={`text-interest-title-${currentIndex}`}>
                    {current.title}
                  </h3>
                  <p className="text-lg opacity-90" data-testid={`text-interest-description-${currentIndex}`}>
                    {current.description}
                  </p>
                </div>
              </div>

              {/* Navigation Arrows */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm rounded-full"
                onClick={prevSlide}
                aria-label="Previous image"
                data-testid="button-prev-slide"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm rounded-full"
                onClick={nextSlide}
                aria-label="Next image"
                data-testid="button-next-slide"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>

            {/* Thumbnail Navigation */}
            <div className="p-6 bg-muted/30">
              <div className="flex justify-center space-x-4 overflow-x-auto pb-2">
                {interests.map((interest, index) => {
                  const thumbPhoto = getPhoto(interest.id);
                  return (
                    <button
                      key={interest.id}
                      onClick={() => goToSlide(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        index === currentIndex
                          ? 'border-primary shadow-lg scale-105'
                          : 'border-border hover:border-primary/50'
                      }`}
                      data-testid={`thumbnail-${index}`}
                    >
                      {thumbPhoto ? (
                        <img
                          src={thumbPhoto}
                          alt={interest.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-secondary">
                          <interest.icon className="h-7 w-7 text-white/90" strokeWidth={1.25} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Dot Indicators */}
              <div className="flex justify-center space-x-2 mt-4">
                {interests.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentIndex
                        ? 'bg-primary'
                        : 'bg-border hover:bg-primary/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                    data-testid={`dot-indicator-${index}`}
                  />
                ))}
              </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Auto-play indicator */}
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Use arrows or thumbnails to navigate • {currentIndex + 1} of {interests.length}
          </p>
        </div>
      </div>
    </section>
  );
}
