"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { CardHeader } from "@/components/ui/card";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Plus,
  Search,
  SlidersHorizontal,
  Upload,
} from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TooltipButton } from "../TooltipButton";
import { TooltipProvider } from "@/components/ui/tooltip";
import { exportSelectedRows } from "@/utils/exportUtils";
import FilterDialog from "../FilterDialog";
import { ColumnVisibilityDropdown } from "./ColumnVisibilityDropdown";
import { Button } from "@/components/ui/button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
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
                  onChange={(event) => {
                    const value = event.target.value;
                    table.setGlobalFilter(value);
                  }}
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
              <TooltipButton
                tooltipText="Add New Report"
                className="btn rounded-full bg-white text-black hover:text-white hover:bg-main"
              >
                <Plus />
              </TooltipButton>
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

      {/* Table Section */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead className="text-black" key={header.id}>
                    <div
                      onClick={header.column.getToggleSortingHandler()}
                      style={{ cursor: "pointer" }}
                      className="flex items-center hover:text-gray-600"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      <span className="w-2"></span>
                      {header.column.getCanSort() && (
                        <span className="flex items-center text-gray-400">
                          {header.column.getIsSorted() === "asc" ? (
                            <ArrowUp className="h-4 w-4" />
                          ) : header.column.getIsSorted() === "desc" ? (
                            <ArrowDown className="h-4 w-4" />
                          ) : (
                            <ArrowUpDown className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-4 space-y-4 md:space-y-0">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="border rounded-md p-1"
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
