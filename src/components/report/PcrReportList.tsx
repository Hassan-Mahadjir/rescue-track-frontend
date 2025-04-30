import React from "react";
import { DataTable } from "../table/DataTable";
import { PcrColumns } from "../table/columns/PcrColumns";
import { PCR } from "@/types/report.type";

interface PcrReportListProps {
  pcr?: PCR[];
  loading?: boolean;
}

const PcrReportList = ({ pcr, loading }: PcrReportListProps) => {
  return (
    <div className="rounded-lg border-0 bg-gradient-to-r from-gray-100 to-white p-6 mb-4">
      <DataTable
        columns={PcrColumns}
        data={pcr ?? []}
        loading={loading}
        toolbarType="PCR"
        initialColumnVisibility={{
          firstName: false,
          lastName: false,
        }}
      />
    </div>
  );
};

export default PcrReportList;
