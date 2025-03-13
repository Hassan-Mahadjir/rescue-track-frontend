import React from "react";
import { CardContent, CardHeader } from "../ui/card";
import { DataTable } from "./list/DataTable";
import { columns } from "./list/Columns";

const data: Person[] = [
  {
    id: 1,
    fullName: "John Doe",
    gender: "Male",
    country: "USA",
    idNumber: "123456",
    incidentDate: "2023-10-01",
    status: "Open",
  },
  {
    id: 2,
    fullName: "Jane Smith",
    gender: "Female",
    country: "Canada",
    idNumber: "654321",
    incidentDate: "2023-09-15",
    status: "Closed",
  },
];

const PcrReportList = () => {
  return (
    <div className="bg-muted rounded-lg border-0">
      <CardHeader>hello</CardHeader>
      <CardContent>
        <DataTable columns={columns} data={data} />
      </CardContent>
    </div>
  );
};

export default PcrReportList;
