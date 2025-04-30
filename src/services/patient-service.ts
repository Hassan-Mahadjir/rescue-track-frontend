import { AppResponse } from "@/types/common.type";
import http from "./api/http";
import BaseService from "./base-service";

class PatientService extends BaseService {
  async getPatient(id: number) {
    const response = await http.get<AppResponse<Patient>>(
      `/patient/manage/${id}`
    );
    return response;
  }
  async getPatients() {
    const response = await http.get<AppResponse<Patient[]>>(`/patient/manage`);
    return response;
  }
}

export default new PatientService();
