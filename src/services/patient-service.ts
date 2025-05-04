import { AppResponse } from "@/types/common.type";
import http from "./api/http";
import BaseService from "./base-service";
import { Patient, PCR } from "@/types/patients.type";

class PatientService extends BaseService {
  async getPatient(id: number) {
    // await this.handleAuthError(`/patient/manage/${id}`);
    const response = await http.get<AppResponse<Patient>>(
      `/patient/manage/${id}`
    );
    return response;
  }

  async getPatients() {
    // await this.handleAuthError(`/patient/manage`);
    const response = await http.get<AppResponse<Patient[]>>(`/patient/manage`);
    return response;
  }

  async updatePatient(id: number, data: Patient) {
    // await this.handleAuthError(`/patient/${id}`);
    const response = await http.patch<AppResponse<Patient>>(
      `/patient/${id}`,
      data
    );
    return response;
  }

  async createPatient(data: Patient) {
    // await this.handleAuthError(`/patient`);
    const response = await http.post<AppResponse<Patient>>(`/patient`, data);
    return response;
  }
}

export default new PatientService();
