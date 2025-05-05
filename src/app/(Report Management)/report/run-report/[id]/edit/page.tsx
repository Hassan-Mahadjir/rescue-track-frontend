"use client";
import RunReportSkeleton from "@/components/loading/RunReportSkeleton";
import MultiStepForm from "@/components/report/run report/form/MultiStepForm";
import { useRunReport } from "@/services/api/reports";
import { CombinedFormData } from "@/types/reportFormSchema";
import { formatDateTime } from "@/utils/extra";
import { useParams } from "next/navigation";
import React from "react";

const EditRunReportPage = () => {
  const { id } = useParams();
  const { runReportData, isPending } = useRunReport(Number(id));
  const runReport = runReportData;

  if (isPending || !runReport) {
    return <RunReportSkeleton />;
  }

  const mappedValues: CombinedFormData = {
    id: runReport.id,
    patientId: runReport.patient.id,
    caller: runReport.caller,
    callerPhone: runReport.callerPhone,
    relationship: runReport.relationship,
    category: runReport.category,
    priority: runReport.priority as "low" | "medium" | "high",
    transportStatus: runReport.transportStatus as
      | "transported"
      | "not transported"
      | "pending",
    mileage: runReport.mileage,
    responseTime: formatDateTime(runReport.responseTime),
    arrivalTimeAtScense: formatDateTime(runReport.arrivalTimeAtScense),
    arrivalTimeAtPatient: formatDateTime(runReport.arrivalTimeAtPatient),
    departureTime: formatDateTime(runReport.departureTime),
    notes: runReport.notes ?? "",
  };

  return (
    <div>
      <MultiStepForm defaultValues={mappedValues} isEdit />
    </div>
  );
};

export default EditRunReportPage;
