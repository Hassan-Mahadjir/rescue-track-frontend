"use client";
import { RunReportColumns } from "@/components/table/columns/RunReportColumns";
import { DataTable } from "@/components/table/DataTable";
import { useRunReports } from "@/services/api/reports";
import React from "react";

const RunReportPage = () => {
  const { runReportsData, isPending } = useRunReports();
  const data = runReportsData;
  console.log(data);

  return (
    <div className="mt-5 px-5 space-y-3">
      <div className="space-y-2 flex flex-col items-baseline">
        <h1 className="text-xl font-semibold mr-2">Run Reports</h1>
        <p className="text-sm text-muted-foreground">
          Records of emergency responses, click on the menu to show more
          information for the report
        </p>
      </div>
      <div className="rounded-lg border-0 bg-gradient-to-r from-gray-100 to-white p-6 mb-4">
        <DataTable
          columns={RunReportColumns}
          data={data ?? []}
          loading={isPending}
          toolbarType="runReport"
        />
      </div>
    </div>
  );
};

export default RunReportPage;
