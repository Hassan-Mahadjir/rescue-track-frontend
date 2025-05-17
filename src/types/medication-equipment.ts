import { Supplier } from "./supplier";

type Unit = {
  id: number;
  abbreviation: string;
  name: string;
  createdAt: string; // ISO date string
};

export type Medication = {
  id: number;
  name: string;
  category: string;
  batchNumber: string;
  stockQuantity: number;
  expirationDate: string; // ISO date string
  createdAt: string; // ISO date string
  createdById: number;
  reorderPoint: number;
  supplier: Supplier | null;
  unit: Unit;
};

export type Equipment = {
  id: number;
  name: string;
  category: string;
  serialNumber: string;
  modelNumber: string;
  manufacturer: string;
  purchaseDate: string; // ISO date string
  warrantyPeriod: number;
  stockQuantity: number;
  nextMaintenanceDate: string | null;
  status: string;
  notes: string;
  createdAt: string; // ISO date string
  createdById: number;
  supplier: Supplier | null;
};

export type InventoryData = {
  medications: Medication[];
  equipments: Equipment[];
};
