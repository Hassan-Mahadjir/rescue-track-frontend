// components/skeletons/RecentCardSkeleton.tsx
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const RecentCardSkeleton = () => {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="w-1/4 p-2 bg-gradient-to-t from-main to-second-green rounded-2xl overflow-hidden"
        >
          <div className="flex items-center justify-center xmd:justify-between">
            <div className="hidden xmd:block w-full">
              <div className="flex items-center gap-2 mb-1">
                <Skeleton className="h-6 w-10 rounded-full" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-3 w-48 mb-2" />
              <Skeleton className="h-3 w-40" />
            </div>
            <Skeleton className="w-16 h-16 rounded-full" />
          </div>

          <div className="flex items-center py-1 px-2 mt-2 rounded-xl bg-brown space-x-2 text-main justify-center xmd:justify-between xmd:w-2/3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="w-5 h-5 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentCardSkeleton;
