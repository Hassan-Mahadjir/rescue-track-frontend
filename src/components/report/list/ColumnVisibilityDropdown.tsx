// components/ColumnVisibilityDropdown.tsx
"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { Table } from "@tanstack/react-table";
import { TooltipButton } from "../TooltipButton";

interface ColumnVisibilityDropdownProps<TData> {
  table: Table<TData>;
}

export function ColumnVisibilityDropdown<TData>({
  table,
}: ColumnVisibilityDropdownProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <TooltipButton tooltipText="Add New Report">
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
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              {column.id}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
