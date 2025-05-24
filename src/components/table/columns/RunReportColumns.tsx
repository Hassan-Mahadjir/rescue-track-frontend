import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import RunReportAction from "../action/RunReportAction";
import { RunReportItem } from "@/types/runReport.type";

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
    id: "firstName",
    header: "First Name",
    accessorFn: (row) => row.patient?.firstName ?? "Unknown",
    cell: (info) => <span>{String(info.getValue())}</span>,
    enableSorting: true,
    enableColumnFilter: true,
    enableHiding: true,
  },
  {
    id: "lastName",
    header: "Last Name",
    accessorFn: (row) => row.patient?.lastName ?? "Unknown",
    cell: (info) => <span>{String(info.getValue())}</span>,
    enableSorting: true,
    enableColumnFilter: true,
    enableHiding: true,
  },
  {
    id: "fullName",
    header: "Full Name",
    accessorFn: (row) => {
      const first = row.patient?.firstName || "Unknown";
      const last = row.patient?.lastName;
      return first || last ? `${first ?? ""} ${last ?? ""}`.trim() : "Unknown";
    },
    cell: (info) => <span>{String(info.getValue())}</span>,
    enableSorting: true,
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableHiding: true,
  },
  {
    id: "gender",
    header: "Gender",
    accessorFn: (row) => row.patient?.gender ?? "Unknown",
    cell: (info) => <span>{String(info.getValue())}</span>,
    enableSorting: true,
    enableColumnFilter: true,
    enableHiding: true,
  },
  {
    id: "nationality",
    header: "Nationality",
    accessorFn: (row) => row.patient?.nationality ?? "Unknown",
    cell: (info) => <span>{String(info.getValue())}</span>,
    enableSorting: true,
    enableColumnFilter: true,
    enableHiding: true,
  },
  {
    id: "id",
    accessorKey: "id",
    header: "ID Number",
    cell: (info) => <span>{String(info.getValue())}</span>,
    enableSorting: true,
    enableColumnFilter: true,
    enableHiding: true,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <RunReportAction id={row.original.id} />,
  },
];
