"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OrderDialog } from "./OrderDialog";

export function CalendarHeader({
  currentDate,
  onDateChange,
}: {
  currentDate: Date;
  onDateChange: (date: Date) => void;
}) {
  // Wrap months in useMemo to fix exhaustive-deps warning
  const months = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  // Generate years from current year - 2 to current year + 1
  const currentYear = new Date().getFullYear();
  const years = useMemo(
    () => Array.from({ length: 4 }, (_, i) => (currentYear - 2 + i).toString()),
    [currentYear]
  );

  const [month, setMonth] = useState(months[currentDate.getMonth()]);
  const [year, setYear] = useState(currentDate.getFullYear().toString());

  const handleMonthChange = (newMonth: string) => {
    setMonth(newMonth);
    const newDate = new Date(currentDate);
    newDate.setMonth(months.indexOf(newMonth));
    onDateChange(newDate);
  };

  const handleYearChange = (newYear: string) => {
    setYear(newYear);
    const newDate = new Date(currentDate);
    newDate.setFullYear(Number.parseInt(newYear));
    onDateChange(newDate);
  };

  const goToToday = () => {
    const today = new Date();
    setMonth(months[today.getMonth()]);
    setYear(today.getFullYear().toString());
    onDateChange(today);
  };

  useEffect(() => {
    setMonth(months[currentDate.getMonth()]);
    setYear(currentDate.getFullYear().toString());
  }, [currentDate, months]);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
      <div className="flex gap-2">
        <Button
          variant="default"
          className="bg-green-800 hover:bg-green-700"
          onClick={goToToday}
        >
          Today
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-1">
              {month}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {months.map((m) => (
              <DropdownMenuItem key={m} onClick={() => handleMonthChange(m)}>
                {m}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-1">
              {year}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {years.map((y) => (
              <DropdownMenuItem key={y} onClick={() => handleYearChange(y)}>
                {y}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex gap-2 w-full sm:w-auto">
        <OrderDialog />
        <Button variant="outline" className="flex-1 sm:flex-initial">
          Change Schedule
        </Button>
      </div>
    </div>
  );
}
