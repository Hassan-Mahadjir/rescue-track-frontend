import InventoryChartControl from "@/components/inventory/InventoryChartControl";
import InventoryManagementList from "@/components/inventory/InventoryManagementList";
import React from "react";

const page = () => {
  return (
    <div className="m-5 space-y-3">
      <p className="text-center font-bold">
        📌 This page is only for show case, and it does not reflect your real
        data.
      </p>
      <p className="text-center text-sm mb-5">
        ✅it will be designed base on the hospital needs data.
      </p>

      <InventoryChartControl />
      <InventoryManagementList />
    </div>
  );
};

export default page;
