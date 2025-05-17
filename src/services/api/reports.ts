"use client";
import { useQueryClient } from "@tanstack/react-query";
import {
  AllergyData,
  CombinedFormData,
  ConditionData,
  PCRData,
  PcrReportFormValues,
  TreatmentsData,
} from "@/types/schema/reportFormSchema";
import { useToast } from "@/hooks/use-toast";
import reportsService from "../reports-service";
import { useRouter } from "next/navigation";
import {
  useRoleBasedQuery,
  useRoleBasedMutation,
} from "@/hooks/useRoleBasedQuery";
import { PCR, ReportStat, RunReportItem } from "@/types/report.type";
import { APIError } from "@/types/error.type";

export const usePCRs = () => {
  const { data: PCRsData, ...props } = useRoleBasedQuery<PCR[]>({
    queryKey: ["PCRS"],
    adminQueryFn: async () => {
      const response = await reportsService.getPCRsAdmin();
      return response.data.data;
    },
    employeeQueryFn: async () => {
      const response = await reportsService.getPCRs();
      return response.data.data;
    },
  });

  return { PCRsData, ...props };
};

export const usePCR = (id: number) => {
  const { data: PCRData, ...props } = useRoleBasedQuery<PCR>({
    queryKey: ["PCR", id],
    adminQueryFn: async () => {
      const response = await reportsService.getPCRAdmin(id);
      return response.data.data;
    },
    employeeQueryFn: async () => {
      const response = await reportsService.getPCR(id);
      return response.data.data;
    },
  });

  return { PCRData, ...props };
};

export const usePostPCR = () => {
  const router = useRouter();
  const { toast } = useToast();
  const {
    mutate: mutatePost,
    isPending,
    ...props
  } = useRoleBasedMutation<PCR, PcrReportFormValues>({
    adminMutationFn: (data) => reportsService.postPCR(data),
    employeeMutationFn: (data) => reportsService.postPCR(data),
    onSuccess: (response) => {
      toast({
        title: "PCR Created",
        description: response.message || "PCR report submitted successfully.",
        variant: "default",
        duration: 3000,
        progressColor: "bg-green-500",
      });
      router.push("/report/pcr");
    },
    onError: (error: APIError) => {
      console.error(error);
      toast({
        title: "Submission Failed",
        description:
          error?.response?.data?.message ||
          "An error occurred while submitting the PCR.",
        variant: "destructive",
        duration: 5000,
        progressColor: "bg-red-500",
      });
    },
  });

  return { mutatePost, isPending, ...props };
};

export const useUpdatePCR = (id: number) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const {
    mutate: mutateUpdate,
    isPending,
    ...props
  } = useRoleBasedMutation<PCR, PCRData>({
    adminMutationFn: (data) => reportsService.updatePCR(data, id),
    employeeMutationFn: (data) => reportsService.updatePCR(data, id),
    onSuccess: (response) => {
      toast({
        title: "PCR Updated",
        description: response.message || "PCR report updated successfully.",
        variant: "default",
        duration: 3000,
        progressColor: "bg-green-500",
      });
      queryClient.invalidateQueries({ queryKey: ["PCR", id] });
    },
    onError: (error: APIError) => {
      console.error(error);
      toast({
        title: "Update Failed",
        description:
          error?.response?.data?.message ||
          "An error occurred while updating the PCR.",
        variant: "destructive",
        duration: 5000,
        progressColor: "bg-red-500",
      });
    },
  });

  return { mutateUpdate, isPending, ...props };
};

export const useDeletePCR = (id: number) => {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const {
    mutate: mutateDelete,
    isPending,
    ...props
  } = useRoleBasedMutation<PCR, void>({
    adminMutationFn: () => reportsService.deletePCRAdmin(id),
    employeeMutationFn: () => reportsService.deletePCRAdmin(id),
    onSuccess: (response) => {
      toast({
        title: "PCR Deleted",
        description: response.message || "PCR report deleted successfully.",
        variant: "default",
        duration: 3000,
        progressColor: "bg-green-500",
      });
      queryClient.invalidateQueries({ queryKey: ["PCRS"] });
      router.refresh();
    },
    onError: (error: APIError) => {
      console.error(error);
      toast({
        title: "Update Failed",
        description:
          error?.response?.data?.message ||
          "An error occurred while deleting the PCR.",
        variant: "destructive",
        duration: 5000,
        progressColor: "bg-red-500",
      });
    },
  });

  return { mutateDelete, isPending, ...props };
};

export const usePostPCRTreatment = (id: number) => {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const {
    mutate: mutatePost,
    isPending,
    ...props
  } = useRoleBasedMutation<TreatmentsData, TreatmentsData>({
    adminMutationFn: (data) => reportsService.postPCRTreatment(data, id),
    employeeMutationFn: (data) => reportsService.postPCRTreatment(data, id),
    onSuccess: (response) => {
      toast({
        title: "PCR Treatment Created",
        description:
          response.message || "PCR treatment submitted successfully.",
        variant: "default",
        duration: 3000,
        progressColor: "bg-green-500",
      });
      queryClient.invalidateQueries({ queryKey: ["PCR", id] });
      router.refresh();
    },
    onError: (error: APIError) => {
      console.error(error);
      toast({
        title: "Submission Failed",
        description:
          error?.response?.data?.message ||
          "An error occurred while submitting the treatment.",
        variant: "destructive",
        duration: 5000,
        progressColor: "bg-red-500",
      });
    },
  });

  return { mutatePost, isPending, ...props };
};

export const useUpdatePCRTreatment = (id: number) => {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const {
    mutate: mutateUpdate,
    isPending,
    ...props
  } = useRoleBasedMutation<TreatmentsData, TreatmentsData>({
    adminMutationFn: (data) => reportsService.updatePCRTreatment(data, id),
    employeeMutationFn: (data) => reportsService.updatePCRTreatment(data, id),
    onSuccess: (response) => {
      toast({
        title: "PCR Treatment Updated",
        description: response.message || "PCR treatment updated successfully.",
        variant: "default",
        duration: 3000,
        progressColor: "bg-green-500",
      });
      queryClient.invalidateQueries({ queryKey: ["PCR", id] });
      router.refresh();
    },
    onError: (error: APIError) => {
      console.error(error);
      toast({
        title: "Update Failed",
        description:
          error?.response?.data?.message ||
          "An error occurred while updating the treatment.",
        variant: "destructive",
        duration: 5000,
        progressColor: "bg-red-500",
      });
    },
  });

  return { mutateUpdate, isPending, ...props };
};

export const useDeletePCRTreatment = () => {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    mutate: mutateDelete,
    isPending,
    ...props
  } = useRoleBasedMutation<TreatmentsData, number>({
    adminMutationFn: (id) => reportsService.deletePCRTreatment(id),
    employeeMutationFn: (id) => reportsService.deletePCRTreatment(id),
    onSuccess: (response) => {
      toast({
        title: response.message,
        description: "Treatment deleted successfully.",
        variant: "default",
        duration: 3000,
        progressColor: "bg-green-500",
      });
      queryClient.invalidateQueries({ queryKey: ["PCR"] });
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

export const usePostPCRAllergy = (id: number) => {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const {
    mutate: allergyMutatePost,
    isPending,
    ...props
  } = useRoleBasedMutation<AllergyData, AllergyData>({
    adminMutationFn: (data) => reportsService.postPCRAllergy(data, id),
    employeeMutationFn: (data) => reportsService.postPCRAllergy(data, id),
    onSuccess: (response) => {
      toast({
        title: "PCR Allergies Created",
        description:
          response.message || "PCR Allergies submitted successfully.",
        variant: "default",
        duration: 3000,
        progressColor: "bg-green-500",
      });
      queryClient.invalidateQueries({ queryKey: ["PCR", id] });
      router.refresh();
    },
    onError: (error: APIError) => {
      console.error(error);
      toast({
        title: "Submission Failed",
        description:
          error?.response?.data?.message ||
          "An error occurred while submitting the Allergies.",
        variant: "destructive",
        duration: 5000,
        progressColor: "bg-red-500",
      });
    },
  });

  return { allergyMutatePost, isPending, ...props };
};

export const useDeletePCRAllergy = () => {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    mutate: mutateDelete,
    isPending,
    ...props
  } = useRoleBasedMutation<AllergyData, number>({
    adminMutationFn: (id) => reportsService.deletePCRAllergy(id),
    employeeMutationFn: (id) => reportsService.deletePCRAllergy(id),
    onSuccess: (response) => {
      toast({
        title: response.message,
        description: "Allergy deleted successfully.",
        variant: "default",
        duration: 3000,
        progressColor: "bg-green-500",
      });
      queryClient.invalidateQueries({ queryKey: ["PCR"] });
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

export const usePostPCRCondition = (id: number) => {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const {
    mutate: conditionMutatePost,
    isPending,
    ...props
  } = useRoleBasedMutation<ConditionData, ConditionData>({
    adminMutationFn: (data) => reportsService.postPCRCondition(data, id),
    employeeMutationFn: (data) => reportsService.postPCRCondition(data, id),
    onSuccess: (response) => {
      toast({
        title: "PCR Conditions Created",
        description:
          response.message || "PCR conditions submitted successfully.",
        variant: "default",
        duration: 3000,
        progressColor: "bg-green-500",
      });
      queryClient.invalidateQueries({ queryKey: ["PCR", id] });
      router.refresh();
    },
    onError: (error: APIError) => {
      console.error(error);
      toast({
        title: "Submission Failed",
        description:
          error?.response?.data?.message ||
          "An error occurred while submitting the conditions.",
        variant: "destructive",
        duration: 5000,
        progressColor: "bg-red-500",
      });
    },
  });

  return { conditionMutatePost, isPending, ...props };
};

export const useDeletePCRCondition = () => {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    mutate: mutateDelete,
    isPending,
    ...props
  } = useRoleBasedMutation<ConditionData, number>({
    adminMutationFn: (id) => reportsService.deletePCRCondition(id),
    employeeMutationFn: (id) => reportsService.deletePCRCondition(id),
    onSuccess: (response) => {
      toast({
        title: response.message,
        description: "Condition deleted successfully.",
        variant: "default",
        duration: 3000,
        progressColor: "bg-green-500",
      });
      queryClient.invalidateQueries({ queryKey: ["PCR"] });
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

export const useRunReports = () => {
  const { data: runReportsData, ...props } = useRoleBasedQuery<RunReportItem[]>(
    {
      queryKey: ["run-report"],
      adminQueryFn: async () => {
        const response = await reportsService.getRunReportsAdmin();
        return response.data.data;
      },
      employeeQueryFn: async () => {
        const response = await reportsService.getRunReports();
        return response.data.data;
      },
    }
  );

  return { runReportsData, ...props };
};

export const useRunReport = (id: number) => {
  const { data: runReportData, ...props } = useRoleBasedQuery<RunReportItem>({
    queryKey: ["run-report", id],
    adminQueryFn: async () => {
      const response = await reportsService.getRunReportAdmin(id);
      return response.data.data;
    },
    employeeQueryFn: async () => {
      const response = await reportsService.getRunReport(id);
      return response.data.data;
    },
  });

  return { runReportData, ...props };
};

export const usePostRunReport = () => {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const {
    mutate: mutatePost,
    isPending,
    ...props
  } = useRoleBasedMutation<CombinedFormData, CombinedFormData>({
    adminMutationFn: (data) => reportsService.postRunReport(data),
    employeeMutationFn: (data) => reportsService.postRunReport(data),
    onSuccess: async (response) => {
      toast({
        title: response.message,
        description:
          "Run report created successfully. you can create PCR for this report now.",
        variant: "default",
        duration: 3000,
        progressColor: "bg-green-500",
      });
      queryClient.invalidateQueries({ queryKey: ["run-report"] });
      router.push("/report/pcr/create/registered");
    },
    onError: (error: APIError) => {
      console.error(error);
      toast({
        title: "Submission failed",
        description:
          error.response?.data?.message ||
          "An error occurred while subitting the run report",
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
  const queryClient = useQueryClient();
  const {
    mutate: mutateUpdate,
    isPending,
    ...props
  } = useRoleBasedMutation<CombinedFormData, CombinedFormData>({
    adminMutationFn: (data) => reportsService.updateRunReport(data, id),
    employeeMutationFn: (data) => reportsService.updateRunReport(data, id),
    onSuccess: async (response) => {
      toast({
        title: response.message,
        description: "Run report updated successfully.",
        variant: "default",
        duration: 3000,
        progressColor: "bg-green-500",
      });
      queryClient.invalidateQueries({ queryKey: ["run-report", id] });
      router.push(`/report/run-report/${id}`);
    },
    onError: (error: APIError) => {
      console.error(error);
      toast({
        title: "Submission failed",
        description:
          error?.response?.data?.message ||
          "An error occurred while updating the run report",
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
  const queryClient = useQueryClient();

  const {
    mutate: mutateDelete,
    isPending,
    ...props
  } = useRoleBasedMutation<CombinedFormData, number>({
    adminMutationFn: (id) => reportsService.deleteRunReportAdmin(id),
    employeeMutationFn: (id) => reportsService.deleteRunReportAdmin(id),
    onSuccess: (response) => {
      toast({
        title: response.message,
        description: "Run report deleted successfully.",
        variant: "default",
        duration: 3000,
        progressColor: "bg-green-500",
      });
      queryClient.invalidateQueries({ queryKey: ["run-report"] });
      router.refresh();
    },
    onError: (error: APIError) => {
      console.error(error);
      toast({
        title: "Delete failed",
        description:
          error?.response?.data?.message ||
          "An error occurred while deleting the run report",
        variant: "destructive",
        duration: 5000,
        progressColor: "bg-red-500",
      });
    },
  });

  return { mutateDelete, isPending, ...props };
};

export const useUniqueRecentRunReports = () => {
  const { data: uniqueRecentRunReportsData, ...props } = useRoleBasedQuery<
    RunReportItem[]
  >({
    queryKey: ["unique-recent-run-reports"],
    adminQueryFn: async () => {
      const response = await reportsService.getUniqueRecentRunReports();
      return response.data.data;
    },
    employeeQueryFn: async () => {
      const response = await reportsService.getUniqueRecentRunReports();
      return response.data.data;
    },
  });

  return { uniqueRecentRunReportsData, ...props };
};

export const useStats = () => {
  const { data: StatsData, ...props } = useRoleBasedQuery<ReportStat[]>({
    queryKey: ["Stats"],
    adminQueryFn: async () => {
      const response = await reportsService.getStats();
      return response.data.data;
    },
    employeeQueryFn: async () => {
      const response = await reportsService.getStats();
      return response.data.data;
    },
  });

  return { StatsData, ...props };
};
