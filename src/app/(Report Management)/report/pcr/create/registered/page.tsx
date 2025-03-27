"use client";
import MedicationInforForm from "@/components/report/MedicationInforForm";
import PatientPersonalInfo from "@/components/report/PatientPersonalInfo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import React, { useState } from "react";

const Registered = () => {
  const [step, setStep] = useState(1);

  const stepToTabValue: Record<number, string> = {
    1: "patient_Info",
    2: "medication_info",
    3: "crew_Info",
    4: "medical_history",
  };

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

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };
  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

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
                />
              </div>
              <Button className="shrink-0 h-10 bg-main">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
            {step}
          </div>
        </div>
        <Tabs value={stepToTabValue[step]} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 border-b rounded-none bg-transparent p-0">
            <TabsTrigger
              value="patient_Info"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none font-medium hover:text-gray-950"
              onClick={() => setStep(1)}
            >
              Patient Information
            </TabsTrigger>
            <TabsTrigger
              value="medication_info"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none font-medium hover:text-gray-950"
              onClick={() => setStep(2)}
            >
              Medication information
            </TabsTrigger>
            <TabsTrigger
              value="crew_Info"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none font-medium hover:text-gray-950"
              onClick={() => setStep(3)}
            >
              Crew Information
            </TabsTrigger>
            <TabsTrigger
              value="medical_history"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none font-medium hover:text-gray-950"
              onClick={() => setStep(4)}
            >
              Medical History
            </TabsTrigger>
          </TabsList>
          {step == 1 && (
            <TabsContent value="patient_Info">
              {patientData.map((pateint) => (
                <div className="mb-4" key={pateint.id}>
                  <PatientPersonalInfo patient={pateint} />
                </div>
              ))}
            </TabsContent>
          )}

          {step == 2 && (
            <TabsContent value="medication_info">
              <MedicationInforForm />
            </TabsContent>
          )}
          {step == 3 && (
            <TabsContent value="crew_Info">
              <div className="space-y-4">Crew Information</div>
            </TabsContent>
          )}
          {step == 4 && (
            <TabsContent value="medical_history">
              <div className="space-y-4">Medical History</div>
            </TabsContent>
          )}
        </Tabs>
        <div className="flex items-center justify-center space-x-4">
          <Button
            variant="outline"
            size="lg"
            disabled={step === 1}
            onClick={prevStep}
          >
            prev
          </Button>
          {step === 4 ? (
            <Button
              size="lg"
              className="bg-main"
              onClick={() => console.log("ok")}
            >
              Submit
            </Button>
          ) : (
            <Button size="lg" className="bg-main" onClick={nextStep}>
              next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Registered;
