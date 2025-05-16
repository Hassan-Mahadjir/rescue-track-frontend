"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TooltipButton } from "@/components/report/TooltipButton";
import { Form } from "@/components/ui/form";
import FormSelect from "@/components/FormSelect";
import FormInput from "@/components/FormInput";
import LoadingIndicator from "@/components/Loading-Indicator";
import Image from "next/image";
import {
  MedicationFormValues,
  medicationSchema,
} from "@/types/schema/medication-equipmentSchema";
import { TreatmentConfig } from "@/constants/treatments";

const { categoryOptions, unitOptions } = TreatmentConfig;

interface EditMedicationDialogProps {
  medication: Medication;
}

const EditMedicationDialog = ({ medication }: EditMedicationDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setPending] = useState(false);
  // const { mutateUpdate, isPending } = useUpdateMedication();

  const form = useForm<MedicationFormValues>({
    resolver: zodResolver(medicationSchema),
    defaultValues: {
      name: medication.name,
      stockQuantity: medication.stockQuantity,
      category: medication.category,
      unit: medication.unit.name,
      expirationDate: medication.expirationDate.split("T")[0], // "YYYY-MM-DD"
      reorderPoint: medication.reorderPoint,
      batchNumber: medication.batchNumber,
    },
    mode: "onChange",
  });

  const { isValid } = form.formState;

  const onSubmit = (data: MedicationFormValues) => {
    // mutateUpdate(
    //   { id: medication.id, data },
    //   {
    //     onSuccess: () => {
    //       setIsOpen(false);
    //     },
    //   }
    // );
    console.log(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <TooltipButton
          tooltipText="Edit Medication"
          className="rounded-full hover:bg-main hover:text-white"
        >
          <Pencil className="w-4 h-4" />
        </TooltipButton>
      </DialogTrigger>

      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Medication</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full overflow-hidden">
                <Image
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  alt="blank-profile"
                  className="object-cover w-full h-full"
                  width={80}
                  height={80}
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
              <div className="w-full lg:w-3/4">
                <FormInput
                  form={form}
                  name="name"
                  label="Medication Name"
                  placeholder="Enter medication name"
                />
              </div>
              <div className="w-full lg:w-1/4">
                <FormSelect
                  form={form}
                  name="category"
                  label="Category"
                  placeholder="Select category"
                  options={categoryOptions.map((opt) => ({
                    label: opt.name,
                    value: opt.name,
                  }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                form={form}
                name="batchNumber"
                label="Batch Number"
                placeholder="e.g. A12345"
              />

              <FormInput
                form={form}
                name="stockQuantity"
                label="Stock Quantity"
                placeholder="Enter quantity"
                type="number"
              />

              <FormInput
                form={form}
                name="reorderPoint"
                label="Reorder Point"
                placeholder="Enter reorder point"
                type="number"
              />

              <FormSelect
                form={form}
                name="unit"
                label="Unit"
                placeholder="Select unit"
                options={unitOptions.map((opt) => ({
                  label: opt.name,
                  value: opt.name,
                }))}
              />
            </div>

            <FormInput
              form={form}
              name="expirationDate"
              label="Expiration Date"
              placeholder="Select a date"
              type="date"
            />

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-main hover:bg-main/90"
                disabled={isPending || !isValid}
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
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMedicationDialog;
