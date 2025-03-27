"use client";
import Carousel from "@/components/Cards-Carousel";
import { useRouter } from "next/navigation";

export default function SwiperComponent() {
  const router = useRouter();
  const slides = [
    {
      title: "Run Report",
      imageSrc: "/report/health-check.png",
      buttons: [
        {
          label: "Create new",
          onClick: () => router.push("/report/run-report/create"),
        },
        { label: "View all", onClick: () => router.push("/report/run-report") },
      ],
    },

    {
      title: "Patient Care Report",
      imageSrc: "/report/patient.png",
      buttons: [
        {
          label: "Create new",
          onClick: () => router.push("/report/pcr/create"),
        },
        { label: "View all", onClick: () => router.push("/report/pcr") },
      ],
    },

    {
      title: "Compliance and Performance",
      imageSrc: "/report/regulatory.png",
      buttons: [
        { label: "Create new", onClick: () => console.log("Create new") },
        { label: "View all", onClick: () => console.log("View all") },
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
