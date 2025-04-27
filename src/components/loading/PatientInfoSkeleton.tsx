"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function PatientInfoSkeleton() {
  return (
    <div className="bg-gray-100 shadow-md rounded-lg p-4 flex flex-col md:flex-row justify-center md:items-start gap-6">
      {/* Patient Info Section - Left Side */}
      <div className="flex flex-col md:items-start gap-4 md:pr-4 w-full md:w-auto">
        <Skeleton className="h-6 w-48" />
        <div className="flex flex-row">
          <Skeleton className="w-20 h-20 rounded-md" />
          <div className="flex flex-col ml-4 space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
      </div>

      {/* Patient Details Section - Right Side */}
      <div className="grid grid-cols-4 grid-rows-3 gap-4 px-4 w-full xmd:flex-1 md:border-l">
        {/* First row of details */}
        {[...Array(4)].map((_, i) => (
          <div key={`top-${i}`}>
            <Skeleton className="h-4 w-24 mb-1" />
            <Skeleton className="h-5 w-full" />
          </div>
        ))}

        {/* Second row of details */}
        {[...Array(4)].map((_, i) => (
          <div key={`bottom-${i}`} className="row-start-2">
            <Skeleton className="h-4 w-24 mb-1" />
            <Skeleton className="h-5 w-full" />
          </div>
        ))}

        {/* Update Button - Skeleton */}
        <div className="col-start-2 xmd:col-start-4 row-start-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button disabled className="bg-gray-300 font-semibold">
                <Skeleton className="h-5 w-20" />
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
