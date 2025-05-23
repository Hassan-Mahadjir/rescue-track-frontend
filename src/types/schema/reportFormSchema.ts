// --------------------
// Imports
// --------------------
import { z } from "zod";

// --------------------
// Shared Item Schemas
// --------------------
export const AllergyItemSchema = z.object({
  name: z.string().optional(),
});

export const ConditionItemSchema = z.object({
  name: z.string().optional(),
});

export const TreatmentsSchema = z.object({
  name: z.string().optional(),
  dosage: z.number().optional(),
  giveAt: z.string().optional().nullable(),
  route: z.string().optional(),
  result: z.string().optional(),
  unit: z.string().optional(),
  category: z.string().optional(),
});

// --------------------
// Vital Signs and GCS
// --------------------
export const VitalSignSchema = z.object({
  time: z.string().optional(),
  T: z.string().optional(),
  BP: z.string().optional(),
  pulse: z.string().optional(),
  resp: z.string().optional(),
  spO2: z.string().optional(),
  treatments: z.array(TreatmentsSchema).optional().default([]),
});

export const GcsSchema = z
  .object({
    E: z.number().optional(),
    V: z.number().optional(),
    M: z.number().optional(),
  })
  .optional();

// --------------------
// PCR Step Schemas
// --------------------
export const PcrStep1Schema = z.object({
  patientId: z.number().optional(),
});

export const PcrStep2Schema = z.object({
  patientCondition: z.string().optional(),
  primaryAssessment: z.string().optional(),
  secondaryAssessment: z.string().optional(),
  notes: z.string().optional(),
  medicalConditions: z.array(ConditionItemSchema).optional().default([]),
  allergies: z.array(AllergyItemSchema).optional().default([]),
});

export const PcrStep3Schema = z.object({
  transferType: z.string().optional(),
  vehicleId: z.string().optional(),
  emergencyType: z.string().optional(),
  pickupAddress: z.string().optional(),
  destinationAddress: z.string().optional(),
});

export const PcrStep4Schema = z.object({
  truma: z
    .array(z.object({ name: z.string().optional() }))
    .optional()
    .default([]),
  injuryMechanism: z
    .array(
      z.object({
        mechanism: z.string().optional(),
        height: z.number().nullable().optional(),
      })
    )
    .optional()
    .default([]),
  circumstances: z
    .array(z.object({ circumstance: z.string().optional() }))
    .optional()
    .default([]),
});

export const PcrStep5Schema = z.object({
  vitalSigns: z.array(VitalSignSchema).optional().default([]),
  pupils: z
    .array(z.object({ PHSY: z.string().optional() }))
    .optional()
    .default([]),
  skins: z
    .array(z.object({ skin_status: z.string().optional() }))
    .optional()
    .default([]),
  resps: z
    .array(z.object({ RESP: z.string().optional() }))
    .optional()
    .default([]),
  therapies: z
    .array(z.object({ therapy: z.string().optional() }))
    .optional()
    .default([]),
  gcs: GcsSchema,
  dietressLevel: z.string().optional().nullable(),
  runReportId: z.number().optional(),
});

// --------------------
// Combined PCR Schema
// --------------------
export const PcrSchema = PcrStep1Schema.merge(PcrStep2Schema)
  .merge(PcrStep3Schema)
  .merge(PcrStep4Schema)
  .merge(PcrStep5Schema);

export type PcrFormData = z.infer<typeof PcrSchema>;
export type TreatmentsData = z.infer<typeof TreatmentsSchema>;
export type AllergyData = z.infer<typeof AllergyItemSchema>;
export type ConditionData = z.infer<typeof ConditionItemSchema>;

// --------------------
// Run Report Schemas
// --------------------
export const RunReportStep1Schema = z.object({
  id: z.number().optional(),
  patientId: z.number().optional(),
});

export const RunReportStep2Schema = z.object({
  caller: z.string().optional(),
  callerPhone: z.string().optional(),
  relationship: z.string().optional(),
  category: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  severtiyCode: z.string().optional(),
  transportStatus: z
    .enum([
      "transported",
      "refused",
      "cancelled",
      "complete",
      "in progress",
      "unable to response",
    ])
    .optional(),
  responseTime: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Invalid responseTime format",
    }),
  arrivalTimeAtScense: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Invalid arrivalTimeAtScense format",
    }),
  arrivalTimeAtPatient: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Invalid arrivalTimeAtPatient format",
    }),
  departureTime: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Invalid departureTime format",
    }),
  notes: z.string().optional(),
});

export const RunReportStep3Schema = z.object({});

export const RunReportSchema =
  RunReportStep1Schema.merge(RunReportStep2Schema).merge(RunReportStep3Schema);

export type RunReportFormData = z.infer<typeof RunReportSchema>;
