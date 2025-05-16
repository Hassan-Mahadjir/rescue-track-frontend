import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const DoctorListSkeleton = () => {
  return (
    <div className="border rounded-xl px-2 pt-2 pb-4 flex flex-col">
      {/* Title */}
      <Skeleton className="h-4 w-24 mb-3" />

      {/* Repeated doctor rows */}
      {Array.from({ length: 4 }).map((_, idx) => (
        <div key={idx}>
          <div className="flex items-center justify-between mx-1">
            <div className="flex items-center gap-3">
              {/* Profile image skeleton */}
              <Skeleton className="w-12 h-12 rounded-full hidden xmd:block" />

              {/* Name and specialization skeleton */}
              <div className="space-y-1 text-xs xmd:text-sm">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-16 hidden xmd:block" />
              </div>
            </div>

            {/* Status skeleton */}
            <Skeleton className="h-3 w-16 hidden sm:block" />
          </div>
          <hr className="border-dashed border-gray-400 my-3" />
        </div>
      ))}

      {/* Button Skeleton */}
      <div className="mt-auto pt-2">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </div>
  );
};

export default DoctorListSkeleton;
