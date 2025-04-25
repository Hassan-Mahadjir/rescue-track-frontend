"use client";
import React from "react";
import PatientPersonalInfo from "@/components/report/PatientPersonalInfo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IncidentTab from "@/components/report/pcr/IncidentTab";
import CrewTab from "@/components/report/pcr/CrewTab";
import MedicationTab from "@/components/report/pcr/MedicationTab";
import { Form } from "@/components/ui/form";
import { PCRFormContextProider } from "@/components/PCRFormContextProvider";
import { useParams } from "next/navigation";
import { usePCR } from "@/services/api/patients";
import { Edit, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const PatientDetails = () => {
  const params = useParams();
  const patientId = params.patientId;

  const { patientData, isPending } = usePCR(Number(patientId));
  const patient = patientData?.data.data;
  if (isPending) {
    return <div>Loading</div>;
  }
  if (!patient) {
    return <div>no patient found</div>;
  }

  return (
    <div className="mx-5 my-2">
      {/*Patient personal information */}
      <div>
        <PatientPersonalInfo patient={patient} />
      </div>

      {/* preview */}
      <div className="bg-gray-100 shadow-lg rounded-xl mt-6 px-6 py-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Patient Information
          </h2>
          <div className="flex flex-row space-x-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-main" size="sm">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <div className="bg-gray-100 shadow rounded-lg p-4">
                    <PCRFormContextProider>
                      <Tabs defaultValue="incident">
                        <TabsList className="mb-4 flex space-x-4">
                          <TabsTrigger value="incident">Incident</TabsTrigger>
                          <TabsTrigger value="crew">Crew</TabsTrigger>
                          <TabsTrigger value="medication">
                            Medication
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="incident">
                          <IncidentTab />
                        </TabsContent>
                        <TabsContent value="crew">
                          <CrewTab />
                        </TabsContent>
                        <TabsContent value="medication">
                          <MedicationTab />
                        </TabsContent>
                      </Tabs>
                    </PCRFormContextProider>
                  </div>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <div>
              <Button className="bg-main" size="sm">
                <Printer className="w-4 h-4 mr-1" />
                Print
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-700">
          <div>
            <span className="font-medium text-gray-800">Created At:</span>
            <br />
            {patient.createdAt}
          </div>
          <div>
            <span className="font-medium text-gray-800">Report ID:</span>
            <br />
            {patient.id}
          </div>
          <div>
            <span className="font-medium text-gray-800">
              Initial Condition:
            </span>
            <br />
            {patient.initialCondition ?? "No Initial Condition"}
          </div>
          <div>
            <span className="font-medium text-gray-800">Notes:</span>
            <br />
            {patient.notes ?? "No Notes"}
          </div>
          <div>
            <span className="font-medium text-gray-800">
              Patient Condition:
            </span>
            <br />
            {patient.patientCondition ?? "No Patient Condition"}
          </div>
          <div>
            <span className="font-medium text-gray-800">Primary Symptoms:</span>
            <br />
            {patient.primarySymptoms ?? "No Primary Symptoms"}
          </div>
        </div>

        {patient.treatments.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Treatments
            </h3>
            <div className="space-y-2">
              {patient.treatments.map((treat) => (
                <div
                  key={treat.id}
                  className="border border-gray-200 rounded-md p-3 bg-gray-50"
                >
                  <div>
                    <span className="font-medium">Category:</span>{" "}
                    {treat.category}
                  </div>
                  <div>
                    <span className="font-medium">Name:</span> {treat.name}
                  </div>
                  <div>
                    <span className="font-medium">Quantity:</span>{" "}
                    {treat.quantity} {treat.unit}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Incident details */}
      <div className="bg-gray-100 shadow-lg rounded-lg mt-4 px-4 py-1">
        <PCRFormContextProider>
          <Tabs defaultValue="incident">
            <TabsList className="mb-4 flex space-x-4 justify-start">
              <TabsTrigger value="incident">Incident Information</TabsTrigger>
              <TabsTrigger value="crew">Crew Information</TabsTrigger>
              <TabsTrigger value="medication">Medication</TabsTrigger>
            </TabsList>

            {/* Incident Form */}

            <TabsContent value="incident">
              <IncidentTab />
            </TabsContent>

            <TabsContent value="crew">
              <CrewTab />
            </TabsContent>

            <TabsContent value="medication">
              <MedicationTab />
            </TabsContent>
          </Tabs>
        </PCRFormContextProider>
      </div>
    </div>
  );
};

export default PatientDetails;
