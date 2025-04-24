import FilterDialog from "@/components/report/FilterDialog";
import { ColumnVisibilityDropdown } from "@/components/report/list/ColumnVisibilityDropdown";
import { TooltipButton } from "@/components/report/TooltipButton";
import { CardHeader } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { TooltipProvider } from "@/components/ui/tooltip";
import { exportSelectedRows } from "@/utils/exportUtils";
import { Table } from "@tanstack/react-table";
import { Plus, Search, SlidersHorizontal, Upload } from "lucide-react";
import Link from "next/link";
import React from "react";
interface DefaultToolbarProps<TData> {
  table: Table<TData>;
}

const DefultToolbar = <TData,>({ table }: DefaultToolbarProps<TData>) => {
  return (
    <CardHeader className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
      <TooltipProvider>
        {/* Search and Filter Section */}
        <div className="w-full flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          {/* Search Bar and Filter Button */}
          <div className="w-full md:w-auto flex items-center space-x-2">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by patient names or ID..."
                value={table.getState().globalFilter ?? ""}
                onChange={(e) => table.setGlobalFilter(e.target.value)}
                className="pl-10 w-full bg-white border"
              />
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <TooltipButton
                  tooltipText="Filter Data"
                  className="bg-white text-black hover:text-white hover:bg-main"
                >
                  <SlidersHorizontal />
                </TooltipButton>
              </DialogTrigger>
              <FilterDialog />
            </Dialog>
          </div>

          {/* Spacer to create space between sections */}
          <div className="flex-grow"></div>

          {/* Action Buttons (Add, Export, etc.) */}
          <div className="w-full md:w-auto flex justify-end items-center space-x-2">
            <Link href="pcr/create">
              <TooltipButton
                tooltipText="Add New Report"
                className="btn rounded-full bg-white text-black hover:text-white hover:bg-main"
              >
                <Plus />
              </TooltipButton>
            </Link>
            <ColumnVisibilityDropdown table={table} />
            <TooltipButton
              tooltipText="Export Data"
              className="btn rounded-full bg-white font-semibold text-black hover:text-white hover:bg-main"
              onClick={() => {
                const selectedRows = table.getSelectedRowModel().rows;
                exportSelectedRows(selectedRows, "patient_data.xlsx", "xlsx");
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

export default DefultToolbar;
