import { useRoleBasedQuery } from "@/hooks/useRoleBasedQuery";
import staffService from "../staff-service";

export const useStaff = () => {
  const { data: StaffData, ...props } = useRoleBasedQuery({
    queryKey: ["staffs"],
    adminQueryFn: async () => {
      const response = await staffService.getStaff();
      return response.data.data;
    },
    employeeQueryFn: async () => {
      const respone = await staffService.getStaff();
      return respone.data.data;
    },
  });

  return { StaffData, ...props };
};
