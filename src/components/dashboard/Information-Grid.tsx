import React from "react";
import DoctorList from "./Doctor-List";
import StatisticsChart from "./Statistics-Chart";

const InformationGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-3 lg:max-xl:grid-cols-1 xmd:grid-cols-4 ">
      {/* List of Doctors */}
      <DoctorList />
      <div className="col-span-1 border rounded-lg px-2 pt-2 pb-4 xmd:col-span-2">
        <StatisticsChart />
      </div>
      <div className="border rounded-lg px-2 pt-2 pb-4">03</div>
    </div>
  );
};

export default InformationGrid;
