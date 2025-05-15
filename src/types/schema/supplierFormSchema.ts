import { z } from "zod";

export const supplierSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .regex(/^\+?[0-9\s\-()]{10,}$/, { message: "Invalid phone number" }),
  address: z.string().min(2, { message: "Address is required" }),
  specialist: z.string().min(2, { message: "Specialist is required" }),
  contactPerson: z.string().min(2, { message: "Contact person is required" }),
  status: z.enum(["active", "inactive"]),
  website: z.string().min(7, "Invalid website URL"),
});

export type SupplierFormValues = z.infer<typeof supplierSchema>;
