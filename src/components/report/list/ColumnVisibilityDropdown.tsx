// components/ColumnVisibilityDropdown.tsx
"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import { Table } from "@tanstack/react-table";

interface ColumnVisibilityDropdownProps<TData> {
  table: Table<TData>;
}

export function ColumnVisibilityDropdown<TData>({
  table,
}: ColumnVisibilityDropdownProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-2">
          <EllipsisVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {table
          .getAllLeafColumns()
          .filter((column) => column.id !== "select" && column.id !== "actions")
          .map((column) => (
            <DropdownMenuItem
              key={column.id}
              onSelect={(e) => e.preventDefault()}
            >
              <div className="flex items-center space-x-2">
                {/* Custom Checkbox */}
                <label className="relative flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={column.getIsVisible()}
                    onChange={(e) => column.toggleVisibility(e.target.checked)}
                    className="appearance-none w-4 h-4 border border-gray-300 rounded-sm checked:bg-main checked:border-transparent focus:outline-none"
                  />
                  {/* Checkmark */}
                  {column.getIsVisible() && (
                    <svg
                      className="absolute w-3 h-3 text-white pointer-events-none"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </label>
                <label htmlFor={column.id}>
                  {column.columnDef.header as string}
                </label>
              </div>
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
