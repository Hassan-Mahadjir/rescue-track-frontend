"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type OrderType = "medication" | "vaccine" | "syringe" | "lab";

interface Order {
  type: OrderType;
  day: number;
}

export function Calendar() {
  // Sample data for the calendar
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dates = [
    [28, 29, 30, 31, 1, 2, 3],
    [4, 5, 6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22, 23, 24],
    [25, 26, 27, 28, 29, 30, 1],
  ];

  // Sample orders data
  const [orders, setOrders] = useState<Order[]>([
    // Week 2
    { type: "medication", day: 4 },
    { type: "medication", day: 5 },
    { type: "medication", day: 6 },
    { type: "medication", day: 7 },
    { type: "medication", day: 8 },
    { type: "medication", day: 9 },
    { type: "medication", day: 10 },

    // Week 3
    { type: "medication", day: 11 },
    { type: "medication", day: 12 },
    { type: "medication", day: 13 },
    { type: "medication", day: 14 },
    { type: "medication", day: 15 },
    { type: "syringe", day: 11 },
    { type: "syringe", day: 12 },
    { type: "syringe", day: 13 },
    { type: "syringe", day: 14 },
    { type: "syringe", day: 15 },
    { type: "syringe", day: 16 },
    { type: "syringe", day: 17 },

    // Week 4
    { type: "medication", day: 18 },
    { type: "medication", day: 19 },
    { type: "medication", day: 20 },
    { type: "medication", day: 21 },
    { type: "medication", day: 22 },
    { type: "medication", day: 23 },

    // Week 5
    { type: "medication", day: 25 },
    { type: "medication", day: 26 },
    { type: "medication", day: 27 },
    { type: "medication", day: 28 },
    { type: "medication", day: 29 },
    { type: "medication", day: 30 },
    { type: "lab", day: 25 },
    { type: "lab", day: 26 },
    { type: "lab", day: 27 },
    { type: "lab", day: 28 },
    { type: "lab", day: 29 },
    { type: "lab", day: 30 },
  ]);

  // Special notification for day 16
  const hasNotification = (day: number) => day === 16;

  // Get order types for a specific day
  const getOrdersForDay = (day: number) => {
    return orders
      .filter((order) => order.day === day)
      .map((order) => order.type);
  };

  // Get color class for order type
  const getColorForType = (type: OrderType) => {
    switch (type) {
      case "medication":
        return "bg-orange-400";
      case "vaccine":
        return "bg-yellow-400";
      case "syringe":
        return "bg-blue-400";
      case "lab":
        return "bg-green-400";
      default:
        return "";
    }
  };

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="grid grid-cols-7 text-center">
        {days.map((day, i) => (
          <div key={i} className="py-2 font-medium border-b">
            {day}
          </div>
        ))}
      </div>

      <div>
        {dates.map((week, weekIndex) => (
          <div
            key={weekIndex}
            className="grid grid-cols-7 border-b last:border-b-0"
          >
            {week.map((date, dateIndex) => {
              const dayOrders = getOrdersForDay(date);
              const isCurrentMonth = !(
                (weekIndex === 0 && date > 20) ||
                (weekIndex === 4 && date < 10)
              );

              return (
                <div
                  key={dateIndex}
                  className={cn(
                    "min-h-24 border-r last:border-r-0 relative p-1",
                    !isCurrentMonth && "text-gray-400"
                  )}
                >
                  <div className="text-right p-1">{date}</div>

                  {hasNotification(date) && (
                    <div className="absolute top-1 right-1/2 transform translate-x-1/2 w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center text-white text-xs">
                      16
                    </div>
                  )}

                  <div className="mt-auto space-y-1 pt-8">
                    {["medication", "vaccine", "syringe", "lab"].map((type) => {
                      const hasType = dayOrders.includes(type as OrderType);
                      if (!hasType) return null;

                      return (
                        <div
                          key={type}
                          className={cn(
                            "h-1.5 rounded-sm",
                            getColorForType(type as OrderType)
                          )}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
