"use client";
import {
  useQuery,
  UseQueryOptions,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { useToast } from "./use-toast";
import { AppResponse } from "@/types/common.type";

interface RoleBasedQueryOptions<T>
  extends Omit<UseQueryOptions<T, Error, T, any[]>, "queryFn"> {
  adminQueryFn: () => Promise<T>;
  employeeQueryFn: () => Promise<T>;
}

interface RoleBasedMutationOptions<TData, TVariables>
  extends Omit<
    UseMutationOptions<AppResponse<TData>, Error, TVariables, unknown>,
    "mutationFn"
  > {
  adminMutationFn: (
    variables: TVariables
  ) => Promise<{ data: AppResponse<TData> }>;
  employeeMutationFn: (
    variables: TVariables
  ) => Promise<{ data: AppResponse<TData> }>;
}

export const useRoleBasedQuery = <T>({
  adminQueryFn,
  employeeQueryFn,
  ...options
}: RoleBasedQueryOptions<T>) => {
  const { toast } = useToast();
  const { isAdmin, isEmployee } = useAuth();

  return useQuery<T, Error, T, any[]>({
    ...options,
    queryFn: async () => {
      try {
        if (isAdmin()) {
          return await adminQueryFn();
        } else if (isEmployee()) {
          return await employeeQueryFn();
        }
        throw new Error("Unauthorized access");
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast({
          title: "Access Denied",
          description:
            error instanceof Error
              ? error.message
              : "You don't have permission to access this resource",
          variant: "destructive",
          duration: 5000,
          progressColor: "bg-red-500",
        });
        throw error;
      }
    },
  });
};

export const useRoleBasedMutation = <TData, TVariables>({
  adminMutationFn,
  employeeMutationFn,
  ...options
}: RoleBasedMutationOptions<TData, TVariables>) => {
  const { toast } = useToast();
  const { isAdmin, isEmployee } = useAuth();

  return useMutation<AppResponse<TData>, Error, TVariables>({
    ...options,
    mutationFn: async (variables) => {
      try {
        let response: { data: AppResponse<TData> };
        if (isAdmin()) {
          response = await adminMutationFn(variables);
        } else if (isEmployee()) {
          response = await employeeMutationFn(variables);
        } else {
          throw new Error("Unauthorized access");
        }
        return response.data;
      } catch (error) {
        console.error("Failed to perform mutation:", error);
        toast({
          title: "Access Denied",
          description:
            error instanceof Error
              ? error.message
              : "You don't have permission to perform this action",
          variant: "destructive",
          duration: 5000,
          progressColor: "bg-red-500",
        });
        throw error;
      }
    },
  });
};
