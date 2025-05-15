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
import { useStats } from "@/services/api/reports";

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
  { id: 2, title: "run report" },
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
    low: 186,
    high: 80,
    medium: 20,
    critical: 10,
  },
  {
    date: "2025-03-26T12:00:00",
    type: "Run report",
    stable: 305,
    serious: 200,
    good: 20,
    critical: 30,
  },
];

const Barchart = () => {
  const { StatsData, isPending } = useStats();

  const [activeTitle, setActiveTitle] = useState<string>(reportTypes[0].title);
  const [activeDuration, setActiveDuration] = useState<string>(
    durations[0].duration
  );

  const filteredData = useMemo(() => {
    if (!StatsData) return [];
    const now = new Date();
    return StatsData.filter((item) => item.type === activeTitle).filter(
      (item) => {
        const itemDate = new Date(item.date);
        if (activeDuration === "Today") {
          return itemDate.toDateString() === now.toDateString();
        } else if (activeDuration === "This Week") {
          const weekStart = new Date(now);
          weekStart.setDate(now.getDate() - now.getDay());
          return itemDate >= weekStart;
        } else if (activeDuration === "This Month") {
          return itemDate.getMonth() === now.getMonth();
        }
        return true;
      }
    );
  }, [StatsData, activeTitle, activeDuration]);

  const xAxisFormatter = useMemo(
    () => getXAxisFormatter(activeDuration),
    [activeDuration]
  );

  if (!StatsData) return null;

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
            <Bar dataKey="low" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="medium" fill="var(--color-mobile)" radius={4} />
            <Bar dataKey="high" fill="var(--main)" radius={4} />
            <Bar dataKey="critical" fill="var(--darkGray)" radius={4} />
            <Bar dataKey="serious" fill="var(--readMain)" radius={4} />
            <Bar dataKey="good" fill="var(--linearGreen)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
    </Card>
  );
};

export default Barchart;
