"use client";
import { useQuery } from "@tanstack/react-query";
import runReportService from "../runReport-service";

export const useRunReports = () => {
  // const router = useRouter();
  const {
    data: runReportsData,
    error,
    isError,
    ...props
  } = useQuery({
    queryFn: () => runReportService.getRunReports(),
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
    queryFn: () => runReportService.getRunReport(id),
    queryKey: ["Run Report", id],
  });

  if (isError) {
    console.error("Failed to fetch Run Report:", error);
  }

  return { runReportData, ...props };
};
