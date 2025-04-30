"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { RunReportItem } from "@/types/runReport.type";
import { ColumnDef } from "@tanstack/react-table";
import RunReportAction from "../action/RunReportAction";

export const RunReportColumns: ColumnDef<RunReportItem>[] = [
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
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const id = row.original.id;
      return <RunReportAction id={id} />;
    },
  },
];
