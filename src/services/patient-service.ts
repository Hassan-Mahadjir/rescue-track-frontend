import { AppResponse } from "@/types/common.type";
import http from "./api/http";
import BaseService from "./base-service";
import { Patient } from "@/types/patient.type";

class PatientService extends BaseService {
  async getPatient(id: number) {
    const response = await http.get<AppResponse<Patient>>(
      `/patient/manage/${id}`
    );
    return response;
  }
}

export default new PatientService();
