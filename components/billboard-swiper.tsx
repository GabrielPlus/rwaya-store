"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Billboard } from "@/types";

interface BillboardSwiperProps {
  billboards: Billboard[];
}

const BillboardSwiper: React.FC<BillboardSwiperProps> = ({ billboards }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Auto-slide functionality
  useEffect(() => {
    if (billboards.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % billboards.length);
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, [billboards.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % billboards.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + billboards.length) % billboards.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (billboards.length === 0) {
    return null;
  }

  // If only one billboard, render it without swiper functionality
  if (billboards.length === 1) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
        <div
          style={{ backgroundImage: `url(${billboards[0]?.imageUrl})` }}
          className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
        >
          <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
            <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs">
              {billboards[0].label}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
      <div className="relative aspect-square md:aspect-[2.4/1] overflow-hidden rounded-xl">
        {/* Slides */}
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {billboards.map((billboard, index) => (
            <div
              key={billboard.id}
              className="w-full flex-shrink-0 relative bg-cover bg-center"
              style={{ backgroundImage: `url(${billboard.imageUrl})` }}
            >
              <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
                <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs text-white drop-shadow-lg">
                  {billboard.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-200"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {billboards.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide
                  ? "bg-white"
                  : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BillboardSwiper;