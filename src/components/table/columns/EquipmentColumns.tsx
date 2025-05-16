"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { calculateStockLevel } from "@/utils/inventoryUtils";
import StockLevelBadge from "@/components/badge/StockLevelBadge";
import { formatDateTime } from "@/utils/extra";
import EquipmentActions from "../action/EquipmentActions";

export const InventoryEquipmentColumns: ColumnDef<Equipment>[] = [
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
    accessorKey: "serialNumber",
    header: "Serial Number",
    cell: ({ row }) => <div>{row.getValue("serialNumber")}</div>,
  },
  {
    accessorKey: "modelNumber",
    header: "Model Number",
    cell: ({ row }) => <div>{row.getValue("modelNumber")}</div>,
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
    accessorKey: "purchaseDate",
    header: "Purchase Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("purchaseDate"));
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
      const equipment = row.original;
      return <EquipmentActions equipment={equipment} />;
    },
  },
];
