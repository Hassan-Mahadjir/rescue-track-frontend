"use client";
import Carousel from "@/components/Cards-Carousel";
import React from "react";

export default function SwiperComponent() {
  const slides = [
    {
      title: "Run Report",
      imageSrc: "/report/health-check.png",
      buttons: [
        {
          label: "Create new",
          href: "/report/run-report/create",
        },
        {
          label: "View all",
          href: "/report/run-report",
        },
      ],
    },

    {
      title: "Patient Care Report",
      imageSrc: "/report/patient.png",
      buttons: [
        {
          label: "Create new",
          href: "/report/pcr/create",
        },
        {
          label: "View all",
          href: "/report/pcr",
        },
      ],
    },

    {
      title: "Compliance and Performance",
      imageSrc: "/report/regulatory.png",
      buttons: [
        {
          label: "Create new",
          href: "/compliance-performance", // Update this when route is ready
        },
        {
          label: "View all",
          href: "/compliance-performance", // Update this when route is ready
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col items-center text-center justify-center mt-5">
      <h1 className="text-2xl font-semibold text-main">
        Choose a report category
      </h1>
      <p className="text-lg text-dark-gray">
        Start creating or reviewing reports.
      </p>

      {/* Slider */}
      <Carousel slides={slides} />
    </div>
  );
}
