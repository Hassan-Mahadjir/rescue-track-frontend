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
import { Plus, Camera, CalendarIcon } from "lucide-react";
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
} from "@/types/inventoryFormSchema";
import Image from "next/image";

const CreateSupplierVendorDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const form = useForm();

  const onSubmit = (data: any) => {
    setIsPending(true);
    setTimeout(() => {
      console.log("Submitted medication:", data);
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
          <DialogTitle>Create New Medication</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
          ></form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSupplierVendorDialog;
