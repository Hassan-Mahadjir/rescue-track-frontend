"use client";
import Carousel from "@/components/Cards-Carousel";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
  const slides = [
    {
      title: "Medication & Consumables",
      imageSrc: "/report/health-check.png",
      buttons: [
        { label: "Create new", onClick: () => console.log("Create new") },
        {
          label: "View all Report",
          onClick: () => router.push("/inventory/medication"),
        },
      ],
    },

    {
      title: "Order Management",
      imageSrc: "/report/patient.png",
      buttons: [
        { label: "Create new", onClick: () => console.log("Create new") },
        { label: "View all Report", onClick: () => console.log("View all") },
      ],
    },

    {
      title: "Inventory Management",
      imageSrc: "/report/regulatory.png",
      buttons: [
        { label: "Create new", onClick: () => console.log("Create new") },
        {
          label: "View all Report",
          onClick: () => router.push("/inventory/management"),
        },
      ],
    },
    {
      title: "Supplier & Vendor Management",
      imageSrc: "/report/regulatory.png",
      buttons: [
        { label: "Create new", onClick: () => console.log("Create new") },
        {
          label: "View all Report",
          onClick: () => router.push("/inventory/management"),
        },
      ],
    },
    {
      title: "Equipment & Asset Management",
      imageSrc: "/report/regulatory.png",
      buttons: [
        { label: "Create new", onClick: () => console.log("Create new") },
        {
          label: "View all Report",
          onClick: () => router.push("/inventory/management"),
        },
      ],
    },
  ];
  return (
    <div className="flex flex-col items-center text-center justify-center mt-5">
      <h1 className="text-2xl font-semibold text-main">
        Choose a inventory category:
      </h1>
      <p className="text-lg text-dark-gray">
        to get started with managing medication and consumables
      </p>

      {/* Slider */}
      <Carousel slides={slides} />
    </div>
  );
};

export default page;
