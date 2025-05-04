import { AppResponse } from "@/types/common.type";
import http from "./api/http";
import BaseService from "./base-service";
import { PCR, RunReportItem } from "@/types/report.type";
import {
  AllergyData,
  CombinedFormData,
  ConditionData,
  PCRData,
  PcrReportFormValues,
  TreatmentsData,
} from "@/types/reportFormSchema";

class ReportService extends BaseService {
  async getPCRs() {
    // await this.handleAuthError("/patient-care-report/manage");
    const response = await http.get<AppResponse<PCR[]>>(
      "/patient-care-report/manage"
    );
    return response;
  }
  async getPCR(id: number) {
    // await this.handleAuthError(`/patient-care-report/manage/${id}`);
    const response = await http.get<AppResponse<PCR>>(
      `patient-care-report/manage/${id}`
    );
    return response;
  }
  async postPCR(data: PcrReportFormValues) {
    // await this.handleAuthError("/patient-care-report");
    const response = await http.post<AppResponse<PCR>>(
      `patient-care-report`,
      data
    );
    return response;
  }
  async updatePCR(data: PCRData, id: number) {
    // await this.handleAuthError(`/patient-care-report/${id}`);
    const response = await http.patch<AppResponse<PCR>>(
      `patient-care-report/${id}`,
      data
    );
    return response;
  }
  async deletePCR(id: number) {
    // await this.handleAuthError(`/patient-care-report/${id}`);
    const response = await http.delete<AppResponse<PCR>>(
      `patient-care-report/${id}`
    );
    return response;
  }
  async postPCRTreatment(data: TreatmentsData, id: number) {
    // await this.handleAuthError(`/patient-care-report/treatment/${id}`);
    const response = await http.post<AppResponse<TreatmentsData>>(
      `patient-care-report/treatment/${id}`,
      data
    );
    return response;
  }
  async updatePCRTreatment(data: TreatmentsData, id: number) {
    // await this.handleAuthError(`/patient-care-report/treatment/${id}`);
    const response = await http.patch<AppResponse<TreatmentsData>>(
      `patient-care-report/treatment/${id}`,
      data
    );
    return response;
  }
  async deletePCRTreatment(id: number) {
    // await this.handleAuthError(`/patient-care-report/treatment/${id}`);
    const response = await http.delete<AppResponse<TreatmentsData>>(
      `patient-care-report/treatment/${id}`
    );
    return response;
  }
  async postPCRAllergy(data: AllergyData, id: number) {
    // await this.handleAuthError(`/patient-care-report/allergy/${id}`);
    const response = await http.post<AppResponse<AllergyData>>(
      `patient-care-report/allergy/${id}`,
      data
    );
    return response;
  }
  async deletePCRAllergy(id: number) {
    // await this.handleAuthError(`/patient-care-report/allergy/${id}`);
    const response = await http.delete<AppResponse<AllergyData>>(
      `patient-care-report/allergy/${id}`
    );
    return response;
  }
  async postPCRCondition(data: ConditionData, id: number) {
    // await this.handleAuthError(`/patient-care-report/medical-condition/${id}`);
    const response = await http.post<AppResponse<ConditionData>>(
      `patient-care-report/medical-condition/${id}`,
      data
    );
    return response;
  }
  async deletePCRCondition(id: number) {
    // await this.handleAuthError(`/patient-care-report/medical-condition/${id}`);
    const response = await http.delete<AppResponse<ConditionData>>(
      `patient-care-report/medical-condition/${id}`
    );
    return response;
  }
  async getRunReports() {
    // await this.handleAuthError("run-report/manage");
    const response = await http.get<AppResponse<RunReportItem[]>>(
      "run-report/manage"
    );
    return response;
  }
  async getRunReport(id: number) {
    // await this.handleAuthError(`/run-report/manage/${id}`);
    const response = await http.get<AppResponse<RunReportItem>>(
      `/run-report/manage/${id}`
    );
    return response;
  }
  async postRunReport(data: CombinedFormData) {
    // await this.handleAuthError("run-report");
    const response = await http.post<AppResponse<CombinedFormData>>(
      `run-report`,
      data
    );
    return response;
  }
  async updateRunReport(data: CombinedFormData, id: number) {
    // await this.handleAuthError(`/run-report/${id}`);
    const response = await http.patch<AppResponse<CombinedFormData>>(
      `run-report/${id}`,
      data
    );
    return response;
  }
  async deleteRunReport(id: number) {
    // await this.handleAuthError(`/run-report/manage/${id}`);
    const response = await http.delete<AppResponse<CombinedFormData>>(
      `run-report/manage/${id}`
    );
    return response;
  }
}

export default new ReportService();
