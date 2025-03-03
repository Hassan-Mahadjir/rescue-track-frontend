"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector, Cell } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Data = [
  {
    reason: "sick",
    total: 3,
    date: "2025-03-26T00:00:00",
    type: "Swap requests",
  },
  {
    reason: "holiday",
    total: 305,
    date: "2025-03-01T00:00:00",
    type: "EMS requests",
  },
  {
    reason: "leave",
    total: 237,
    date: "2025-03-01T00:00:00",
    type: "Swap requests",
  },
  {
    reason: "emergency",
    total: 173,
    date: "2025-03-01T00:00:00",
    type: "EMS requests",
  },
  {
    reason: "leave",
    total: 173,
    date: "2025-03-26T00:00:00",
    type: "EMS requests",
  },
];

const chartConfig: Record<string, { color: string }> = {
  sick: { color: "hsl(var(--chart-1))" },
  holiday: { color: "hsl(var(--chart-2))" },
  leave: { color: "hsl(var(--chart-3))" },
  emergency: { color: "hsl(var(--chart-4))" },
};

const reportTypes = [
  { id: 1, title: "Swap requests" },
  { id: 2, title: "EMS requests" },
];

const durations = [
  { id: 1, duration: "Today" },
  { id: 2, duration: "This Week" },
  { id: 3, duration: "This Month" },
];

export function Piechart() {
  const id = "pie-interactive";

  const [activeTitle, setActiveTitle] = React.useState<string>(
    reportTypes[0].title
  );
  const [activeDuration, setActiveDuration] = React.useState<string>(
    durations[0].duration
  );

  const [activeIndex, setActiveIndex] = React.useState(0);

  const filteredData = React.useMemo(() => {
    let filtered = Data.filter((item) => item.type === activeTitle);
    // Filter by duration
    const now = new Date();
    if (activeDuration === "Today") {
      filtered = filtered.filter(
        (item) => new Date(item.date).toDateString() === now.toDateString()
      );
    } else if (activeDuration === "This Week") {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      filtered = filtered.filter((item) => new Date(item.date) >= startOfWeek);
    } else if (activeDuration === "This Month") {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      filtered = filtered.filter((item) => new Date(item.date) >= startOfMonth);
    }

    return filtered.map((item) => ({
      name: item.reason,
      value: item.total,
    }));
  }, [activeDuration, activeTitle]);

  const [activeMonth, setActiveMonth] = React.useState(Data[0].reason);

  const months = React.useMemo(() => Data.map((item) => item.reason), []);

  return (
    <Card className="w-full h-full flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader>
        <div className="grid gap-1 grid-cols-1 xmd:grid-cols-2">
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
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px] "
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={filteredData}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              // outerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              {filteredData.map((entry) => {
                const color = chartConfig[entry.name]?.color || "transparent";
                return <Cell key={entry.name} fill={color} />;
              })}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    const activeData = filteredData[activeIndex];
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {activeData?.value.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          requests
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
