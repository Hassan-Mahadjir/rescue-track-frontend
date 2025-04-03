"use client";

import type {
  UseFormSetValue,
  UseFormWatch,
  UseFormReturn,
} from "react-hook-form";
import type { PcrReportFormValues } from "@/types/formSchema";
import clsx from "clsx";
import PatientPersonalInfo from "../PatientPersonalInfo";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

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
  form: UseFormReturn<PcrReportFormValues>;
}

const PcrReportStep1 = ({
  patients,
  setValue,
  watch,
  form,
}: PcrReportStep1Props) => {
  const selectedPatientId = watch("PatientId");
  const {
    formState: { errors },
  } = form;

  const handleSelectPatient = (patientId: number) => {
    setValue("PatientId", patientId, { shouldValidate: true });
  };

  return (
    <div className="space-y-3">
      {errors.PatientId && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {errors.PatientId.message as string}
          </AlertDescription>
        </Alert>
      )}

      <FormField
        control={form.control}
        name="PatientId"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="space-y-4">
                {patients.map((patient) => (
                  <div
                    key={patient.id}
                    className={clsx(
                      "cursor-pointer p-4 border rounded-lg transition-colors",
                      selectedPatientId === patient.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                    )}
                    onClick={() => handleSelectPatient(patient.id)}
                  >
                    <PatientPersonalInfo patient={patient} />
                  </div>
                ))}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PcrReportStep1;
