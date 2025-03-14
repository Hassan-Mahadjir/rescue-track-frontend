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
  {
    id: 3,
    fullName: "Alice Johnson",
    gender: "Female",
    country: "UK",
    idNumber: "789012",
    incidentDate: "2023-08-20",
    status: "Progress",
  },
  {
    id: 4,
    fullName: "Bob Brown",
    gender: "Male",
    country: "Australia",
    idNumber: "345678",
    incidentDate: "2023-07-10",
    status: "Open",
  },
  {
    id: 5,
    fullName: "Charlie Davis",
    gender: "Male",
    country: "Germany",
    idNumber: "901234",
    incidentDate: "2023-06-05",
    status: "Closed",
  },
  {
    id: 6,
    fullName: "Diana Evans",
    gender: "Female",
    country: "France",
    idNumber: "567890",
    incidentDate: "2023-05-12",
    status: "Progress",
  },
  {
    id: 7,
    fullName: "Ethan Green",
    gender: "Male",
    country: "USA",
    idNumber: "234567",
    incidentDate: "2023-04-18",
    status: "Open",
  },
  {
    id: 8,
    fullName: "Fiona Harris",
    gender: "Female",
    country: "Canada",
    idNumber: "890123",
    incidentDate: "2023-03-22",
    status: "Closed",
  },
  {
    id: 9,
    fullName: "George Clark",
    gender: "Male",
    country: "UK",
    idNumber: "456789",
    incidentDate: "2023-02-14",
    status: "Progress",
  },
  {
    id: 10,
    fullName: "Hannah Lewis",
    gender: "Female",
    country: "Australia",
    idNumber: "012345",
    incidentDate: "2023-01-30",
    status: "Open",
  },
  {
    id: 11,
    fullName: "Ian Walker",
    gender: "Male",
    country: "Germany",
    idNumber: "678901",
    incidentDate: "2022-12-25",
    status: "Closed",
  },
  {
    id: 12,
    fullName: "Jessica Hall",
    gender: "Female",
    country: "France",
    idNumber: "123890",
    incidentDate: "2022-11-11",
    status: "Progress",
  },
];

const PcrReportList = () => {
  return (
    <div className="rounded-lg border-0 bg-gradient-to-r from-gray-100 to-white p-6">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default PcrReportList;
