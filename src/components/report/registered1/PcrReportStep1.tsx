"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import PatientPersonalInfo from "../PatientPersonalInfo";
import { PatientInfoSkeleton } from "@/components/loading/PatientInfoSkeleton";
import clsx from "clsx";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePatients } from "@/services/api/patient";
import { Patient } from "@/types/patient.type";

export default function PcrReportStep1() {
  const { patientsData, isPending } = usePatients();
  const data = patientsData?.data.data;
  const { setValue, watch, control } = useFormContext();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Patient[]>([]);

  const selectedPatientId = watch("patientId");

  useEffect(() => {
    if (!data) return;

    const sorted = [...data].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    setResults(sorted.slice(0, 5));
  }, [data]);

  useEffect(() => {
    if (!data) return;

    const filtered = data.filter((patient) => {
      const searchLower = search.toLowerCase();
      const patientName =
        `${patient.firstName} ${patient.lastName}`.toLowerCase();
      const patientId = patient.nationalID.toLowerCase();
      const reportId = patient.id.toString();

      return (
        patientName.includes(searchLower) ||
        patientId.includes(searchLower) ||
        reportId.includes(searchLower)
      );
    });

    const sorted = [...filtered].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    setResults(sorted.slice(0, 5));
  }, [search, data]);

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
                    {isPending ? (
                      // Show 5 loading skeletons while fetching
                      Array.from({ length: 5 }).map((_, index) => (
                        <PatientInfoSkeleton key={index} />
                      ))
                    ) : results.length === 0 ? (
                      <div className="flex items-center justify-center h-full text-gray-500">
                        No patients found
                      </div>
                    ) : (
                      results.map((patient) => (
                        <div
                          key={patient.id}
                          className={clsx(
                            "cursor-pointer border rounded-lg transition-colors hover:shadow-md",
                            selectedPatientId === patient.nationalID
                              ? "border-gray-900"
                              : "hover:border-gray-400"
                          )}
                          onClick={() =>
                            setValue("patientId", patient.nationalID, {
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
}
