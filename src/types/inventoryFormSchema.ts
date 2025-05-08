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

export type MedicationFormData = z.infer<typeof medicationSchema>;
