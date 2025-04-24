import React from "react";
import { columns } from "./list/Columns";
import { DataTable } from "../table/DataTable";
import { PCRs } from "@/types/patients.type";

interface PcrReportListProps {
  patients?: PCRs[];
  loading?: boolean;
}

const PcrReportList = ({ patients, loading }: PcrReportListProps) => {
  return (
    <div className="rounded-lg border-0 bg-gradient-to-r from-gray-100 to-white p-6 mb-4">
      <DataTable columns={columns} data={patients ?? []} loading={loading} />
    </div>
  );
};

export default PcrReportList;
