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
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

const CreateTreatmentDialog = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<TreatmentsData>({
    resolver: zodResolver(TreatmentsSchema),
    defaultValues: {
      name: "",
      quantity: 0,
      unit: "",
      category: "",
    },
  });

  const onSubmit = async (data: TreatmentsData) => {
    try {
      setIsLoading(true);
      // Replace this with your actual API call
      // Example
      // const response = await fetch('/api/treatments', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(data),
      // });

      // if (!response.ok) {
      //   throw new Error('Failed to create treatment');
      // }

      // toast success message

      form.reset();
      setIsOpen(false);
    } catch (error) {
      // toast error message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-main hover:bg-main/90" size="sm">
          <Plus className="w-4 h-4 mr-1" />
          New Treatment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Treatment</DialogTitle>
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
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Treatment"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTreatmentDialog;
