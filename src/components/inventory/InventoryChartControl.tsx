import React from "react";
import LineChart from "./LineChart";
import DonutChart from "./DonutChart";

const InventoryChartControl = () => {
  return (
    <div className="flex justify-between m-4">
      <div>
        <LineChart />
      </div>
      <div>chart2</div>
      <div>
        <DonutChart />
      </div>
    </div>
  );
};

export default InventoryChartControl;
