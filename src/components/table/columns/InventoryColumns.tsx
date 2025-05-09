"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { calculateStockLevel } from "@/utils/inventoryUtils";
import format from "date-fns/format";
import { InventoryManagement } from "@/components/inventory/InventoryManagementList";
import StockLevelBadge from "@/components/badge/StockLevelBadge";
import InventoryActions from "../action/InventoryActions";

export const InventoryColumns: ColumnDef<InventoryManagement>[] = [
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
    accessorKey: "itemName",
    header: "Item Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("itemName")}</div>
    ),
    enableSorting: true,
    enableColumnFilter: true,
    enableHiding: true,
  },
  {
    accessorKey: "barcode",
    header: "Barcode",
    cell: ({ row }) => <div>{row.getValue("barcode")}</div>,
    enableSorting: true,
    enableColumnFilter: true,
    enableHiding: true,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("category")}</div>
    ),
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => <div>{row.getValue("quantity")}</div>,
  },
  {
    accessorKey: "expirationDate",
    header: "Expiration Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("expirationDate"));
      const formattedDate = format(date, "dd MMM yyyy");
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "stock",
    header: () => <div className="text-center">Stock Level</div>, // Center the header text
    cell: ({ row }) => {
      const quantity = row.getValue("quantity") as number;
      const stock = calculateStockLevel(quantity); // Calculate stock dynamically
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
      const inventory = row.original;
      return <InventoryActions barcode={inventory.barcode} />;
    },
  },
];
