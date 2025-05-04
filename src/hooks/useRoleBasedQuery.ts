"use client";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { useToast } from "./use-toast";

interface RoleBasedQueryOptions<T>
  extends Omit<UseQueryOptions<T, Error, T, any[]>, "queryFn"> {
  adminQueryFn: () => Promise<T>;
  employeeQueryFn: () => Promise<T>;
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
