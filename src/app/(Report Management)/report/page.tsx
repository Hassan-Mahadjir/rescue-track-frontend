"use client"; // Ensure this runs only on the client side

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectCoverflow } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
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

      {/* slider */}
      <div className="flex flex-col items-center w-full">
        <Swiper
          effect="coverflow"
          grabCursor={false}
          centeredSlides={true}
          slidesPerView={2}
          loop={true} // Enable infinite scrolling
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 50,
            modifier: 1,
            slideShadows: false,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination]}
          onSlideChange={(swiper) =>
            setCurrentPage((swiper.realIndex % slides.length) + 1)
          }
          className="w-full max-w-lg mt-5"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <ServiceCard {...slide} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Page Indicator */}
        <div className="mt-4 text-lg font-semibold">
          Page {currentPage} of {slides.length}
        </div>
      </div>
    </div>
  );
}
