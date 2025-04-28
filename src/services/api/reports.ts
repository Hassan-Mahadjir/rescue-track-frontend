"use client";
import { useQuery } from "@tanstack/react-query";
import reportService from "../reports-service";

export const usePCRs = () => {
  // const router = useRouter();
  const {
    data: patientData,
    error,
    isError,
    ...props
  } = useQuery({
    queryFn: () => reportService.getPCRs(),
    queryKey: ["PCRS"],
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
    queryFn: () => reportService.getPCR(id),
    queryKey: ["PCR", id],
  });

  if (isError) {
    console.error("Failed to fetch patient:", error);
  }

  return { patientData, ...props };
};
