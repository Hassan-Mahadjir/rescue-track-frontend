import { UpdateHistory } from "./runReport.type";

export type Supplier = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  specialist: string;
  website: string;
  contactPerson: string;
  status: "active" | "inactive" | string; // Add more statuses as needed
  createdAt: string | Date;
  createdById: number;
  updateHistory: UpdateHistory[];
};
