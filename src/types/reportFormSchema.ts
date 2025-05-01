import { z } from "zod";

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
export type TreatmentsData = z.infer<typeof TreatmentsSchema>;
