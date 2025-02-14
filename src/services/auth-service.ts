import BaseService from "./base-service";
import http from "./api/http";
import { LoginFormValues } from "@/types/login.type";
import { AppResponse, AuthDataType } from "@/types/common.type";
import { RegisterFormValues } from "@/types/register.type";

class AuthService extends BaseService {
  async postLogin(data: LoginFormValues) {
    const response = await http.post<AppResponse<AuthDataType>>(
      "/auth/login",
      data
    );
    return response;
  }
  async postRegister(data: RegisterFormValues) {
    const response = await http.post<AppResponse<RegisterFormValues>>(
      "/user",
      data
    );
    return response;
  }
}

export default new AuthService();
