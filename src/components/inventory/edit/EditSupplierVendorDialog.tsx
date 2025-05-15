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
import { Edit, Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect";
import LoadingIndicator from "@/components/Loading-Indicator";
import { TooltipButton } from "@/components/report/TooltipButton";
import Image from "next/image";
import {
  SupplierFormValues,
  supplierSchema,
} from "@/types/schema/supplierFormSchema";
import { specialistOptions } from "@/constants/supplier";
import { useUpdateSupplier } from "@/services/api/supplier";

interface EditSupplierVendorDialogProps {
  supplier: Supplier;
}

const EditSupplierVendorDialog = ({
  supplier,
}: EditSupplierVendorDialogProps) => {
  const [open, setOpen] = useState(false);
  const { mutateUpdate, isPending } = useUpdateSupplier(supplier.id);

  const normalizeSpecialist = (input?: string) => {
    if (!input) return "other";
    return (
      specialistOptions.find(
        (opt) => opt.label.toLowerCase() === input.toLowerCase()
      )?.value ?? "other"
    );
  };

  const form = useForm<SupplierFormValues>({
    resolver: zodResolver(supplierSchema),
    defaultValues: {
      name: supplier.name,
      specialist: normalizeSpecialist(supplier.specialist),
      email: supplier.email,
      phone: supplier.phone,
      address: supplier.address,
      website: supplier.website,
      contactPerson: supplier.contactPerson,
      status:
        supplier.status === "active" || supplier.status === "inactive"
          ? supplier.status
          : undefined,
    },
    mode: "onChange",
  });

  const { isValid } = form.formState;

  const onSubmit = (data: SupplierFormValues) => {
    mutateUpdate(data, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          variant="ghost"
          className="rounded flex justify-center items-center hover:text-gray-400"
        >
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-green-900">Edit Supplier</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <Image
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt="supplier-profile"
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
                name="name"
                label="Supplier Name"
                placeholder="Enter supplier name"
              />
              <FormSelect
                form={form}
                name="specialist"
                label="Specialist"
                placeholder="Select specialist"
                options={[...specialistOptions]}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                form={form}
                name="email"
                label="Email Address"
                placeholder="example@email.com"
              />
              <FormInput
                form={form}
                name="phone"
                label="Phone Number"
                placeholder="Enter phone number"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                form={form}
                name="address"
                label="Address"
                placeholder="Enter address"
              />
              <FormInput
                form={form}
                name="website"
                label="Website"
                placeholder="www.website.com"
              />
            </div>

            <FormInput
              form={form}
              name="contactPerson"
              label="Contact Person"
              placeholder="Enter contact name"
            />

            <FormSelect
              form={form}
              name="status"
              label="Status"
              options={[
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
              ]}
            />

            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                className="bg-muted text-muted-foreground hover:bg-gray-100"
                onClick={() => setOpen(false)}
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
                  "Update"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditSupplierVendorDialog;
