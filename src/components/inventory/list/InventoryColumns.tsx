"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { calculateStockLevel } from "@/utils/exportUtils";

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
      const formattedDate = date.toLocaleDateString();
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "stock",
    header: () => <div className="text-center">Stock Level</div>, // Center the header text
    cell: ({ row }) => {
      const quantity = row.getValue("quantity") as number;
      const stock = calculateStockLevel(quantity); // Calculate stock dynamically
      return (
        <div
          className={`rounded-lg text-sm p-1 flex justify-center items-center ${
            stock === "Full"
              ? "bg-green-100 text-green-800"
              : stock === "Empty"
              ? "bg-red-100 text-red-800"
              : stock === "Re-order"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {stock}
        </div>
      );
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

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(inventory.barcode)}
            >
              Copy Barcode
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Edit inventory</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
