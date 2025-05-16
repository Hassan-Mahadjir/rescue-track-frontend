import { z } from "zod";

// One order item must have either medicationId or equipmentId
const orderItemSchema = z
  .object({
    quantity: z.number().min(1, "Quantity must be at least 1"),
    unit: z.string().min(1, "Unit is required"),
    medicationId: z.number().int().positive().optional(),
    equipmentId: z.number().int().positive().optional(),
  })
  .refine((data) => data.medicationId || data.equipmentId, {
    message:
      "Each item must have either a medication or an equipment selected.",
    path: ["medicationId"], // show error under medicationId
  })
  .refine((data) => !(data.medicationId && data.equipmentId), {
    message: "Item cannot have both medication and equipment.",
    path: ["medicationId"], // show error under medicationId
  });

export const createOrderSchema = z.object({
  orderType: z.enum(["medication", "equipment"]),
  supplierId: z.number().int().positive("Supplier ID is required"),
  status: z.string().optional(),
  notes: z.string().optional(),
  orderItems: z
    .array(orderItemSchema)
    .min(1, "At least one order item is required"),
});

export type CreateOrderValues = z.infer<typeof createOrderSchema>;
