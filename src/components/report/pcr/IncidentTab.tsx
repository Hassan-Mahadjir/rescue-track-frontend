"use client";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useNewPCRFormContext } from "@/hooks/PCRFormContext";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  incidentNumber: z.string().min(2),
  dateOfIncident: z.string().min(1, "Date of Incident is required"),
  incidentType: z.string().min(1, "Incident Type is required"),
  incidentStatus: z.string().min(1, "Incident Status is required"),
  region: z.string().min(1, "Region is required"),
  neighborhood: z.string().min(1, "Neighborhood is required"),
  street: z.string().min(1, "Street is required"),
  landmark: z.string().optional(),
  reason: z.string().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

const IncidentTab = () => {
  const formContext = useNewPCRFormContext();

  // Initialize form with default values
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      incidentNumber: formContext.propertyForm?.incidentNumber || "17891",
    },
  });

  // Sync form value with context when the component mounts
  useEffect(() => {
    formContext.updatePropertyForm({
      incidentNumber: form.getValues("incidentNumber"),
    });
  }, []); // Runs only once when the component mounts

  // Watch form changes and update the context dynamically
  useEffect(() => {
    const subscription = form.watch((values) => {
      formContext.updatePropertyForm(values);
    });
    return () => subscription.unsubscribe();
  }, [form, formContext]);

  const onSubmit = async (values: FormSchema) => {
    console.log(formContext.propertyForm?.incidentNumber);
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4"
        >
          <FormInput
            form={form}
            label="Incident number"
            name="incidentNumber"
          />

          <FormInput
            form={form}
            name="dateOfIncident"
            label="Date of incident"
            placeholder="DD-MM-YYYY"
          />

          <FormInput
            form={form}
            name="incidentType"
            label="Incident Type"
            placeholder="Enter type"
          />
          <FormInput
            form={form}
            name="incidentStatus"
            label="Incident Status"
            placeholder="Status"
          />
          <FormInput
            form={form}
            name="region"
            label="Region"
            placeholder="Enter region"
          />
        </form>
      </Form>
    </div>
  );
};

export default IncidentTab;
