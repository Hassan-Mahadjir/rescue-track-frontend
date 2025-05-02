"use client";
import React from "react";
import PatientPersonalInfo from "@/components/report/PatientPersonalInfo";
import { useParams } from "next/navigation";
import { usePCR } from "@/services/api/reports";
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditPCRDialog from "@/components/report/pcr/edit report/EditPCRDialog";
import Treatment from "@/components/report/pcr/Treatment";
import CreateTreatmentDialog from "@/components/report/pcr/CreateTreatmentDialog";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ReportDocument } from "@/components/report/template";
import PCRLoading from "@/components/loading/PCRLoading";
import AllergyList from "@/components/report/pcr/AllergyList";
import CreateAllergyDialog from "@/components/report/pcr/CreatePatientTagDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreatePatientTagDialog from "@/components/report/pcr/CreatePatientTagDialog";

const PatientDetails = () => {
  const params = useParams();
  const reportId = params.patientId;

  const { PCRData, isPending } = usePCR(Number(reportId));
  const pcr = PCRData?.data.data;

  if (isPending) return <PCRLoading />;
  if (!pcr) return <div className="mx-5 my-2">No PCR found</div>;

  return (
    <div className="mx-5 my-2 space-y-6">
      <PatientPersonalInfo patient={pcr} />

      {/* Header Actions */}
      <div className="flex justify-between items-center ">
        <h2 className="text-xl font-semibold text-gray-900">
          Patient Report Preview
        </h2>
        <div className="flex flex-row gap-3">
          <EditPCRDialog pcr={pcr} />
          <PDFDownloadLink
            document={<ReportDocument data={pcr} />}
            fileName={`patient-report-${pcr.id}.pdf`}
          >
            {({ loading }) => (
              <Button className="bg-main" size="sm" disabled={loading}>
                <Printer className="w-4 h-4 mr-1" />
                {loading ? "Generating PDF..." : "Print"}
              </Button>
            )}
          </PDFDownloadLink>
        </div>
      </div>

      {/* Section 1: General Info */}
      <Card className="bg-gray-100 shadow-lg my-6 px-6">
        <CardHeader>
          <CardTitle className="text-lg font-semibold mb-2">
            General Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-700">
          <div>
            <p className="font-medium text-gray-800">Date Of Incident:</p>
            {pcr.createdAt}
          </div>
          <div>
            <p className="font-medium text-gray-800">Report ID:</p>
            {pcr.id}
          </div>
          <div>
            <p className="font-medium text-gray-800">Initial Condition:</p>
            {pcr.initialCondition ?? "No Initial Condition"}
          </div>
          <div>
            <p className="font-medium text-gray-800">Notes:</p>
            {pcr.notes ?? "No Notes"}
          </div>
          <div>
            <p className="font-medium text-gray-800">Patient Condition:</p>
            {pcr.patientCondition ?? "No Patient Condition"}
          </div>
          <div>
            <p className="font-medium text-gray-800">Primary Symptoms:</p>
            {pcr.primarySymptoms ?? "No Primary Symptoms"}
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Allergies & Medical Conditions*/}
      <Card className="bg-gray-100 shadow-lg my-6 px-6">
        {/* Allergies Section */}
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-lg font-semibold mb-2">
            Allergies
          </CardTitle>
          <CreatePatientTagDialog
            id={pcr.id}
            type="allergy"
            predefinedOptions={[
              { label: "Peanuts", value: "peanuts" },
              { label: "Dust", value: "dust" },
              { label: "Pollen", value: "pollen" },
            ]}
          />
        </CardHeader>
        <CardContent>
          {pcr.allergies.length > 0 ? (
            <AllergyList allergies={pcr.allergies} />
          ) : (
            <div className="text-center text-muted-foreground py-4">
              Report has no allergies.
            </div>
          )}
        </CardContent>

        {/* Medical Conditions Section */}
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-lg font-semibold mb-2">
            Medical Conditions
          </CardTitle>
          <CreatePatientTagDialog
            id={pcr.id}
            type="condition"
            predefinedOptions={[
              { label: "Peanuts", value: "peanuts" },
              { label: "Dust", value: "dust" },
              { label: "Pollen", value: "pollen" },
            ]}
          />
        </CardHeader>
        <CardContent>
          {pcr.medicalConditions?.length > 0 ? (
            <AllergyList allergies={pcr.medicalConditions} />
          ) : (
            <div className="text-center text-muted-foreground py-4">
              No medical conditions listed.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Section 3: Treatments */}
      <Card className="bg-gray-100 shadow-lg my-6 px-6">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-lg font-semibold mb-2">
            Treatments
          </CardTitle>
          <CreateTreatmentDialog id={pcr.id} />
        </CardHeader>
        <CardContent>
          {pcr.treatments.length > 0 ? (
            <Treatment treatments={pcr.treatments} id={pcr.id} />
          ) : (
            <div className="text-center text-muted-foreground py-4">
              Report has no treatments.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientDetails;
