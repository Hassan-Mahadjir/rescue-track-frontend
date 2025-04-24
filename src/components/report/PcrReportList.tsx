import React from "react";
import { DataTable } from "./list/DataTable";
import { columns } from "./list/Columns";
import { Patient } from "@/types/patient.type";

interface PcrReportListProps {
  patients?: Patient[];
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
