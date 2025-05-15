import { z } from "zod";

export const medicationSchema = z.object({
  name: z.string().min(1, "Medication name is required"),
  category: z.string(),
  expirationDate: z.date(),
  quantity: z.number().min(1), // boxes
  size: z.number().min(1), // dosage amount
  unit: z.string(), // mg, ml, etc.
  description: z.string().optional(),
});

export const vendorSchema = z.object({
  supplierName: z.string().min(2, "Supplier name is required"),
  specialist: z.string().min(1, "Please select a specialist type"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Phone number is required"),
  address: z.string().min(5, "Address is required"),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export type VendorFormData = z.infer<typeof vendorSchema>;

export type MedicationFormData = z.infer<typeof medicationSchema>;
