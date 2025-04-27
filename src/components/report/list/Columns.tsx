"use client";

import PcrActions from "@/components/table/action/PcrActions";
import { Checkbox } from "@/components/ui/checkbox";
import { PCR } from "@/types/patients.type";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown, Ellipsis } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<PCR>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "firstName",
    header: "First Name",
    accessorFn: (row) => row.patient.firstName,
    cell: ({ row: { original: patient } }) => (
      <span>{patient.patient.firstName}</span>
    ),
    enableSorting: true,
    enableColumnFilter: true,
    enableHiding: true,
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
    accessorFn: (row) => `${row.patient.lastName}`,
    enableSorting: true,
    enableColumnFilter: true,
    enableHiding: true,
  },
  {
    id: "fullName",
    header: "Full Name",
    accessorFn: (row) =>
      `${row.patient.firstName ?? ""} ${row.patient.lastName ?? ""}`.trim(),
    enableSorting: true,
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableHiding: true,
  },
  {
    accessorKey: "gender",
    header: "Gender",
    accessorFn: (row) => `${row.patient.gender}`,
    enableSorting: true,
    enableColumnFilter: true,
    enableHiding: true,
  },
  {
    accessorKey: "nationality",
    header: "Nationality",
    accessorFn: (row) => `${row.patient.nationality}`,
    enableSorting: true,
    enableColumnFilter: true,
    enableHiding: true,
  },
  {
    id: "id",
    accessorKey: "id",
    header: "ID Number",
    enableSorting: true,
    enableColumnFilter: true,
    enableHiding: true,
  },
  {
    accessorKey: "createdAt",
    header: "Incident Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const incidentDate = date.toLocaleDateString();
      return <div>{incidentDate}</div>;
    },
    enableSorting: true,
    enableColumnFilter: true,
    enableHiding: true,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <div className="flex justify-center items-center w-full">
        Status
        <span className="ml-1 flex items-center text-gray-400">
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="h-4 w-4" />
          ) : (
            <ArrowUpDown className="h-4 w-4" />
          )}
        </span>
      </div>
    ),
    cell: ({ row: { original: data } }) => {
      const status = data.patient.status;
      return (
        <div
          className={`rounded-lg text-sm ${
            status === "Open"
              ? "bg-green-100 text-green-800"
              : status === "Closed"
              ? "bg-red-100 text-red-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
          style={{ minWidth: "80px", textAlign: "center" }}
        >
          {status as string}
        </div>
      );
    },
    enableSorting: true,
    enableColumnFilter: true,
    enableHiding: true,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const id = row.original.id;
      return <PcrActions id={id} />;
    },
  },
];
