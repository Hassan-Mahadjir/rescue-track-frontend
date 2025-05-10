"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Plus } from "lucide-react";
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
  const months = [
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
  ];

  // Generate years from current year - 1 to current year + 5
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 7 }, (_, i) =>
    (currentYear - 1 + i).toString()
  );

  // Get current month and year from the currentDate prop
  const [month, setMonth] = useState(months[currentDate.getMonth()]);
  const [year, setYear] = useState(currentDate.getFullYear().toString());

  // Update the parent component when month or year changes
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

  // Handle "Today" button click
  const goToToday = () => {
    const today = new Date();
    setMonth(months[today.getMonth()]);
    setYear(today.getFullYear().toString());
    onDateChange(today);
  };

  // Update local state when currentDate changes from parent
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
