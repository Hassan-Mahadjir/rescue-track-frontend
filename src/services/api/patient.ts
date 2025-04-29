"use client";
import { useQuery } from "@tanstack/react-query";
import patientService from "../patient-service";

export const usePatients = () => {
  // const router = useRouter();
  const {
    data: patientsData,
    error,
    isError,
    ...props
  } = useQuery({
    queryFn: () => patientService.getPatients(),
    queryKey: ["patients"],
  });

  if (isError) {
    console.error("Failed to fetch patients:", error);
  }

  return { patientsData, ...props };
};

export const usePatient = (id: number) => {
  // const router = useRouter();
  const {
    data: patientData,
    error,
    isError,
    ...props
  } = useQuery({
    queryFn: () => {
      if (!id) throw new Error("No patient ID");
      return patientService.getpatient(id);
    },
    queryKey: ["patient", id],
    enabled: !!id, // <-- Only run if id is truthy
  });

  if (isError) {
    console.error("Failed to fetch patient:", error);
  }

  return { patientData, ...props };
};
