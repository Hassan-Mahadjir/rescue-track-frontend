import React from "react";
import { DataTable } from "../table/DataTable";
import { PCR } from "@/types/patients.type";
import { PcrColumns } from "../table/columns/PcrColumns";

interface PcrReportListProps {
  patients?: PCR[];
  loading?: boolean;
}

const PcrReportList = ({ patients, loading }: PcrReportListProps) => {
  return (
    <div className="rounded-lg border-0 bg-gradient-to-r from-gray-100 to-white p-6 mb-4">
      <DataTable columns={PcrColumns} data={patients ?? []} loading={loading} />
    </div>
  );
};

export default PcrReportList;
