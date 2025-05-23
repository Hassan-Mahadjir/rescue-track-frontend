import { AppResponse } from "@/types/common.type";
import http from "./api/http";
import BaseService from "./base-service";
import {
  Circumstance,
  InjuryMechanism,
  PCR,
  Pupil,
  ReportStat,
  Resp,
  Skin,
  Therapy,
  Trauma,
  VitalSign,
} from "@/types/report.type";
import { RunReportItem } from "@/types/runReport.type";
import {
  CircumstanceData,
  InjuryMechanismdata,
  PupilsData,
  RespData,
  SkinData,
  TherapyData,
  TrumaData,
  VitalSignData,
} from "@/types/schema/reportFormSchema";
import {
  AllergyData,
  ConditionData,
  PcrFormData,
  RunReportFormData,
  TreatmentsData,
} from "@/types/schema/reportFormSchema";

class ReportService extends BaseService {
  async getPCRsAdmin() {
    const response = await http.get<AppResponse<PCR[]>>(
      "/patient-care-report/manage"
    );
    return response;
  }
  async getPCRAdmin(id: number) {
    const response = await http.get<AppResponse<PCR>>(
      `patient-care-report/manage/${id}`
    );
    return response;
  }
  async postPCR(data: RunReportFormData) {
    const response = await http.post<AppResponse<PCR>>(
      `patient-care-report`,
      data
    );
    return response;
  }
  async updatePCR(data: PcrFormData, id: number) {
    const response = await http.patch<AppResponse<PCR>>(
      `patient-care-report/${id}`,
      data
    );
    return response;
  }
  async deletePCRAdmin(id: number) {
    const response = await http.delete<AppResponse<PCR>>(
      `patient-care-report/manage/${id}`
    );
    return response;
  }

  // PCR Staff/Employee
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

  // Run Report Admin
  async getRunReportsAdmin() {
    const response = await http.get<AppResponse<RunReportItem[]>>(
      "run-report/manage"
    );
    return response;
  }
  async getRunReportAdmin(id: number) {
    const response = await http.get<AppResponse<RunReportItem>>(
      `/run-report/manage/${id}`
    );
    return response;
  }
  async postRunReport(data: RunReportFormData) {
    const response = await http.post<AppResponse<RunReportFormData>>(
      `run-report`,
      data
    );
    return response;
  }
  async updateRunReport(data: RunReportFormData, id: number) {
    const response = await http.patch<AppResponse<RunReportFormData>>(
      `run-report/${id}`,
      data
    );
    return response;
  }
  async deleteRunReportAdmin(id: number) {
    const response = await http.delete<AppResponse<RunReportFormData>>(
      `run-report/manage/${id}`
    );
    return response;
  }

  // PCR Staff/Employee
  async getPCRs() {
    const response = await http.get<AppResponse<PCR[]>>("patient-care-report");
    return response;
  }
  async getPCR(id: number) {
    const response = await http.get<AppResponse<PCR>>(
      `patient-care-report/${id}`
    );
    return response;
  }

  // Run Report Staff/Employee
  async getRunReports() {
    const response = await http.get<AppResponse<RunReportItem[]>>("run-report");
    return response;
  }
  async getRunReport(id: number) {
    const response = await http.get<AppResponse<RunReportItem>>(
      `/run-report/${id}`
    );
    return response;
  }

  async getUniqueRecentRunReports() {
    const response = await http.get<AppResponse<RunReportItem[]>>(
      "/run-report/unique-recent"
    );
    return response;
  }

  async getStats() {
    const response = await http.get<AppResponse<ReportStat[]>>(
      "/patient-care-report/manage/stats"
    );
    return response;
  }
  // Tharapy endpoint
  async postPCRTherapy(data: TherapyData, id: number) {
    const response = await http.post<AppResponse<Therapy>>(
      `patient-care-report/therapy/${id}`,
      data
    );
    return response;
  }
  async updatePCRTherapy(data: TherapyData, id: number) {
    const response = await http.patch<AppResponse<Therapy>>(
      `patient-care-report/therapy/${id}`,
      data
    );
    return response;
  }
  async deletePCRTherapy(id: number) {
    const response = await http.delete<AppResponse<null>>(
      `patient-care-report/therapy/${id}`
    );
    return response;
  }
  // Skin endpoint
  async postPCRSkin(data: SkinData, id: number) {
    const response = await http.post<AppResponse<Skin>>(
      `patient-care-report/skin/${id}`,
      data
    );
    return response;
  }
  async updatePCRSkin(data: SkinData, id: number) {
    const response = await http.patch<AppResponse<Skin>>(
      `patient-care-report/skin/${id}`,
      data
    );
    return response;
  }
  async deletePCRSkin(id: number) {
    const response = await http.delete<AppResponse<null>>(
      `patient-care-report/skin/${id}`
    );
    return response;
  }

  // Pupil endpoint
  async postPCRPupil(data: PupilsData, id: number) {
    const response = await http.post<AppResponse<Pupil>>(
      `patient-care-report/pupil/${id}`,
      data
    );
    return response;
  }

  async updatePCRPupil(data: PupilsData, id: number) {
    const response = await http.patch<AppResponse<Pupil>>(
      `patient-care-report/pupil/${id}`,
      data
    );
    return response;
  }

  async deletePCRPupil(id: number) {
    const response = await http.delete<AppResponse<null>>(
      `patient-care-report/pupil/${id}`
    );
    return response;
  }

  // endpoint for RESP
  async postPCRResp(data: RespData, id: number) {
    const response = await http.post<AppResponse<Resp>>(
      `patient-care-report/resp/${id}`,
      data
    );
    return response;
  }
  async updatePCRResp(data: RespData, id: number) {
    const response = await http.patch<AppResponse<Resp>>(
      `patient-care-report/resp/${id}`,
      data
    );
    return response;
  }
  async deletePCRResp(id: number) {
    const response = await http.delete<AppResponse<null>>(
      `patient-care-report/resp/${id}`
    );
    return response;
  }

  // Endpoint for Vital sign
  async postPCRVitalSign(data: VitalSignData, id: number) {
    const response = await http.post<AppResponse<VitalSign>>(
      `patient-care-report/vital-signs/${id}`,
      data
    );
    return response;
  }
  async updatePCRVitalSign(data: VitalSignData, id: number) {
    const response = await http.patch<AppResponse<VitalSign>>(
      `patient-care-report/vital-signs/${id}`,
      data
    );
    return response;
  }
  async deletePCRVitalSign(id: number) {
    const response = await http.delete<AppResponse<null>>(
      `patient-care-report/vital-signs/${id}`
    );
    return response;
  }
  // Endpoint for Trauma
  async postPCRTrauma(data: TrumaData, id: number) {
    const response = await http.post<AppResponse<Trauma>>(
      `patient-care-report/truma/${id}`,
      data
    );
    return response;
  }
  async updatePCRTrauma(data: TrumaData, id: number) {
    const response = await http.patch<AppResponse<Trauma>>(
      `patient-care-report/truma/${id}`,
      data
    );
    return response;
  }
  async deletePCRTrauma(id: number) {
    const response = await http.delete<AppResponse<null>>(
      `patient-care-report/truma/${id}`
    );
    return response;
  }

  // Endpoind for Injurey Mechansim Enpoint
  async postPCRInjuryMechanism(data: InjuryMechanismdata, id: number) {
    const response = await http.post<AppResponse<InjuryMechanism>>(
      `patient-care-report/injury-mechanism/${id}`,
      data
    );
    return response;
  }
  async updatePCRInjuryMechanism(data: InjuryMechanismdata, id: number) {
    const response = await http.patch<AppResponse<InjuryMechanism>>(
      `patient-care-report/injury-mechanism/${id}`,
      data
    );
    return response;
  }
  async deletePCRInjuryMechanism(id: number) {
    const response = await http.delete<AppResponse<null>>(
      `patient-care-report/injury-mechanism/${id}`
    );
    return response;
  }

  // Endpoind for Special circumstances
  async postPCRSpecialCircumstance(data: CircumstanceData, id: number) {
    const response = await http.post<AppResponse<Circumstance>>(
      `patient-care-report/special-circumstance/${id}`,
      data
    );
    return response;
  }
  async updatePCRSpecialCircumstance(data: CircumstanceData, id: number) {
    const response = await http.patch<AppResponse<Circumstance>>(
      `patient-care-report/special-circumstance/${id}`,
      data
    );
    return response;
  }
  async deletePCRSpecialCircumstance(id: number) {
    const response = await http.delete<AppResponse<null>>(
      `patient-care-report/special-circumstance/${id}`
    );
    return response;
  }
}
const reportService = new ReportService();
export default reportService;
