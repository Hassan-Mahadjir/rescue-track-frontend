"use client";
import Carousel from "@/components/Cards-Carousel";
import React from "react";

const Page = () => {
  const slides = [
    {
      title: "Medication & Consumables",
      imageSrc: "/inventory/syringe.png",
      buttons: [
        {
          label: "View all",
          href: "/inventory/medication",
        },
      ],
    },
    {
      title: "Order Management",
      imageSrc: "/inventory/shopping-list.png",
      buttons: [
        {
          label: "View all",
          href: "/inventory/orders",
        },
      ],
    },
    {
      title: "Inventory Management",
      imageSrc: "/inventory/inventory-management.png",
      buttons: [
        {
          label: "View all",
          href: "/inventory/management",
        },
      ],
    },
    {
      title: "Supplier & Vendor Management",
      imageSrc: "/inventory/supplier.png",
      buttons: [
        {
          label: "View all",
          href: "/inventory/supplier-vendor",
        },
      ],
    },
    {
      title: "Equipment & Asset Management",
      imageSrc: "/inventory/medical-devices.png",
      buttons: [
        {
          label: "View all",
          href: "/inventory/management",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col items-center text-center justify-center mt-5">
      <h1 className="text-2xl font-semibold text-main">
        Choose an inventory category:
      </h1>
      <p className="text-lg text-dark-gray">
        to get started with managing medication and consumables
      </p>

      <Carousel slides={slides} />
    </div>
  );
};

export default Page;
