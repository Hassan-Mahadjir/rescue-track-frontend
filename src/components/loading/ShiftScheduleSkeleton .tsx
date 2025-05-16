import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const ShiftScheduleSkeleton = () => {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between mb-4">
        <Skeleton className="h-5 w-32" />
        <div className="flex items-center gap-2">
          <Skeleton className="w-5 h-5 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>

      {/* Calendar buttons */}
      <div className="flex space-x-2 w-full mb-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center flex-grow">
            <Skeleton className="h-4 w-10 mb-1" />
            <Skeleton className="h-5 w-6" />
          </div>
        ))}
      </div>

      {/* Scrollable shift cards */}
      <ScrollArea className="h-9/10 overflow-y-auto xmd:h-[45rem] space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="px-2 py-2 bg-light-gray rounded-lg space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-24" />
            <div className="flex items-center gap-2">
              <Skeleton className="w-7 h-7 rounded-full hidden xmd:block" />
              <Skeleton className="h-4 w-40" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="w-7 h-7 rounded-full hidden xmd:block" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
        ))}
      </ScrollArea>

      {/* Button */}
      <div className="mt-auto pt-2">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </div>
  );
};

export default ShiftScheduleSkeleton;
