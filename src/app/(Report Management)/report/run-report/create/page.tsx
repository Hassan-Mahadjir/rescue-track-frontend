"use client";
import Carousel from "@/components/Cards-Carousel";
import React from "react";

const CreateRunReport = () => {
  const slides = [
    {
      title: "Registered patient",
      imageSrc: "/report/register.png",
      text: "create report for registered patient in the system",
      buttons: [
        {
          label: "Existing patient",
          href: "create/registered",
        },
      ],
    },
    {
      title: "Unregistered patient",
      imageSrc: "/report/new-account.png",
      text: "create new patient profile, and report",
      buttons: [
        {
          label: "New patient",
          href: "/report/pcr/create/unregistered",
        },
      ],
    },
  ];
  return (
    <div className="flex flex-col items-center text-center justify-center mt-5 md:mt-16">
      {/* Slider */}
      <Carousel slides={slides} />
    </div>
  );
};

export default CreateRunReport;
