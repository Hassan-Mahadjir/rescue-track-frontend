import Link from "next/link";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { GiMedicinePills } from "react-icons/gi";
import { MdMarkEmailUnread } from "react-icons/md";
import { PiAmbulanceFill } from "react-icons/pi";
import { IoDocumentText } from "react-icons/io5";
import clsx from "clsx";
import RecentCard from "@/components/dashboard/Recent-Card";

const Dashboard = () => {
  const items = [
    {
      header: "Drugs about to expire",
      description: "Monitor medication inventory and oreorder supplies.",
      icon: <GiMedicinePills className="w-16 h-16" color="white" />,
      navTitle: "Open Inventory",
      link: "/inventory",
    },
    {
      header: "New received Messages",
      description: "You’ve received new messages check them out.",
      icon: <MdMarkEmailUnread className="w-16 h-16" color="white" />,
      navTitle: "Open Messages",
      link: "/messages",
    },
    {
      header: "Available EMS dispatchers",
      description:
        "Monitor EMS in real-time for instant visibility and control.",
      icon: <PiAmbulanceFill className="w-16 h-16" color="white" />,
      navTitle: "Open EMS Tracker",
      link: "/ems",
    },
    {
      header: "Shift Swapping requests",
      description: "You have received new shift swapping requests.",
      icon: <IoDocumentText className="w-16 h-16" color="white" />,
      navTitle: "Open requests",
      link: "/shift",
    },
  ];

  return (
    <div className="mx-3">
      <RecentCard />
    </div>
  );
};

export default Dashboard;
