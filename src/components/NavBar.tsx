"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
const navItems = [
  {
    name: "Dashboard",
    link: "/dashboard",
    route: "dashboard",
  },
  {
    name: "Report",
    link: "/report",
    route: "report",
  },
  {
    name: "Inventory",
    link: "/inventory",
    route: "inventory",
  },
  {
    name: "Shift & Attendance",
    link: "/shift-attendance",
    route: "shift-attendance",
  },
  {
    name: "Communication",
    link: "/communication",
    route: "communication",
  },
  {
    name: "EMS",
    link: "/ems",
    route: "ems",
  },
];
function NavBar() {
  const pathName = usePathname();
  const currentPath = pathName.split("/").pop();
  const [currentItem, setCurrentItem] = useState(0);

  useEffect(() => {
    const stepIndex = navItems.findIndex((item) => item.route === currentPath);
    setCurrentItem(stepIndex !== -1 ? stepIndex : 0);
  }, [currentPath]);

  return (
    <nav className="justify-items-end">
      <div className="flex items-center h-16 px-4 space-x-3">
        {/* Nav links */}
        <div className="hidden px-2 py-3 rounded-3xl bg-second-main text-white md:block sm:block ">
          <div className="flex items-center space-x-3 font-medium">
            {navItems.map((item, index) => (
              <div key={item.route}>
                <Link href={item.link} onClick={() => setCurrentItem(index)}>
                  <span
                    className={clsx(
                      "px-3 py-2 rounded-3xl whitespace-nowrap hover:bg-main hover:text-white transition-colors duration-500",
                      {
                        "bg-main": item.route === currentPath,
                        "bg-second-main": item.route !== currentPath,
                      }
                    )}
                  >
                    {item.name}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* settings area */}
        <div className="p-1 rounded-3xl bg-second-main text-white hover:bg-main hover:text-white  transition-colors duration-500">
          <Link href="/settings">
            <div className="flex items-center font-medium px-2 py-2 rounded-3xl">
              <IoSettingsOutline className="w-5 h-5" />
              <span className=" px-2 hidden sm:block md:block">settings</span>
            </div>
          </Link>
        </div>

        {/* notifiaction area */}
        <div className="p-1 rounded-3xl bg-second-main hover:bg-main hover:text-white  transition-colors duration-500">
          <Link href="/notification">
            <div className="flex items-center font-medium px-2 py-2 rounded-3xl">
              <IoNotificationsOutline className="w-6 h-6" color="white" />
            </div>
          </Link>
        </div>

        {/* user profile */}
        <div className="">
          <Link href="/profile">
            <Image
              src="/auth/login-plant.jpg"
              alt="profile"
              className="w-12 h-12 object-cover rounded-full hover:shadow-lg transition-shadow duration-500"
              width={50}
              height={50}
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
