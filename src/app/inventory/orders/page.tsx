"use client";
import { Calendar } from "@/components/inventory/orders/Calendar";
import { CalendarHeader } from "@/components/inventory/orders/CalendarHeader";
import { CalendarLegend } from "@/components/inventory/orders/CalendarLegend";
import { useState } from "react";

const ReorderManagementPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  return (
    <div className="m-5">
      <div className="space-y-2 mb-6">
        <h1 className="text-2xl font-bold">Schedule Orders</h1>
        <p className="text-muted-foreground">
          Create time table to re-order medication automatically
        </p>
      </div>

      <div className="bg-slate-50 rounded-lg p-4 shadow-sm">
        <CalendarHeader
          currentDate={currentDate}
          onDateChange={setCurrentDate}
        />
        <CalendarLegend />
        <Calendar currentDate={currentDate} />
      </div>
    </div>
  );
};

export default ReorderManagementPage;
