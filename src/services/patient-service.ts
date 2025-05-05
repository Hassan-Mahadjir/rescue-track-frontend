import { AppResponse } from "@/types/common.type";
import http from "./api/http";
import BaseService from "./base-service";
import { Patient, PCR } from "@/types/patients.type";

class PatientService extends BaseService {
  async getPatientAdmin(id: number) {
    const response = await http.get<AppResponse<Patient>>(
      `/patient/manage/${id}`
    );
    return response;
  }

  async getPatientsAdmin() {
    const response = await http.get<AppResponse<Patient[]>>(`/patient/manage`);
    return response;
  }

  async updatePatient(id: number, data: Patient) {
    const response = await http.patch<AppResponse<Patient>>(
      `/patient/${id}`,
      data
    );
    return response;
  }

  async createPatient(data: Patient) {
    const response = await http.post<AppResponse<Patient>>(`/patient`, data);
    return response;
  }

  async getPatient(id: number) {
    const response = await http.get<AppResponse<Patient>>(`/patient/${id}`);
    return response;
  }

  async getPatients() {
    const response = await http.get<AppResponse<Patient[]>>(`/patient`);
    return response;
  }
}

export default new PatientService();
