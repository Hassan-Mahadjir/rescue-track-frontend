"use client";
import React from "react";
import PatientPersonalInfo from "@/components/report/PatientPersonalInfo";
import { useParams } from "next/navigation";
import { usePCR } from "@/services/api/PCR";
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditPCRDialog from "@/components/report/pcr/edit report/EditPCRDialog";
import Treatment from "@/components/report/pcr/Treatment";
import CreateTreatmentDialog from "@/components/report/pcr/CreateTreatmentDialog";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ReportDocument } from "@/components/report/template";
import PCRLoading from "@/components/loading/PCRLoading";

const PatientDetails = () => {
  const params = useParams();
  const PCRId = params.patientId;

  const { PCRData, isPending } = usePCR(Number(PCRId));
  const patient = PCRData?.data.data;

  if (isPending) {
    return <PCRLoading />;
  }

  if (!patient) {
    return <div className="mx-5 my-2">No patient found</div>;
  }

  return (
    <div className="mx-5 my-2">
      <div>
        <PatientPersonalInfo patient={patient.patient} />
      </div>

      {/* preview */}
      <div className="bg-gray-100 shadow-lg rounded-xl my-6 px-6 py-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Patient Information
          </h2>
          <div className="flex flex-row space-x-4">
            <EditPCRDialog pcr={patient} />
            <div>
              <PDFDownloadLink
                document={<ReportDocument data={patient} />}
                fileName={`patient-report-${patient.id}.pdf`}
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-700">
          <div>
            <p className="font-medium text-gray-800">Date Of Incident:</p>
            {patient.createdAt}
          </div>
          <div>
            <p className="font-medium text-gray-800">Report ID:</p>
            {patient.id}
          </div>
          <div>
            <p className="font-medium text-gray-800">Initial Condition:</p>
            {patient.initialCondition ?? "No Initial Condition"}
          </div>
          <div>
            <p className="font-medium text-gray-800">Notes:</p>
            {patient.notes ?? "No Notes"}
          </div>
          <div>
            <p className="font-medium text-gray-800">Patient Condition:</p>
            {patient.patientCondition ?? "No Patient Condition"}
          </div>
          <div>
            <p className="font-medium text-gray-800">Primary Symptoms:</p>
            {patient.primarySymptoms ?? "No Primary Symptoms"}
          </div>
        </div>

        <div className="my-6 space-y-4 ">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold mb-2">Treatments</h3>
            <CreateTreatmentDialog />
          </div>

          {(patient.treatments.length > 0 && (
            <div>
              <Treatment treatments={patient.treatments} />
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
