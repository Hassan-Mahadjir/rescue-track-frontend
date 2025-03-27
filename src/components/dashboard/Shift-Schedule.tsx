"use client";

import Link from "next/link";
import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { format, addDays, startOfWeek } from "date-fns";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";

type Shift = {
  id: number;
  date: string;
  start: string;
  end: string;
  driver: string;
  assistant: {
    id: number;
    name: string;
  }[];
};

async function getData(): Promise<Shift[]> {
  return [
    {
      id: 1,
      date: "29-03-2025",
      start: "7:00",
      end: "16:00",
      driver: "Hassan Mahadjir",
      assistant: [{ id: 1, name: "Nasser Abduallah" }],
    },
    {
      id: 2,
      date: "27-03-2025",
      start: "9:00",
      end: "17:00",
      driver: "Belimer Ayden",
      assistant: [{ id: 1, name: "Salme Abduallah" }],
    },
    {
      id: 3,
      date: "27-03-2025",
      start: "10:00",
      end: "18:00",
      driver: "Ali Mohammed",
      assistant: [{ id: 2, name: "Rashid Ahmed" }],
    },
  ];
}

const ShiftSchedule = () => {
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 0 });

  const [selectedDate, setSelectedDate] = React.useState<string>(
    format(today, "dd-MM-yyyy")
  );
  const [shiftScheduleData, setShiftScheduleData] = React.useState<Shift[]>([]);

  React.useEffect(() => {
    async function fetchData() {
      const data = await getData();
      setShiftScheduleData(data);
    }
    fetchData();
  }, []);

  // Filter shifts based on selected date
  const filteredShifts = shiftScheduleData.filter(
    (shift) => shift.date === selectedDate
  );

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between mb-4">
        <p className="text-lg font-semibold">Shift Schedule</p>
        <Link
          href={"#"}
          className="flex items-center space-x-2 hover:underline"
        >
          <IoIosAddCircleOutline className="w-5 h-5" />
          <span>Add new</span>
        </Link>
      </div>

      {/* Calendar Week */}
      <div className="flex space-x-2 w-full">
        {[...Array(7)].map((_, index) => {
          const date = addDays(weekStart, index);
          return (
            <button
              key={index}
              className={`flex flex-col items-center p-1 rounded-lg flex-grow text-center ${
                format(date, "dd-MM-yyyy") === selectedDate
                  ? "bg-main text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setSelectedDate(format(date, "dd-MM-yyyy"))}
            >
              <span className="font-medium">{format(date, "EEE")}</span>
              <span className="text-lg">{format(date, "d")}</span>
            </button>
          );
        })}
      </div>

      {/* Scrollable Teams List */}
      <ScrollArea className="h-9/10 overflow-y-auto xmd:h-[45rem]">
        {filteredShifts.length > 0 ? (
          filteredShifts.map((item) => (
            <div
              key={item.id}
              className="mt-4 px-2 py-2 bg-light-gray rounded-lg space-y-2"
            >
              <p>
                Team Number: <span>{item.id}</span>
              </p>
              <p className="text-xs">
                {item.start} - {item.end}
              </p>
              <div className="flex items-center gap-2">
                <Image
                  src="https://images.unsplash.com/photo-1664575602554-2087b04935a5?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="profile"
                  className="w-7 h-7 rounded-full object-cover border border-gray-300 shadow-md hidden xmd:block"
                  width={50}
                  height={50}
                />
                <p className="text-sm">
                  Driver: <span className="font-semibold">{item.driver}</span>
                </p>
              </div>
              {item.assistant.map((assistant) => (
                <div key={assistant.id} className="flex items-center gap-2">
                  <Image
                    src="https://images.unsplash.com/photo-1664575602554-2087b04935a5?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="profile"
                    className="w-7 h-7 rounded-full object-cover border border-gray-300 shadow-md hidden xmd:block"
                    width={50}
                    height={50}
                  />
                  <p className="text-sm">
                    Assistant:{" "}
                    <span className="font-semibold">{assistant.name}</span>
                  </p>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p className="text-center mt-4">No shifts available for this date.</p>
        )}
      </ScrollArea>

      {/* Button at the bottom */}
      <div className="mt-auto pt-2">
        <Button className="w-full">See all</Button>
      </div>
    </div>
  );
};

export default ShiftSchedule;
