import {
  useRoleBasedMutation,
  useRoleBasedQuery,
} from "@/hooks/useRoleBasedQuery";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { APIError } from "@/types/error.type";
import supplierService from "../supplier-service";
import { SupplierFormValues } from "@/types/schema/supplierFormSchema";

export const useSuppliers = () => {
  const { data: supplierData, ...props } = useRoleBasedQuery({
    queryKey: ["supplier"],
    adminQueryFn: async () => {
      const response = await supplierService.getSuppliers();
      return response.data.data;
    },
    employeeQueryFn: async () => {
      const respone = await supplierService.getSuppliers();
      return respone.data.data;
    },
  });

  return { supplierData, ...props };
};

export const useSupplier = (id: number) => {
  const { data: supplierData, ...props } = useRoleBasedQuery<any>({
    queryKey: ["supplier", id],
    adminQueryFn: async () => {
      const response = await supplierService.getSupplier(id);
      return response.data.data;
    },
    employeeQueryFn: async () => {
      const response = await supplierService.getSupplier(id);
      return response.data.data;
    },
  });

  return { supplierData, ...props };
};

export const usePostSupplier = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const {
    mutate: mutatePost,
    isPending,
    ...props
  } = useRoleBasedMutation<SupplierFormValues, SupplierFormValues>({
    adminMutationFn: (data) => supplierService.postSupplier(data),
    employeeMutationFn: (data) => supplierService.postSupplier(data),
    onSuccess: (response) => {
      toast({
        title: "Supplier Created",
        description:
          response.message || "Supplier report submitted successfully.",
        variant: "default",
        duration: 3000,
        progressColor: "bg-green-500",
      });
      queryClient.invalidateQueries({ queryKey: ["supplier"] });
    },
    onError: (error: APIError) => {
      console.error(error);
      toast({
        title: "Submission Failed",
        description:
          error?.response?.data?.message ||
          "An error occurred while submitting the supplier.",
        variant: "destructive",
        duration: 5000,
        progressColor: "bg-red-500",
      });
    },
  });

  return { mutatePost, isPending, ...props };
};

export const useUpdateSupplier = (id: number) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const {
    mutate: mutateUpdate,
    isPending,
    ...props
  } = useRoleBasedMutation<SupplierFormValues, SupplierFormValues>({
    adminMutationFn: (data) => supplierService.updateSupplier(data, id),
    employeeMutationFn: (data) => supplierService.updateSupplier(data, id),
    onSuccess: (response) => {
      toast({
        title: "Supplier Updated",
        description: response.message || "Supplier updated successfully.",
        variant: "default",
        duration: 3000,
        progressColor: "bg-green-500",
      });
      queryClient.invalidateQueries({ queryKey: ["Supplier"] });
    },
    onError: (error: APIError) => {
      console.error(error);
      toast({
        title: "Update Failed",
        description:
          error?.response?.data?.message ||
          "An error occurred while updating the Supplier.",
        variant: "destructive",
        duration: 5000,
        progressColor: "bg-red-500",
      });
    },
  });

  return { mutateUpdate, isPending, ...props };
};
