"use client";
import { useQuery } from "@tanstack/react-query";
import PCRService from "../PCR-service";

export const usePCRs = () => {
  // const router = useRouter();
  const {
    data: PCRsData,
    error,
    isError,
    ...props
  } = useQuery({
    queryFn: () => PCRService.getPCRs(),
    queryKey: ["PCRs"],
  });

  if (isError) {
    console.error("Failed to fetch PCRs:", error);
  }

  return { PCRsData, ...props };
};

export const usePCR = (id: number) => {
  // const router = useRouter();
  const {
    data: PCRData,
    error,
    isError,
    ...props
  } = useQuery({
    queryFn: () => PCRService.getPCR(id),
    queryKey: ["PCR", id],
  });

  if (isError) {
    console.error("Failed to fetch PCR:", error);
  }

  return { PCRData, ...props };
};
