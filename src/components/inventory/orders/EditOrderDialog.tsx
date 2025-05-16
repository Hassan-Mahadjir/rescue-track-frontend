"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createOrderSchema,
  CreateOrderValues,
} from "@/types/schema/orderFormSchema";
import { useSuppliers } from "@/services/api/supplier";
import { useItems } from "@/services/api/item";
import { useUpdateOrder } from "@/services/api/order";
import { Form } from "@/components/ui/form";
import FormSelect from "@/components/FormSelect";
import FormInput from "@/components/FormInput";
import FormTextarea from "@/components/FormTextarea";
import LoadingIndicator from "@/components/Loading-Indicator";
import { Order } from "@/types/order.type";

interface EditOrderDialogProps {
  order: Order;
}

export function EditOrderDialog({ order }: EditOrderDialogProps) {
  const [open, setOpen] = useState(false);
  const { mutateUpdate, isPending } = useUpdateOrder(order.id);
  const { supplierData } = useSuppliers();
  const { itemData } = useItems();

  // Determine if it's a medication or equipment order
  const initialOrderType =
    order.orderItems[0]?.medication !== null ? "medication" : "equipment";

  const form = useForm<CreateOrderValues>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      supplierId: order.supplier.id,
      notes: order.notes,
      status: order.status,
      orderType: initialOrderType,
      orderItems: [
        {
          quantity: order.orderItems[0]?.quantity ?? 1,
          unit: order.orderItems[0]?.unit?.abbreviation ?? "",
          medicationId: order.orderItems[0]?.medication?.id ?? undefined,
          equipmentId: order.orderItems[0]?.equipment?.id ?? undefined,
        },
      ],
    },
    mode: "onChange",
  });

  const onSubmit = (data: CreateOrderValues) => {
    mutateUpdate(data, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  useEffect(() => {
    const type = form.watch("orderType");

    if (type === "medication") {
      const current = form.getValues("orderItems.0.equipmentId");
      if (current !== undefined) {
        form.setValue("orderItems.0.equipmentId", undefined);
      }
    } else if (type === "equipment") {
      const current = form.getValues("orderItems.0.medicationId");
      if (current !== undefined) {
        form.setValue("orderItems.0.medicationId", undefined);
      }
    }
  }, [form.watch("orderType")]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-muted-foreground hover:text-black"
        >
          <Pencil className="h-4 w-4 mr-1" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Order</DialogTitle>
          <DialogDescription>
            Modify the details of this order.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormSelect
              form={form}
              name="orderType"
              label="Order Type"
              placeholder="Select type"
              options={[
                { label: "Medication", value: "medication" },
                { label: "Equipment", value: "equipment" },
              ]}
            />

            <FormSelect
              form={form}
              name="supplierId"
              label="Supplier"
              placeholder="Select supplier"
              options={
                supplierData?.map((s) => ({
                  label: s.name,
                  value: s.id,
                })) ?? []
              }
            />

            {form.watch("orderType") === "medication" && (
              <FormSelect
                form={form}
                name="orderItems.0.medicationId"
                label="Medication"
                placeholder="Select medication"
                options={
                  itemData?.medications?.map((med) => ({
                    label: med.name,
                    value: med.id,
                  })) || []
                }
              />
            )}

            {form.watch("orderType") === "equipment" && (
              <FormSelect
                form={form}
                name="orderItems.0.equipmentId"
                label="Equipment"
                placeholder="Select equipment"
                options={
                  itemData?.equipments?.map((equip) => ({
                    label: equip.name,
                    value: equip.id,
                  })) || []
                }
              />
            )}
            <div className="grid grid-cols-2">
              <FormInput
                form={form}
                name="orderItems.0.quantity"
                label="Quantity"
                type="number"
                placeholder="Enter quantity"
              />

              <FormInput
                form={form}
                name="orderItems.0.unit"
                label="Unit"
                placeholder="e.g. mg, ml"
              />
            </div>
            <FormSelect
              form={form}
              name="status"
              label="Order Status"
              placeholder="Select status"
              options={[
                { label: "Pending", value: "pending" },
                { label: "Completed", value: "completed" },
                { label: "Cancelled", value: "cancelled" },
                { label: "Delivered", value: "delivered" },
                { label: "Received", value: "received" },
              ]}
            />

            <FormTextarea
              form={form}
              name="notes"
              label="Notes"
              placeholder="Write notes about the order"
            />

            <DialogFooter>
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-main hover:bg-main/90"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <LoadingIndicator />
                      Saving...
                    </>
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
