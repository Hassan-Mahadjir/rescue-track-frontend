import ProfileService from "../profile-service";
import { useRoleBasedQuery } from "@/hooks/useRoleBasedQuery";
import profileService from "../profile-service";

export const useProfile = () => {
  const { data: profileData, ...props } = useRoleBasedQuery({
    queryKey: ["profile"],
    adminQueryFn: async () => {
      const response = await ProfileService.getProfile();
      return response.data.data;
    },
    employeeQueryFn: async () => {
      const respone = await profileService.getProfile();
      return respone.data.data;
    },
  });

  return { profileData, ...props };
};
