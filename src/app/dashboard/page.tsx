import Link from "next/link";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { GiMedicinePills } from "react-icons/gi";
import { MdMarkEmailUnread } from "react-icons/md";
import { PiAmbulanceFill } from "react-icons/pi";
import { IoDocumentText } from "react-icons/io5";

const Dashboard = () => {
  const items = [
    {
      header: "Drugs about to expire",
      description:
        "Monitor medication inventory and oreorder supplies as needed.",
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
      <div className="flex flex-row items-center gap-2 overflow-x-auto max-w-full [&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar-thumb]:hidden"></div>
      <div className="flex items-center gap-2">
        {items.map((item) => (
          <div
            key={item.link}
            className="w-1/4 p-2 bg-gradient-to-t from-main to-second-green rounded-2xl overflow-hidden"
          >
            <div className="flex items-center justify-center">
              <div className="hidden xmd:block">
                <div className="flex items-center gap-2">
                  <span className="p-1 font-bold rounded-full bg-light-gray text-main">
                    999
                  </span>
                  <p className="text-sm font-semibold text-white">
                    {item.header}
                  </p>
                </div>
                <p className="text-sm text-white mt-1">{item.description}</p>
              </div>
              <div>{item.icon}</div>
            </div>

            <Link href={item.link} className="hover:bg-main">
              <div className="flex items-center py-1 px-2 mt-2 rounded-xl bg-brown hover:text-white hover:bg-second-main transition-colors duration-500 space-x-2 text-main overflow-hidden whitespace-nowrap w-full justify-center xmd:justify-between xmd:w-2/3 ">
                <span className="text-sm font-semibold min-w-0 max-w-full hidden truncate sm:block">
                  {item.navTitle}
                </span>
                <FaArrowRightLong className="w-5 h-5 shrink-0 " />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
