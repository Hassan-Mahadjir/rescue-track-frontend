import React from "react";
import Barchart from "./Bar-Chart";

const StatisticsChart = () => {
  return (
    <div className="grid grid-cols-2 gap-2 px-2 pt-2 pb-4">
      <div className="">
        <Barchart />
      </div>
      <div className="border"></div>

      <div className="col-span-2 border"></div>
    </div>
  );
};

export default StatisticsChart;
