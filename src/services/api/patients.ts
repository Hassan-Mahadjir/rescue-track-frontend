"use client";
import { useQuery } from "@tanstack/react-query";
import patientsService from "../patients-service";

export const usePCRs = () => {
  // const router = useRouter();
  const {
    data: patientData,
    error,
    isError,
    ...props
  } = useQuery({
    queryFn: () => patientsService.getPCRs(),
    queryKey: ["patients"],
  });

  if (isError) {
    console.error("Failed to fetch patients:", error);
  }

  return { patientData, ...props };
};

export const usePCR = (id: number) => {
  // const router = useRouter();
  const {
    data: patientData,
    error,
    isError,
    ...props
  } = useQuery({
    queryFn: () => patientsService.getPCR(id),
    queryKey: ["patient", id],
  });

  if (isError) {
    console.error("Failed to fetch patient:", error);
  }

  return { patientData, ...props };
};
