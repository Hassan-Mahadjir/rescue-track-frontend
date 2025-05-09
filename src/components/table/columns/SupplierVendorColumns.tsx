"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { VendorData } from "@/components/inventory/SupplierVendorList";
import InventoryActions from "../action/InventoryActions"; // or RunReportAction if that's your actions menu
import OrderSentBadge from "@/components/badge/OrderSentBadge";
import SupplierVendorActions from "../action/SupplierVendorActions";

export const SupplierVendorColumns: ColumnDef<VendorData>[] = [
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
    accessorKey: "vendor",
    header: "Vendor",
    enableSorting: true,
    enableColumnFilter: true,
    enableHiding: true,
  },
  {
    accessorKey: "vendorId",
    header: "Vendor Id",
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
    accessorKey: "orderSent",
    header: "Order sent",
    cell: ({ row }) => <OrderSentBadge count={row.original.orderSent} />,
    enableSorting: true,
    enableColumnFilter: true,
    enableHiding: true,
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const { phone } = row.original;
      return <SupplierVendorActions number={phone} />;
    },
  },
];
