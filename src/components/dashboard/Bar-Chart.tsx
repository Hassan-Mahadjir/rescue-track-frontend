"use client";
import React, { useState } from "react";
import { TrendingUp } from "lucide-react";
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
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-2))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

const Barchart = () => {
  const reportTypes = [
    { id: 1, title: "PCR" },
    { id: 2, title: "Employee Care Report" },
  ];

  const durations = [
    { id: 1, title: "Today" },
    { id: 2, title: "This month" },
    { id: 3, title: "This week" },
  ];
  const [activeTitle, setActiveTitle] = useState("");
  const [activeDuration, setActiveDuration] = useState("");

  return (
    <Card>
      <CardHeader>
        <div className="grid grid-cols-1 gap-2 xmd:grid-cols-2">
          <CardTitle>
            <Select value={activeTitle} onValueChange={setActiveTitle}>
              <SelectTrigger
                className="ml-auto h-7 rounded-lg pl-2"
                aria-label="Select a value"
              >
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent className="rounded-xl" align="end">
                {reportTypes.map((item) => (
                  <SelectItem
                    key={item.id}
                    value={item.title}
                    className="rounded-lg [&_span]:flex"
                  >
                    {item.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardTitle>

          <Select value={activeDuration} onValueChange={setActiveDuration}>
            <SelectTrigger
              className="ml-auto h-7 rounded-lg pl-2"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent className="rounded-xl" align="end">
              {durations.map((item) => (
                <SelectItem
                  key={item.id}
                  value={item.title}
                  className="rounded-lg [&_span]:flex"
                >
                  {item.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
    </Card>
  );
};

export default Barchart;
