"use client";

import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CustomCalendarProps {
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
}

export function CustomCalendar({ selected, onSelect }: CustomCalendarProps) {
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [year, setYear] = useState<number>(new Date().getFullYear());

  const handleMonthChange = (newMonth: number) => {
    setMonth(newMonth);
    // Create a new date with the updated month but keep the same year
    const newDate = new Date(year, newMonth, 1);
    onSelect(newDate);
  };

  const handleYearChange = (newYear: number) => {
    setYear(newYear);
    // Create a new date with the updated year but keep the same month
    const newDate = new Date(newYear, month, 1);
    onSelect(newDate);
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between p-2 border-b">
        <select
          value={month}
          onChange={(e) => handleMonthChange(Number(e.target.value))}
          className="border rounded px-2 py-1"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i}>
              {new Date(2000, i, 1).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
        <select
          value={year}
          onChange={(e) => handleYearChange(Number(e.target.value))}
          className="border rounded px-2 py-1"
        >
          {Array.from({ length: new Date().getFullYear() - 1950 }, (_, i) => (
            <option key={i} value={1950 + i}>
              {1950 + i}
            </option>
          ))}
        </select>
      </div>
      <div className="p-2">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={onSelect}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          month={new Date(year, month, 1)}
          onMonthChange={(date) => {
            setMonth(date.getMonth());
            setYear(date.getFullYear());
          }}
          initialFocus
        />
      </div>
    </div>
  );
}

const eligibilities = [
  { value: "citizen", label: "Citizen" },
  { value: "resident", label: "Resident" },
  { value: "visitor", label: "Visitor" },
  { value: "student", label: "Student" },
  { value: "work_permit", label: "Work Permit" },
  { value: "refugee", label: "Refugee" },
  { value: "asylum_seeker", label: "Asylum Seeker" },
];

interface EligibilitySelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function EligibilitySelect({ value, onValueChange }: EligibilitySelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select eligibility" />
      </SelectTrigger>
      <SelectContent>
        {eligibilities.map((eligibility) => (
          <SelectItem key={eligibility.value} value={eligibility.value}>
            {eligibility.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
} 