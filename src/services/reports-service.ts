import { AppResponse } from "@/types/common.type";
import http from "./api/http";
import BaseService from "./base-service";
import { PCR, RunReportItem } from "@/types/report.type";
import {
  CombinedFormData,
  PcrReportFormValues,
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
