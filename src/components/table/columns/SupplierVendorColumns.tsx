"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import SupplierVendorActions from "../action/SupplierVendorActions";
import StatusBadge from "@/components/badge/StatusBadge";
import { WebsiteLinkButton } from "../WebsiteLinkButton";
import { Supplier } from "@/types/supplier";

export const SupplierVendorColumns: ColumnDef<Supplier>[] = [
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
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    enableSorting: true,
    enableColumnFilter: true,
    enableHiding: true,
  },
  {
    accessorKey: "email",
    header: "Email",
    enableSorting: true,
    enableColumnFilter: true,
    enableHiding: true,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    enableSorting: true,
    enableColumnFilter: true,
    enableHiding: true,
  },
  {
    accessorKey: "address",
    header: "Address",
    enableSorting: true,
    enableColumnFilter: true,
    enableHiding: true,
  },
  {
    accessorKey: "Specialist",
    header: "Specialist",
    enableSorting: true,
    enableColumnFilter: true,
    enableHiding: true,
  },
  {
    accessorKey: "contactPerson",
    header: "Contact Person",
    enableSorting: true,
    enableColumnFilter: true,
    enableHiding: true,
  },
  {
    accessorKey: "website",
    header: "Website",
    cell: ({ row }) => <WebsiteLinkButton url={row.original.website} />,
    enableSorting: true,
    enableColumnFilter: true,
    enableHiding: true,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row: { original: data } }) => {
      const status = data.status;
      return <StatusBadge status={status} />;
    },
    enableSorting: true,
    enableColumnFilter: true,
    enableHiding: true,
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const supplier = row.original;
      return <SupplierVendorActions supplier={supplier} />;
    },
  },
];
