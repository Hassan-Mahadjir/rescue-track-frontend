"use client";

import { useState } from "react";
import ServiceCard from "@/components/Service-Card";

const slides = [
  {
    title: "Patient Care Report",
    imageSrc: "/report/patient.png",
    buttons: [
      { label: "Create new", onClick: () => console.log("Create new") },
      { label: "View all", onClick: () => console.log("View all") },
    ],
  },
  {
    title: "Medical History",
    imageSrc: "/report/medical.png",
    buttons: [
      { label: "Create new", onClick: () => console.log("Create new") },
      { label: "View all", onClick: () => console.log("View all") },
    ],
  },
  {
    title: "Lab Reports",
    imageSrc: "/report/lab.png",
    buttons: [
      { label: "Create new", onClick: () => console.log("Create new") },
      { label: "View all", onClick: () => console.log("View all") },
    ],
  },
];

export default function SwiperComponent() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex flex-col items-center text-center justify-center">
      <h1 className="text-2xl font-semibold text-main">
        Choose a report category
      </h1>
      <p className="text-lg text-dark-gray">
        Start creating or reviewing reports.
      </p>

      {/* Slider */}
      <div className="relative flex items-center mt-5 gap-5 perspective-1000">
        {slides.map((slide, index) => {
          const isActive = index === currentPage;

          return (
            <div
              key={slide.title}
              className="transition-transform duration-500 cursor-pointer"
              onClick={() => setCurrentPage(index)} // Set clicked slide as current
              style={{
                transform: isActive
                  ? "scale(1) translateZ(50px)" // Active slide pops forward
                  : "scale(0.9) translateZ(-20px)", // Others appear slightly behind
                opacity: isActive ? 1 : 0.8, // Dim non-active slides slightly
              }}
            >
              <ServiceCard {...slide} />
            </div>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="mt-4 flex gap-4">
        <button
          className="px-4 py-2 bg-white text-black rounded"
          onClick={() =>
            setCurrentPage((prev) => (prev > 0 ? prev - 1 : slides.length - 1))
          }
        >
          Prev
        </button>
        <button
          className="px-4 py-2 bg-white text-black rounded"
          onClick={() =>
            setCurrentPage((prev) => (prev < slides.length - 1 ? prev + 1 : 0))
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}
