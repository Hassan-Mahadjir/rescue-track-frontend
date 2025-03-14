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
  EllipsisVertical,
  Plus,
  Search,
  SlidersHorizontal,
  Upload,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TooltipButton } from "../TooltipButton";
import { TooltipProvider } from "@/components/ui/tooltip";
import { exportSelectedRows } from "@/utils/exportUtils";
import FilterDialog from "../FilterDialog";
import { ColumnVisibilityDropdown } from "./ColumnVisibilityDropdown";

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

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div>
      <CardHeader className="flex flex-row justify-between items-center">
        <TooltipProvider>
          <div className="relative w-fit flex items-center space-x-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search by patient names or ID..."
              value={table.getState().globalFilter ?? ""}
              onChange={(event) => {
                const value = event.target.value;
                table.setGlobalFilter(value);
              }}
              className="pl-10 w-96 bg-white border"
            />
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
          <div className="flex flex-row space-x-2">
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
                const selectedRows = table.getSelectedRowModel().rows; // This is Row<Person>[]
                exportSelectedRows(selectedRows, "patient_data.xlsx", "xlsx"); // Pass Row<Person>[] directly
              }}
            >
              <Upload />
              Export
            </TooltipButton>
          </div>
        </TooltipProvider>
      </CardHeader>

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
                    {/* Header Name */}
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}

                    {/* Add Space */}
                    <span className="w-2"></span>

                    {/* Sorting Icon */}
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
