import BaseService from "./base-service";
import http from "./api/http";
import { LoginFormValues } from "@/types/login.type";
import { AppResponse, AuthDataType } from "@/types/common.type";
import { SignupFormValues, SignupReturnValues } from "@/types/signup.type";

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
}

export default new AuthService();
