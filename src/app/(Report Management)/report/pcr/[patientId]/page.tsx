"use client";
import React from "react";
import PatientPersonalInfo from "@/components/report/PatientPersonalInfo";
import { useParams } from "next/navigation";
import { usePCR } from "@/services/api/reports";
import EditPCRDialog from "@/components/report/pcr/edit report/EditPCRDialog";
import Treatment from "@/components/report/pcr/Treatment";
import CreateTreatmentDialog from "@/components/report/pcr/CreateTreatmentDialog";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ReportDocument } from "@/components/report/template";
import PCRLoading from "@/components/loading/PCRLoading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreatePatientTagDialog from "@/components/report/pcr/CreatePatientTagDialog";
import TagList from "@/components/report/pcr/TagList";

const PatientDetails = () => {
  const params = useParams();
  const reportId = params.patientId;

  const { PCRData, isPending } = usePCR(Number(reportId));
  const pcr = PCRData;

  if (isPending) return <PCRLoading />;
  if (!pcr) return <div className="mx-5 my-2">No PCR found</div>;

  return (
    <div className="mx-5 my-2 space-y-6">
      <PatientPersonalInfo patient={pcr.patient} />

      {/* preview */}
      <div className="my-6 px-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Patient Information
          </h2>
          <div className="flex flex-row space-x-4">
            <EditPCRDialog pcr={pcr} />
            {/* <div>
              <PDFDownloadLink
                document={pcr && <ReportDocument data={pcr} />}
                fileName={`patient-report-${pcr.id}.pdf`}
              >
                {({ loading }) => (
                  <Button className="bg-main" size="sm" disabled={loading}>
                    <Printer className="w-4 h-4 mr-1" />
                    {loading ? "Generating PDF..." : "Print"}
                  </Button>
                )}
              </PDFDownloadLink>
            </div> */}
          </div>
        </div>
      </div>

      {/* Section 1: General Info */}
      <Card className="bg-gray-100 shadow-md my-6 px-6">
        <CardHeader className="py-3 px-0">
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
            <p className="font-medium text-gray-800">Primary Assessment:</p>
            {pcr.primaryAssessment ?? "No Initial Condition"}
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
            <p className="font-medium text-gray-800">Secondary Assessment:</p>
            {pcr.secondaryAssessment ?? "No Primary Symptoms"}
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Allergies & Medical Conditions*/}
      <Card className="bg-gray-100 shadow-md my-6 px-6">
        {/* Allergies Section */}
        <CardHeader className="py-3 px-0 flex flex-row justify-between items-center">
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
          <TagList tags={pcr.allergies} type="allergy" />
        </CardContent>

        {/* Medical Conditions Section */}
        <CardHeader className="py-3 px-0 flex flex-row justify-between items-center">
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
          <TagList tags={pcr.medicalConditions} type="condition" />
        </CardContent>
      </Card>

      {/* Section 3: Treatments */}
      <Card className="bg-gray-100 shadow-md my-6 px-6">
        <CardHeader className="py-3 px-0 flex flex-row justify-between items-center">
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
