import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function CarouselPlugin({ data }) {
  console.log(data && data?.image.flat());

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  // Tableau contenant les URL des images
  const images = data && data?.image;

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {images &&
            images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="p-2">
                  <Card className="shadow-lg">
                    <CardContent className="flex aspect-square items-center justify-center p-4">
                      <Image
                        src={image}
                        alt={`Product image ${index + 1}`}
                        className="object-contain px-6"
                        width={500}
                        height={500}
                        priority
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>

        {/* Flèche Précédente */}
        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200">
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </CarouselPrevious>

        {/* Flèche Suivante */}
        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200">
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </CarouselNext>
      </Carousel>
    </div>
  );
}
