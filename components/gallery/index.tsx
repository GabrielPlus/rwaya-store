"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Image as ImageType } from "@/types";
import { useMediaQuery } from "@/hooks/use-media-query";

interface GalleryProps {
  images: ImageType[];
};

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const isDesktop = useMediaQuery("(min-width: 640px)");

  return (
    <div className="w-full">
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image) => (
            <CarouselItem key={image.id}>
              <div className="p-1">
                <div className="relative aspect-square">
                  <Image
                    fill
                    src={image.url}
                    alt="Product image"
                    className="object-cover object-center rounded-lg"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Navigation Arrows */}
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
        
        {/* Thumbnail Navigation (Desktop only) */}
        {isDesktop && (
          <div className="mx-auto mt-6 w-full max-w-2xl lg:max-w-none">
            <div className="grid grid-cols-4 gap-4 px-8">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => {} /* You'll need to implement navigation */}
                  className="relative aspect-square rounded-md overflow-hidden"
                >
             
                </button>
              ))}
            </div>
          </div>
        )}
      </Carousel>
    </div>
  );
};

export default Gallery;