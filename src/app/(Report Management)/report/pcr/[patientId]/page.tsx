import React from "react";
import PatientPersonalInfo from "@/components/report/PatientPersonalInfo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IncidentTab from "@/components/report/pcr/IncidentTab";
import CrewTab from "@/components/report/pcr/CrewTab";
import MedicationTab from "@/components/report/pcr/MedicationTab";
import { Form } from "@/components/ui/form";
import { PCRFormContextProider } from "@/components/PCRFormContextProvider";

const PatientDetails = async ({
  params,
}: {
  params: Promise<{ patientId: string }>;
}) => {
  const patientId = (await params).patientId;

  const patientData = {
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
  };

  return (
    <div className="mx-5 my-2">
      {/*Patient personal information */}
      <div>
        <PatientPersonalInfo patient={patientData} />
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
