// types.ts
import { z } from "zod";

export const PcrReportFormSchema = z.object({
  // Step 1
  PatientId: z.number({ required_error: "You must select a patient" }),
  medications: z
    .array(
      z.object({
        name: z.string().min(1, "Medication name is required"),
        size: z.string().min(1, "Medication size is required"),
      })
    )
    .min(1, "At least one medication is required"),
});

export type PcrReportFormValues = z.infer<typeof PcrReportFormSchema>;
