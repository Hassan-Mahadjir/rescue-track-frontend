"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { OrderDetail } from "./OrderDetail";

type OrderType = "medication" | "vaccine" | "syringe" | "lab";

interface Order {
  type: OrderType;
  day: number;
  month: number;
  year: number;
  name: string;
  quantity: number;
}

interface CalendarProps {
  currentDate: Date;
}

export function Calendar({ currentDate }: CalendarProps) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Generate calendar dates based on currentDate
  const [calendarDates, setCalendarDates] = useState<number[][]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  // Generate calendar dates for the current month
  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);

    // Get the day of the week for the first day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    // Convert to Monday-based (0 = Monday, ..., 6 = Sunday)
    let firstDayOfWeek = firstDay.getDay() - 1;
    if (firstDayOfWeek === -1) firstDayOfWeek = 6; // Sunday becomes 6

    // Calculate how many days from the previous month we need to show
    const daysFromPrevMonth = firstDayOfWeek;

    // Calculate the start date (might be from the previous month)
    const startDate = new Date(year, month, 1 - daysFromPrevMonth);

    // Generate 6 weeks (42 days) of dates
    const dates: number[][] = [];
    let currentWeek: number[] = [];

    for (let i = 0; i < 42; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);

      currentWeek.push(currentDate.getDate());

      if (currentWeek.length === 7) {
        dates.push([...currentWeek]);
        currentWeek = [];
      }
    }

    setCalendarDates(dates);

    // Generate sample orders for the current month
    generateSampleOrders(year, month);
  }, [currentDate]);

  // Generate sample orders for the current month
  const generateSampleOrders = (year: number, month: number) => {
    const medications = [
      "Lisinopril 10mg",
      "Metformin 500mg",
      "Atorvastatin 20mg",
      "Levothyroxine 50mcg",
      "Omeprazole 20mg",
      "Sertraline 50mg",
      "Amlodipine 5mg",
      "Hydrochlorothiazide 25mg",
      "Gabapentin 300mg",
      "Prednisone 10mg",
      "Furosemide 40mg",
      "Pantoprazole 40mg",
      "Montelukast 10mg",
      "Albuterol Inhaler",
      "Losartan 50mg",
      "Simvastatin 40mg",
    ];

    const vaccines = [
      "Flu Vaccine",
      "Pneumonia Vaccine",
      "COVID-19 Vaccine",
      "Shingles Vaccine",
      "Tetanus Vaccine",
      "Hepatitis B Vaccine",
      "HPV Vaccine",
      "MMR Vaccine",
    ];

    const syringes = [
      "Insulin Syringes",
      "Tuberculin Syringes",
      "Hypodermic Needles",
      "Insulin Pen Needles",
      "Allergy Syringes",
      "BD Safety Syringes",
      "Luer Lock Syringes",
      "Oral Syringes",
    ];

    const labEquipment = [
      "Blood Collection Tubes",
      "Glucose Test Strips",
      "Urine Sample Containers",
      "Rapid Strep Tests",
      "Microscope Slides",
      "Rapid COVID Tests",
      "Pregnancy Tests",
      "Hemoglobin A1C Tests",
    ];

    // Get the number of days in the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Generate random orders
    const newOrders: Order[] = [];

    // Distribute orders throughout the month
    for (let day = 1; day <= daysInMonth; day++) {
      // Add 0-2 orders per day with higher probability on weekdays
      const date = new Date(year, month, day);
      const isWeekday = date.getDay() > 0 && date.getDay() < 6;
      const numOrders = isWeekday
        ? Math.floor(Math.random() * 3)
        : Math.floor(Math.random() * 2);

      const usedTypes = new Set<OrderType>();

      for (let i = 0; i < numOrders; i++) {
        // Select a random order type that hasn't been used for this day yet
        let type: OrderType;
        do {
          const types: OrderType[] = [
            "medication",
            "vaccine",
            "syringe",
            "lab",
          ];
          type = types[Math.floor(Math.random() * types.length)];
        } while (usedTypes.has(type));

        usedTypes.add(type);

        // Select a random name based on the type
        let name: string;
        let quantity: number;

        switch (type) {
          case "medication":
            name = medications[Math.floor(Math.random() * medications.length)];
            quantity = Math.floor(Math.random() * 90) + 10; // 10-100
            break;
          case "vaccine":
            name = vaccines[Math.floor(Math.random() * vaccines.length)];
            quantity = Math.floor(Math.random() * 15) + 5; // 5-20
            break;
          case "syringe":
            name = syringes[Math.floor(Math.random() * syringes.length)];
            quantity = Math.floor(Math.random() * 90) + 10; // 10-100
            break;
          case "lab":
            name =
              labEquipment[Math.floor(Math.random() * labEquipment.length)];
            quantity = Math.floor(Math.random() * 45) + 5; // 5-50
            break;
        }

        newOrders.push({
          type,
          day,
          month,
          year,
          name,
          quantity,
        });
      }
    }

    setOrders(newOrders);
  };

  // Check if a date is today
  const isToday = (day: number, weekIndex: number) => {
    const today = new Date();

    // Check if the current view is the current month and year
    if (
      today.getMonth() !== currentDate.getMonth() ||
      today.getFullYear() !== currentDate.getFullYear()
    ) {
      return false;
    }

    // Check if this is the current month's date
    const isCurrentMonth = !(
      (weekIndex === 0 && day > 20) ||
      (weekIndex === calendarDates.length - 1 && day < 10)
    );

    return isCurrentMonth && day === today.getDate();
  };

  // Check if a date is in the current month
  const isCurrentMonth = (day: number, weekIndex: number) => {
    return !(
      (weekIndex === 0 && day > 20) ||
      (weekIndex === calendarDates.length - 1 && day < 10)
    );
  };

  // Get orders for a specific day
  const getOrdersForDay = (day: number) => {
    return orders.filter(
      (order) =>
        order.day === day &&
        order.month === currentDate.getMonth() &&
        order.year === currentDate.getFullYear()
    );
  };

  // Get order types for a specific day
  const getOrderTypesForDay = (day: number) => {
    return getOrdersForDay(day).map((order) => order.type);
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

  // Special notification for today's date
  const hasNotification = (day: number, weekIndex: number) => {
    return isToday(day, weekIndex) && getOrdersForDay(day).length > 0;
  };

  // Handle clicking on an order
  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setDetailOpen(true);
  };

  return (
    <div className="border rounded-md overflow-hidden">
      {/* Desktop view - only show on md screens and up */}
      <div className="hidden md:block">
        <div className="grid grid-cols-7 text-center">
          {days.map((day, i) => (
            <div key={i} className="py-2 font-medium border-b">
              {day}
            </div>
          ))}
        </div>

        <div>
          {calendarDates.map((week, weekIndex) => (
            <div
              key={weekIndex}
              className="grid grid-cols-7 border-b last:border-b-0"
            >
              {week.map((date, dateIndex) => {
                const dayOrders = getOrderTypesForDay(date);
                const currentMonthDate = isCurrentMonth(date, weekIndex);
                const todayDate = isToday(date, weekIndex);

                return (
                  <div
                    key={dateIndex}
                    className={cn(
                      "min-h-24 border-r last:border-r-0 relative p-1 group cursor-pointer hover:bg-slate-50",
                      !currentMonthDate && "text-gray-400",
                      todayDate && "bg-blue-50"
                    )}
                  >
                    <div
                      className={cn(
                        "text-right p-1",
                        todayDate && "font-bold text-blue-600"
                      )}
                    >
                      {todayDate && (
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full">
                          {date}
                        </span>
                      )}
                      {!todayDate && date}
                    </div>

                    {hasNotification(date, weekIndex) && (
                      <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                    )}

                    <div className="mt-auto space-y-1 pt-8">
                      {["medication", "vaccine", "syringe", "lab"].map(
                        (type) => {
                          const typeOrders = getOrdersForDay(date).filter(
                            (order) => order.type === type
                          );
                          if (typeOrders.length === 0) return null;

                          return (
                            <div
                              key={type}
                              className={cn(
                                "h-1.5 rounded-sm relative cursor-pointer",
                                getColorForType(type as OrderType)
                              )}
                              onClick={() =>
                                typeOrders.length > 0 &&
                                handleOrderClick(typeOrders[0])
                              }
                            >
                              <div className="hidden group-hover:block absolute bottom-full left-0 bg-white p-1.5 rounded shadow-md text-xs z-10 w-max max-w-[150px]">
                                {typeOrders.map((order, i) => (
                                  <div
                                    key={i}
                                    className="whitespace-nowrap overflow-hidden text-ellipsis"
                                  >
                                    {order.name} ({order.quantity})
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile view - only show on smaller than md screens */}
      <div className="md:hidden">
        {calendarDates.flat().map((date, index) => {
          const weekIndex = Math.floor(index / 7);
          const dayOrders = getOrdersForDay(date);
          if (dayOrders.length === 0 || !isCurrentMonth(date, weekIndex))
            return null;

          const dayIndex = index % 7;
          const dayName = days[dayIndex];
          const todayDate = isToday(date, weekIndex);

          return (
            <div
              key={index}
              className={cn("border-b p-3", todayDate && "bg-blue-50")}
            >
              <div className="flex justify-between items-center mb-2">
                <div
                  className={cn(
                    "font-medium",
                    todayDate && "text-blue-600 font-bold"
                  )}
                >
                  {dayName} {date}
                  {todayDate && " (Today)"}
                </div>
                {hasNotification(date, weekIndex) && (
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                    !
                  </div>
                )}
              </div>
              <div className="space-y-2">
                {dayOrders.map((order, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm p-2 rounded hover:bg-slate-100 cursor-pointer"
                    onClick={() => handleOrderClick(order)}
                  >
                    <div
                      className={cn(
                        "w-3 h-3 rounded-full",
                        getColorForType(order.type)
                      )}
                    ></div>
                    <div className="flex-1">{order.name}</div>
                    <div className="text-gray-500">Qty: {order.quantity}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {/* Order Detail Panel */}
      <OrderDetail
        open={detailOpen}
        onOpenChange={setDetailOpen}
        order={selectedOrder || undefined}
      />
    </div>
  );
}
