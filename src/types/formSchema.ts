import { z } from "zod";
import { Treatment } from "./report.type";

export const TreatmentsSchema = z.object({
  id: z.number().optional(),
  name: z
    .string({
      required_error: "Treatment name is required",
      invalid_type_error: "Treatment name must be a string",
    })
    .min(2, {
      message: "Treatment name must be at least 2 characters",
    })
    .max(50, {
      message: "Treatment name must not exceed 50 characters",
    }),
  quantity: z
    .number({
      required_error: "Quantity is required",
      invalid_type_error: "Quantity must be a number",
    })
    .positive({
      message: "Quantity must be a positive number",
    })
    .int({
      message: "Quantity must be an integer",
    })
    .max(1000, {
      message: "Quantity must not exceed 1000",
    }),
  unit: z
    .string({
      required_error: "Unit is required",
      invalid_type_error: "Unit must be a string",
    })
    .min(1, {
      message: "Unit must be at least 1 character",
    })
    .max(10, {
      message: "Unit must not exceed 10 characters",
    }),
  category: z
    .string({
      required_error: "Category is required",
      invalid_type_error: "Category must be a string",
    })
    .min(2, {
      message: "Category must be at least 2 characters",
    })
    .max(30, {
      message: "Category must not exceed 30 characters",
    }),
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
    treatment: z.array(TreatmentsSchema),
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

// new
// Treatments Schema with validation messages

// PCR Schema with validation messages
export const PCRSchema = z.object({
  id: z.number().optional(),
  patientCondition: z
    .string({
      invalid_type_error: "Patient condition must be a string",
    })
    .max(500, {
      message: "Patient condition must not exceed 500 characters",
    })
    .nullable(),
  initialCondition: z
    .string({
      invalid_type_error: "Initial condition must be a string",
    })
    .max(500, {
      message: "Initial condition must not exceed 500 characters",
    })
    .nullable(),
  primarySymptoms: z
    .string({
      invalid_type_error: "Primary symptoms must be a string",
    })
    .max(500, {
      message: "Primary symptoms must not exceed 500 characters",
    })
    .nullable(),
  notes: z
    .string({
      invalid_type_error: "Notes must be a string",
    })
    .max(1000, {
      message: "Notes must not exceed 1000 characters",
    })
    .nullable(),
});

export type PCRData = z.infer<typeof PCRSchema>;
export type TreatmentsData = z.infer<typeof TreatmentsSchema>;
