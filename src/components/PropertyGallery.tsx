import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";

interface PropertyGalleryProps {
  images: string[]; // Array of image URLs
}

export default function PropertyGallery({ images }: PropertyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative w-full h-96">
      <div className="absolute top-0 left-0 w-full h-full">
        <img
          src={images[currentIndex]}
          alt={`Property image ${currentIndex + 1}`}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <Button
        className="absolute top-1/2 left-4 transform -translate-y-1/2"
        onClick={goToPrevious}
        variant="outline"
        size="icon"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        className="absolute top-1/2 right-4 transform -translate-y-1/2"
        onClick={goToNext}
        variant="outline"
        size="icon"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
