import ProfileService from "../profile-service";
import {
  useRoleBasedMutation,
  useRoleBasedQuery,
} from "@/hooks/useRoleBasedQuery";
import profileService from "../profile-service";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { UserFormValues } from "@/types/schema/profileFormSchema";
import { APIError } from "@/types/error.type";

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

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const {
    mutate: mutateUpdate,
    isPending,
    ...props
  } = useRoleBasedMutation<UserFormValues, UserFormValues>({
    adminMutationFn: (data) => ProfileService.updateProfile(data),
    employeeMutationFn: (data) => ProfileService.updateProfile(data),
    onSuccess: (response) => {
      toast({
        title: "Profile Updated",
        description: response.message || "Profile updated successfully.",
        variant: "default",
        duration: 3000,
        progressColor: "bg-green-500",
      });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: APIError) => {
      console.error(error);
      toast({
        title: "Update Failed",
        description:
          error?.response?.data?.message ||
          "An error occurred while updating the Profile.",
        variant: "destructive",
        duration: 5000,
        progressColor: "bg-red-500",
      });
    },
  });

  return { mutateUpdate, isPending, ...props };
};
