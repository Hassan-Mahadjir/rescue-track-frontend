import {
  CategoryLiterals,
  TreatmentNameLiterals,
  UnitLiterals,
} from "@/constants/treatments";
import { z } from "zod";

export const singleTreatmentSchema = z.object({
  id: z.number().optional(),
  name: z.enum(TreatmentNameLiterals, {
    errorMap: () => ({ message: "Please select a valid treatment" }),
  }),
  quantity: z
    .number({ required_error: "Quantity is required" })
    .int()
    .positive()
    .max(1000),
  unit: z.enum(UnitLiterals, {
    errorMap: () => ({ message: "Please select a valid unit" }),
  }),
  category: z.enum(CategoryLiterals, {
    errorMap: () => ({ message: "Please select a valid category" }),
  }),
});

const treatmentsArraySchema = z.object({
  treatments: z.array(singleTreatmentSchema),
});

// PCR metadata
const patientIdSchema = z.object({
  runReportId: z.string().min(1, "Please select a patient"),
});

const transportInfoSchema = z.object({
  transferType: z.string().optional(),
  vehicleId: z.string().optional(),
  emergencyType: z.string().optional(),
  pickupAddress: z.string().optional(),
  destinationAddress: z.string().optional(),
});

const medicalHistorySchema = z.object({
  conditions: z.array(z.string()).optional().default([]),
  allergies: z.array(z.string()).optional().default([]),
  notes: z.string().optional().default(""),
});

// Final PCR schema
export const PcrReportFormSchema = patientIdSchema
  .merge(treatmentsArraySchema)
  .merge(transportInfoSchema)
  .merge(medicalHistorySchema);

export const stepSchemas = [
  patientIdSchema, // Step 1: Patient selection
  treatmentsArraySchema, // Step 2: Medication
  transportInfoSchema, // Step 3: Crew / Transport
  medicalHistorySchema, // Step 4: Medical history
];

export type PcrReportFormValues = z.infer<typeof PcrReportFormSchema>;

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

//run report schema
export const Step1Schema = z.object({
  id: z.number().optional(),
  patientId: z.number().min(1, "Please select a patient"),
});

export const Step2Schema = z.object({
  caller: z.string().min(1, "Caller name is required"),
  callerPhone: z.string(),
  relationship: z.string().min(1, "Relationship is required"),
  category: z.string().min(1),
  priority: z.enum(["low", "medium", "high"]),
  transportStatus: z.enum(["not transported", "transported", "pending"]),
  mileage: z.coerce.number().nonnegative(),
});

export const Step3Schema = z.object({
  responseTime: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  arrivalTimeAtScense: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  arrivalTimeAtPatient: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  departureTime: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  notes: z.string().optional(),
});

// Combine all steps
export const CombinedSchema = Step1Schema.merge(Step2Schema).merge(Step3Schema);

export type CombinedFormData = z.infer<typeof CombinedSchema>;
export type PCRData = z.infer<typeof PCRSchema>;
export type TreatmentsData = z.infer<typeof singleTreatmentSchema>;
