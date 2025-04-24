// components/TableLoading.tsx
"use client";

import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface TableLoadingProps {
  colSpan: number;
  rows?: number;
  text?: string;
  heightClass?: string;
}

export function TableLoading({ colSpan, rows = 5 }: TableLoadingProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={`skeleton-row-${rowIndex}`}>
          {Array.from({ length: colSpan }).map((_, cellIndex) => (
            <TableCell key={`skeleton-cell-${rowIndex}-${cellIndex}`}>
              <Skeleton className="w-full h-6" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
