import { AppResponse } from "@/types/common.type";
import http from "./api/http";
import BaseService from "./base-service";
import {  PCRs } from "@/types/patients.type";

class PatientsService extends BaseService {
  async getPCRs() {
    const response = await http.get<AppResponse<PCRs[]>>(
      "/patient-care-report/manage"
    );
    return response;
  }
  async getPCR(id: number) {
    const response = await http.get<AppResponse<PCRs>>(
      `patient/manage`
    );
    return response;
  }
}

export default new PatientsService();
