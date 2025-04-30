"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import reportsService from "../reports-service";
import { PcrReportFormValues } from "@/types/formSchema";

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

export const usePostPCR = () => {
  const {
    mutate: mutatePost,
    isPending,
    ...props
  } = useMutation({
    mutationFn: (data: PcrReportFormValues) => reportsService.postPCR(data),
    onSuccess: async (response) => {},
    onError: () => {},
  });

  return { mutatePost, isPending, ...props };
};

export const useUpdatePCR = (id: number) => {
  const {
    mutate: mutateUpdate,
    isPending,
    ...props
  } = useMutation({
    mutationFn: (data: PcrReportFormValues) =>
      reportsService.updatePCR(data, id),
    onSuccess: async (response) => {},
    onError: () => {},
  });

  return { mutateUpdate, isPending, ...props };
};
