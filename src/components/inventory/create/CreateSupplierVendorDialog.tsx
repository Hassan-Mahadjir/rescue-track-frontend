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
import { Plus, Camera } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect";
import LoadingIndicator from "@/components/Loading-Indicator";
import { TooltipButton } from "@/components/report/TooltipButton";
import { VendorFormData, vendorSchema } from "@/types/inventoryFormSchema";
import Image from "next/image";

const specialistOptions = [
  { label: "Pharmacy", value: "pharmacy" },
  { label: "Laboratory", value: "laboratory" },
  { label: "Hospital", value: "hospital" },
  { label: "Other", value: "other" },
];

const CreateSupplierVendorDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const form = useForm<VendorFormData>({
    resolver: zodResolver(vendorSchema),
    defaultValues: {
      supplierName: "",
      specialist: "",
      email: "",
      phone: "",
      address: "",
      website: "",
    },
    mode: "onChange",
  });

  const { isValid } = form.formState;

  const onSubmit = (data: VendorFormData) => {
    setIsPending(true);
    setTimeout(() => {
      console.log("Submitted vendor:", data);
      setIsPending(false);
      setIsOpen(false);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <TooltipButton
          tooltipText="Add New Supply"
          className="rounded-full hover:bg-main hover:text-white"
        >
          <Plus />
        </TooltipButton>
      </DialogTrigger>

      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-green-900">
            Create new Vendor
          </DialogTitle>
        </DialogHeader>

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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                form={form}
                name="supplierName"
                label="Supplier Name"
                placeholder="Enter supplier name"
              />

              <FormSelect
                form={form}
                name="specialist"
                label="Specialists"
                placeholder="Select Specialists"
                options={specialistOptions.map((opt) => ({
                  label: opt.label,
                  value: opt.value,
                }))}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                form={form}
                name="email"
                label="E-mail Address"
                placeholder="E-example@email.com"
              />
              <FormInput
                form={form}
                name="phone"
                label="Phone Number"
                placeholder="Enter medication name"
              />
            </div>

            <FormInput
              form={form}
              name="address"
              label="Address"
              placeholder="Enter address"
            />
            <FormInput
              form={form}
              name="website"
              label="Web Site"
              placeholder="www.website.com"
            />

            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                className="bg-muted text-muted-foreground hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
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

export default CreateSupplierVendorDialog;
