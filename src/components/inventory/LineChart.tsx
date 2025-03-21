"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  id: string;
  title: string;
  date: string;
  full: number;
  mid: number;
  low: number;
  toProduce: number;
}

interface Colors {
  full: string;
  mid: string;
  low: string;
  toProduce: string;
}

const LineChart = ({
  data,
  colors,
  title,
}: {
  data: ChartData;
  colors: Colors;
  title?: string;
}) => {
  const total = data.full + data.mid + data.low + data.toProduce;
  return (
    <div className="w-full bg-white p-4 rounded-lg border border-gray-200">
      <div>
        <h1 className="text-sm font-semibold">{title}</h1>
        <hr className="h-0.5 bg-gray-700 border-0 rounded-sm  my-3" />
      </div>
      <div className="mb-2">
        <h3 className="text-lg font-semibold">{total} items</h3>
        <p className="text-sm text-gray-500">{data.date}</p>
      </div>
      <div className="flex items-center text-xs mb-1">
        <div className="flex items-center mr-3">
          <div className="w-3 h-3 bg-[#5cd68d] rounded-sm mr-1"></div>
          <span>Full: {data.full}</span>
        </div>
        <div className="flex items-center mr-3">
          <div className="w-3 h-3 bg-[#56b4e9] rounded-sm mr-1"></div>
          <span>Mid: {data.mid}</span>
        </div>
        <div className="flex items-center mr-3">
          <div className="w-3 h-3 bg-[#ff9f40] rounded-sm mr-1"></div>
          <span>Low: {data.low}</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-[#ff6384] rounded-sm mr-1"></div>
          <span>To Produce: {data.toProduce}</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={40}>
        <BarChart
          data={[data]}
          layout="vertical"
          barSize={20}
          barGap={0}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        >
          <YAxis hide type="category" />
          <XAxis hide type="number" domain={[0, total]} />
          <Tooltip cursor={false} position={{ y: -50 }} />
          <Bar
            dataKey="full"
            stackId="a"
            fill={colors.full}
            radius={[4, 0, 0, 4]}
            background={{ fill: "#f5f5f5", radius: 4 }}
          />
          <Bar dataKey="mid" stackId="a" fill={colors.mid} />
          <Bar dataKey="low" stackId="a" fill={colors.low} />
          <Bar
            dataKey="toProduce"
            stackId="a"
            fill={colors.toProduce}
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
