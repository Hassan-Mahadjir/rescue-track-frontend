"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CombinedFormData,
  CombinedSchema,
  Step1Schema,
  Step2Schema,
  Step3Schema,
  Step4Schema,
} from "@/types/reportFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import RunReportStep1 from "./RunReportStep1";

const stepSchemas = [Step1Schema, Step2Schema, Step3Schema, Step4Schema];

const steps = [
  { id: "1", label: "Patient Information" },
  { id: "2", label: "Medication information" },
  { id: "3", label: "Crew Information" },
];

const MultiStepForm = () => {
  const [step, setStep] = useState(0);
  const [touchedSteps, setTouchedSteps] = useState<number[]>([]);

  const form = useForm<CombinedFormData>({
    resolver: zodResolver(CombinedSchema),
    mode: "onTouched",
  });

  const {
    register,
    handleSubmit,
    trigger,
    formState: { isValid, isSubmitting, errors },
  } = form;

  const hasStepErrors = (stepIndex: number) => {
    const schemaKeys = Object.keys(stepSchemas[stepIndex].shape);
    return schemaKeys.some((key) => !!errors[key as keyof CombinedFormData]);
  };

  const goToStep = (index: number) => {
    setStep(index);
    if (!touchedSteps.includes(index)) {
      setTouchedSteps((prev) => [...prev, index]);
    }
  };

  const handleNext = async () => {
    const currentStepSchema = stepSchemas[step];
    const currentFields = Object.keys(currentStepSchema.shape);
    const isValid = await trigger(currentFields as any);
    if (isValid) {
      setTouchedSteps((prev) => [...new Set([...prev, step])]);
      setStep((prev) => prev + 1);
    }
  };
  const handleBack = () => {
    setStep((prev) => prev - 1);
  };
  const onSubmit = (data: CombinedFormData) => {
    console.log("Final data:", data);
    // send to API or display confirmation
  };
  return (
    // <form onSubmit={handleSubmit(onSubmit)}>
    //   {/* Step 1 */}
    //   {step === 0 && (
    //
    //   )}

    //   {/* Step 2 */}
    //   {step === 1 && (
    //     <>
    //       <input {...register("category")} placeholder="Category" />
    //       {errors.category && <p>{errors.category.message}</p>}

    //       <select {...register("priority")}>
    //         <option value="">Select priority</option>
    //         <option value="low">Low</option>
    //         <option value="medium">Medium</option>
    //         <option value="high">High</option>
    //       </select>
    //       {errors.priority && <p>{errors.priority.message}</p>}

    //       <select {...register("transportStatus")}>
    //         <option value="">Transport Status</option>
    //         <option value="transported">Transported</option>
    //         <option value="not transported">Not Transported</option>
    //         <option value="pending">Pending</option>
    //       </select>
    //       {errors.transportStatus && <p>{errors.transportStatus.message}</p>}

    //       <input
    //         {...register("mileage", { valueAsNumber: true })}
    //         placeholder="Mileage"
    //       />
    //       {errors.mileage && <p>{errors.mileage.message}</p>}
    //     </>
    //   )}

    //   {/* Step 3 */}
    //   {step === 2 && (
    //     <>
    //       <input
    //         type="date"
    //         {...register("responseTime")}
    //         placeholder="Response Time"
    //       />
    //       {errors.responseTime && <p>{errors.responseTime.message}</p>}

    //       <input
    //         type="date"
    //         {...register("arrivalTimeAtScense")}
    //         placeholder="Arrival at Scene"
    //       />
    //       {errors.arrivalTimeAtScense && (
    //         <p>{errors.arrivalTimeAtScense.message}</p>
    //       )}

    //       <input
    //         type="date"
    //         {...register("arrivalTimeAtPatient")}
    //         placeholder="Arrival at Patient"
    //       />
    //       {errors.arrivalTimeAtPatient && (
    //         <p>{errors.arrivalTimeAtPatient.message}</p>
    //       )}

    //       <input
    //         type="date"
    //         {...register("departureTime")}
    //         placeholder="Departure Time"
    //       />
    //       {errors.departureTime && <p>{errors.departureTime.message}</p>}
    //     </>
    //   )}

    //   {/* Step 4 */}
    //   {step === 3 && (
    //     <>
    //       <textarea {...register("notes")} placeholder="Notes" />
    //       {errors.notes && <p>{errors.notes.message}</p>}
    //     </>
    //   )}

    //   {/* Navigation Buttons */}
    //   <div style={{ marginTop: 20 }}>
    //     {step > 0 && (
    //       <button type="button" onClick={handleBack}>
    //         Back
    //       </button>
    //     )}
    //     {step < 3 && (
    //       <button type="button" onClick={handleNext}>
    //         Next
    //       </button>
    //     )}
    //     {step === 3 && <button type="submit">Submit</button>}
    //   </div>
    // </form>
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="bg-white shadow-sm">
            <Tabs value={steps[step].id} className="space-y-6 w-full">
              <div className="overflow-x-auto pb-1 -mb-1">
                <TabsList className="flex min-w-max border-b rounded-none bg-transparent p-0 h-auto">
                  {steps.map((step, index) => {
                    const hasError =
                      touchedSteps.includes(index) && hasStepErrors(index);
                    const isCompleted =
                      touchedSteps.includes(index) && !hasStepErrors(index);

                    return (
                      <TabsTrigger
                        key={step.id}
                        value={step.id}
                        onClick={() => goToStep(index)}
                        className={`
                                          py-3 px-3 sm:px-4 rounded-none font-medium transition-all flex-1 min-w-[80px]
                                          ${
                                            hasError
                                              ? "border-b-2 border-red-500 text-red-600"
                                              : isCompleted
                                              ? "border-b-2 border-green-500 text-green-600"
                                              : "data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary"
                                          }
                                          hover:bg-gray-50
                                        `}
                      >
                        <div className="flex items-center justify-center sm:justify-start gap-1 sm:gap-2">
                          {hasError && (
                            <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                          )}
                          {isCompleted && !hasError && (
                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                          )}
                          <span className="text-xs sm:text-sm">
                            {step.label}
                          </span>
                        </div>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
              </div>
              {steps.map((step, index) => (
                <TabsContent key={step.id} value={step.id} className="p-6">
                  <div className="min-h-[300px]">
                    {index === 0 && <RunReportStep1 />}
                    {index === 1 && <div>1</div>}
                    {index === 2 && <div>2</div>}
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
                      <div></div>
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
                        disabled={!isSubmitting || !isValid}
                      >
                        Submit Report
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
