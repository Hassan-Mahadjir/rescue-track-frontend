"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { PcrReportFormValues } from "@/types/formSchema";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Printer, ArrowLeft } from "lucide-react";
import Image from "next/image";

interface FormSummaryProps {
  data: PcrReportFormValues;
  patients: any[]; // Using the patient data type from your app
  onReset: () => void;
}

const FormSummary = ({ data, patients, onReset }: FormSummaryProps) => {
  // Find the selected patient
  const selectedPatient = patients.find(
    (patient) => patient.id === data.PatientId
  );

  // Function to print the summary
  const handlePrint = () => {
    window.print();
  };

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
        {selectedPatient && (
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-shrink-0">
              <div className="relative h-20 w-20">
                <Image
                  src={selectedPatient.profileImage || "/placeholder.svg"}
                  alt={selectedPatient.fullName}
                  className="rounded-full object-cover"
                  fill
                />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-medium">
                {selectedPatient.fullName}
              </h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
                <p className="text-gray-700">
                  <span className="font-medium">ID:</span>{" "}
                  {selectedPatient.identifyNumber}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Age:</span>{" "}
                  {selectedPatient.age}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Gender:</span>{" "}
                  {selectedPatient.sex}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Blood Type:</span>{" "}
                  {selectedPatient.bloodType}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Nationality:</span>{" "}
                  {selectedPatient.nationality}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Phone:</span>{" "}
                  {selectedPatient.phone}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <hr />

      {/* Medications */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold border-b pb-2 mb-4">
          Medications Administered
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {data.medications.map(
            (medication, index) =>
              medication.name && (
                <Card key={index} className="bg-gray-50">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{medication.name}</p>
                        <p className="text-sm text-gray-600">
                          Dosage: {medication.size}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700 border-blue-200"
                      >
                        Med #{index + 1}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              )
          )}
          {data.medications.length === 0 && (
            <p className="text-gray-500 italic">No medications administered</p>
          )}
        </div>
      </div>

      <hr />

      {/* Transport Information */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold border-b pb-2 mb-4">
          Transport Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-700">
              <span className="font-medium">Transfer Type:</span>{" "}
              {data.transportInfo.transferType || "Not specified"}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Vehicle ID:</span>{" "}
              {data.transportInfo.vehicleId || "Not specified"}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Emergency Type:</span>{" "}
              {data.transportInfo.emergencyType || "Not specified"}
            </p>
          </div>
          <div>
            <p className="text-gray-700">
              <span className="font-medium">Pickup Address:</span>{" "}
              {data.transportInfo.pickupAddress || "Not specified"}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Destination Address:</span>{" "}
              {data.transportInfo.destinationAddress || "Not specified"}
            </p>
          </div>
        </div>
      </div>
      <hr />

      {/* Medical History */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold border-b pb-2 mb-4">
          Medical History
        </h2>

        {/* Conditions */}
        <div className="mb-4">
          <h3 className="font-medium mb-2">Medical Conditions</h3>
          <div className="flex flex-wrap gap-2">
            {data.medicalHistory.conditions &&
            data.medicalHistory.conditions.length > 0 ? (
              data.medicalHistory.conditions.map((condition) => (
                <Badge
                  key={condition}
                  variant="secondary"
                  className="bg-gray-100"
                >
                  {condition.replace("_", " ")}
                </Badge>
              ))
            ) : (
              <p className="text-gray-500 italic">
                No medical conditions reported
              </p>
            )}
          </div>
        </div>

        {/* Allergies */}
        <div className="mb-4">
          <h3 className="font-medium mb-2">Allergies</h3>
          <div className="flex flex-wrap gap-2">
            {data.medicalHistory.allergies &&
            data.medicalHistory.allergies.length > 0 ? (
              data.medicalHistory.allergies.map((allergy) => (
                <Badge
                  key={allergy}
                  variant="secondary"
                  className="bg-red-50 text-red-700 border-red-200"
                >
                  {allergy.replace("_", " ")}
                </Badge>
              ))
            ) : (
              <p className="text-gray-500 italic">No allergies reported</p>
            )}
          </div>
        </div>

        {/* Notes */}
        {data.medicalHistory.notes && (
          <div>
            <h3 className="font-medium mb-2">Additional Notes</h3>
            <Card className="bg-gray-50">
              <CardContent className="p-4">
                <p className="text-gray-700">{data.medicalHistory.notes}</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-8 print:hidden">
        <Button
          variant="outline"
          onClick={onReset}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Create New Report
        </Button>
        <Button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-main"
        >
          <Printer className="h-4 w-4" />
          Print Report
        </Button>
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
