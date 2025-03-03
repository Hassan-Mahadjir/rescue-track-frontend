"use client";
import React, { useState, useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getXAxisFormatter } from "@/functions/getXAxisDateFormatter";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-2))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-3))",
  },
};

const reportTypes = [
  { id: 1, title: "PCR" },
  { id: 2, title: "Employee Care Report" },
];

const durations = [
  { id: 1, duration: "Today" },
  { id: 2, duration: "This Week" },
  { id: 3, duration: "This Month" },
];

const rawData = [
  {
    date: "2025-03-26T10:00:00",
    type: "PCR",
    urgent: 186,
    reviewed: 80,
    progress: 20,
  },
  {
    date: "2025-03-26T12:00:00",
    type: "Employee Care Report",
    urgent: 305,
    reviewed: 200,
    progress: 20,
  },
  {
    date: "2025-03-20T00:00:00",
    type: "PCR",
    urgent: 237,
    reviewed: 120,
    progress: 20,
  },
  {
    date: "2025-03-21T00:00:00",
    type: "Employee Care Report",
    urgent: 73,
    reviewed: 190,
    progress: 20,
  },
  {
    date: "2025-03-19T00:00:00",
    type: "PCR",
    urgent: 209,
    reviewed: 130,
    progress: 20,
  },
  {
    date: "2025-03-01T00:00:00",
    type: "Employee Care Report",
    urgent: 209,
    reviewed: 130,
    progress: 20,
  },
];

const Barchart = () => {
  const [activeTitle, setActiveTitle] = useState<string>(reportTypes[0].title);
  const [activeDuration, setActiveDuration] = useState<string>(
    durations[0].duration
  );

  const filteredData = useMemo(() => {
    const now = new Date();
    return rawData
      .filter((item) => item.type === activeTitle)
      .filter((item) => {
        const itemDate = new Date(item.date);
        if (activeDuration === "Today") {
          return itemDate.toDateString() === now.toDateString();
        } else if (activeDuration === "This Week") {
          const weekStart = new Date(now);
          weekStart.setDate(now.getDate() - now.getDay()); // Start of the week (Sunday)
          return itemDate >= weekStart;
        } else if (activeDuration === "This Month") {
          return itemDate.getMonth() === now.getMonth();
        }
        return true;
      });
  }, [activeTitle, activeDuration]);

  const xAxisFormatter = useMemo(
    () => getXAxisFormatter(activeDuration),
    [activeDuration]
  );

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <div className="grid grid-cols-1 gap-2 xmd:grid-cols-2">
          <CardTitle>
            <Select value={activeTitle} onValueChange={setActiveTitle}>
              <SelectTrigger className="ml-auto h-7 rounded-lg pl-2">
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent className="rounded-xl" align="end">
                {reportTypes.map((item) => (
                  <SelectItem
                    key={item.id}
                    value={item.title}
                    className="rounded-lg"
                  >
                    {item.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardTitle>

          <Select value={activeDuration} onValueChange={setActiveDuration}>
            <SelectTrigger className="ml-auto h-7 rounded-lg pl-2">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent className="rounded-xl" align="end">
              {durations.map((item) => (
                <SelectItem
                  key={item.id}
                  value={item.duration}
                  className="rounded-lg"
                >
                  {item.duration}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <CardDescription></CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="">
          <BarChart accessibilityLayer data={filteredData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={xAxisFormatter}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="urgent" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="reviewed" fill="var(--color-mobile)" radius={4} />
            <Bar dataKey="progress" fill="var(--main)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
    </Card>
  );
};

export default Barchart;
