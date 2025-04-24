"use client";
import React from "react";
import PatientPersonalInfo from "@/components/report/PatientPersonalInfo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IncidentTab from "@/components/report/pcr/IncidentTab";
import CrewTab from "@/components/report/pcr/CrewTab";
import MedicationTab from "@/components/report/pcr/MedicationTab";
import { Form } from "@/components/ui/form";
import { PCRFormContextProider } from "@/components/PCRFormContextProvider";
import { usePatient } from "@/services/api/patients";
import { useParams } from "next/navigation";

const PatientDetails = () => {
  const params = useParams();
  const patientId = params.patientId;

  const { patientData, isPending } = usePatient(Number(patientId));
  const patient = patientData?.data.data;
  if (!patient) {
    return <div>patient not found</div>;
  }
  console.log(patient);
  return (
    <div className="mx-5 my-2">
      {/*Patient personal information */}
      <div>
        <PatientPersonalInfo patient={patient} />
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
