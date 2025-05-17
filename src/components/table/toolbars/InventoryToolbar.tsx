import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { SlidersHorizontal, Search, Upload } from "lucide-react";
import { CardHeader } from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { TooltipButton } from "@/components/report/TooltipButton";
import { exportSelectedRows } from "@/utils/exportUtils";
import CreateMedicationDialog from "@/components/inventory/create/CreateMedicationDialog";

interface PcrToolbarProps<TData> {
  table: Table<TData>;
}

const InventoryToolbar = <TData,>({ table }: PcrToolbarProps<TData>) => {
  return (
    <CardHeader>
      <TooltipProvider>
        <div className="flex flex-col items-center space-y-4 md:flex-row justify-between pt-4">
          <div className="flex flex-row items-center gap-4 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Input
                placeholder="Search by item name..."
                value={table.getState().globalFilter ?? ""}
                onChange={(event) => {
                  const value = event.target.value;
                  table.setGlobalFilter(value);
                }}
                className="w-full bg-white border pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            </div>
          </div>

          {/* Additional Content */}
          <div className="space-x-4">
            <CreateMedicationDialog />

            {/* Dropdown Menu for Column Visibility */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <TooltipButton
                  tooltipText="Toggle Columns"
                  className="btn rounded-full bg-white text-black hover:text-white hover:bg-main"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                </TooltipButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <TooltipButton
              tooltipText="Export Data"
              className="rounded-full hover:bg-main hover:text-white font-semibold"
              onClick={() => {
                const selectedRows = table.getSelectedRowModel().rows;
                exportSelectedRows(selectedRows, "inventory.xlsx", "xlsx");
              }}
            >
              <Upload />
              Export
            </TooltipButton>
          </div>
        </div>
      </TooltipProvider>
    </CardHeader>
  );
};

export default InventoryToolbar;
