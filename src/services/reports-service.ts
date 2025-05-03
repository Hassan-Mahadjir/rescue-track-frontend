import { AppResponse } from "@/types/common.type";
import http from "./api/http";
import BaseService from "./base-service";
import { PCR, RunReportItem } from "@/types/report.type";
import {
  AllergyData,
  CombinedFormData,
  ConditionData,
  PcrReportFormValues,
  TreatmentsData,
} from "@/types/reportFormSchema";

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
  async postPCR(data: PcrReportFormValues) {
    const response = await http.post<AppResponse<PCR>>(
      `patient-care-report`,
      data
    );
    return response;
  }
  async updatePCR(data: PcrReportFormValues, id: number) {
    const response = await http.patch<AppResponse<PCR>>(
      `patient-care-report/${id}`,
      data
    );
    return response;
  }
  async deletePCR(id: number) {
    const response = await http.delete<AppResponse<PCR>>(
      `patient-care-report/${id}`
    );
    return response;
  }
  async postPCRTreatment(data: TreatmentsData, id: number) {
    const response = await http.post<AppResponse<TreatmentsData>>(
      `patient-care-report/treatment/${id}`,
      data
    );
    return response;
  }
  async updatePCRTreatment(data: TreatmentsData, id: number) {
    const response = await http.patch<AppResponse<TreatmentsData>>(
      `patient-care-report/treatment/${id}`,
      data
    );
    return response;
  }
  async deletePCRTreatment(id: number) {
    const response = await http.delete<AppResponse<TreatmentsData>>(
      `patient-care-report/treatment/${id}`
    );
    return response;
  }
  async postPCRAllergy(data: AllergyData, id: number) {
    const response = await http.post<AppResponse<AllergyData>>(
      `patient-care-report/allergy/${id}`,
      data
    );
    return response;
  }
  async deletePCRAllergy(id: number) {
    const response = await http.delete<AppResponse<AllergyData>>(
      `patient-care-report/allergy/${id}`
    );
    return response;
  }
  async postPCRCondition(data: ConditionData, id: number) {
    const response = await http.post<AppResponse<ConditionData>>(
      `patient-care-report/medical-condition/${id}`,
      data
    );
    return response;
  }
  async deletePCRCondition(id: number) {
    const response = await http.delete<AppResponse<ConditionData>>(
      `patient-care-report/medical-condition/${id}`
    );
    return response;
  }
  async getRunReports() {
    const response = await http.get<AppResponse<RunReportItem[]>>(
      "run-report/manage"
    );
    return response;
  }
  async getRunReport(id: number) {
    const response = await http.get<AppResponse<RunReportItem>>(
      `/run-report/manage/${id}`
    );
    return response;
  }
  async postRunReport(data: CombinedFormData) {
    const response = await http.post<AppResponse<CombinedFormData>>(
      `run-report`,
      data
    );
    return response;
  }
  async updateRunReport(data: CombinedFormData, id: number) {
    const response = await http.patch<AppResponse<CombinedFormData>>(
      `run-report/${id}`,
      data
    );
    return response;
  }
  async deleteRunReport(id: number) {
    const response = await http.delete<AppResponse<CombinedFormData>>(
      `run-report/manage/${id}`
    );
    return response;
  }
}

export default new ReportService();
