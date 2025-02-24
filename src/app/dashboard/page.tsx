import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { GiMedicinePills } from "react-icons/gi";

const Dashboard = () => {
  return (
    <div className="mx-3">
      <div className="flex flex-row items-center gap-2">
        <div className="bg-gradient-to-t from-main to-second-green rounded-2xl py-3 px-2 min-w-fit max-w-xs">
          {/* Amount number with Message */}
          <div className="flex items-center gap-2 min-w-0">
            <div className="bg-light-gray rounded-3xl p-1 flex-shrink-0 hidden xmd:block">
              <span className="font-bold">299</span>
            </div>
            <p className="text-sm font-semibold text-white whitespace-nowrap xmd:text-xl px-3 hidden xmd:block">
              Drugs about to expire
            </p>
          </div>

          <div className="flex mt-1 items-center flex-wrap min-w-0">
            {/* description */}
            <div className="flex flex-col items-center hidden xmd:block min-w-0">
              <p className="text-sm text-white w-3/4 hidden xmd:block ">
                Monitor medication inventory and reorder supplies as needed.
              </p>
              <Link href={"#"} className="hover:bg-main">
                <div className="flex py-1 px-2 mt-2 rounded-xl bg-brown hover:text-white hover:bg-second-main transition-colors duration-500 items-center space-x-2 text-main w-fit">
                  <span className="px-3 text-md font-semibold whitespace-nowrap">
                    Open Inventory
                  </span>
                  <FaArrowRightLong className="w-6 h-5" />
                </div>
              </Link>
            </div>

            {/* icon */}

            <div className="flex flex-col items-center">
              <GiMedicinePills
                className="w-20 h-20 -ml-0 xmd:-ml-32"
                color="white"
              />
              {/* open wanted page  */}
              <Link href={"#"}>
                <div className="flex items-center justify-center rounded-xl bg-brown text-main px-3 py-1 mt-2 hover:text-white hover:bg-second-main transition-colors duration-500 xmd:hidden w-fit ">
                  <span className="text-md font-semibold whitespace-nowrap">
                    Open Inventory
                  </span>
                  <FaArrowRightLong className="w-6 h-5 ml-2" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
