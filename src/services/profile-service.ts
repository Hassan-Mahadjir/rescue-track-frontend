import { AppResponse } from "@/types/common.type";
import http from "./api/http";
import BaseService from "./base-service";
import { UserProfile } from "@/types/profile.type";
import { UserFormValues } from "@/types/schema/profileFormSchema";

class ProfileService extends BaseService {
  async getProfile() {
    const response = await http.get<AppResponse<UserProfile>>("user/profile");
    return response;
  }
  async updateProfile(data: UserFormValues) {
    const response = await http.patch<AppResponse<UserFormValues>>(
      `user/profile`,
      data
    );
    return response;
  }
}

const profileService = new ProfileService();
export default profileService;
