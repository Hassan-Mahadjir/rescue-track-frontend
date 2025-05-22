"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { calculateStockLevel } from "@/utils/inventoryUtils";
import MedicationActions from "../action/MedicationActions";
import StockLevelBadge from "@/components/badge/StockLevelBadge";
import { formatDateTime } from "@/utils/extra";
import { Medication } from "@/types/medication-equipment";

export const InventoryMedicationColumns: ColumnDef<Medication>[] = [
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
    header: "Item Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "batchNumber",
    header: "Batch Number",
    cell: ({ row }) => <div>{row.getValue("batchNumber")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("category")}</div>
    ),
  },
  {
    accessorKey: "stockQuantity",
    header: "Quantity",
    cell: ({ row }) => <div>{row.getValue("stockQuantity")}</div>,
  },
  {
    accessorKey: "expirationDate",
    header: "Expiration Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("expirationDate"));
      const formatted = formatDateTime(date);
      return <div>{formatted}</div>;
    },
  },
  {
    id: "stock",
    header: () => <div className="text-center">Stock Level</div>,
    cell: ({ row }) => {
      const quantity = row.getValue("stockQuantity") as number;
      const stock = calculateStockLevel(quantity);
      return <StockLevelBadge level={stock} />;
    },
    enableSorting: false,
    enableColumnFilter: true,
    enableHiding: true,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const medication = row.original;
      return <MedicationActions medication={medication} />;
    },
  },
];
