import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

// Sample interest images - using representative photos from Unsplash
const interestImages = [
  {
    id: 1,
    title: "Mountain Trekking",
    description: "Exploring nature trails and mountain paths",
    image: "https://mukuli.edgeone.app/Screenshot%202025-08-29%20at%2022.33.59.png"
  },
  {
    id: 2,
    title: "Fitness & Training",
    description: "Staying active through regular workouts and strength training",
    image: "https://written-amethyst-e9mw61snwq.edgeone.app/Screenshot%202025-08-29%20at%2022.44.02.png"
  },
  
  {
    id: 3,
    title: "Sketching & Art",
    description: "Creating artistic sketches and drawings in spare time",
    image: "https://unchanged-red-rh67hckppp.edgeone.app/Screenshot%202025-08-29%20at%2022.54.16.png"
  },
];

export function InterestsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === interestImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? interestImages.length - 1 : prevIndex - 1
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
              <div className="relative h-96 lg:h-[500px] overflow-hidden">
                <img
                  src={interestImages[currentIndex].image}
                  alt={interestImages[currentIndex].title}
                  className="w-full h-full object-cover transition-opacity duration-500"
                  data-testid={`img-interest-${currentIndex}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pl-[0px] pr-[0px]" />
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-2xl lg:text-3xl font-bold mb-2" data-testid={`text-interest-title-${currentIndex}`}>
                    {interestImages[currentIndex].title}
                  </h3>
                  <p className="text-lg opacity-90" data-testid={`text-interest-description-${currentIndex}`}>
                    {interestImages[currentIndex].description}
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
                {interestImages.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => goToSlide(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      index === currentIndex 
                        ? 'border-primary shadow-lg scale-105' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    data-testid={`thumbnail-${index}`}
                  >
                    <img
                      src={image.image}
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
              
              {/* Dot Indicators */}
              <div className="flex justify-center space-x-2 mt-4">
                {interestImages.map((_, index) => (
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
            Use arrows or thumbnails to navigate • {currentIndex + 1} of {interestImages.length}
          </p>
        </div>
      </div>
    </section>
  );
}