"use client";
import { useQuery } from "@tanstack/react-query";
import reportsService from "../reports-service";

export const usePCRs = () => {
  // const router = useRouter();
  const {
    data: PCRsData,
    error,
    isError,
    ...props
  } = useQuery({
    queryFn: () => reportsService.getPCRs(),
    queryKey: ["PCRS"],
  });

  if (isError) {
    console.error("Failed to fetch patients:", error);
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
    queryFn: () => reportsService.getPCR(id),
    queryKey: ["PCR", id],
  });

  if (isError) {
    console.error("Failed to fetch patient:", error);
  }

  return { PCRData, ...props };
};
export const useRunReports = () => {
  // const router = useRouter();
  const {
    data: runReportsData,
    error,
    isError,
    ...props
  } = useQuery({
    queryFn: () => reportsService.getRunReports(),
    queryKey: ["Run Report"],
  });

  if (isError) {
    console.error("Failed to fetch Run Reports:", error);
  }

  return { runReportsData, ...props };
};

export const useRunReport = (id: number) => {
  // const router = useRouter();
  const {
    data: runReportData,
    error,
    isError,
    ...props
  } = useQuery({
    queryFn: () => reportsService.getRunReport(id),
    queryKey: ["Run Report", id],
  });

  if (isError) {
    console.error("Failed to fetch Run Report:", error);
  }

  return { runReportData, ...props };
};
