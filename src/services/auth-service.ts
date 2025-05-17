import BaseService from "./base-service";
import http from "./api/http";
import { LoginFormValues, ResetPassword } from "@/types/login.type";
import { AppResponse, AuthDataType } from "@/types/common.type";
import {
  SignupFormValues,
  SignupReturnValues,
  ValidationFormValues,
} from "@/types/signup.type";

class AuthService extends BaseService {
  async postLogin(data: LoginFormValues) {
    const response = await http.post<AppResponse<AuthDataType>>(
      "/auth/login",
      data
    );
    return response;
  }

  async postSignup(data: SignupFormValues) {
    const response = await http.post<AppResponse<SignupReturnValues>>(
      "auth/signup",
      data
    );
    return response;
  }

  async postLogout() {
    const resonse = await http.post<AppResponse<null>>("/auth/logout");
    console.log("use logedout");
    return resonse;
  }

  async verifyEmail(email: string) {
    const response = await http.post<AppResponse<null>>(
      "/auth/send-verification-email",
      { email }
    );
    return response;
  }

  async verifyOTP(data: ValidationFormValues) {
    const response = await http.post<AppResponse<null>>(
      "/auth/validate-otpCode",
      data
    );
    return response;
  }

  async getUser(id: number) {
    const response = await http.get<AppResponse<AuthDataType>>(`/user/${id}`);
    return response;
  }

  async patchChangePassword(data: ResetPassword) {
    const response = await http.patch<AppResponse<null>>(
      "/auth/forget-password",
      data
    );
    return response;
  }
}

const authService = new AuthService();
export default authService;
