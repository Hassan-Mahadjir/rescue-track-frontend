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
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TooltipButton } from "@/components/report/TooltipButton";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/FormInput";
import LoadingIndicator from "@/components/Loading-Indicator";
import Image from "next/image";
import {
  EquipmentFormValues,
  equipmentSchema,
} from "@/types/schema/medication-equipmentSchema";
import { usePostEquipment } from "@/services/api/item";
import { TreatmentConfig } from "@/constants/treatments";
import FormSelect from "@/components/FormSelect";
import FormTextarea from "@/components/FormTextarea";

const { equipmentCategoryOptions } = TreatmentConfig;

const CreateEquipmentDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutatePost, isPending } = usePostEquipment();

  const form = useForm<EquipmentFormValues>({
    resolver: zodResolver(equipmentSchema),
    defaultValues: {
      name: "",
      stockQuantity: 0,
      category: "",
      manufacturer: "",
      serialNumber: "",
      modelNumber: "",
      purchaseDate: new Date().toISOString().split("T")[0],
      warrantyPeriod: 1,
      notes: "",
    },
    mode: "onChange",
  });

  const { isValid } = form.formState;

  const onSubmit = (data: EquipmentFormValues) => {
    mutatePost(data, {
      onSuccess: () => {
        setIsOpen(false);
        form.reset();
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <TooltipButton
          tooltipText="Create New Equipment"
          className="rounded-full hover:bg-main hover:text-white"
        >
          <Plus />
        </TooltipButton>
      </DialogTrigger>

      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Equipment</DialogTitle>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                form={form}
                name="name"
                label="Equipment Name"
                placeholder="Enter equipment name"
              />
              <FormSelect
                form={form}
                name="category"
                label="Category"
                placeholder="Select category"
                options={[...equipmentCategoryOptions]}
              />

              <FormInput
                form={form}
                name="manufacturer"
                label="Manufacturer"
                placeholder="Enter manufacturer"
              />
              <FormInput
                form={form}
                name="serialNumber"
                label="Serial Number"
                placeholder="Enter serial number"
              />
              <FormInput
                form={form}
                name="modelNumber"
                label="Model Number"
                placeholder="Enter model number"
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
                name="purchaseDate"
                label="Purchase Date"
                type="date"
              />
              <FormInput
                form={form}
                name="warrantyPeriod"
                label="Warranty Period (Years)"
                placeholder="Enter warranty years"
                type="number"
              />
              <div className="col-span-2">
                <FormTextarea
                  form={form}
                  name="notes"
                  label="Notes"
                  placeholder="Optional notes..."
                />
              </div>
            </div>

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

export default CreateEquipmentDialog;
