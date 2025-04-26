"use client";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  type PatientReportData,
  PcrReportFormSchema,
  type PcrReportFormValues,
  stepSchemas,
} from "@/types/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { steps } from "./steps";
import { Button } from "@/components/ui/button";
import PcrReportStep1 from "./PcrReportStep1";
import PcrReportStep2 from "./PcrReportStep2";
import PcrReportStep3 from "./PcrReportStep3";
import PcrReportStep4 from "./PcrReportStep4";
import FormSummary from "./FormSummary";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PCR } from "@/types/patients.type";

const RegisteredForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [touchedSteps, setTouchedSteps] = useState<number[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const form = useForm<PcrReportFormValues>({
    resolver: zodResolver(PcrReportFormSchema),
    defaultValues: {
      patientId: undefined,
      medications: [{ name: "", size: "" }],
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
    mode: "onChange",
  });

  const {
    handleSubmit,
    trigger,
    reset,
    formState: { errors, isValid, isSubmitting },
    getValues,
  } = form;

  const hasStepErrors = (stepIndex: number) => {
    const stepFields = Object.keys(stepSchemas[stepIndex].shape);
    return stepFields.some((field) => {
      const nestedErrors = errors[field as keyof typeof errors];
      return !!nestedErrors;
    });
  };

  const goToStep = async (step: number) => {
    const currentSchema = stepSchemas[currentStep];
    const fieldsToValidate = Object.keys(
      currentSchema.shape
    ) as (keyof PcrReportFormValues)[];
    const isValid = await trigger(fieldsToValidate);

    if (step > currentStep && !isValid) {
      setTouchedSteps((prev) => [...new Set([...prev, currentStep])]);
      return;
    }

    setCurrentStep(step);
    setTouchedSteps((prev) => [...new Set([...prev, step])]);
  };

  const handleFormSubmission = async (action: "review" | "submit") => {
    // Validate all fields
    const isValid = await trigger();

    if (!isValid) {
      // Mark all steps as touched to show errors
      const allSteps = steps.map((_, index) => index);
      setTouchedSteps(allSteps);
      return;
    }

    if (action === "review") {
      setShowSummary(true);
    } else {
      setShowConfirmDialog(true);
    }
  };

  const handleFinalSubmit = () => {
    setShowConfirmDialog(false);
    console.log("Form Submitted!", getValues());
    reset();
    setShowSummary(false);
    setTouchedSteps([]);
    setCurrentStep(0);
    // Add your submission logic here (API call, etc.)
  };

  const handleEditForm = () => {
    setShowSummary(false);
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(() => handleFormSubmission("submit"))}
          className="space-y-4"
        >
          {showSummary ? (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h3 className="font-medium text-green-800">Form Completed</h3>
                  <p className="text-green-700 text-sm">
                    Review the information below before final submission
                  </p>
                </div>
              </div>
              <FormSummary data={getValues() as PCR} />
              <div className="max-w-4xl mx-auto p-6 flex justify-between items-center mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleEditForm}
                >
                  Edit Form
                </Button>
                <Button type="submit" className="bg-main">
                  Submit Report
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="bg-white shadow-sm">
                <Tabs
                  value={steps[currentStep].id}
                  className="space-y-6 w-full"
                >
                  {/* For mobile screens: scrollable horizontal tabs */}
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
                        {index === 0 && <PcrReportStep1 />}
                        {index === 1 && <PcrReportStep2 />}
                        {index === 2 && <PcrReportStep3 />}
                        {index === 3 && <PcrReportStep4 />}
                      </div>
                      <div className="flex justify-between items-center mt-8">
                        {index > 0 ? (
                          <Button
                            type="button"
                            onClick={() => setCurrentStep(index - 1)}
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
                            onClick={() => goToStep(index + 1)}
                          >
                            Next
                          </Button>
                        ) : (
                          <Button
                            type="button"
                            size="lg"
                            className="bg-main hover:bg-main/90"
                            disabled={isSubmitting || !isValid}
                            onClick={() => handleFormSubmission("review")}
                          >
                            Go to Summary
                          </Button>
                        )}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </>
          )}
        </form>
      </Form>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Submission</DialogTitle>
            <DialogDescription>
              Are you sure you want to submit this patient report? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row justify-end gap-2 sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-main"
              onClick={handleFinalSubmit}
            >
              Yes, Submit Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RegisteredForm;
