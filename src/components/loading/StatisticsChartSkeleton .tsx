import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const StatisticsChartSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 px-2 pt-2 pb-4 items-stretch">
      {/* Bar Chart Placeholder */}
      <div className="flex-1 flex items-stretch">
        <Skeleton className="h-[300px] w-full rounded-lg" />
      </div>

      {/* Pie Chart Placeholder */}
      <div className="flex-1 flex items-stretch">
        <Skeleton className="h-[300px] w-full rounded-lg" />
      </div>

      {/* Table Placeholder */}
      <div className="col-span-1 md:col-span-2">
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-3 md:grid-cols-5 gap-2 items-center"
            >
              <Skeleton className="h-4 w-full col-span-1" />
              <Skeleton className="h-4 w-full col-span-1" />
              <Skeleton className="h-4 w-full col-span-1" />
              <Skeleton className="h-4 w-full col-span-1 hidden md:block" />
              <Skeleton className="h-4 w-full col-span-1 hidden md:block" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatisticsChartSkeleton;
