import { AppResponse } from "@/types/common.type";
import http from "./api/http";
import BaseService from "./base-service";
import { PCR } from "@/types/patients.type";

class ReportService extends BaseService {
  async getPCRs() {
    const response = await http.get<AppResponse<PCR[]>>(
      "/patient-care-report/manage"
    );

    return response;
  }
  async getPCR(id: number) {
    const response = await http.get<AppResponse<PCR>>(
      `patient-care-report/manage/${id}`
    );
    return response;
  }
}

export default new ReportService();
