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
import clsx from "clsx";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

type Patient = {
  id: string;
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

const mockPatients = [
  {
    id: "1",
    fullName: "Mahamat Hassan Mahadjir Hassan",
    age: 24,
    phone: "+90 533 867 28 35",
    email: "hm.mahadjir@gmail.com",
    profileImage: "/report/sample.jpg",
    identifyNumber: "20910394",
    dateOfBirth: "17-05-2000",
    nationality: "Chad",
    address: "Northern Cyprus",
    sex: "Male",
    height: 189,
    weight: 74,
    bloodType: "- O",
  },
  {
    id: "2",
    fullName: "Mahamat Hassan",
    age: 25,
    phone: "+90 533 867 28 35",
    email: "hm.mahadjir@gmail.com",
    profileImage: "/report/sample.jpg",
    identifyNumber: "30910394",
    dateOfBirth: "17-05-2000",
    nationality: "Chad",
    address: "Northern Cyprus",
    sex: "Male",
    height: 189,
    weight: 74,
    bloodType: "- O",
  },
  {
    id: "3",
    fullName: "Amina Aliyu",
    age: 32,
    phone: "+234 803 456 7890",
    email: "amina.aliyu@example.com",
    profileImage: "/report/sample.jpg",
    identifyNumber: "45678901",
    dateOfBirth: "15-08-1991",
    nationality: "Nigeria",
    address: "Lagos, Nigeria",
    sex: "Female",
    height: 165,
    weight: 62,
    bloodType: "A+",
  },
  {
    id: "4",
    fullName: "John Smith",
    age: 45,
    phone: "+1 555 123 4567",
    email: "john.smith@example.com",
    profileImage: "/report/sample.jpg",
    identifyNumber: "98765432",
    dateOfBirth: "22-11-1978",
    nationality: "United States",
    address: "New York, USA",
    sex: "Male",
    height: 178,
    weight: 82,
    bloodType: "B-",
  },
];

export default function PcrReportStep1() {
  const { setValue, watch, control } = useFormContext();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Patient[]>(mockPatients);

  const selectedPatientId = watch("patientId"); // Ensure lowercase "patientId"

  useEffect(() => {
    const filtered = mockPatients.filter(
      (p) =>
        p.fullName.toLowerCase().includes(search.toLowerCase()) ||
        p.identifyNumber.toLowerCase().includes(search.toLowerCase())
    );
    setResults(filtered);
  }, [search]);

  return (
    <div className="space-y-4">
      <div className="w-full max-w-3xl mx-auto px-4">
        <div className="relative">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or ID"
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
                            selectedPatientId === patient.identifyNumber
                              ? "border-gray-900"
                              : "hover:border-gray-400"
                          )}
                          onClick={() =>
                            setValue("patientId", patient.identifyNumber, {
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
