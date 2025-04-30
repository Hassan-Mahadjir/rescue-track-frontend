"use client";
import { useQuery } from "@tanstack/react-query";
import patientService from "../patient-service";

export const useGetPatient = (id: number) => {
  const {
    data: patientData,
    error,
    isError,
    ...props
  } = useQuery({
    queryFn: () => patientService.getPatient(id),
    queryKey: ["patient", id],
  });
  if (isError) {
    console.error("Failed to fetch patient:", error);
  }

  return { patientData, ...props };
};

export const useGetPatients = () => {
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
    console.error("Failed to fetch patient:", error);
  }

  return { patientsData, ...props };
};
