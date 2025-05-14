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
import { Plus, CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { TreatmentConfig } from "@/constants/treatments";
import { TooltipButton } from "@/components/report/TooltipButton";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Form } from "@/components/ui/form";
import FormSelect from "@/components/FormSelect";
import FormInput from "@/components/FormInput";
import FormTextarea from "@/components/FormTextarea";
import LoadingIndicator from "@/components/Loading-Indicator";
import {
  MedicationFormData,
  medicationSchema,
} from "@/types/schema/inventoryFormSchema";
import Image from "next/image";

const { categoryOptions, unitOptions } = TreatmentConfig;

const CreateMedicationDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const form = useForm<MedicationFormData>({
    resolver: zodResolver(medicationSchema),
    defaultValues: {
      name: "",
      category: "",
      expirationDate: new Date(),
      quantity: 1,
      size: 100,
      unit: "mg",
      description: "",
    },
    mode: "onChange",
  });

  const { isValid } = form.formState;

  const onSubmit = (data: MedicationFormData) => {
    setIsPending(true);
    setTimeout(() => {
      console.log("Submitted medication:", data);
      form.reset();
      setIsPending(false);
      setIsOpen(false);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <TooltipButton
          tooltipText="Create New Medication"
          className="rounded-full hover:bg-main hover:text-white"
        >
          <Plus />
        </TooltipButton>
      </DialogTrigger>

      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Create New Medication</DialogTitle>
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
              <FormField
                control={form.control}
                name="expirationDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiration Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full text-left font-normal"
                        >
                          {field.value
                            ? format(field.value, "PPP")
                            : "Pick a date"}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormInput
                form={form}
                name="quantity"
                label="Quantity"
                placeholder="Enter number of quantity"
                type="number"
              />

              <FormInput
                form={form}
                name="size"
                label="Size"
                placeholder="e.g. 100"
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

            <FormTextarea
              form={form}
              name="description"
              label="Description"
              placeholder="Optional notes..."
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

export default CreateMedicationDialog;
