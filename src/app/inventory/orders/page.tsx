import { Calendar } from "@/components/inventory/orders/Calendar";
import { CalendarHeader } from "@/components/inventory/orders/CalendarHeader";
import { CalendarLegend } from "@/components/inventory/orders/CalendarLegend";
import React from "react";

const ReorderManagementPage = () => {
  return (
    <div className="m-5">
      <div className="space-y-2 mb-6">
        <h1 className="text-2xl font-bold">Schedule Orders</h1>
        <p className="text-muted-foreground">
          Create time table to re-order medication automatically
        </p>
      </div>

      <div className="bg-slate-50 rounded-lg p-4 shadow-sm">
        <CalendarHeader />
        <CalendarLegend />
        <Calendar />
      </div>
    </div>
  );
};

export default ReorderManagementPage;
