"use client";

import React from "react";
import { useParams } from "next/navigation";
import RunReportSkeleton from "@/components/loading/RunReportSkeleton";
import MultiStepForm from "@/components/report/run report/form/MultiStepForm";
import { useRunReport } from "@/services/api/reports";
import { RunReportFormData } from "@/types/schema/reportFormSchema";
import { formatDateTime } from "@/utils/extra";

const EditRunReportPage = () => {
  const { id } = useParams();
  const reportId = Number(id);
  const { runReportData, isPending } = useRunReport(reportId);
  const runReport = runReportData;

  // 1) While loading, show skeleton
  if (isPending) {
    return <RunReportSkeleton />;
  }

  // 2) If no report at all, show an error
  if (!runReport) {
    return (
      <div className="p-4 text-red-500">
        No run-report found with ID {reportId}
      </div>
    );
  }

  // 3) Map into your form’s shape, allowing nullables
  const mappedValues: RunReportFormData = {
    // Step 1
    id: runReport.id,
    patientId: runReport.patient?.id,

    // Step 2
    caller: runReport.caller,
    callerPhone: runReport.callerPhone,
    relationship: runReport.relationship,
    category: runReport.category,
    priority: runReport.priority as "low" | "medium" | "high",
    severtiyCode: runReport.severtiyCode,
    transportStatus: runReport.transportStatus as
      | "transported"
      | "refused"
      | "cancelled"
      | "complete"
      | "in progress"
      | "unable to response",
    responseTime: formatDateTime(runReport.responseTime),
    arrivalTimeAtScense: formatDateTime(runReport.arrivalTimeAtScense),
    arrivalTimeAtPatient: formatDateTime(runReport.arrivalTimeAtPatient),
    departureTime: formatDateTime(runReport.departureTime),
    notes: runReport.notes ?? "",

    // Step 3
    callReceivedTime: runReport.callReceivedTime
      ? formatDateTime(runReport.callReceivedTime)
      : null,
    notificationTime: runReport.notificationTime
      ? formatDateTime(runReport.notificationTime)
      : null,
    fromLocation: runReport.fromLocation,
    toLocation: runReport.toLocation,
    locationNote: runReport.locationNote,
    ambulanceNumber: runReport.ambulanceNumber,
    ambulanceDriver: runReport.ambulanceDriver,
    arrivalTimeAtDestination: runReport.arrivalTimeAtDestination
      ? formatDateTime(runReport.arrivalTimeAtDestination)
      : null,
    departureTimeFromDestination: runReport.departureTimeFromDestination
      ? formatDateTime(runReport.departureTimeFromDestination)
      : null,
  };

  return (
    <div className="p-4">
      <MultiStepForm defaultValues={mappedValues} isEdit />
    </div>
  );
};

export default EditRunReportPage;
