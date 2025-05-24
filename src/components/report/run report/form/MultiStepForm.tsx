"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import RunReportStep1 from "./RunReportStep1";
import RunReportStep2 from "./RunReportStep2";
import RunReportStep3 from "./RunReportStep3";
import { usePostRunReport, useUpdateRunReport } from "@/services/api/reports";
import LoadingIndicator from "@/components/Loading-Indicator";
import {
  RunReportFormData,
  RunReportSchema,
  RunReportStep1Schema,
  RunReportStep2Schema,
  RunReportStep3Schema,
} from "@/types/schema/reportFormSchema";

const MultiStepForm = ({
  defaultValues,
  isEdit = false,
}: {
  defaultValues?: RunReportFormData;
  isEdit?: boolean;
}) => {
  // always show all three steps
  const allSteps = [
    { id: "1", label: "Patient Information" },
    { id: "2", label: "Emergency Details" },
    { id: "3", label: "Crew Information" },
  ];
  const allSchemas = [
    RunReportStep1Schema,
    RunReportStep2Schema,
    RunReportStep3Schema,
  ];

  const steps = allSteps;
  const stepSchemas = allSchemas;

  const [step, setStep] = useState(0);
  const [touchedSteps, setTouchedSteps] = useState<number[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const reportId = defaultValues?.id ?? 0;
  const { mutatePost } = usePostRunReport();
  const { mutateUpdate } = useUpdateRunReport(reportId);

  const form = useForm<RunReportFormData>({
    resolver: zodResolver(RunReportSchema),
    mode: "onTouched",
    defaultValues,
  });

  const {
    handleSubmit,
    trigger,
    formState: { isValid, errors },
  } = form;

  const hasStepErrors = (stepIndex: number) => {
    const schemaKeys = Object.keys(stepSchemas[stepIndex].shape);
    return schemaKeys.some((key) => !!errors[key as keyof RunReportFormData]);
  };

  const goToStep = (index: number) => {
    setStep(index);
    if (!touchedSteps.includes(index)) {
      setTouchedSteps((prev) => [...prev, index]);
    }
  };

  const handleNext = async () => {
    const currentStepSchema = stepSchemas[step];
    const currentFields = Object.keys(currentStepSchema.shape) as Array<
      keyof RunReportFormData
    >;
    const valid = await trigger(currentFields);
    if (valid) {
      setTouchedSteps((prev) => [...new Set([...prev, step])]);
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const onSubmit = async (data: RunReportFormData) => {
    setSubmitting(true);
    if (isEdit) {
      mutateUpdate(data, { onSettled: () => setSubmitting(false) });
    } else {
      mutatePost(data, { onSettled: () => setSubmitting(false) });
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="bg-white shadow-sm">
            <Tabs value={steps[step].id} className="space-y-6 w-full">
              <div className="overflow-x-auto pb-1 -mb-1">
                <TabsList className="flex min-w-max border-b rounded-none bg-transparent p-0 h-auto">
                  {steps.map((stepItem, index) => {
                    const hasError =
                      touchedSteps.includes(index) && hasStepErrors(index);
                    const isCompleted =
                      touchedSteps.includes(index) && !hasStepErrors(index);

                    return (
                      <TabsTrigger
                        key={stepItem.id}
                        value={stepItem.id}
                        onClick={() => goToStep(index)}
                        className={`py-3 px-3 sm:px-4 rounded-none font-medium transition-all flex-1 min-w-[80px] ${
                          hasError
                            ? "border-b-2 border-red-500 text-red-600"
                            : isCompleted
                            ? "border-b-2 border-green-500 text-green-600"
                            : "data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary"
                        } hover:bg-gray-50`}
                      >
                        <div className="flex items-center justify-center sm:justify-start gap-1 sm:gap-2">
                          {hasError && (
                            <AlertCircle className="h-4 w-4 text-red-500" />
                          )}
                          {isCompleted && (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          )}
                          <span className="text-xs sm:text-sm">
                            {stepItem.label}
                          </span>
                        </div>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
              </div>

              {steps.map((stepItem, index) => (
                <TabsContent
                  key={stepItem.id}
                  value={stepItem.id}
                  className="p-6"
                >
                  <div className="min-h-[300px]">
                    {index === 0 && <RunReportStep1 />}
                    {index === 1 && <RunReportStep2 />}
                    {index === 2 && <RunReportStep3 />}
                  </div>

                  <div className="flex justify-between items-center mt-8">
                    {index > 0 ? (
                      <Button
                        type="button"
                        onClick={handleBack}
                        variant="outline"
                        size="lg"
                      >
                        Previous
                      </Button>
                    ) : (
                      <div />
                    )}
                    {index < steps.length - 1 ? (
                      <Button
                        size="lg"
                        type="button"
                        className="bg-main hover:bg-main/90"
                        onClick={handleNext}
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        size="lg"
                        className="bg-main hover:bg-main/90"
                        disabled={submitting || !isValid}
                      >
                        {submitting ? (
                          <LoadingIndicator />
                        ) : isEdit ? (
                          "Update Report"
                        ) : (
                          "Submit Report"
                        )}
                      </Button>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default MultiStepForm;
