"use client";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PatientReportData,
  PcrReportFormSchema,
  PcrReportFormValues,
  stepSchemas,
} from "@/types/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { steps } from "./steps";
import { Button } from "@/components/ui/button";
import PcrReportStep1 from "./PcrReportStep1";
import PcrReportStep2 from "./PcrReportStep2";
import PcrReportStep3 from "./PcrReportStep3";
import PcrReportStep4 from "./PcrReportStep4";
import FormSummary from "../registered/FormSummary";

const RegisteredForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [touchedSteps, setTouchedSteps] = useState<number[]>([]);
  const [showSummary, setShowSummary] = useState(false);

  const form = useForm<PcrReportFormValues>({
    resolver: zodResolver(PcrReportFormSchema),
    defaultValues: {
      patientId: undefined,
      medications: [],
      transportInfo: {
        transferType: "",
        vehicleId: "",
        emergencyType: "",
        pickupAddress: "",
        destinationAddress: "",
      },
      medicalHistory: {
        conditions: [],
        allergies: [],
        notes: "",
      },
    },
    mode: "onChange", // Validate on change for better user experience
  });

  const {
    handleSubmit,
    formState,
    trigger,
    formState: { errors },
  } = form;

  const goToStep = async (step: number) => {
    const currentSchema = stepSchemas[currentStep];

    // Trigger validation only on current step fields
    const fieldsToValidate = Object.keys(
      currentSchema.shape
    ) as (keyof PcrReportFormValues)[];
    const isValid = await trigger(fieldsToValidate);

    if (step > currentStep && !isValid) {
      setTouchedSteps((prev) => [...new Set([...prev, currentStep])]);
      return;
    }

    setCurrentStep(step);
  };

  console.log("error", formState.errors);

  // Handle final form submission
  const onSubmit = (data: PcrReportFormValues) => {
    console.log("Form Submitted!", data);
    setShowSummary(true);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {showSummary ? (
            <FormSummary data={form.getValues() as PatientReportData} />
          ) : (
            <Tabs value={steps[currentStep].id} className="w-full">
              <TabsList className="grid grid-cols-4 border-b rounded-none bg-transparent p-0">
                {steps.map((step, index) => {
                  const hasError =
                    touchedSteps.includes(index) &&
                    Object.keys(errors).length > 0;
                  return (
                    <TabsTrigger
                      key={step.id}
                      value={step.id}
                      onClick={() => goToStep(index)}
                      className={
                        hasError
                          ? "border-red-500 text-red-500 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none font-medium hover:text-gray-950"
                          : "data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none font-medium hover:text-gray-950"
                      }
                    >
                      {step.label}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
              {steps.map((step, index) => (
                <TabsContent key={step.id} value={step.id}>
                  <div className="min-h-[200px]">
                    {index === 0 && <PcrReportStep1 />}
                    {index === 1 && <PcrReportStep2 />}
                    {index === 2 && <PcrReportStep3 />}
                    {index === 3 && <PcrReportStep4 />}
                  </div>
                  <div className="flex justify-center items-center space-x-4 mt-6">
                    {index > 0 && (
                      <Button
                        type="button"
                        onClick={() => setCurrentStep(index - 1)}
                        variant="outline"
                        size="lg"
                      >
                        Previous
                      </Button>
                    )}
                    {index < steps.length - 1 ? (
                      <Button
                        size="lg"
                        type="button"
                        className="bg-main"
                        onClick={() => goToStep(index + 1)}
                      >
                        Next
                      </Button>
                    ) : (
                      <Button type="submit" size="lg" className="bg-main">
                        Submit
                      </Button>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </form>
      </Form>
    </div>
  );
};

export default RegisteredForm;
