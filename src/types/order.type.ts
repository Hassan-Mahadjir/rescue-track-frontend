export type Order = {
  id: number;
  createdAt: string;
  status: "pending" | "completed" | "cancelled" | "delivered" | "received";
  notes: string;
  createdById: number;
  updatedById: number | null;
  orderItems: OrderItem[];
  supplier: Supplier;
};

export type OrderItem = {
  id: number;
  quantity: number;
  medication: Medication | null;
  equipment: Equipment | null;
  unit: Unit;
};

export type Unit = {
  id: number;
  abbreviation: string;
  name: string;
  createdAt: string;
};
