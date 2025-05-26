"use client";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import reportsService from "../reports-service";
import { useRouter } from "next/navigation";
import {
  useRoleBasedQuery,
  useRoleBasedMutation,
} from "@/hooks/useRoleBasedQuery";
import { PCR, Skin, StatRecord, Therapy } from "@/types/report.type";
import { APIError } from "@/types/error.type";
import { RunReportItem } from "@/types/runReport.type";
import {
  AllergyData,
  ConditionData,
  PcrFormData,
  RunReportFormData,
  SkinData,
  TherapyData,
  TreatmentsData,
} from "@/types/schema/reportFormSchema";
import {
  PupilsData,
  RespData,
  VitalSignData,
  TrumaData,
  InjuryMechanismdata,
  CircumstanceData,
} from "@/types/schema/reportFormSchema";
import {
  Pupil,
  Resp,
  VitalSign,
  Trauma,
  InjuryMechanism,
  Circumstance,
} from "@/types/report.type";

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
  } = useRoleBasedMutation<PCR, PcrFormData>({
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
  } = useRoleBasedMutation<PCR, PcrFormData>({
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
  } = useRoleBasedMutation<RunReportFormData, RunReportFormData>({
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
      router.push("/report");
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
  } = useRoleBasedMutation<RunReportFormData, RunReportFormData>({
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
  } = useRoleBasedMutation<RunReportFormData, number>({
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
  const { data, ...query } = useRoleBasedQuery<StatRecord[]>({
    queryKey: ["Stats"],
    adminQueryFn: async () => {
      const { data } = await reportsService.getStats();
      return data.data; // <-- unwrap once here
    },
    employeeQueryFn: async () => {
      const { data } = await reportsService.getStats();
      return data.data;
    },
  });

  return { StatsData: data ?? [], ...query };
};

export const usePostPCRTherapy = (id: number) => {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const {
    mutate: mutatePost,
    isPending,
    ...props
  } = useRoleBasedMutation<TherapyData, Therapy>({
    adminMutationFn: (data) => reportsService.postPCRTherapy(data, id),
    employeeMutationFn: (data) => reportsService.postPCRTherapy(data, id),
    onSuccess: (response) => {
      toast({
        title: "PCR Therapy Created",
        description: response.message || "PCR Therapy submitted successfully.",
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
          "An error occurred while submitting the therapy.",
        variant: "destructive",
        duration: 5000,
        progressColor: "bg-red-500",
      });
    },
  });

  return { mutatePost, isPending, ...props };
};

export const useUpdatePCRTherapy = (id: number) => {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const {
    mutate: mutateUpdate,
    isPending,
    ...props
  } = useRoleBasedMutation<TherapyData, Therapy>({
    adminMutationFn: (data) => reportsService.updatePCRTherapy(data, id),
    employeeMutationFn: (data) => reportsService.updatePCRTherapy(data, id),
    onSuccess: (response) => {
      toast({
        title: "PCR Treatment Updated",
        description: response.message || "PCR therapy updated successfully.",
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
          "An error occurred while updating the therapy.",
        variant: "destructive",
        duration: 5000,
        progressColor: "bg-red-500",
      });
    },
  });

  return { mutateUpdate, isPending, ...props };
};

export const useDeletePCRTherapy = () => {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    mutate: mutateDelete,
    isPending,
    ...props
  } = useRoleBasedMutation<null, number>({
    adminMutationFn: (id) => reportsService.deletePCRTherapy(id),
    employeeMutationFn: (id) => reportsService.deletePCRTherapy(id),
    onSuccess: (response) => {
      toast({
        title: response.message,
        description: "Therapy deleted successfully.",
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

export const usePostPCRSkin = (id: number) => {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    mutate: mutatePost,
    isPending,
    ...props
  } = useRoleBasedMutation<SkinData, Skin>({
    adminMutationFn: (data) => reportsService.postPCRSkin(data, id),
    employeeMutationFn: (data) => reportsService.postPCRSkin(data, id),
    onSuccess: (response) => {
      toast({
        title: "Skin Assessment Created",
        description:
          response.message || "Skin assessment submitted successfully.",
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
          "An error occurred while submitting the skin assessment.",
        variant: "destructive",
        duration: 5000,
        progressColor: "bg-red-500",
      });
    },
  });

  return { mutatePost, isPending, ...props };
};

export const useUpdatePCRSkin = (id: number) => {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    mutate: mutateUpdate,
    isPending,
    ...props
  } = useRoleBasedMutation<SkinData, Skin>({
    adminMutationFn: (data) => reportsService.updatePCRSkin(data, id),
    employeeMutationFn: (data) => reportsService.updatePCRSkin(data, id),
    onSuccess: (response) => {
      toast({
        title: "Skin Assessment Updated",
        description:
          response.message || "Skin assessment updated successfully.",
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
          "An error occurred while updating the skin assessment.",
        variant: "destructive",
        duration: 5000,
        progressColor: "bg-red-500",
      });
    },
  });

  return { mutateUpdate, isPending, ...props };
};

export const useDeletePCRSkin = () => {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    mutate: mutateDelete,
    isPending,
    ...props
  } = useRoleBasedMutation<null, number>({
    adminMutationFn: (id) => reportsService.deletePCRSkin(id),
    employeeMutationFn: (id) => reportsService.deletePCRSkin(id),
    onSuccess: (response) => {
      toast({
        title: response.message,
        description: "Skin assessment deleted successfully.",
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
        title: "Delete Failed",
        description: error?.response?.data?.message || "Something went wrong.",
        variant: "destructive",
        duration: 5000,
        progressColor: "bg-red-500",
      });
    },
  });

  return { mutateDelete, isPending, ...props };
};

// --- Pupil Endpoints ---
export const usePostPCRPupil = (id: number) => {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const {
    mutate: mutatePost,
    isPending,
    ...props
  } = useRoleBasedMutation<Pupil, PupilsData>({
    adminMutationFn: (data) => reportsService.postPCRPupil(data, id),
    employeeMutationFn: (data) => reportsService.postPCRPupil(data, id),
    onSuccess: (response) => {
      toast({
        title: "Pupil Assessment Created",
        description:
          response.message || "Pupil assessment submitted successfully.",
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
          "An error occurred while submitting the pupil assessment.",
        variant: "destructive",
        duration: 5000,
        progressColor: "bg-red-500",
      });
    },
  });
  return { mutatePost, isPending, ...props };
};

export const useUpdatePCRPupil = (id: number) => {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const {
    mutate: mutateUpdate,
    isPending,
    ...props
  } = useRoleBasedMutation<Pupil, PupilsData>({
    adminMutationFn: (data) => reportsService.updatePCRPupil(data, id),
    employeeMutationFn: (data) => reportsService.updatePCRPupil(data, id),
    onSuccess: (response) => {
      toast({
        title: "Pupil Assessment Updated",
        description:
          response.message || "Pupil assessment updated successfully.",
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
          "An error occurred while updating the pupil assessment.",
        variant: "destructive",
        duration: 5000,
        progressColor: "bg-red-500",
      });
    },
  });
  return { mutateUpdate, isPending, ...props };
};

export const useDeletePCRPupil = () => {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const {
    mutate: mutateDelete,
    isPending,
    ...props
  } = useRoleBasedMutation<null, number>({
    adminMutationFn: (id) => reportsService.deletePCRPupil(id),
    employeeMutationFn: (id) => reportsService.deletePCRPupil(id),
    onSuccess: (response) => {
      toast({
        title: response.message,
        description: "Pupil assessment deleted successfully.",
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
        title: "Delete Failed",
        description: error?.response?.data?.message || "Something went wrong.",
        variant: "destructive",
        duration: 5000,
        progressColor: "bg-red-500",
      });
    },
  });
  return { mutateDelete, isPending, ...props };
};

// --- Resp Endpoints ---
export const usePostPCRResp = (id: number) => {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const {
    mutate: mutatePost,
    isPending,
    ...props
  } = useRoleBasedMutation<Resp, RespData>({
    adminMutationFn: (data) => reportsService.postPCRResp(data, id),
    employeeMutationFn: (data) => reportsService.postPCRResp(data, id),
    onSuccess: (response) => {
      toast({
        title: "Respiratory Assessment Created",
        description:
          response.message || "Respiratory assessment submitted successfully.",
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
          "An error occurred while submitting the respiratory assessment.",
        variant: "destructive",
        duration: 5000,
        progressColor: "bg-red-500",
      });
    },
  });
  return { mutatePost, isPending, ...props };
};

export const useUpdatePCRResp = (id: number) => {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const {
    mutate: mutateUpdate,
    isPending,
    ...props
  } = useRoleBasedMutation<Resp, RespData>({
    adminMutationFn: (data) => reportsService.updatePCRResp(data, id),
    employeeMutationFn: (data) => reportsService.updatePCRResp(data, id),
    onSuccess: (response) => {
      toast({
        title: "Respiratory Assessment Updated",
        description:
          response.message || "Respiratory assessment updated successfully.",
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
          "An error occurred while updating the respiratory assessment.",
        variant: "destructive",
        duration: 5000,
        progressColor: "bg-red-500",
      });
    },
  });
  return { mutateUpdate, isPending, ...props };
};

export const useDeletePCRResp = () => {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const {
    mutate: mutateDelete,
    isPending,
    ...props
  } = useRoleBasedMutation<null, number>({
    adminMutationFn: (id) => reportsService.deletePCRResp(id),
    employeeMutationFn: (id) => reportsService.deletePCRResp(id),
    onSuccess: (response) => {
      toast({
        title: response.message,
        description: "Respiratory assessment deleted successfully.",
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
        title: "Delete Failed",
        description: error?.response?.data?.message || "Something went wrong.",
        variant: "destructive",
        duration: 5000,
        progressColor: "bg-red-500",
      });
    },
  });
  return { mutateDelete, isPending, ...props };
};

// --- Vital Sign Endpoints ---
export const usePostPCRVitalSign = (id: number) => {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const {
    mutate: mutatePost,
    isPending,
    ...props
  } = useRoleBasedMutation<VitalSign, VitalSignData>({
    adminMutationFn: (data) => reportsService.postPCRVitalSign(data, id),
    employeeMutationFn: (data) => reportsService.postPCRVitalSign(data, id),
    onSuccess: (response) => {
      toast({
        title: "Vital Sign Created",
        description: response.message || "Vital sign submitted successfully.",
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
          "An error occurred while submitting the vital sign.",
        variant: "destructive",
        duration: 5000,
        progressColor: "bg-red-500",
      });
    },
  });
  return { mutatePost, isPending, ...props };
};

export const useUpdatePCRVitalSign = (id: number) => {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const {
    mutate: mutateUpdate,
    isPending,
    ...props
  } = useRoleBasedMutation<VitalSign, VitalSignData>({
    adminMutationFn: (data) => reportsService.updatePCRVitalSign(data, id),
    employeeMutationFn: (data) => reportsService.updatePCRVitalSign(data, id),
    onSuccess: (response) => {
      toast({
        title: "Vital Sign Updated",
        description: response.message || "Vital sign updated successfully.",
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
          "An error occurred while updating the vital sign.",
        variant: "destructive",
        duration: 5000,
        progressColor: "bg-red-500",
      });
    },
  });
  return { mutateUpdate, isPending, ...props };
};

export const useDeletePCRVitalSign = () => {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const {
    mutate: mutateDelete,
    isPending,
    ...props
  } = useRoleBasedMutation<null, number>({
    adminMutationFn: (id) => reportsService.deletePCRVitalSign(id),
    employeeMutationFn: (id) => reportsService.deletePCRVitalSign(id),
    onSuccess: (response) => {
      toast({
        title: response.message,
        description: "Vital sign deleted successfully.",
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
        title: "Delete Failed",
        description: error?.response?.data?.message || "Something went wrong.",
        variant: "destructive",
        duration: 5000,
        progressColor: "bg-red-500",
      });
    },
  });
  return { mutateDelete, isPending, ...props };
};

// --- Trauma Endpoints ---
export const usePostPCRTrauma = (id: number) => {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const {
    mutate: mutatePost,
    isPending,
    ...props
  } = useRoleBasedMutation<Trauma, TrumaData>({
    adminMutationFn: (data) => reportsService.postPCRTrauma(data, id),
    employeeMutationFn: (data) => reportsService.postPCRTrauma(data, id),
    onSuccess: (response) => {
      toast({
        title: "Trauma Created",
        description: response.message || "Trauma submitted successfully.",
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
          "An error occurred while submitting the trauma.",
        variant: "destructive",
        duration: 5000,
        progressColor: "bg-red-500",
      });
    },
  });
  return { mutatePost, isPending, ...props };
};

export const useUpdatePCRTrauma = (id: number) => {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const {
    mutate: mutateUpdate,
    isPending,
    ...props
  } = useRoleBasedMutation<Trauma, TrumaData>({
    adminMutationFn: (data) => reportsService.updatePCRTrauma(data, id),
    employeeMutationFn: (data) => reportsService.updatePCRTrauma(data, id),
    onSuccess: (response) => {
      toast({
        title: "Trauma Updated",
        description: response.message || "Trauma updated successfully.",
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
          "An error occurred while updating the trauma.",
        variant: "destructive",
        duration: 5000,
        progressColor: "bg-red-500",
      });
    },
  });
  return { mutateUpdate, isPending, ...props };
};

export const useDeletePCRTrauma = () => {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const {
    mutate: mutateDelete,
    isPending,
    ...props
  } = useRoleBasedMutation<null, number>({
    adminMutationFn: (id) => reportsService.deletePCRTrauma(id),
    employeeMutationFn: (id) => reportsService.deletePCRTrauma(id),
    onSuccess: (response) => {
      toast({
        title: response.message,
        description: "Trauma deleted successfully.",
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
        title: "Delete Failed",
        description: error?.response?.data?.message || "Something went wrong.",
        variant: "destructive",
        duration: 5000,
        progressColor: "bg-red-500",
      });
    },
  });
  return { mutateDelete, isPending, ...props };
};

// --- Injury Mechanism Endpoints ---
export const usePostPCRInjuryMechanism = (id: number) => {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const {
    mutate: mutatePost,
    isPending,
    ...props
  } = useRoleBasedMutation<InjuryMechanism, InjuryMechanismdata>({
    adminMutationFn: (data) => reportsService.postPCRInjuryMechanism(data, id),
    employeeMutationFn: (data) =>
      reportsService.postPCRInjuryMechanism(data, id),
    onSuccess: (response) => {
      toast({
        title: "Injury Mechanism Created",
        description:
          response.message || "Injury mechanism submitted successfully.",
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
          "An error occurred while submitting the injury mechanism.",
        variant: "destructive",
        duration: 5000,
        progressColor: "bg-red-500",
      });
    },
  });
  return { mutatePost, isPending, ...props };
};

export const useUpdatePCRInjuryMechanism = (id: number) => {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const {
    mutate: mutateUpdate,
    isPending,
    ...props
  } = useRoleBasedMutation<InjuryMechanism, InjuryMechanismdata>({
    adminMutationFn: (data) =>
      reportsService.updatePCRInjuryMechanism(data, id),
    employeeMutationFn: (data) =>
      reportsService.updatePCRInjuryMechanism(data, id),
    onSuccess: (response) => {
      toast({
        title: "Injury Mechanism Updated",
        description:
          response.message || "Injury mechanism updated successfully.",
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
          "An error occurred while updating the injury mechanism.",
        variant: "destructive",
        duration: 5000,
        progressColor: "bg-red-500",
      });
    },
  });
  return { mutateUpdate, isPending, ...props };
};

export const useDeletePCRInjuryMechanism = () => {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const {
    mutate: mutateDelete,
    isPending,
    ...props
  } = useRoleBasedMutation<null, number>({
    adminMutationFn: (id) => reportsService.deletePCRInjuryMechanism(id),
    employeeMutationFn: (id) => reportsService.deletePCRInjuryMechanism(id),
    onSuccess: (response) => {
      toast({
        title: response.message,
        description: "Injury mechanism deleted successfully.",
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
        title: "Delete Failed",
        description: error?.response?.data?.message || "Something went wrong.",
        variant: "destructive",
        duration: 5000,
        progressColor: "bg-red-500",
      });
    },
  });
  return { mutateDelete, isPending, ...props };
};

// --- Special Circumstance Endpoints ---
export const usePostPCRSpecialCircumstance = (id: number) => {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const {
    mutate: mutatePost,
    isPending,
    ...props
  } = useRoleBasedMutation<Circumstance, CircumstanceData>({
    adminMutationFn: (data) =>
      reportsService.postPCRSpecialCircumstance(data, id),
    employeeMutationFn: (data) =>
      reportsService.postPCRSpecialCircumstance(data, id),
    onSuccess: (response) => {
      toast({
        title: "Special Circumstance Created",
        description:
          response.message || "Special circumstance submitted successfully.",
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
          "An error occurred while submitting the special circumstance.",
        variant: "destructive",
        duration: 5000,
        progressColor: "bg-red-500",
      });
    },
  });
  return { mutatePost, isPending, ...props };
};

export const useUpdatePCRSpecialCircumstance = (id: number) => {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const {
    mutate: mutateUpdate,
    isPending,
    ...props
  } = useRoleBasedMutation<Circumstance, CircumstanceData>({
    adminMutationFn: (data) =>
      reportsService.updatePCRSpecialCircumstance(data, id),
    employeeMutationFn: (data) =>
      reportsService.updatePCRSpecialCircumstance(data, id),
    onSuccess: (response) => {
      toast({
        title: "Special Circumstance Updated",
        description:
          response.message || "Special circumstance updated successfully.",
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
          "An error occurred while updating the special circumstance.",
        variant: "destructive",
        duration: 5000,
        progressColor: "bg-red-500",
      });
    },
  });
  return { mutateUpdate, isPending, ...props };
};

export const useDeletePCRSpecialCircumstance = () => {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const {
    mutate: mutateDelete,
    isPending,
    ...props
  } = useRoleBasedMutation<null, number>({
    adminMutationFn: (id) => reportsService.deletePCRSpecialCircumstance(id),
    employeeMutationFn: (id) => reportsService.deletePCRSpecialCircumstance(id),
    onSuccess: (response) => {
      toast({
        title: response.message,
        description: "Special circumstance deleted successfully.",
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
        title: "Delete Failed",
        description: error?.response?.data?.message || "Something went wrong.",
        variant: "destructive",
        duration: 5000,
        progressColor: "bg-red-500",
      });
    },
  });
  return { mutateDelete, isPending, ...props };
};
