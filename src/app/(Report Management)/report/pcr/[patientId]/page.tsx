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

const drugAllergies = [
  "Penicillin",
  "Aspirin",
  "Ibuprofen",
  "Amoxicillin",
  "Sulfa drugs",
];

const PatientDetails = () => {
  const params = useParams();
  const reportId = params.patientId;

  const { PCRData, isPending } = usePCR(Number(reportId));
  const pcr = PCRData?.data.data;

  if (isPending) {
    return <PCRLoading />;
  }

  if (!pcr) {
    return <div className="mx-5 my-2">No pcr found</div>;
  }

  return (
    <div className="mx-5 my-2">
      <div>
        <PatientPersonalInfo patient={pcr} />
      </div>

      {/* preview */}
      <div className="bg-gray-100 shadow-lg rounded-xl my-6 px-6 py-4">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-700">
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
        </div>

        <div className="my-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold mb-2">Allergies</h3>
            {/* Optional: Add dialog to add new allergy */}
          </div>

          {(drugAllergies.length > 0 && (
            <AllergyList allergies={drugAllergies} />
          )) || (
            <div className="flex items-center justify-center m-6 p-4">
              <h1 className="text-base font-semibold">
                Report has no allergies!
              </h1>
            </div>
          )}
        </div>

        <div className="my-6 space-y-4 ">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold mb-2">Treatments</h3>
            <CreateTreatmentDialog id={pcr.id} />
          </div>

          {(pcr.treatments.length > 0 && (
            <div>
              <Treatment treatments={pcr.treatments} id={pcr.id} />
            </div>
          )) || (
            <div className="flex items-center justify-center m-6 p-4">
              <h1 className="text-base font-semibold">
                Report has no treatments!!
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
