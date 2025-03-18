"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown, Ellipsis } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<Person>[] = [
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
    accessorKey: "fullName",
    header: "Full Name",
    enableSorting: true,
    enableColumnFilter: true,
    enableHiding: true,
    cell: ({ row }) => {
      const id = row.original.id;
      const fullName = row.getValue("fullName");

      return <Link href={`/report/pcr/${id}`}>{fullName as string}</Link>;
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
    enableSorting: true,
    enableColumnFilter: true,
    enableHiding: true,
  },
  {
    accessorKey: "country",
    header: "Country",
    enableSorting: true,
    enableColumnFilter: true,
    enableHiding: true,
  },
  {
    accessorKey: "idNumber",
    header: "ID Number",
    enableSorting: true,
    enableColumnFilter: true,
    enableHiding: true,
  },
  {
    accessorKey: "incidentDate",
    header: "Incident Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("incidentDate"));
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
          style={{ minWidth: "80px", textAlign: "center" }} // Ensures alignment
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
          href={`report/pcr/${id}`}
          onClick={() => {
            console.log("Action clicked for:", row.original);
          }}
          className="px-2 py-1 rounded hover:text-gray-400"
        >
          <Ellipsis />
        </Link>
      );
    },
  },
];
