"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ArrowLeft, CheckCircle2, Printer } from "lucide-react";
import Image from "next/image";
import React from "react";
import { ReportDocument } from "../template";
import { PCR, Treatments, InitiatedBy } from "@/types/PCR.type";
import { Patient } from "@/types/patient.type";
import { usePatient } from "@/services/api/patient";
import { PatientReportData } from "@/types/formSchema";

interface FormSummaryProps {
  data: PatientReportData;
}

const FormSummary = ({ data }: FormSummaryProps) => {
  const formatDate = (dateString: string) => {
    return dateString ? new Date(dateString).toLocaleDateString() : "N/A";
  };

  const getFullName = (patient: Patient) => {
    return (
      `${patient?.firstName || ""} ${patient?.lastName || ""}`.trim() ||
      "Unknown Patient"
    );
  };

  const getStaffFullName = (initiatedBy?: InitiatedBy) => {
    if (!initiatedBy?.profile) return "Unknown Staff";
    return `${initiatedBy.profile.firstName || ""} ${
      initiatedBy.profile.lastName || ""
    }`.trim();
  };

  const patientId = data?.patientId;

  // Only call the hook once patientId is available
  const { patientData, isPending } = usePatient(patientId);

  const patient = patientData?.data.data;

  // Now handle loading properly
  if (!patientId) {
    return <div>no id</div>;
  }
  if (isPending) {
    return <div>Loading patient...</div>;
  }

  if (!patient) {
    return <div>No patient found</div>;
  }

  const treatments = data.treatment || [];

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-sm border print:shadow-none print:border-none">
      {/* Success Header */}
      <div className="flex items-center justify-center mb-8 print:hidden">
        <div className="bg-green-50 text-green-700 rounded-full p-3">
          <CheckCircle2 className="h-12 w-12" />
        </div>
      </div>

      <h1 className="text-2xl font-bold text-center mb-8">
        Patient Care Report Summary
      </h1>

      {/* Patient Information */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold border-b pb-2 mb-4">
          Patient Information
        </h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-shrink-0">
            <div className="relative h-20 w-20">
              <Image
                src="/placeholder.svg"
                alt={getFullName(patient)}
                className="rounded-full object-cover"
                fill
              />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-medium">{getFullName(patient)}</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
              <p className="text-gray-700">
                <span className="font-medium">ID:</span>{" "}
                {patient.nationalID || "N/A"}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Age:</span>{" "}
                {patient.dateofBirth
                  ? new Date().getFullYear() -
                    new Date(patient.dateofBirth).getFullYear()
                  : "N/A"}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Gender:</span>{" "}
                {patient.gender || "N/A"}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Height:</span>{" "}
                {patient.height ? `${patient.height} cm` : "N/A"}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Weight:</span>{" "}
                {patient.weight ? `${patient.weight} kg` : "N/A"}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Phone:</span>{" "}
                {patient.phone || "N/A"}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">DOB:</span>{" "}
                {formatDate(patient.dateofBirth)}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Nationality:</span>{" "}
                {patient.nationality || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr />

      {/* Report Information */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold border-b pb-2 mb-4">
          Report Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* <div>
            <p className="text-gray-700">
              <span className="font-medium">Report ID:</span> {data.id || "N/A"}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Created At:</span>{" "}
              {formatDate(new Date().toISOString())}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Initial Condition:</span>{" "}
              {data.initialCondition || "Not specified"}
            </p>
          </div>
          <div>
            <p className="text-gray-700">
              <span className="font-medium">Patient Condition:</span>{" "}
              {data.patientCondition || "Not specified"}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Primary Symptoms:</span>{" "}
              {data.primarySymptoms || "Not specified"}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Reported By:</span>{" "}
              {getStaffFullName(initiatedBy)}
            </p>
          </div> */}
        </div>
      </div>
      <hr />

      {/* Treatments */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold border-b pb-2 mb-4">
          Treatments Administered
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {treatments.length > 0 ? (
            treatments.map((treatment: Treatments, index) => (
              <Card key={treatment.id || index} className="bg-gray-50">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">
                        {treatment.name || "Unnamed Treatment"}
                      </p>
                      <p className="text-sm text-gray-600">
                        Dosage: {treatment.quantity || "N/A"}{" "}
                        {treatment.unit || ""}
                      </p>
                      {treatment.category && (
                        <p className="text-sm text-gray-600">
                          Category: {treatment.category}
                        </p>
                      )}
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 border-blue-200"
                    >
                      Treatment #{index + 1}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-gray-500 italic">No treatments administered</p>
          )}
        </div>
      </div>
      <hr />

      {/* Notes */}
      {data.medicalHistory.notes && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b pb-2 mb-4">
            Additional Notes
          </h2>
          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <p className="text-gray-700">{data.medicalHistory.notes}</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between mt-8 print:hidden">
        <Button variant="outline" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Create New Report
        </Button>
        {/* <PDFDownloadLink
          document={<ReportDocument data={data as PCR} />}
          fileName={`patient-report-${data.patientId || "unknown"}.pdf`}
        >
          {({ loading }) => (
            <Button
              className="bg-main flex items-center gap-2"
              disabled={loading}
            >
              <Printer className="h-4 w-4" />
              {loading ? "Generating PDF..." : "Print Report"}
            </Button>
          )}
        </PDFDownloadLink> */}
      </div>

      {/* Report Footer */}
      <div className="mt-12 text-center text-gray-500 text-sm print:mt-20">
        <p>
          Report generated on {new Date().toLocaleDateString()} at{" "}
          {new Date().toLocaleTimeString()}
        </p>
        <p className="mt-1">This is an official patient care report document</p>
      </div>
    </div>
  );
};

export default FormSummary;
