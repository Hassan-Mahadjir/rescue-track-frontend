import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { TreatmentsData, TreatmentsSchema } from "@/types/formSchema";
import { Treatments } from "@/types/PCR.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

interface TreatmentsProps {
  treatment: Treatments;
}
const EditTreatmentDialog = ({ treatment }: TreatmentsProps) => {
  const form = useForm<TreatmentsData>({
    resolver: zodResolver(TreatmentsSchema),
    defaultValues: {
      id: treatment.id,
      name: treatment.name || "",
      quantity: treatment.quantity,
      unit: treatment.unit || "",
      category: treatment.category || "",
    },
  });

  const onSubmit = (data: TreatmentsData) => {
    console.log(data);
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Pencil className="h-3.5 w-3.5" />
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Treatment</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormInput form={form} name="name" label="Treatment Name" />
              <FormInput form={form} name="category" label="Category" />
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  form={form}
                  name="quantity"
                  label="Quantity"
                  type="number"
                />
                <FormInput form={form} name="unit" label="Unit" />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="submit">Save changes</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditTreatmentDialog;
