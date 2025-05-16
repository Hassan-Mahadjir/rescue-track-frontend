import { z } from "zod";

export const medicationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  stockQuantity: z.number().nonnegative("Stock quantity must be 0 or more"),
  category: z.string().min(1, "Category is required"),
  unit: z.string().min(1, "Unit is required"),
  expirationDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid expiration date format",
    }),
  reorderPoint: z.number().nonnegative("Reorder point must be 0 or more"),
  batchNumber: z.string().min(1, "Batch number is required"),
});

export const equipmentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  stockQuantity: z.number().nonnegative("Stock quantity must be 0 or more"),
  category: z.string().min(1, "Category is required"),
  manufacturer: z.string().min(1, "Manufacturer is required"),
  serialNumber: z.string().min(1, "Serial number is required"),
  modelNumber: z.string().min(1, "Model number is required"),
  purchaseDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid purchase date format",
    }),
  warrantyPeriod: z
    .number()
    .int()
    .nonnegative("Warranty period must be 0 or more"),
  notes: z.string().optional(),
});

export type EquipmentFormValues = z.infer<typeof equipmentSchema>;
export type MedicationFormValues = z.infer<typeof medicationSchema>;
