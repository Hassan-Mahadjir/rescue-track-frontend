"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { PCRs } from "@/types/patients.type";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown, Ellipsis } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<PCRs>[] = [
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
    enableSorting: true,
    enableColumnFilter: true,
    enableHiding: true,
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
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
    enableSorting: true,
    enableColumnFilter: true,
    enableHiding: true,
  },
  {
    accessorKey: "nationality",
    header: "Nationality",
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
    cell: ({ row }) => {
      const status = row.getValue("status");
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
      return (
        <Link
          href={`./pcr/${id}`}
          onClick={() => {
            console.log("Action clicked for:", row.original);
          }}
          className="rounded flex justify-center items-center hover:text-gray-400"
        >
          <Ellipsis />
        </Link>
      );
    },
  },
];
