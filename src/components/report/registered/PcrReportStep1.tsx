import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { PcrReportFormValues } from "@/types/formSchema";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import PatientPersonalInfo from "../PatientPersonalInfo";

type PatientData = {
  id: number;
  fullName: string;
  age: number;
  phone: string;
  email: string;
  profileImage: string;
  identifyNumber: string;
  dateOfBirth: string;
  nationality: string;
  address: string;
  sex: string;
  height: number;
  weight: number;
  bloodType: string;
};

interface PcrReportStep1Props {
  patients: PatientData[];
  setValue: UseFormSetValue<PcrReportFormValues>;
  watch: UseFormWatch<PcrReportFormValues>;
}

const PcrReportStep1 = ({ patients, setValue, watch }: PcrReportStep1Props) => {
  const selectedPatientId = watch("PatientId");

  return (
    <form className="space-y-4">
      <TabsContent value="patient_Info">
        <div className="space-y-3">
          <div className="space-y-4">
            {patients.map((patient) => (
              <div
                key={patient.id}
                className={clsx(
                  "cursor-pointer p-4 border rounded-lg",
                  selectedPatientId === patient.id
                    ? "border-blue-500 bg-blue-100"
                    : "border-gray-300"
                )}
                onClick={() => setValue("PatientId", patient.id)}
              >
                <PatientPersonalInfo patient={patient} />
              </div>
            ))}
          </div>
        </div>
      </TabsContent>
    </form>
  );
};

export default PcrReportStep1;
