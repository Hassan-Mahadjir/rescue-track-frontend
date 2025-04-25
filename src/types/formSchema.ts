import { z } from "zod";

// Medication
const medicationSchema = z.object({
  name: z.string().min(1, "Medication name is required"),
  size: z.string().min(1, "Size is required"),
});

// Transport
const transportInfoSchema = z.object({
  transferType: z.string().optional(),
  vehicleId: z.string().optional(),
  emergencyType: z.string().optional(),
  pickupAddress: z.string().optional(),
  destinationAddress: z.string().optional(),
});

// Medical history
const medicalHistorySchema = z.object({
  conditions: z.array(z.string()).optional().default([]),
  allergies: z.array(z.string()).optional().default([]),
  notes: z.string().optional().default(""),
});

// ✨ Step-wise schemas
export const stepSchemas = [
  z.object({
    patientId: z.string().min(1, "Please select a patient"),
  }),
  z.object({
    medications: z.array(medicationSchema),
  }),
  z.object({
    transportInfo: transportInfoSchema,
  }),
  z.object({
    medicalHistory: medicalHistorySchema,
  }),
];

// ✨ Merged full schema
export const PcrReportFormSchema = stepSchemas.reduce(
  (acc, curr) => acc.merge(curr),
  z.object({})
);

export type PcrReportFormValues = z.infer<typeof PcrReportFormSchema>;

export type PatientReportData = {
  patientId: string;
  medications: {
    name: string;
    size: string;
  }[];
  transportInfo: {
    transferType?: string;
    vehicleId?: string;
    emergencyType?: string;
    pickupAddress?: string;
    destinationAddress?: string;
  };
  medicalHistory: {
    conditions: string[];
    allergies: string[];
    notes: string;
  };
};

// new
// PCR Schema
export const PCRSchema = z.object({
  id: z.number(),
  patientCondition: z.string().nullable(),
  initialCondition: z.string().nullable(),
  primarySymptoms: z.string().nullable(),
  notes: z.string().nullable(),
  createdAt: z.string(),
});
export type PCRData = z.infer<typeof PCRSchema>;
