import { z } from "zod";

// Define the schema for medications
const medicationSchema = z.object({
  name: z.string().min(1, "Medication name is required"),
  size: z.string().min(1, "Medication size is required"),
});

// Define the schema for crew information
const crewSchema = z.object({
  name: z.string().min(2, "Crew member name is required"),
  role: z.string().min(1, "Role is required"),
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
    .min(1, "At least one medication is required"),
  crew: z.array(crewSchema).min(1, "At least one crew member is required"),
  medicalHistory: medicalHistorySchema,
});

// Type for form values
export type PcrReportFormValues = z.infer<typeof PcrReportFormSchema>;
