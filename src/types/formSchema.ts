import { z } from "zod";

// Define the schema for medications
const medicationSchema = z.object({
  name: z.string().min(1, "Medication name is required"),
  size: z.string().min(1, "Medication size is required"),
});

// Define the schema for transport information
const transportInfoSchema = z.object({
  transferType: z.string().optional(),
  vehicleId: z.string().optional(),
  emergencyType: z.string().optional(),
  pickupAddress: z.string().optional(),
  destinationAddress: z.string().optional(),
});

// Define the schema for medical history
const medicalHistorySchema = z.object({
  conditions: z.array(z.string()).optional().default([]),
  allergies: z.array(z.string()).optional().default([]),
  notes: z.string().optional().default(""),
});

// Main form schema
export const PcrReportFormSchema = z.object({
  PatientId: z.number({
    required_error: "Please select a patient",
  }),
  medications: z
    .array(medicationSchema)
    .optional()
    .default([{ name: "", size: "" }]),

  transportInfo: transportInfoSchema.optional().default({}),
  medicalHistory: medicalHistorySchema,
});

// Type for form values
export type PcrReportFormValues = z.infer<typeof PcrReportFormSchema>;
