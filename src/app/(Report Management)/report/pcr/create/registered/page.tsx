"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PcrReportFormSchema,
  type PcrReportFormValues,
} from "@/types/formSchema";
import PcrReportStep1 from "@/components/report/registered/PcrReportStep1";
import PcrReportStep2 from "@/components/report/registered/PcrReportStep2";
import PcrReportStep3 from "@/components/report/registered/PcrReportStep3";
import PcrReportStep4 from "@/components/report/registered/PcrReportStep4";
import { Form } from "@/components/ui/form";

const patientData = [
  {
    id: 1,
    fullName: "Mahamat Hassan Mahadjir Hassan",
    age: 24,
    phone: "+90 533 867 28 35",
    email: "hm.mahadjir@gmail.com",
    profileImage: "/report/sample.jpg",
    identifyNumber: "20910394",
    dateOfBirth: "17-05-2000",
    nationality: "Chad",
    address: "Northern Cyprus",
    sex: "Male",
    height: 189,
    weight: 74,
    bloodType: "- O",
  },
  {
    id: 2,
    fullName: "Mahamat Hassan",
    age: 25,
    phone: "+90 533 867 28 35",
    email: "hm.mahadjir@gmail.com",
    profileImage: "/report/sample.jpg",
    identifyNumber: "20910394",
    dateOfBirth: "17-05-2000",
    nationality: "Chad",
    address: "Northern Cyprus",
    sex: "Male",
    height: 189,
    weight: 74,
    bloodType: "- O",
  },
];

const Registered = () => {
  const [step, setStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // React Hook Form setup
  const form = useForm<PcrReportFormValues>({
    resolver: zodResolver(PcrReportFormSchema),
    defaultValues: {
      PatientId: undefined,
      medications: [{ name: "", size: "" }],
      crew: [{ name: "", role: "" }],
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
    trigger,
    watch,
    setValue,
    formState: { errors, isValid },
  } = form;

  // Step-to-tab mapping
  const stepToTabValue: Record<number, string> = {
    1: "patient_Info",
    2: "medication_info",
    3: "crew_Info",
    4: "medical_history",
  };

  // Define validation fields for each step
  const stepValidationFields: Record<number, string[]> = {
    1: ["PatientId"], // Fields to validate in step 1
    2: ["medications"], // Fields to validate in step 2
    3: ["crew"], // Fields to validate in step 3
    4: ["medicalHistory"], // Fields to validate in step 4
  };

  // Handle next step with validation
  const nextStep = async () => {
    // Only validate the fields relevant to the current step
    const fieldsToValidate = stepValidationFields[step];
    const isStepValid = await trigger(fieldsToValidate as any);

    if (isStepValid) {
      setStep((prev) => Math.min(prev + 1, 4));
    }
  };

  // Handle previous step
  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  // Handle tab click
  const handleTabClick = (stepNumber: number) => {
    // Optional: Add validation before allowing tab navigation
    // For simplicity, we'll allow direct navigation via tabs
    setStep(stepNumber);
  };

  // Form submission
  const onSubmit = (data: PcrReportFormValues) => {
    console.log("Form submitted:", data);
    alert("Form submitted successfully!");
    // Here you would typically send the data to your API
  };

  // Handle search
  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    // Implement your search logic here
  };

  // For debugging
  useEffect(() => {
    console.log("Current form values:", form.getValues());
  }, [form, step]);

  return (
    <div className="mx-5 my-2">
      <div className="space-y-4">
        <div className="w-full max-w-3xl mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 md:space-x-4">
            <div className="flex w-full space-x-2">
              <div className="relative flex-1">
                <Input
                  placeholder="Search by patient ID"
                  className="pl-3 pr-3 py-2 h-10 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button className="shrink-0 h-10 bg-main" onClick={handleSearch}>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Tabs value={stepToTabValue[step]} className="space-y-4">
            <TabsList className="grid w-full grid-cols-4 border-b rounded-none bg-transparent p-0">
              <TabsTrigger
                value="patient_Info"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none font-medium hover:text-gray-950"
                onClick={() => handleTabClick(1)}
              >
                Patient Information
              </TabsTrigger>
              <TabsTrigger
                value="medication_info"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none font-medium hover:text-gray-950"
                onClick={() => handleTabClick(2)}
              >
                Medication information
              </TabsTrigger>
              <TabsTrigger
                value="crew_Info"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none font-medium hover:text-gray-950"
                onClick={() => handleTabClick(3)}
              >
                Crew Information
              </TabsTrigger>
              <TabsTrigger
                value="medical_history"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none font-medium hover:text-gray-950"
                onClick={() => handleTabClick(4)}
              >
                Medical History
              </TabsTrigger>
            </TabsList>

            {/* Step content */}
            <TabsContent
              value="patient_Info"
              className="mt-0 border rounded-md p-4"
            >
              <PcrReportStep1
                patients={patientData}
                setValue={setValue}
                watch={watch}
                form={form}
              />
            </TabsContent>

            <TabsContent
              value="medication_info"
              className="mt-0 border rounded-md p-4"
            >
              <PcrReportStep2 form={form} />
            </TabsContent>

            <TabsContent
              value="crew_Info"
              className="mt-0 border rounded-md p-4"
            >
              <PcrReportStep3 form={form} />
            </TabsContent>

            <TabsContent
              value="medical_history"
              className="mt-0 border rounded-md p-4"
            >
              <PcrReportStep4 form={form} />
            </TabsContent>
          </Tabs>

          <div className="flex items-center justify-center space-x-4 py-4">
            <Button
              variant="outline"
              size="lg"
              disabled={step === 1}
              onClick={prevStep}
              type="button"
            >
              Prev
            </Button>
            {step === 4 ? (
              <Button size="lg" className="bg-main" type="submit">
                Submit
              </Button>
            ) : (
              <Button
                size="lg"
                className="bg-main"
                type="button"
                onClick={nextStep}
              >
                Next
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Registered;
