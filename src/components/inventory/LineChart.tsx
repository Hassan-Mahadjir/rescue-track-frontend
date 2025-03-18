import { calculateStockSummary } from "@/utils/inventoryUtils";
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

const inventoryMedication: InventoryMedication[] = [
  {
    itemName: "Paracetamol 500mg",
    batchNumber: "B12345",
    category: "Pain Relief",
    quantity: 100,
    expirationDate: "2025-12-31",
  },
  {
    itemName: "Amoxicillin 250mg",
    batchNumber: "A67890",
    category: "Antibiotics",
    quantity: 50,
    expirationDate: "2025-06-30",
  },
  {
    itemName: "Ibuprofen 400mg",
    batchNumber: "I54321",
    category: "Pain Relief",
    quantity: 75,
    expirationDate: "2025-09-15",
  },
];

const data = calculateStockSummary(inventoryMedication);

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
