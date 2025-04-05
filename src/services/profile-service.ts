import { AppResponse } from "@/types/common.type";
import http from "./api/http";
import BaseService from "./base-service";
import { profile } from "@/types/profile.type";

class ProfileService extends BaseService {
  async getProfile() {
    const response = await http.get<AppResponse<profile>>("user/profile");
    return response;
  }
}

export default new ProfileService();
