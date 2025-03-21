import React from "react";
import { EquipmentStatusChart } from "./DonutChart";
import InventoryChart from "./LineChart";

const data = {
  id: "1",
  title: "768,056 Items",
  date: "As of 08 March 2023",
  full: 25,
  mid: 30,
  low: 25,
  toProduce: 20,
};
const data1 = {
  id: "2",
  title: "1,098,000 Items",
  date: "As of 08 March 2023",
  full: 20,
  mid: 35,
  low: 25,
  toProduce: 80,
};

const colors = {
  full: "#5cd68d",
  mid: "#56b4e9",
  low: "#ff9f40",
  toProduce: "#ff6384",
};

const equipmentData = {
  active: 17,
  idle: 5,
  underRepair: 1,
  total: 23,
};

const InventoryChartControl = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
      <div>
        <InventoryChart data={data} colors={colors} title="Total Materials" />
      </div>
      <div>
        <InventoryChart data={data1} colors={colors} title="Total Inventory" />
      </div>
      <div>
        <EquipmentStatusChart data={equipmentData} />
      </div>
    </div>
  );
};

export default InventoryChartControl;
