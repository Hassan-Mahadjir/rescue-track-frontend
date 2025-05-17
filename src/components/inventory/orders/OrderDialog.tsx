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
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createOrderSchema,
  CreateOrderValues,
} from "@/types/schema/orderFormSchema";
import { usePostOrder } from "@/services/api/order";
import { useSuppliers } from "@/services/api/supplier";
import { useItems } from "@/services/api/item";
import { Form } from "@/components/ui/form";
import FormSelect from "@/components/FormSelect";
import FormInput from "@/components/FormInput";
import FormTextarea from "@/components/FormTextarea";
import LoadingIndicator from "@/components/Loading-Indicator";

export function OrderDialog() {
  const [open, setOpen] = useState(false);
  const { mutatePost, isPending } = usePostOrder();
  const { supplierData } = useSuppliers();
  const { itemData } = useItems();

  const form = useForm<CreateOrderValues>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      supplierId: 0,
      notes: "",
      orderType: "medication",
      orderItems: [
        {
          quantity: 1,
          unit: "",
          medicationId: undefined,
          equipmentId: undefined,
        },
      ],
    },
    mode: "onChange",
  });

  const orderType = form.watch("orderType");

  const onSubmit = (data: CreateOrderValues) => {
    mutatePost(data, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
      },
    });
  };

  useEffect(() => {
    if (orderType === "medication") {
      const current = form.getValues("orderItems.0.equipmentId");
      if (current !== undefined) {
        form.setValue("orderItems.0.equipmentId", undefined);
      }
    } else if (orderType === "equipment") {
      const current = form.getValues("orderItems.0.medicationId");
      if (current !== undefined) {
        form.setValue("orderItems.0.medicationId", undefined);
      }
    }
  }, [orderType, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="bg-green-800 hover:bg-green-700 gap-1">
          <Plus className="h-4 w-4" />
          New order
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Order</DialogTitle>
          <DialogDescription>
            Create a new order to be scheduled in the calendar.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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

            {orderType === "medication" && (
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

            {orderType === "equipment" && (
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
