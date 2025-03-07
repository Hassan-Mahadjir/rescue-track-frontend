"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { IoIosMenu } from "react-icons/io";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

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
        <div className="  rounded-3xl bg-main xmd:bg-light-gray">
          <div className="flex items-center font-medium px-0 py-0 xmd:py-3">
            {navItems.map((item, index) => (
              <div key={item.route} className="flex hidden xmd:block">
                <Link href={item.link} onClick={() => setCurrentItem(index)}>
                  <span
                    className={clsx(
                      "px-3 py-2 mx-1 rounded-3xl whitespace-nowrap hover:bg-main hover:text-white transition-colors duration-500",
                      {
                        "bg-main text-white": pathName.startsWith(item.link),
                        "bg-light-gray": !pathName.startsWith(item.link),
                      }
                    )}
                  >
                    {item.name}
                  </span>
                </Link>
              </div>
            ))}
            {/* Display nav elemet when screen is small */}
            <Popover>
              <PopoverTrigger asChild>
                <div className="block px-3 py-3 rounded-full xmd:hidden justify-items-center hover:bg-second-main hover:text-white  transition-colors duration-500">
                  <IoIosMenu className="w-6 h-6" color="white" />
                </div>
              </PopoverTrigger>
              <PopoverContent>
                {navItems.map((item, index) => (
                  <div key={item.route} className="flex-col">
                    <Link
                      href={item.link}
                      onClick={() => setCurrentItem(index)}
                    >
                      <span
                        className={clsx(
                          "px-3 py-2 whitespace-nowrap hover:text-main hover:font-bold transition-colors duration-500",
                          {
                            "text-main font-bold": item.route === currentPath,
                            "bg-white": item.route !== currentPath,
                          }
                        )}
                      >
                        {item.name}
                      </span>
                    </Link>
                  </div>
                ))}
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* settings area */}
        <div className="p-1 rounded-3xl bg-main text-white hover:bg-second-main hover:text-white  transition-colors duration-500">
          <Link href="/settings">
            <div className="flex items-center font-medium px-2 py-2 rounded-3xl">
              <IoSettingsOutline className="w-6 h-6" />
              <span className=" px-2 hidden xd:block">settings</span>
            </div>
          </Link>
        </div>

        {/* notifiaction area */}
        <div className="p-1 rounded-3xl bg-main hover:bg-second-main hover:text-white transition-colors duration-500">
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
