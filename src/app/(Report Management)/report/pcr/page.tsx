"use client";
import PcrReportList from "@/components/report/PcrReportList";
import ReportSummaryCard from "@/components/report/ReportSummaryCard";
import usePatients from "@/services/api/patient";
import { Siren, Users, FileText } from "lucide-react";
import React from "react";

const PcrPage = () => {
  const { patientData, isPending } = usePatients();
  const data = patientData?.data.data;

  const totalReports = data?.reduce((count, patient) => {
    return (
      count +
      (Array.isArray(patient.updateHistory) ? patient.updateHistory.length : 0)
    );
  }, 0);

  return (
    <div className="mt-5 px-5 space-y-3">
      <div className="flex flex-col items-center justify-between sm:flex-row">
        <div className="space-y-2 flex flex-col items-baseline">
          <h1 className="text-xl font-semibold mr-2">
            Patient Care Reports &#40;PCR&#41;
          </h1>
          <p className="text-sm text-muted-foreground">
            Ensure all patient care details are accurately captured and
            reported.
          </p>
        </div>
        {/*Report Summary */}
        <div className="flex flex-row space-x-6 mr-5">
          <ReportSummaryCard icon={Siren} number={5} title="Urgent Cases" />
          <ReportSummaryCard
            icon={Users}
            number={data?.length ?? 0}
            title="Total Patients"
          />
          <ReportSummaryCard
            icon={FileText}
            number={totalReports ?? 0}
            title="Total Reports"
          />
        </div>
      </div>
      <div>
        <PcrReportList patients={data} />
      </div>
    </div>
  );
};

export default PcrPage;
