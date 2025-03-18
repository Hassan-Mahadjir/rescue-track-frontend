import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Total Materials", Full: 400, Mid: 300, Low: 200, Reorder: 100 },
];

const LineChart = () => {
  return (
    <div>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Full" stackId="a" fill="#4cc9f0" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
