import {
  useRoleBasedMutation,
  useRoleBasedQuery,
} from "@/hooks/useRoleBasedQuery";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { APIError } from "@/types/error.type";
import itemService from "../item-service";
import {
  EquipmentFormValues,
  MedicationFormValues,
} from "@/types/schema/medication-equipmentSchema";

// Get all items
export const useItems = () => {
  const { data: itemData, ...props } = useRoleBasedQuery({
    queryKey: ["items"],
    adminQueryFn: async () => {
      const response = await itemService.getAllItems();
      return response.data.data;
    },
    employeeQueryFn: async () => {
      const response = await itemService.getAllItems();
      return response.data.data;
    },
  });

  return { itemData, ...props };
};

// Post Medication Item
export const usePostMedication = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    mutate: mutatePost,
    isPending,
    ...props
  } = useRoleBasedMutation<MedicationFormValues, MedicationFormValues>({
    adminMutationFn: (data) => itemService.postMedication(data),
    employeeMutationFn: (data) => itemService.postMedication(data),
    onSuccess: (response) => {
      toast({
        title: "Medication Added",
        description:
          response.message || "Medication item submitted successfully.",
        variant: "default",
        duration: 3000,
        progressColor: "bg-green-500",
      });
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
    onError: (error: APIError) => {
      console.error(error);
      toast({
        title: "Submission Failed",
        description:
          error?.response?.data?.message ||
          "An error occurred while submitting the medication item.",
        variant: "destructive",
        duration: 5000,
        progressColor: "bg-red-500",
      });
    },
  });

  return { mutatePost, isPending, ...props };
};

// Post Equipment Item
export const usePostEquipment = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    mutate: mutatePost,
    isPending,
    ...props
  } = useRoleBasedMutation<EquipmentFormValues, EquipmentFormValues>({
    adminMutationFn: (data) => itemService.postEquipment(data),
    employeeMutationFn: (data) => itemService.postEquipment(data),
    onSuccess: (response) => {
      toast({
        title: "Equipment Added",
        description:
          response.message || "Equipment item submitted successfully.",
        variant: "default",
        duration: 3000,
        progressColor: "bg-green-500",
      });
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
    onError: (error: APIError) => {
      console.error(error);
      toast({
        title: "Submission Failed",
        description:
          error?.response?.data?.message ||
          "An error occurred while submitting the equipment item.",
        variant: "destructive",
        duration: 5000,
        progressColor: "bg-red-500",
      });
    },
  });

  return { mutatePost, isPending, ...props };
};
