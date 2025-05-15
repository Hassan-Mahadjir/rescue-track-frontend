import React, { useState } from "react";
import ServiceCard from "./Service-Card";

interface CarouselProps {
  slides: {
    title: string;
    imageSrc?: string;
    icon?: React.ReactNode;
    buttons: { label: string; href: string }[];
  }[];
}

const Carousel: React.FC<CarouselProps> = ({ slides }) => {
  const startIndex =
    slides.length === 1 ? 0 : Math.floor((slides.length - 1) / 2);

  const [currentPage, setCurrentPage] = useState<number>(startIndex);

  return (
    <div className="flex items-center mt-5 gap-5 perspective-1000 flex-col xmd:flex-row">
      {slides.map((slide, index) => {
        const isActive = index === currentPage;

        return (
          <div
            key={slide.title}
            className="transition-transform duration-500 cursor-pointer"
            onClick={() => setCurrentPage(index)}
            style={{
              transform: isActive
                ? "scale(1) translateZ(50px)"
                : "scale(0.9) translateZ(-20px)",
              opacity: isActive ? 1 : 0.9,
            }}
          >
            <ServiceCard {...slide} />
          </div>
        );
      })}
    </div>
  );
};

export default Carousel;
