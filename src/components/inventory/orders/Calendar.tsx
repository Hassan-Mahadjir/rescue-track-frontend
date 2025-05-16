"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { OrderDetail } from "./OrderDetail";
import { Order } from "@/types/order.type";

type OrderType =
  | "pending"
  | "completed"
  | "cancelled"
  | "delivered"
  | "received";

interface CalendarProps {
  order: Order[];
  currentDate: Date;
}

export function Calendar({ order, currentDate }: CalendarProps) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [calendarDates, setCalendarDates] = useState<number[][]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    let firstDayOfWeek = firstDay.getDay() - 1;
    if (firstDayOfWeek === -1) firstDayOfWeek = 6;

    const daysFromPrevMonth = firstDayOfWeek;
    const startDate = new Date(year, month, 1 - daysFromPrevMonth);

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
  }, [currentDate]);

  const isToday = (day: number, weekIndex: number) => {
    const today = new Date();
    if (
      today.getMonth() !== currentDate.getMonth() ||
      today.getFullYear() !== currentDate.getFullYear()
    ) {
      return false;
    }

    const isCurrentMonth = !(
      (weekIndex === 0 && day > 20) ||
      (weekIndex === calendarDates.length - 1 && day < 10)
    );

    return isCurrentMonth && day === today.getDate();
  };

  const isCurrentMonth = (day: number, weekIndex: number) => {
    return !(
      (weekIndex === 0 && day > 20) ||
      (weekIndex === calendarDates.length - 1 && day < 10)
    );
  };

  const getOrdersForDay = (day: number) => {
    return order.filter((o) => {
      const orderDate = new Date(o.createdAt);
      return (
        orderDate.getDate() === day &&
        orderDate.getMonth() === currentDate.getMonth() &&
        orderDate.getFullYear() === currentDate.getFullYear()
      );
    });
  };

  const getColorForType = (status: OrderType) => {
    switch (status) {
      case "pending":
        return "bg-yellow-400";
      case "completed":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      case "delivered":
        return "bg-blue-500";
      case "received":
        return "bg-purple-500";
      default:
        return "";
    }
  };

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setDetailOpen(true);
  };

  return (
    <div className="border rounded-md overflow-hidden">
      {/* Desktop View */}
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
                const ordersToday = getOrdersForDay(date);
                const todayDate = isToday(date, weekIndex);
                const currentMonthDate = isCurrentMonth(date, weekIndex);

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
                      {todayDate ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full">
                          {date}
                        </span>
                      ) : (
                        date
                      )}
                    </div>

                    {todayDate && ordersToday.length > 0 && (
                      <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                    )}

                    <div className="mt-auto space-y-1 pt-8">
                      {ordersToday.map((order) => (
                        <div
                          key={order.id}
                          className={cn(
                            "h-1.5 rounded-sm relative cursor-pointer",
                            getColorForType(order.status)
                          )}
                          onClick={() => handleOrderClick(order)}
                        >
                          <div className="hidden group-hover:block absolute bottom-full left-0 bg-white p-1.5 rounded shadow-md text-xs z-10 w-max max-w-[150px]">
                            <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                              {order.supplier.name} -{" "}
                              {order.orderItems[0]?.medication?.name ??
                                order.orderItems[0]?.equipment?.name ??
                                "Unknown"}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        {calendarDates.flat().map((date, index) => {
          const weekIndex = Math.floor(index / 7);
          const ordersToday = getOrdersForDay(date);
          if (ordersToday.length === 0 || !isCurrentMonth(date, weekIndex))
            return null;

          const dayName = days[index % 7];
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
                {ordersToday.length > 0 && todayDate && (
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                    !
                  </div>
                )}
              </div>
              <div className="space-y-2">
                {ordersToday.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center gap-2 text-sm p-2 rounded hover:bg-slate-100 cursor-pointer"
                    onClick={() => handleOrderClick(order)}
                  >
                    <div
                      className={cn(
                        "w-3 h-3 rounded-full",
                        getColorForType(order.status)
                      )}
                    ></div>
                    <div className="flex-1">{order.supplier.name}</div>
                    <div className="text-gray-500">
                      {order.orderItems[0]?.medication?.name ??
                        order.orderItems[0]?.equipment?.name ??
                        "Item"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Order Detail */}
      <OrderDetail
        open={detailOpen}
        onOpenChange={setDetailOpen}
        order={selectedOrder ?? undefined}
      />
    </div>
  );
}
