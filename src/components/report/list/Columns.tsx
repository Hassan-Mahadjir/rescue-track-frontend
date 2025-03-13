"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Person = {
  id: number;
  fullName: string;
  gender: string;
  country: string;
  idNumber: string;
  incidentDate: string;
  status: "Open" | "Closed" | "Progress";
};

export const columns: ColumnDef<Person>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "fullName",
    header: "Full Name",
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "gender",
    header: "Gender",
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "country",
    header: "Country",
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "idNumber",
    header: "ID Number",
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "incidentDate",
    header: "Incident Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("incidentDate"));
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return <div>{formattedDate}</div>;
    },
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <div
          className={`px-2 py-1 rounded text-center ${
            status === "Open"
              ? "bg-green-100 text-green-800"
              : status === "Closed"
              ? "bg-red-100 text-red-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {status as string}
        </div>
      );
    },
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <button
          onClick={() => {
            console.log("Action clicked for:", row.original);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Edit
        </button>
      );
    },
  },
];
