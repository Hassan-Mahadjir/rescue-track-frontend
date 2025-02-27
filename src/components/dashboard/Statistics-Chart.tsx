import React from "react";
import Barchart from "./Bar-Chart";
import { Piechart } from "./Pie-Chart";
const StatisticsChart = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 px-2 pt-2 pb-4 items-stretch">
      <div className="flex-1 flex items-stretch">
        <Barchart />
      </div>
      <div className="flex-1 flex items-stretch">
        <Piechart />
      </div>
      <div className="col-span-1 md:col-span-2 border"></div>
    </div>
  );
};

export default StatisticsChart;
