import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { GiMedicinePills } from "react-icons/gi";

const Dashboard = () => {
  return (
    <div className="mx-3">
      <div className="grid grid-cols-4 items-center">
        <div className="bg-gradient-to-t from-main to-second-green rounded-2xl items-center py-3 px-2">
          {/* Amount number with Message */}
          <div className="flex items-center gap-2">
            <div className="bg-light-gray rounded-3xl p-1 flex-shrink-0 hidden xmd:block">
              <span className="font-bold">299</span>
            </div>
            <p className="text-sm whitespace-nowrap xmd:text-lg px-3 hidden xmd:block">
              Drugs about to expire
            </p>
          </div>
          <div className="flex mt-1 items-center">
            {/* description and open wanted page */}
            <div className="flex-col items-center text-sm hidden xmd:block">
              <p className="text-sm hidden xmd:block">
                Monitor medication inventory and reorder supplies as needed.
              </p>
              <div className="flex py-1 px-2 mt-2 rounded-xl bg-brown items-center space-x-2 text-main w-fit">
                <span className="px-3 text-md font-semibold whitespace-nowrap">
                  Open Inventory
                </span>
                <FaArrowRightLong className="w-6 h-5" />
              </div>
            </div>
            {/* icon */}
            <div className="flex flex-col items-center w-full xmd:w-fit mx-3">
              <GiMedicinePills className="w-20 h-20" />

              <div className="flex items-center justify-center rounded-xl bg-brown text-main px-3 py-1 mt-2 w-fit xmd:hidden ">
                <span className="text-md font-semibold whitespace-nowrap">
                  Open Inventory
                </span>
                <FaArrowRightLong className="w-6 h-5 ml-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
