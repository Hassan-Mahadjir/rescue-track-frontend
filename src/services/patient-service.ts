import { AppResponse } from "@/types/common.type";
import http from "./api/http";
import BaseService from "./base-service";
import { Patient } from "@/types/patient.type";

class PatientsService extends BaseService {
  async getPatients() {
    const response = await http.get<AppResponse<Patient[]>>("patient/manage");
    return response;
  }
  async getpatient(id: number) {
    const response = await http.get<AppResponse<Patient>>(
      `patient/manage/${id}`
    );
    return response;
  }
}

export default new PatientsService();
