"use client";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// Define the data structure for equipment status
interface EquipmentStatus {
  active: number;
  idle: number;
  underRepair: number;
  total: number;
}

interface EquipmentStatusChartProps {
  data: EquipmentStatus;
  title?: string;
  isLive?: boolean;
}

export function EquipmentStatusChart({
  data,
  title = "Active Equipment",
  isLive = true,
}: EquipmentStatusChartProps) {
  // Calculate percentages
  const activePercentage = Math.round((data.active / data.total) * 100);

  // Prepare data for the donut chart
  const chartData = [
    { name: "Active", value: data.active, color: "#4ade80" },
    { name: "Idle", value: data.idle, color: "#facc15" },
    { name: "Under Repair", value: data.underRepair, color: "#f97316" },
  ];

  return (
    <div className="w-full bg-white p-4 rounded-lg border border-gray-200">
      <div>
        <h1 className="text-sm font-semibold">{title}</h1>
        <hr className="h-0.5 bg-gray-700 border-0 rounded-sm my-3" />
      </div>
      <div className="flex items-start justify-between">
        {/* Left side - Chart */}
        <div className="relative w-28 h-28">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={40}
                paddingAngle={2}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold">{activePercentage}%</span>
          </div>
        </div>

        {/* Right side - Status indicators */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground mr-4">
              {data.active} / {data.total}
            </span>
            {isLive && (
              <span className="px-2 py-0.5 text-xs bg-cyan-100 text-cyan-600 rounded-full">
                LIVE
              </span>
            )}
          </div>

          {chartData.map((item) => (
            <div key={item.name} className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-muted-foreground mr-2">
                {item.name}
              </span>
              <span className="font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
