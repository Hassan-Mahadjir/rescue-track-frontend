"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CombinedFormData,
  PcrReportFormValues,
} from "@/types/reportFormSchema";
import { useToast } from "@/hooks/use-toast";
import reportsService from "../reports-service";
import { useRouter } from "next/navigation";

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

export const useRunReports = () => {
  // const router = useRouter();
  const {
    data: runReportsData,
    error,
    isError,
    ...props
  } = useQuery({
    queryFn: () => reportsService.getRunReports(),
    queryKey: ["run-report"],
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
    queryKey: ["run-report", id],
  });

  if (isError) {
    console.error("Failed to fetch Run Report:", error);
  }

  return { runReportData, ...props };
};

export const usePostRunReport = () => {
  const router = useRouter();
  const { toast } = useToast();
  const {
    mutate: mutatePost,
    isPending,
    ...props
  } = useMutation({
    mutationFn: (data: CombinedFormData) => reportsService.postRunReport(data),
    onSuccess: async (response) => {
      toast({
        title: `${response.data.message}`,
        description:
          "Run report created successfully. you can create PCR for this report now.",
        variant: "default",
        duration: 3000,
        progressColor: "bg-green-500",
      });
      router.push("/report/pcr/create/registered");
    },
    onError: (error: APIError) => {
      console.error(error);
      toast({
        title: "Submission failed",
        description: error.response?.data?.message || "Something went wrong.",
        variant: "destructive",
        duration: 5000,
        progressColor: "bg-red-500",
      });
    },
  });

  return { mutatePost, isPending, ...props };
};

export const useUpdateRunReport = (id: number) => {
  const router = useRouter();
  const { toast } = useToast();
  const {
    mutate: mutateUpdate,
    isPending,
    ...props
  } = useMutation({
    mutationFn: (data: CombinedFormData) =>
      reportsService.updateRunReport(data, id),
    onSuccess: async (response) => {
      toast({
        title: `${response.data.message}`,
        description: "Run report updated successfully.",
        variant: "default",
        duration: 3000,
        progressColor: "bg-green-500",
      });
      router.push(`/report/run-report/${id}`);
    },
    onError: (error: APIError) => {
      console.error(error);
      toast({
        title: "Submission failed",
        description: error.response?.data?.message || "Something went wrong.",
        variant: "destructive",
        duration: 5000,
        progressColor: "bg-red-500",
      });
    },
  });

  return { mutateUpdate, isPending, ...props };
};
export const useDeleteRunReport = () => {
  const router = useRouter();
  const { toast } = useToast();

  const {
    mutate: mutateDelete,
    isPending,
    ...props
  } = useMutation({
    mutationFn: (id: number) => reportsService.deleteRunReport(id),
    onSuccess: (response) => {
      toast({
        title: response.data.message,
        description: "Run report deleted successfully.",
        variant: "default",
        duration: 3000,
        progressColor: "bg-green-500",
      });
      router.refresh();
    },
    onError: (error: APIError) => {
      console.error(error);
      toast({
        title: "Delete failed",
        description: error.response?.data?.message || "Something went wrong.",
        variant: "destructive",
        duration: 5000,
        progressColor: "bg-red-500",
      });
    },
  });

  return { mutateDelete, isPending, ...props };
};
