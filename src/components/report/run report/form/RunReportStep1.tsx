"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import clsx from "clsx";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetPatients } from "@/services/api/patient";
import { Patient } from "@/types/patients.type";
import PatientPersonalInfo from "../../PatientPersonalInfo";

const RunReportStep1 = () => {
  const { patientsData, isPending } = useGetPatients();
  const data = patientsData?.data.data;
  const { setValue, watch, control } = useFormContext();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Patient[]>([]);

  const selectedPatientId = watch("patientId");

  useEffect(() => {
    if (!data) return;
    setResults(data);
  }, [data]);

  useEffect(() => {
    if (!data) return;

    const filtered = data.filter((patient) => {
      const searchLower = search.toLowerCase();
      const patientName =
        `${patient.firstName} ${patient.lastName}`.toLowerCase();
      const patientId = (patient.id ?? "").toString();

      return (
        patientName.includes(searchLower) || patientId.includes(searchLower)
      );
    });
    setResults(filtered);
  }, [search, data]);

  if (isPending) {
    return <div>Loading patients...</div>;
  }

  if (!data) {
    return <div>No patient data available</div>;
  }

  return (
    <div className="space-y-4">
      <div className="w-full max-w-3xl mx-auto px-4">
        <div className="relative">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, national ID, or report ID"
            className="pl-3 pr-3 py-2 h-10 w-full"
          />
        </div>
      </div>

      <div className="space-y-2">
        <FormField
          control={control}
          name="patientId"
          render={() => (
            <FormItem>
              <FormControl>
                <ScrollArea className="h-[300px] md:h-[400px] lg:h-[500px] rounded-md border">
                  <div className="p-4 space-y-4">
                    {results.length === 0 ? (
                      <div className="flex items-center justify-center h-full text-gray-500">
                        No patients found
                      </div>
                    ) : (
                      results.map((patient) => (
                        <div
                          key={patient.id}
                          className={clsx(
                            "cursor-pointer border rounded-lg transition-colors hover:shadow-md",
                            selectedPatientId === patient.id
                              ? "border-gray-900"
                              : "hover:border-gray-400"
                          )}
                          onClick={() =>
                            setValue("patientId", patient.id, {
                              shouldValidate: true,
                            })
                          }
                        >
                          <PatientPersonalInfo patient={patient} />
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default RunReportStep1;
