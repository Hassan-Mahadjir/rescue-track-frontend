import InventoryChartControl from "@/components/inventory/InventoryChartControl";
import InventoryManagementList from "@/components/inventory/InventoryManagementList";
import React from "react";

const page = () => {
  return (
    <div className="m-5 space-y-3">
      <InventoryChartControl />
      <InventoryManagementList />
    </div>
  );
};

export default page;
